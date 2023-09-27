'use client';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { GlobalState } from '@/providers/GlobalState';
import { app } from '@/providers/Firebase';
import { useGlobalStateStore } from '@/providers/GlobalState';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import LoadingIndicator from '../LoadingIndicator';

async function firebaseSignOut(router: AppRouterInstance, state: GlobalState) {
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

export default function HomeMenu() {
  const router = useRouter();
  const state = useGlobalStateStore((state) => state);
  const [postModalOpen, setPostModalOpen] = useState(false);

  useEffect(() => {
    if (state.checkingUser) return;

    if (!state.user) router.push('/');
  });

  if (state.checkingUser || !state.user)
    return (
      <section className='flex h-screen w-1/3 flex-col items-center justify-center'>
        <LoadingIndicator />
      </section>
    );

  return (
    <>
      {postModalOpen &&
        createPortal(
          <CreatePostModal
            postModalOpen={postModalOpen}
            setPostModalOpen={() => setPostModalOpen(false)}
          />,
          document.body
        )}
      <section className='h-screen w-1/3'>
        <ul className='flex h-full flex-col items-center justify-center'>
          <li
            className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:cursor-pointer hover:text-white'
            onClick={() => setPostModalOpen(true)}
          >
            NEW
          </li>
          <li
            className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:cursor-pointer hover:text-white'
            onClick={() => firebaseSignOut(router, state)}
          >
            SIGN OUT
          </li>
          <hr className='border-1 mb-8 w-36 border-violet'></hr>
        </ul>
      </section>
    </>
  );
}
