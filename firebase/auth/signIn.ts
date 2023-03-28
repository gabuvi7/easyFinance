import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ISignUpArgs } from '../../utils/interfaces/firebase.interface';
import { appClient } from '../firebase.client';

const auth = getAuth(appClient);

export default async function signIn(signUpArgs: ISignUpArgs) {
  let result = null;
  let error = null;
  try {
    result = await signInWithEmailAndPassword(auth, signUpArgs.email, signUpArgs.password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
