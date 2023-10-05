'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useGlobalStateStore } from '@/providers/GlobalState';
import LoadingIndicator from '../LoadingIndicator';
import HomeMenuUI from './ui';

export default function HomeMenu() {
  const router = useRouter();
  const state = useGlobalStateStore((state) => state);
  
  useEffect(() => {
    if (state.checkingUser) return;

    if (!state.user) router.push('/');
  });

  if (state.checkingUser || !state.user)
    return (
      <header className='hidden sm:flex h-screen w-1/3 flex-col items-center justify-center'>
        <LoadingIndicator />
      </header>
    );

  return (
    <HomeMenuUI />
  );
}
