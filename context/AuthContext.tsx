'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { ChildrenProps } from '../utils';
import firebaseAppConfig from '../firebase/firebase.config';
import { StyledLoading } from '../components';

const auth = getAuth(firebaseAppConfig);

export const AuthContext = createContext({} as User);

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userStateChange) => {
      if (userStateChange) {
        setUser(userStateChange);
      } else {
        setUser({} as User);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {loading ? (
        <div style={{ alignItems: 'center', display: 'flex', height: '100vh' }}>
          <StyledLoading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
