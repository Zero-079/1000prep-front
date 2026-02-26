// src/features/auth/hooks/useAuth.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, type LoginPayload, type RegisterPayload } from '../services/auth.service';

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginPayload) => {
    console.log('rememberMe recibido en hook:', data.rememberMe)
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      router.push('/');
    } catch (err: any) {
      const message = err.data?.message || err.message || 'Error al iniciar sesión';
      setError(message);
      throw err; // Re-lanzar para que el componente también lo capture si quiere
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(data);
      // No guardar token después del registro, ir a login
      router.push('/login');
    } catch (err: any) {
      const message = err.data?.message || err.message || 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setError(null);
    router.push('/login');
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
}
