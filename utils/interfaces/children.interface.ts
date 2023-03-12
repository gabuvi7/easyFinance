export interface ChildrenProps {
  children: React.ReactNode;
}

export interface IUser {
  user?: IUserSession | null;
}

export interface IChildrenSession extends ChildrenProps, IUser {}

interface IUserSession {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
