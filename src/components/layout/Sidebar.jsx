import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  BedDouble,
  Users,
  CalendarCheck,
  ConciergeBell,
  Sparkles,
  CreditCard,
  History,
  FileText,
  Settings,
  ChevronRight,
  Grid3X3,
  LogOut as SignOutIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Rooms & Suites', path: '/rooms', icon: BedDouble },
    { name: 'Guest Directory', path: '/guests', icon: Users },
    { name: 'Reservations', path: '/reservations', icon: CalendarCheck },
    { name: 'Front Desk Ops', path: '/frontdesk', icon: ConciergeBell },
    { name: 'Housekeeping', path: '/housekeeping', icon: Sparkles },
    { name: 'Payments & Billing', path: '/payments', icon: CreditCard },
    { name: 'Booking History', path: '/history', icon: History },
    { name: 'Analytics & Reports', path: '/reports', icon: FileText },
    { name: 'System Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-[#1E2B37] text-slate-300 flex flex-col h-screen sticky top-0 z-30 select-none shadow-xl border-r border-slate-800 shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-60'
      }`}
    >
      {/* Brand Header & Toggle Button (Aligned in the exact same top bar for both states) */}
      <div className={`p-4 border-b border-slate-700/50 flex items-center min-h-[64px] ${isCollapsed ? 'justify-between px-3' : 'justify-between px-5'}`}>
        {!isCollapsed ? (
          <div className="flex items-center space-x-2">
            <span className="font-['Poppins'] text-lg font-extrabold tracking-tight text-white">
              Grand Horizon
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#C5A059] text-slate-950 uppercase tracking-widest">
              PMS
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-[#C5A059] text-slate-950 shadow-xs" title="Grand Horizon PMS">
            <Grid3X3 className="w-4 h-4" />
          </div>
        )}

        {/* Toggle Button: Always visible in exact same header alignment */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4 text-[#C5A059]" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Menu List */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar divide-y divide-dashed divide-slate-700/40">
        <div className="px-2 space-y-1.5 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center rounded-lg text-xs transition-all ${
                    isCollapsed ? 'justify-center p-3' : 'justify-between px-3.5 py-2.5'
                  } ${
                    isActive
                      ? 'bg-[#2B3A4A] text-white font-bold border-l-4 border-[#C5A059] shadow-inner'
                      : 'text-slate-300 font-medium hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                  <Icon className={`w-4 h-4 shrink-0 ${isCollapsed ? 'w-5 h-5 text-[#C5A059]' : 'opacity-80'}`} />
                  {!isCollapsed && <span className="font-sans tracking-wide truncate">{item.name}</span>}
                </div>
                {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3.5 border-t border-slate-700/50 bg-[#17222C] flex items-center justify-between">
        {!isCollapsed ? (
          <>
            <NavLink to="/profile" className="flex items-center space-x-2.5 overflow-hidden">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-slate-600 shrink-0"
              />
              <div className="truncate">
                <p className="font-['Poppins'] text-xs font-bold text-white truncate">{user?.name || 'Madison Alley'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.role || 'Admin Manager'}</p>
              </div>
            </NavLink>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
            >
              <SignOutIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="mx-auto flex flex-col items-center space-y-2">
            <NavLink to="/profile" title={user?.name || 'Profile'}>
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover border border-[#C5A059] shadow-xs"
              />
            </NavLink>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
            >
              <SignOutIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
