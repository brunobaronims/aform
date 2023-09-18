'use client';

import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { app } from '@/providers/Firebase';
import PostModal from '@/components/Post/PostModal';
import { GlobalState, useGlobalStateStore } from '@/providers/GlobalState';

async function firebaseSignOut(
  router: AppRouterInstance,
  state: GlobalState
) {
  const auth = getAuth(app);

  try {
    state.signOut();
    await signOut(auth);
    router.push('/');
  } catch (e) {
    console.log(e);
  }
}

export default function Home() {
  const router = useRouter();
  const state = useGlobalStateStore((state) => state);
  const [postModalOpen, setPostModalOpen] = useState(false);

  useEffect(() => {
    if (state.checkingUser) return;

    if (!state.user) router.push('/');
  });

  if (state.checkingUser) return null;

  if (!state.user) return null;

  return (
    <div className='flex flex-row'>
      {postModalOpen &&
        createPortal(
          <PostModal
            postModalOpen={postModalOpen}
            setPostModalOpen={() => setPostModalOpen(false)}
          />,
          document.body
        )}
      <section className='h-screen w-1/3'>
        <ul className='flex h-full flex-col items-center justify-center'>
          <button className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'>
            HOME
          </button>
          <button
            className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'
            onClick={() => setPostModalOpen(true)}
          >
            NEW
          </button>
          <button className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'>
            SEARCH
          </button>
          <button className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'>
            PROFILE
          </button>
          <button
            className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'
            onClick={() => firebaseSignOut(router, state)}
          >
            SIGN OUT
          </button>
          <hr className='border-1 w-36 border-violet'></hr>
        </ul>
      </section>
      <section className='h-screen w-1/3'></section>
      <section className='h-screen w-1/3'></section>
    </div>
  );
}
