'use client';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useGlobalStateStore } from './GlobalState';
import { app } from './Firebase';
import { UserData } from '@/interfaces/auth.interfaces';

export default function AuthProvider() {
  const auth = getAuth(app);
  const state = useGlobalStateStore((state) => state);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!state.user) {
        const userData: UserData = {
          email: user.email,
          handle: user.displayName,
          metadata: user.metadata
        };

        state.signIn(userData);
        return;
      }

      return;
    }

    if (state.user) {
      state.signOut();
      return;
    }

    return;
  });

  return <span className='absolute'></span>;
}
