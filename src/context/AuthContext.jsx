import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginCustomer, registerCustomer, fetchCustomerProfile } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('foodraja_customer_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('foodraja_customer_token') || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);

  // Validate session on start
  useEffect(() => {
    if (token && !user) {
      fetchCustomerProfile(token)
        .then(res => {
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem('foodraja_customer_user', JSON.stringify(res.user));
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const res = await loginCustomer(identifier, password);
      if (res && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('foodraja_customer_token', res.token);
        localStorage.setItem('foodraja_customer_user', JSON.stringify(res.user));
        setIsAuthModalOpen(false);
        return res.user;
      }
      throw new Error('Invalid response from server.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (customerData) => {
    setLoading(true);
    try {
      const res = await registerCustomer(customerData);
      if (res && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('foodraja_customer_token', res.token);
        localStorage.setItem('foodraja_customer_user', JSON.stringify(res.user));
        setIsAuthModalOpen(false);
        return res.user;
      }
      throw new Error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('foodraja_customer_token');
    localStorage.removeItem('foodraja_customer_user');
  };

  const updateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('foodraja_customer_user', JSON.stringify(updated));
      return updated;
    });
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
