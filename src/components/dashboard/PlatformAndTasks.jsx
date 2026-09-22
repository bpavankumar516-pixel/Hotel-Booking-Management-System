import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChevronDown, Plus, CheckCircle2, Circle, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { QuickActions } from './QuickActions';
import { Link } from 'react-router-dom';

export const PlatformAndTasks = () => {
  const {
    reservationsChartData,
    platformData,
    tasks,
    toggleTask,
    recentBookings,
    openModal,
  } = useHotel();

  return (
    <div className="space-y-6">
      {/* Row 2: Reservations Bar Chart + Booking by Platform Donut + Tasks Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 1. Reservations Bar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Reservations</h3>
            <button className="flex items-center space-x-1 text-xs font-bold text-[#1A1A1A] bg-[#D6E85A] hover:bg-[#cbe04a] px-3 py-1 rounded-full border border-lime-300 shadow-2xs transition-colors cursor-pointer">
              <span>Last 7 Days</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#D6E85A] border border-lime-300" />
              <span className="text-[#6B7280]">Booked</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#8FD9C4]" />
              <span className="text-[#6B7280]">Canceled</span>
            </div>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reservationsChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#6B7280" fontSize={10} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="booked" fill="#D6E85A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="canceled" fill="#8FD9C4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Booking by Platform Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Booking by Platform</h3>
            <button className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="relative h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
            {platformData.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                  <span className="text-[#6B7280] text-[11px] truncate font-medium">{p.name}</span>
                </div>
                <span className="font-['Poppins'] font-bold text-[#1A1A1A] text-[11px] font-mono ml-1">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Tasks Checklist Widget (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Tasks</h3>
            <button
              onClick={() => openModal('booking')}
              className="p-1 rounded-xl bg-[#D6E85A] text-[#1A1A1A] hover:bg-[#cbe04a] transition-colors border border-lime-300 cursor-pointer"
              title="Add Task"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-56 custom-scrollbar pr-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  task.completed
                    ? 'bg-[#EAF0EC] border-slate-200 opacity-60'
                    : 'bg-[#8FD9C4]/30 border-[#8FD9C4] hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <button className="mt-0.5 shrink-0 text-[#1A1A1A] cursor-pointer">
                    {task.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <Circle className="w-4 h-4 text-[#6B7280]" />}
                  </button>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#6B7280] font-mono block">{task.date}</span>
                    <p
                      className={`text-xs font-semibold leading-snug ${
                        task.completed ? 'line-through text-[#6B7280]' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Bookings Table & Quick Action Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-8 bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-sm font-bold text-[#1A1A1A]">Recent Booking Reservations</h3>
              <Link
                to="/reservations"
                className="text-xs font-bold text-[#1A1A1A] bg-[#D6E85A] hover:bg-[#cbe04a] px-3 py-1 rounded-full border border-lime-300 flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                    <th className="py-2.5 px-3">Booking ID</th>
                    <th className="py-2.5 px-3">Guest</th>
                    <th className="py-2.5 px-3">Room</th>
                    <th className="py-2.5 px-3">Check-In</th>
                    <th className="py-2.5 px-3">Check-Out</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#EAF0EC]/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#1A1A1A]">{b.id}</td>
                      <td className="py-3 px-3 font-semibold text-[#1A1A1A]">{b.guest}</td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D6E85A] text-[#1A1A1A] border border-lime-300">
                          {b.room}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#6B7280]">{b.checkIn}</td>
                      <td className="py-3 px-3 text-[#6B7280]">{b.checkOut || 'June 22, 2024'}</td>
                      <td className="py-3 px-3 text-right font-bold text-[#1A1A1A] font-mono">{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Action Interactive Buttons (4 cols) */}
        <div className="lg:col-span-4">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};
