import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F0F2F5] text-[#1E2B37] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
