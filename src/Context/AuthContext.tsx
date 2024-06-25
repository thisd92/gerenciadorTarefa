import { validateToken } from '@/services/auth';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  onLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({
  isLogged: false,
  setIsLogged: () => { },
  onLogout: () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const router = useRouter()

  const [isLogged, setIsLogged] = useState(false);

  const onLoginSuccess = () => {
    setIsLogged(true)
  }

  const onLoginFail = () => {
    setIsLogged(false)
  }

  useEffect(() => {
    validateToken({ router, onLoginSuccess, onLoginFail })
  }, [])

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged: setIsLogged, onLogout: onLoginFail }}>
      {children}
    </AuthContext.Provider>
  );
};
