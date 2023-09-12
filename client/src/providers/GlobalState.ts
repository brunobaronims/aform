import { UserData } from '@/interfaces/auth.interfaces';
import { create } from 'zustand';

export type GlobalState = {
  user?: UserData;

  signIn: (user: UserData) => void;
  signOut: () => void;
};

export const useGlobalStateStore = create<GlobalState>((set) => ({
  user: undefined,

  signIn: (user: UserData) => set(() => ({  user: user })),
  signOut: () => set((prevState) => ({ ...prevState, user: undefined }))
}));
