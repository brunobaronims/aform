'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextareaAutosize from 'react-textarea-autosize';

import { PostDescription } from '@/interfaces/post.interfaces';

const postSchema = z.object({
  description: z
    .string()
    .min(1, 'Say something cool')
    .max(200, 'No more than 200 characters')
    .trim()
});

export default function CreatePostFormUI({
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
      className='flex h-auto flex-col items-center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextareaAutosize
        {...register('description', {
          required: true  
        })}
        maxLength={200}
        className='mx-0 mt-0 break-all w-full resize-none overflow-hidden bg-black px-4 py-2 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none'
      />
      {errors.description?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.description?.message}
        </span>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className='mb-3 block h-14 w-36 border-2 border-black bg-black text-center font-primary text-violet transition-colors hover:border-violet focus:outline-none disabled:bg-slate-300 sm:h-16'
      >
        SUBMIT
      </button>
    </form>
  );
}
