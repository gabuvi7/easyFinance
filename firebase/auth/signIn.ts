import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ISignUpArgs } from '../../utils/interfaces/firebase.interface';
import { firebaseAppConfig } from '../firebase.config';

const auth = getAuth(firebaseAppConfig);

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
