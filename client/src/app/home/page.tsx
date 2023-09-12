'use client';

import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/providers/Firebase';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

async function firebaseSignOut(router: AppRouterInstance) {
  const auth = getAuth(app);

  try {
    await signOut(auth);
    router.push('/');
  } catch (e) {
    console.log(e);
  }
}

export default function Home() {
  const router = useRouter();

  return (
    <div className='flex flex-row'>
      <section className='h-screen w-1/3'>
        <ul className='flex h-full flex-col items-center justify-center'>
          <button className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'>
            HOME
          </button>
          <button className='mb-8 w-fit font-secondary text-lg font-normal text-violet transition-colors hover:text-white'>
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
            onClick={() => firebaseSignOut(router)}
          >
            SIGN OUT
          </button>
          <hr className='border-violet border-1 w-36'></hr>
        </ul>
      </section>
      <section className='h-screen w-1/3'></section>
      <section className='h-screen w-1/3'></section>
    </div>
  );
}
