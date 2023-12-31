'use client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterParams } from '@/interfaces/auth.interfaces';
import LoadingIndicator from '../LoadingIndicator';

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Required')
      .email({ message: 'Invalid email' })
      .trim(),
    handle: z
      .string()
      .min(1, 'Required')
      .max(50, 'Cannot be longer than 50 characters')
      .regex(/^\s*\S+\s*$/, 'Cannot have blank characters')
      .trim(),
    password: z
      .string()
      .min(6, 'Must be 6 or more characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[\W_])(?=.*\d).+/,
        'Must have at least one number, special character, and uppercase letter'
      )
      .trim(),
    confirm: z.string().trim()
  })
  .refine((data) => data.password === data.confirm, {
    message: `Passwords don't match`,
    path: ['confirm']
  });

export default function RegisterForm({
  setActiveForm,
  onSubmit,
  isLoading
}: {
  setActiveForm: (activeForm: string) => void;
  onSubmit: (formData: RegisterParams) => void;
  isLoading: boolean;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<RegisterParams>({ resolver: zodResolver(registerSchema) });

  return (
    <form
      className='flex flex-col items-center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('email', {
          required: true,
          disabled: isSubmitting
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
        {...register('handle', {
          required: true,
          disabled: isSubmitting
        })}
        placeholder='handle'
        className='mx-0 mt-10 h-12 w-full border-2 border-black bg-black px-6 py-4 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none sm:h-16'
      />
      {errors.handle?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.handle?.message}
        </span>
      )}
      <input
        {...register('password', {
          required: true,
          disabled: isSubmitting
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
      <input
        {...register('confirm', {
          required: true,
          disabled: isSubmitting
        })}
        type='password'
        placeholder='confirm password'
        className='mx-0 mt-10 h-12 w-full border-2 border-black bg-black px-6 py-4 text-lg text-violet caret-violet transition-colors placeholder:text-stone-700 hover:border-violet focus:border-violet focus:outline-none sm:h-16'
      />
      {errors.confirm?.message && (
        <span className='mt-2 font-primary text-violet'>
          {errors.confirm?.message}
        </span>
      )}
      <button
        type='submit'
        disabled={isSubmitting || isLoading}
        className='mt-10 flex h-14 w-36 cursor-pointer items-center justify-center border-2 border-black bg-black text-center font-primary text-violet transition-colors hover:border-violet focus:outline-none disabled:hover:cursor-wait disabled:hover:border-none sm:h-16'
      >
        {isLoading ? <LoadingIndicator /> : 'REGISTER'}
      </button>
      {!isLoading && (
        <div
          onClick={() => setActiveForm('login')}
          className='mx-0 mt-6 flex h-14 w-36 cursor-pointer items-center justify-center border-2 border-black bg-black text-center font-primary text-violet transition-colors hover:border-violet focus:outline-none sm:h-16'
        >
          LOGIN
        </div>
      )}
    </form>
  );
}
