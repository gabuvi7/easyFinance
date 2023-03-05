import { Session } from 'next-auth';

export interface ChildrenProps {
  children: React.ReactNode;
  session?: Session | null;
}
