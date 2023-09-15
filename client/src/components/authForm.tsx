'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { LoginParams, RegisterParams } from '@/interfaces/auth.interfaces';
import authApi from '@/services/authApi';

export default function AuthForm() {
  const [activeForm, setActiveForm] = useState('login');
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterParams) => {
      const data = await authApi.register(userData);

      return data;
    },
    onSuccess() {
      toast.info('Success!');
      setActiveForm('login');
    },
    onError(e: Error) {
      toast.error(e.message);
    }
  });

  const registerSubmit = (formData: RegisterParams) => {
    registerMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationFn: async (userData: LoginParams) => {
      const data = await authApi.login(userData);

      return data;
    },
    onSuccess() {
      router.push('/home');
    },
    onError(e: Error) {
      toast.error(e.message);
    }
  });

  const loginSubmit = (formData: LoginParams) => {
    loginMutation.mutate({ ...formData, email: formData.email.toLocaleLowerCase() });
  };

  return (
    <div className='w-[16rem] sm:w-96'>
      {activeForm === 'login' ? (
        <LoginForm setActiveForm={setActiveForm} onSubmit={loginSubmit} />
      ) : (
        <RegisterForm setActiveForm={setActiveForm} onSubmit={registerSubmit} />
      )}
    </div>
  );
}
