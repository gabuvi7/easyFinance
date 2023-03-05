// import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';
// import { db } from '../../firebase/firebase.config';
// import * as firestoreFunctions from 'firebase/firestore';
// import { cert } from 'firebase-admin/app';
// import { firebaseConfig } from '../../firebase/firebase.config';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  // adapter: FirestoreAdapter({
  //   credential: cert(firebaseConfig),
  // }),
};
