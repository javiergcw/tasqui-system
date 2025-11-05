// Caso de uso para el login

import loginService from '@/services/auth/login.service';
import type {
  LoginRequest,
  LoginResponse,
  LoginUser,
} from '@/models/auth/login.model';

// Clase para manejar el almacenamiento de tokens y datos de usuario
class AuthStorage {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  setUser(user: LoginUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): LoginUser | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}

export const authStorage = new AuthStorage();

export class LoginUseCase {
  async execute(data: LoginRequest): Promise<LoginResponse> {
    try {
      // Validaciones básicas
      this.validateData(data);

      // Realizar login
      const response = await loginService.login(data);

      // Guardar token y datos de usuario en localStorage
      if (response.success && response.data) {
        authStorage.setToken(response.data.access_token);
        authStorage.setUser(response.data.user);
      }

      return response;
    } catch (error) {
      console.error('Error in login use case:', error);
      throw error;
    }
  }

  private validateData(data: LoginRequest): void {
    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('Email inválido');
    }

    if (!data.password || data.password.length < 1) {
      throw new Error('La contraseña es requerida');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new LoginUseCase();
