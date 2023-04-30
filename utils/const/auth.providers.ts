/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/extensions
import '../../types/next-auth.d.ts';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { firestoreAdmin } from '../../firebase/firebase.admin.config';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async signIn({ user }) {
      const { email } = user;
      const userRef = firestoreAdmin.collection('users').doc(email!);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        user.isNewUser = true;
        await userRef.set({
          cuilCuit: 0,
          email: email!,
          fiscalPassword: '',
          healthInsurance: '',
          iIBBStatus: '',
          iIBBType: '',
          lastname: user.family_name ?? '',
          monotributoCategory: '',
          name: user.given_name ?? user.name,
          firstLogin: true,
          country: 'Argentina',
          state: '',
          allocationOfContribution: false,
        });
      } else {
        user.isNewUser = false;
      }
      return true;
    },

    jwt({ token, user }) {
      token.isNewUser = user?.isNewUser;

      return token;
    },
  },
};
