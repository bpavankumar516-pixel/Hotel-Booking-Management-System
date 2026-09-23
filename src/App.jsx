import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HotelProvider } from './contexts/HotelContext';
import { AppRoutes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HotelProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </HotelProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
