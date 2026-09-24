import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Module 1: Authentication Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ProfilePage } from './pages/auth/ProfilePage';

// Module 2: Dashboard Analytics Page (Full Rich Dashboard)
import { DashboardPage } from './pages/dashboard/DashboardPage';

// Module 3, 4, 5, 6, 9: Active Full Pages
import { RoomManagementPage } from './pages/modules/RoomManagementPage';
import { RoomDetailsPage } from './pages/modules/RoomDetailsPage';
import { GuestManagementPage } from './pages/modules/GuestManagementPage';
import { GuestDetailsPage } from './pages/modules/GuestDetailsPage';
import { RoomBookingPage } from './pages/modules/RoomBookingPage';
import { ReservationDetailsPage } from './pages/modules/ReservationDetailsPage';
import { CheckInOutPage } from './pages/modules/CheckInOutPage';
import { BookingHistoryPage } from './pages/modules/BookingHistoryPage';
import { MaintenancePage } from './pages/modules/MaintenancePage';
import { PaymentsPage } from './pages/modules/PaymentsPage';
import { InvoiceDetailsPage } from './pages/modules/InvoiceDetailsPage';

// Common Minimal Placeholder Page for Remaining Sub-Pages
import { ModulePlaceholderPage } from './pages/common/ModulePlaceholderPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Module 1: Auth Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Root Redirect to Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/dashboard" replace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Module 2: Active Full Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* User Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Remaining Sub-Pages */}
      {/* Module 3: Active Room Management */}
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RoomManagementPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rooms/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RoomDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Module 4: Active Guest Management (DummyJSON Users API) */}
      <Route
        path="/guests"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <GuestManagementPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/guests/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <GuestDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Module 5: Active Reservations & Booking Engine */}
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RoomBookingPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ReservationDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Module 6: Redirect frontdesk / checkin / checkout ops directly into Reservations Engine */}
      <Route
        path="/frontdesk"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/reservations" replace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkin"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/reservations" replace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/reservations" replace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Maintenance & Hotel Operations Route */}
      <Route
        path="/maintenance"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MaintenancePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/housekeeping"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/maintenance" replace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Payments & Billing Route */}
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PaymentsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments/invoice/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <InvoiceDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Module 9: Booking History */}
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingHistoryPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Analytics & Reports" moduleNumber="10" description="Business intelligence, revenue charts, and occupancy rate." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="System Settings" moduleNumber="11" description="Property configuration, tax rates, and policies." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
