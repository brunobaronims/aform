import { UserMetadata } from "firebase/auth";

export interface RegisterParams {
  email: string;
  handle: string;
  password: string;
  confirm: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface UserData {
  email: string | null;
  handle: string | null;
  metadata: UserMetadata;
  id: string;
  token: string;
}