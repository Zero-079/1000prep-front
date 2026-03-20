// src/features/auth/services/auth.service.ts
import { fetchAPI } from '../../..//config/api';

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expiresIn: string;
}

export const authService = {

  async register(data: RegisterPayload): Promise<AuthResponse> {
    return fetchAPI<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include', // Para enviar cookies al backend
    });
  },

  async login(data: LoginPayload): Promise<AuthResponse> {
    return fetchAPI<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include', // Para enviar cookies al backend
    });
  },

  async logout(): Promise<void> {
    return fetchAPI('/auth/logout', {
      method: 'POST',
      credentials: 'include', // Para enviar cookies al backend
    });
  },
};
