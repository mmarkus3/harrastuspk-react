import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  QueryFieldFilterConstraint,
} from 'firebase/firestore';

import { firestore } from './clientApp';

export async function saveRecord(collectionKey: string, data: object) {
  const docRef = await addDoc(collection(firestore, collectionKey), {
    ...data,
    date: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateRecord(collectionKey: string, id: string, data: object) {
  const docRef = doc(firestore, collectionKey, id);
  await updateDoc(docRef, {
    ...data,
  });
}

export async function getRecord<T>(collectionKey: string, id: string, cb: (result: T | null) => void) {
  const docRef = doc(firestore, collectionKey, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const result = {
      id: docSnap.id,
      ...docSnap.data(),
      // Only plain objects can be passed to Client Components from Server Components
      date: docSnap.data().date?.toDate(),
    } as T;
    cb(result);
  } else {
    cb(null);
  }
}

export async function getList<T>(collectionKey: string, db = firestore, queryConstraints: QueryFieldFilterConstraint[] = []) {
  const q = query(collection(db, collectionKey), ...queryConstraints);

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      date: doc.data().date?.toDate(),
    } as T;
  });
}

export function getSnapshotList<T>(collectionKey: string, cb: (results: T[]) => void, queryConstraints: QueryFieldFilterConstraint[] = []) {
  if (typeof cb !== "function") {
    console.log("Error: The callback parameter is not a function");
    return;
  }

  const q = query(collection(firestore, collectionKey), ...queryConstraints);

  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Only plain objects can be passed to Client Components from Server Components
        date: doc.data().date?.toDate(),
      } as T;
    });
    cb(results);
  });
}