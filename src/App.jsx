import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HotelProvider } from './contexts/HotelContext';
import { AppRoutes } from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HotelProvider>
          <AppRoutes />
        </HotelProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
