// enforces that this code can only be called on the server
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import 'server-only';

import { cookies } from 'next/headers';
import { initializeServerApp, getApps, getApp } from 'firebase/app';

import { getAuth, User } from 'firebase/auth';
import { firebaseConfig } from './config';

// Returns an authenticated client SDK instance for use in Server Side Rendering
// and Static Site Generation
export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get('__session')?.value;

  // Firebase Server App is a new feature in the JS SDK that allows you to
  // instantiate the SDK with credentials retrieved from the client & has
  // other affordances for use in server environments.
  if (getApps().length > 0) {
    const app = getApp();
    const auth = getAuth(app);
    await auth.authStateReady();
    const currentUser = auth.currentUser?.toJSON() as User || null;
    return { firebaseServerApp: app, currentUser };
  }
  const firebaseServerApp = initializeServerApp(firebaseConfig, {
    authIdToken
  });

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();
  const currentUser = auth.currentUser?.toJSON() as User || null;

  return { firebaseServerApp, currentUser };
}