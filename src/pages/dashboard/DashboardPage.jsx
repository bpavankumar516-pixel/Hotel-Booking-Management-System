import React from 'react';
import { StatCards } from '../../components/dashboard/StatCards';
import { AvailableRoomsSection } from '../../components/dashboard/AvailableRoomsSection';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { MiddleSection } from '../../components/dashboard/MiddleSection';
import { AnalyticsAndTasksSection } from '../../components/dashboard/AnalyticsAndTasksSection';
import { BookingDetailsTable } from '../../components/dashboard/BookingDetailsTable';

export const DashboardPage = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* 1. Top Row: 5 Key Performance Metric Stat Cards */}
      <StatCards />

      {/* 2. Second Row: Daily Operations Hub - Available Rooms Grid (8 cols) & Quick Operational Actions (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8">
          <AvailableRoomsSection />
        </div>
        <div className="lg:col-span-4">
          <QuickActions />
        </div>
      </div>

      {/* 3. Third Row: Guest Enquiries (5 cols) & Booking Status Trend Analytics (7 cols) */}
      <MiddleSection />

      {/* 4. Fourth Row: Operations & Channels - Staff Tasks, Booking Platforms Donut, Guest Rating */}
      <AnalyticsAndTasksSection />

      {/* 5. Fifth Row: Full Detailed Booking Reservations Data Table */}
      <BookingDetailsTable />
    </div>
  );
};
