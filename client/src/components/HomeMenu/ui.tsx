import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGlobalStateStore } from '@/providers/GlobalState';
import { firebaseSignOut } from '@/providers/Firebase';
import CreatePostModal from '../CreatePostModal/CreatePostModal';

export default function HomeMenuUI() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const router = useRouter();
  const state = useGlobalStateStore((state) => state);

  const fadein = menuOpen ? ' animate-fadein flex ' : ' hidden ';
  const fadeout = menuClosing ? ' animate-fadeout ' : '';

  function handleMenuButtonClick() {
    if (menuOpen) {
      setMenuClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setMenuClosing(false);
      }, 200);

      return;
    }

    setMenuOpen(true);
  }

  return (
    <>
      {state.postModalOpen && createPortal(<CreatePostModal />, document.body)}
      <header className='fixed z-20 flex h-14 w-full items-center justify-end border-b-[0.5px] border-violet bg-black lg:hidden'>
        <button
          onClick={() => handleMenuButtonClick()}
          className='mr-6 flex h-6 flex-col justify-between lg:hidden'
        >
          <hr className='w-6 border-[1.5px] bg-violet' />
          <hr className='w-6 border-[1.5px] bg-violet' />
          <hr className='w-6 border-[1.5px] bg-violet ' />
        </button>
      </header>
      <section
        className={
          fadein +
          fadeout +
          'fixed right-0 z-10 mt-14 h-24 w-48 flex-col items-center justify-center border-[0.5px] border-violet bg-black lg:static lg:mt-0 lg:flex lg:h-screen lg:w-1/3 lg:border-0'
        }
      >
        <ul className='w-24 flex-col items-center justify-center lg:static lg:flex lg:h-full lg:w-full'>
          <li
            className='mb-8 hidden w-fit font-secondary text-lg font-normal text-violet transition-colors hover:cursor-pointer hover:text-white lg:block'
            onClick={() => state.setPostModalOpen(true)}
          >
            NEW
          </li>
          <li
            className='w-fit font-secondary text-lg font-normal text-violet transition-colors hover:cursor-pointer hover:text-white lg:mb-8'
            onClick={() => firebaseSignOut(router, state)}
          >
            SIGN OUT
          </li>
          <hr className='border-1 mb-8 hidden w-36 border-violet lg:block'></hr>
        </ul>
      </section>
    </>
  );
}
