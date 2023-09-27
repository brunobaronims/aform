'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginParams } from '@/interfaces/auth.interfaces';
import LoadingIndicator from '../LoadingIndicator';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Required')
    .email({ message: 'Invalid email' })
    .trim(),
  password: z.string().min(1, 'Required').trim()
});

export default function LoginForm({
  setActiveForm,
  onSubmit,
  isLoading
}: {
  setActiveForm: (activeForm: string) => void;
  onSubmit: (formData: LoginParams) => void;
  isLoading: boolean;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<LoginParams>({ resolver: zodResolver(loginSchema) });

  return (
    <form
      className='flex flex-col items-center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('email', {
          required: true
        })}
        placeholder='email'
        className='mx-0 mt-0 h-12 w-full border-2 border-black bg-black px-6 py-4 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none sm:h-16'
      />
      {errors.email?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.email?.message}
        </span>
      )}
      <input
        {...register('password', {
          required: true
        })}
        type='password'
        placeholder='password'
        className='mx-0 mt-10 h-12 w-full border-2 border-black bg-black px-6 py-4 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none sm:h-16'
      />
      {errors.password?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.password?.message}
        </span>
      )}
      <button
        type='submit'
        disabled={isSubmitting || isLoading}
        className='mt-10 flex h-14 w-36 items-center justify-center border-2 border-black bg-black text-center font-primary text-violet transition-colors hover:border-violet focus:outline-none disabled:hover:cursor-wait disabled:hover:border-none sm:h-16'
      >
        {isLoading ? <LoadingIndicator /> : 'ENTER'}
      </button>
      {!isLoading && (
        <div
          onClick={() => setActiveForm('register')}
          className='mx-0 mb-0 mt-10 flex h-14 w-36 cursor-pointer items-center justify-center border-2 border-black bg-black text-center font-primary text-violet transition-colors hover:border-violet focus:outline-none sm:h-16'
        >
          NEW USER
        </div>
      )}
    </form>
  );
}
