// Servicio HTTP genérico para realizar peticiones API

import { API_CONFIG } from '@/lib/constants';

export interface HttpConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface HttpError {
  message: string;
  status?: number;
  data?: unknown;
}

class HttpService {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(config: HttpConfig = {}) {
    this.baseURL = config.baseURL || API_CONFIG.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout || 30000; // 30 segundos por defecto
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
    
    // Verificar si es un endpoint público (no requiere autenticación)
    const isPublicEndpoint = endpoint.includes('/public/') || (endpoint.includes('/leads/') && !endpoint.includes('/admin/'));
    
    // Obtener token del localStorage si está disponible y no es endpoint público
    const token = !isPublicEndpoint && typeof window !== 'undefined' 
      ? localStorage.getItem('access_token') 
      : null;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    // Debug: Log para verificar headers en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Request to:', url);
      console.log('Is public endpoint:', isPublicEndpoint);
      if (!isPublicEndpoint) {
        console.log('Has token:', !!token);
      }
      const normalizedHeaders =
        config.headers instanceof Headers
          ? Object.fromEntries(config.headers.entries())
          : Array.isArray(config.headers)
            ? Object.fromEntries(config.headers)
            : config.headers ?? {};

      console.log('Headers:', {
        'Content-Type': normalizedHeaders['Content-Type'],
        'Authorization': token ? `Bearer ${token.substring(0, 20)}...` : 'No token',
      });
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as unknown as T;
      }

      if (!response.ok) {
        // Log del error completo en desarrollo
        if (process.env.NODE_ENV === 'development') {
          console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            data: data
          });
        }
        
        const error: HttpError = {
          message: `HTTP Error: ${response.status} ${response.statusText}`,
          status: response.status,
          data,
        };
        throw error;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
        } as HttpError;
      }

      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }

      throw {
        message: error instanceof Error ? error.message : 'Network error occurred',
        status: 0,
      } as HttpError;
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  // Métodos para actualizar configuración
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  removeHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  setTimeout(timeout: number): void {
    this.timeout = timeout;
  }
}

// Instancia singleton por defecto
const httpService = new HttpService();

export default httpService;

// Exportar la clase para crear instancias personalizadas
export { HttpService };

