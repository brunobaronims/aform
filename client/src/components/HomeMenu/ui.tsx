import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGlobalStateStore } from '@/providers/GlobalState';
import { firebaseSignOut } from '@/providers/Firebase';
import CreatePostModal from '../CreatePostModal/CreatePostModal';

export default function HomeMenuUI() {
  const [postModalOpen, setPostModalOpen] = useState(false);
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
      {postModalOpen &&
        createPortal(
          <CreatePostModal
            postModalOpen={postModalOpen}
            setPostModalOpen={() => setPostModalOpen(false)}
          />,
          document.body
        )}
      <header className='fixed z-20 flex h-14 w-full items-center justify-end border-b-[0.5px] border-violet bg-black sm:hidden'>
        <button
          onClick={() => handleMenuButtonClick()}
          className='mr-6 flex h-6 flex-col justify-between sm:hidden'
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
          'fixed right-0 z-10 mt-14 h-24 w-48 flex-col items-center justify-center border-[0.5px] border-violet bg-black sm:static sm:mt-0 sm:flex sm:h-screen sm:w-1/3 sm:border-0'
        }
      >
        <ul className='w-24 flex-col items-center justify-center sm:static sm:flex sm:h-full sm:w-full'>
          <li
            className='mb-8 hidden w-fit font-secondary text-lg font-normal text-violet transition-colors hover:cursor-pointer hover:text-white sm:block'
            onClick={() => setPostModalOpen(true)}
          >
            NEW
          </li>
          <li
            className='w-fit font-secondary text-lg font-normal text-violet transition-colors hover:cursor-pointer hover:text-white sm:mb-8'
            onClick={() => firebaseSignOut(router, state)}
          >
            SIGN OUT
          </li>
          <hr className='border-1 mb-8 hidden w-36 border-violet sm:block'></hr>
        </ul>
      </section>
    </>
  );
}
