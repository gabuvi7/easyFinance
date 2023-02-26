import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { ISignUpArgs } from '../../utils/interfaces/firebase.interface';
import firebaseAppConfig from '../firebase.config';

const auth = getAuth(firebaseAppConfig);

export default async function signUp(signUpArgs: ISignUpArgs) {
  let result = null;
  let error = null;

  try {
    result = createUserWithEmailAndPassword(auth, signUpArgs.email, signUpArgs.password);
  } catch (err) {
    error = err;
  }

  return { result, error };
}
