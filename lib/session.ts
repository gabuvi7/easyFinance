/* eslint-disable @typescript-eslint/return-await */
import { getServerSession } from 'next-auth/next';
import { firestoreAdmin } from '../firebase/firebase.admin.config';
import { authOptions } from '../utils/const/auth.providers';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}

export async function getUserData(email: string) {
  const userRef = firestoreAdmin.collection('users').doc(email!);
  const userDoc = await userRef.get();
  return userDoc.data();
}
