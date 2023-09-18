import { FirebaseError } from "firebase-admin";

export function isFirebaseError(e: any): e is FirebaseError {
  if (!e?.code) return false;

  return e.code.startsWith('auth/');
};