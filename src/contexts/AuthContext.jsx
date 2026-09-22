import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEFAULT_ADMIN = {
  id: 'usr_lodgify_01',
  name: 'Jaylon Dorwart',
  email: 'jaylon@lodgify.com',
  role: 'Admin',
  hotelName: 'Lodgify Hotel PMS',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  phone: '+1 (555) 987-6543',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('lodgify_hotel_user');
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
    return localStorage.getItem('lodgify_hotel_auth') === 'true' || true;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('lodgify_hotel_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lodgify_hotel_user');
    }
  }, [user]);

  const login = async (email, password, rememberMe = true) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const loggedUser = {
      ...DEFAULT_ADMIN,
      email: email,
      name: email.toLowerCase().includes('jaylon') ? 'Jaylon Dorwart' : email.split('@')[0],
    };

    setUser(loggedUser);
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('lodgify_hotel_auth', 'true');
    }
    return loggedUser;
  };

  const register = async (userData) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name || 'Jaylon Dorwart',
      email: userData.email,
      role: userData.role || 'Admin',
      hotelName: userData.hotelName || 'Lodgify Hotel PMS',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      phone: userData.phone || '',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('lodgify_hotel_auth', 'true');
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
      localStorage.setItem('lodgify_hotel_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('lodgify_hotel_auth');
    localStorage.removeItem('lodgify_hotel_user');
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
