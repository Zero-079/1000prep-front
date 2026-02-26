// src/features/auth/context/AuthContext.tsx
'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import { tr } from 'date-fns/locale';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar sesión al montar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            method: 'GET',
            credentials: 'include', // Enviar cookies
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}  

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }
  return context;
}
