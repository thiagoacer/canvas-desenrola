import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AuthContextType
} from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);

      setUser(response.user);
      setToken(response.token);

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      api.setToken(response.token);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);

      setUser(response.user);
      setToken(response.token);

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      api.setToken(response.token);
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      throw new Error(error.response?.data?.message || 'Erro ao registrar');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    api.clearToken();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
