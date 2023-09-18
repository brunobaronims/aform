'use client';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useGlobalStateStore } from './GlobalState';
import { app } from './Firebase';
import { UserData } from '@/interfaces/auth.interfaces';
import { useEffect } from 'react';

export default function AuthProvider() {
  const auth = getAuth(app);
  const state = useGlobalStateStore((state) => state);

  useEffect(() => {
    state.setCheckingUser(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData: UserData = {
          email: user.email,
          handle: user.displayName,
          metadata: user.metadata,
          id: user.uid,
          token: await user.getIdToken()
        };

        state.signIn(userData);
        state.setCheckingUser(false);

        return;
      }

      if (state.user) {
        state.signOut();
      }

      state.setCheckingUser(false);
      return;
    });
  }, [auth]);

  return <span className='absolute'></span>;
}
