'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextareaAutosize from 'react-textarea-autosize';

import { PostDescription } from '@/interfaces/post.interfaces';
import LoadingIndicator from '@/components/LoadingIndicator';

const postSchema = z.object({
  description: z.string().min(1, 'Nothing to say?').max(200, 'No more than 200 characters').trim()
});

export default function CreatePostFormUI({
  onSubmit,
  isLoading
}: {
  onSubmit: (formData: PostDescription) => void;
  isLoading: boolean;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<PostDescription>({ resolver: zodResolver(postSchema) });

  return (
    <form
      className='flex h-auto flex-col items-center bg-black p-2 sm:h-56 sm:justify-between'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextareaAutosize
        {...register('description', {
          required: true
        })}
        maxLength={200}
        placeholder='Say something cool...'
        className='mx-0 mt-0 w-full resize-none overflow-hidden break-all bg-black px-4 py-2 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none'
      />
      {errors.description?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.description?.message}
        </span>
      )}
      <button
        type='submit'
        disabled={isSubmitting || isLoading}
        className='mb-3 flex h-14 w-36 items-center justify-center border-[1.5px] border-violet bg-black text-center font-primary text-violet transition-colors hover:bg-violet/10 focus:outline-none disabled:hover:bg-black disabled:hover:cursor-wait sm:h-16'
      >
        {isLoading ? <LoadingIndicator /> : 'SUBMIT'}
      </button>
    </form>
  );
}
