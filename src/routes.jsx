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

      {/* Remaining Sub-Pages rendered as Clean Minimal Placeholders */}
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Rooms & Suites" moduleNumber="03" description="Room list, third-party API integration, and room readiness." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/guests"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Guest Directory" moduleNumber="04" description="Guest profiles, contact info, and ID proof verification." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Reservations" moduleNumber="05" description="Room booking workflow, stay duration, and confirmations." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/frontdesk"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Front Desk Ops" moduleNumber="06" description="Express check-in, check-out processing, and stay logs." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/housekeeping"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Housekeeping" moduleNumber="07" description="Room cleaning status, inspection queue, and room readiness." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Payments & Billing" moduleNumber="08" description="Payment history, invoice generation, and receipt downloads." />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ModulePlaceholderPage title="Booking History" moduleNumber="09" description="Historical reservation records, status filter, and cancellations." />
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
