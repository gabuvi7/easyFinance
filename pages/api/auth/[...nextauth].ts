import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth/next';
import { authOptions } from '../../../utils/const/auth.providers';

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
