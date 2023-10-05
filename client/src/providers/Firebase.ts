import { initializeApp } from 'firebase/app';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getAuth, signOut } from 'firebase/auth';

import { GlobalState } from './GlobalState';
//import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//console.log(analytics);

export async function firebaseSignOut(router: AppRouterInstance, state: GlobalState) {
  const auth = getAuth(app);

  try {
    state.setCheckingUser(true);
    state.signOut();
    await signOut(auth);
    router.push('/');
  } catch (e) {
    console.log(e);
  }
}