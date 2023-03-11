import { Session } from 'next-auth';

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface SessionProps extends ChildrenProps {
  session?: Session | null;
}
