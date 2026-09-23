import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_ADMIN = {
  id: 'usr_grand_horizon_01',
  name: 'Pavan',
  email: 'pavan@grandhorizon.com',
  role: 'Admin',
  hotelName: 'Grand Horizon Luxury Resort & Hotel',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  phone: '+91 98765 43210',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('grand_horizon_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return DEFAULT_ADMIN;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('grand_horizon_auth') === 'true' || true;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('grand_horizon_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('grand_horizon_user');
    }
  }, [user]);

  const login = async (email, password, rememberMe = true) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const loggedUser = {
      ...DEFAULT_ADMIN,
      email: email,
      name: email.toLowerCase().includes('pavan') ? 'Pavan' : (email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)),
    };

    setUser(loggedUser);
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('grand_horizon_auth', 'true');
    }
    return loggedUser;
  };

  const register = async (userData) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'Pavan',
      email: userData.email,
      role: userData.role || 'Admin',
      hotelName: userData.hotelName || 'Grand Horizon Luxury Resort & Hotel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      phone: userData.phone || '',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('grand_horizon_auth', 'true');
    return newUser;
  };

  const forgotPassword = async (email) => {
    if (!email) throw new Error('Email is required.');
    return true;
  };

  const resetPassword = async (newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    return true;
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('grand_horizon_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('grand_horizon_auth');
    localStorage.removeItem('grand_horizon_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        forgotPassword,
        resetPassword,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
