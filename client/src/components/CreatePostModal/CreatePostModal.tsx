import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { MouseEvent } from 'react';
import CreatePostForm from './CreatePostForm';

import { assertIsNode } from '@/guards/assertIsNode';

export default function CreatePostModal({
  setPostModalOpen: setPostModalOpen,
  postModalOpen: postModalOpen
}: {
  setPostModalOpen: Dispatch<SetStateAction<boolean>>;
  postModalOpen: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [postModalClosing, setPostModalClosing] = useState(false);

  function handleClickOutsideModal(e: MouseEvent) {
    assertIsNode(e.target);
    if (ref.current && !ref.current.contains(e.target)) {
      closeModal();
    }
  }

  function closeModal() {
    setPostModalClosing(true);
    setTimeout(() => {
      setPostModalOpen(false);
      setPostModalClosing(false);
    }, 200);
  }

  const fadein = postModalOpen ? ' animate-fadein ' : '';
  const fadeout = postModalClosing ? ' animate-fadeout ' : '';

  return (
    <div className={fadein + fadeout + 'relative'}>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div
        className='fixed inset-0 flex w-screen items-center justify-center'
        onClick={(e) => handleClickOutsideModal(e)}
      >
        <div
          ref={ref}
          className='mx-auto h-auto w-96 border-2 border-violet bg-black/80 drop-shadow-md'
        >
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
}
