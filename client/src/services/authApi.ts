import {
  signInWithCustomToken,
  getAuth
} from 'firebase/auth';

import api from './api';
import { LoginParams, RegisterParams } from '@/interfaces/auth.interfaces';
import { app } from '@/providers/Firebase';

async function login(params: LoginParams) {
  const auth = getAuth(app);
  const { data: token }: { data: string } = await api.post('/user', params);

  const result = await signInWithCustomToken(auth, token);
  
  return result.user;
}

async function register(params: RegisterParams) {
  const res = await api.post('/user/new', params);

  return res.data;
}

const authApi = {
  login,
  register
};

export default authApi;
