import NextAuth from 'next-auth/next';
import { authOptions } from '../../../utils/const/auth.providers';

export default NextAuth(authOptions);
