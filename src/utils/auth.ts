// Utilidades de autenticación

import { authStorage } from '@/use-cases/auth/login.use-case';

export const getAuthToken = (): string | null => {
  return authStorage.getToken();
};

export const getUser = () => {
  return authStorage.getUser();
};

export const isAuthenticated = (): boolean => {
  return authStorage.isAuthenticated();
};

export const logout = (): void => {
  authStorage.clear();
  window.location.href = '/login';
};

