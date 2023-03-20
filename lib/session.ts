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

export async function storeUser() {
  const user = {
    cuilCuit: 24388582282,
    email: 'fregaby.16@gmail.com',
    fiscalPassword: '',
    healthInsurance: 'Swiss Medical',
    iIBBStatus: 'Unificado',
    iIBBType: 'ARBA',
    lastname: 'Uviedo',
    monotributoCategory: 'G',
    name: 'Gabriel Oscar',
  };
  await firestoreAdmin.collection('users').add(user);
}
