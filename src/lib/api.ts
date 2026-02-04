import axios, { AxiosInstance, AxiosError } from 'axios';

// URL da API - usa variável de ambiente ou localhost como fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

// Cliente HTTP configurado
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token JWT automaticamente
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para tratar erros
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<any>) => {
        if (error.response?.status === 401) {
          // Token inválido ou expirado
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos HTTP
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  // Método para definir o token manualmente
  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  // Método para remover o token
  clearToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}

export const api = new ApiClient();
export { API_BASE_URL };
