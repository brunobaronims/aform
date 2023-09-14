import { Dispatch, SetStateAction, useState } from 'react';
import * as z from 'zod';

const postSchema = z.string().min(1, 'Say something cool').trim();

export default function PostModal({
  handleClick: handleClick
}: {
  handleClick: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className='relative z-50'>
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
      <div
        className='fixed inset-0 flex w-screen items-center justify-center p-4'
        onClick={() => handleClick(false)}
      >
        <div className='mx-auto h-60 w-96 border-violet border-2 bg-black/80 drop-shadow-md'>
          
        </div>
      </div>
    </div>
  );
}
