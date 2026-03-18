// src/features/auth/hooks/useAuth.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import { authService, type LoginPayload, type RegisterPayload } from '../services/auth.service';

export function useAuth() {
  const router = useRouter();
  const {
    setIsAuthenticated,
    setUser,
    isAuthenticated,
    user,
    isLoading: isAuthLoading,   // ← renamed: session-check loading from context
  } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false); // ← action loading (login/register/logout)
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginPayload) => {
    console.log('rememberMe recibido en hook:', data.rememberMe)
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      setIsAuthenticated(true);
      setUser(response.user);
      router.push('/');
    } catch (err: any) {
      const message = err.data?.message || err.message || 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(data);
      router.push('/login');
    } catch (err: any) {
      const message = err.data?.message || err.message || 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,        // action loading (for form spinners)
    isAuthLoading,    // session-check loading (for navbar/layout guards)
    error,
    isAuthenticated,
    user,
  };
}
