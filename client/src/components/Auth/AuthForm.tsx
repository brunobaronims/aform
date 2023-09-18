'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { LoginParams, RegisterParams } from '@/interfaces/auth.interfaces';
import authApi from '@/services/authApi';
import { useGlobalStateStore } from '@/providers/GlobalState';

export default function AuthForm() {
  const [activeForm, setActiveForm] = useState('login');
  const state = useGlobalStateStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (state.checkingUser) return;

    if (state.user) router.push('/home');
  });

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
      return;
    },
    onError(e: Error) {
      toast.error(e.message);
    }
  });

  const loginSubmit = (formData: LoginParams) => {
    loginMutation.mutate({
      ...formData,
      email: formData.email.toLocaleLowerCase()
    });
  };

  if (state.checkingUser) return null;

  if (state.user) return null;

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
