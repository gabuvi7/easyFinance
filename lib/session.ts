/* eslint-disable @typescript-eslint/return-await */
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../utils/const/auth.providers';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session?.user;
}
