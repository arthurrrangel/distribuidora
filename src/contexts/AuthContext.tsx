"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'cpf' | 'cnpj' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  login: (type: 'cpf' | 'cnpj') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const isLoggedIn = userType !== null;

  const login = (type: 'cpf' | 'cnpj') => {
    setUserType(type);
  };

  const logout = () => {
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
