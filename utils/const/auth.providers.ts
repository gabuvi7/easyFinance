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
      const newUser = { ...user };
      if (!userDoc.exists) {
        newUser.isNewUser = true;
        await userRef.set({
          cuilCuit: 0,
          email: email!,
          fiscalPassword: '',
          healthInsurance: '',
          iIBBStatus: '',
          iIBBType: '',
          lastname: user.family_name,
          monotributoCategory: '',
          name: user.given_name,
        });

        return true;
      }

      return true;
    },
    jwt({ token, user }) {
      const newToken = { ...token };
      if (user) {
        newToken.isNewUser = user.isNewUser;
      }

      return newToken;
    },
  },
};
