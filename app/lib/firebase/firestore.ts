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

export async function getList<T>(collectionKey: string, db = firestore, queryConstraints: QueryFieldFilterConstraint[] = []) {
  const q = query(collection(db, collectionKey), ...queryConstraints);

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      date: doc.data().date.toDate(),
    } as T;
  });
}