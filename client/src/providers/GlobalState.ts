import { UserData } from '@/interfaces/auth.interfaces';
import { create } from 'zustand';

export type GlobalState = {
  user?: UserData;
  token: string | undefined;
  checkingUser: boolean;
  postModalOpen: boolean;

  signIn: (user: UserData) => void;
  signOut: () => void;
  setCheckingUser: (boolean: boolean) => void;
  setPostModalOpen: (boolean: boolean) => void;
  updateToken: (token: string) => void;
};

export const useGlobalStateStore = create<GlobalState>((set) => ({
  user: undefined,
  checkingUser: true,
  token: undefined,
  postModalOpen: false,

  updateToken: (token: string) => set(() => ({ token: token })),
  signIn: (user: UserData) => set(() => ({ user: user })),
  setCheckingUser: (boolean: boolean) => set(() => ({ checkingUser: boolean })),
  setPostModalOpen: (boolean: boolean) =>
    set(() => ({ postModalOpen: boolean })),
  signOut: () => set((prevState) => ({ ...prevState, user: undefined }))
}));
