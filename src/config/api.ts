// src/config/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3010';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Obtener token del localStorage o sessionStorage
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Adjuntar JWT si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Manejo de errores HTTP
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || `API error: ${response.status} ${response.statusText}`
    );
    (error as any).status = response.status;
    (error as any).data = errorData;
    throw error;
  }
  
  return response.json();
}
