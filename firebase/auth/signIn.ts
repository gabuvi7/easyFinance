import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ISignUpArgs } from '../../utils/interfaces/firebase.interface';
import { app } from '../firebase.client';

const auth = getAuth(app);

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
