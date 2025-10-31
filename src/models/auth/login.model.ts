                            // Modelo para el login

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  email: string;
  role: 'EMPLOYEE' | 'COMPANY' | 'ADMIN';
  status: string;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}

export interface LoginData {
  user: LoginUser;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

