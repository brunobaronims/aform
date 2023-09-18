'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { PostDescription } from '@/interfaces/post.interfaces';

const postSchema = z.object({
  description: z
    .string()
    .min(1, 'Say something cool')
    .max(200, 'No more than 200 characters')
    .trim()
});

export default function PostFormUI({
  onSubmit
}: {
  onSubmit: (formData: PostDescription) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<PostDescription>({ resolver: zodResolver(postSchema) });

  return (
    <form
      className='flex flex-col items-center h-full justify-between'
      onSubmit={handleSubmit(onSubmit)}
    >
      
        <textarea
          {...register('description', {
            required: true
          })}
          placeholder='Say something...'
          maxLength={200}
          className='mx-0 mt-0 h-24 w-full resize-none bg-black px-4 py-2 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none sm:h-24'
        />
      
      {errors.description?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.description?.message}
        </span>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className='h-14 w-36 border-2 border-black bg-black text-center font-primary text-violet transition-colors hover:border-violet focus:outline-none disabled:bg-slate-300 sm:h-16'
      >
        SUBMIT
      </button>
    </form>
  );
}
