import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userData } from '../data/userData';

interface AuthContextType {
  userId: string | null;
  login: (id: string, pw: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);

  const login = (id: string, pw: string) => {
    const user = userData[id];
    if (user && user.password === pw) {
      setUserId(id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
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
