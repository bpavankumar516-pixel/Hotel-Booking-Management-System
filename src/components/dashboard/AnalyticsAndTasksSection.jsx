import React, { useState } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { CheckCircle2, Circle, Plus, Star, X, Trash2 } from 'lucide-react';

export const AnalyticsAndTasksSection = () => {
  const { metrics, reservations = [], tasks, toggleTask, addTask, deleteTask } = useHotel();
  const { rating } = metrics;

  // Compute dynamic reservation status breakdown
  const statusCounts = reservations.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const totalResCount = reservations.length || 1;

  const reservationStatusData = [
    { name: 'Confirmed', count: statusCounts['Confirmed'] || 0, percent: Math.round(((statusCounts['Confirmed'] || 0) / totalResCount) * 100), color: '#C5A059' },
    { name: 'Checked-In', count: statusCounts['Checked-In'] || 0, percent: Math.round(((statusCounts['Checked-In'] || 0) / totalResCount) * 100), color: '#10B981' },
    { name: 'Completed', count: statusCounts['Completed'] || 0, percent: Math.round(((statusCounts['Completed'] || 0) / totalResCount) * 100), color: '#3B82F6' },
    { name: 'Cancelled', count: statusCounts['Cancelled'] || 0, percent: Math.round(((statusCounts['Cancelled'] || 0) / totalResCount) * 100), color: '#EF4444' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    category: 'housekeeping',
    date: '2026-09-25',
  });

  const ratingBars = [
    { label: 'Facilities', score: rating.facilities },
    { label: 'Cleanliness', score: rating.cleanliness },
    { label: 'Services', score: rating.services },
    { label: 'Comfort', score: rating.comfort },
    { label: 'Location', score: rating.location },
  ];

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;
    addTask({
      title: taskForm.title.trim(),
      category: taskForm.category,
      date: taskForm.date,
    });
    setTaskForm({ title: '', category: 'housekeeping', date: '2026-09-25' });
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch relative">
      {/* 1. Overall Rating Card (4 cols) */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Overall Rating</h3>
          <div className="flex items-center space-x-1 text-[#C5A059]">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37]">{rating.score}</span>
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="font-['Poppins'] text-3xl font-extrabold text-[#1E2B37]">{rating.score}</span>
          <span className="text-xs text-slate-400 font-semibold">/ 5</span>
          <div className="pl-3 border-l border-slate-200">
            <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] block">{rating.status}</span>
            <span className="text-[10px] text-slate-400 font-medium">from {rating.totalReviews} reviews</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2.5 text-xs">
          {ratingBars.map((bar, idx) => (
            <div key={idx} className="flex items-center justify-between space-x-2">
              <span className="text-[11px] text-slate-500 font-medium w-20 shrink-0">{bar.label}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C5A059] rounded-full"
                  style={{ width: `${(bar.score / 5) * 100}%` }}
                />
              </div>
              <span className="font-['Poppins'] text-[11px] font-bold text-[#1E2B37] w-6 text-right font-mono">{bar.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Reservation Status Share Donut Chart Card (4 cols) */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div>
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Reservation Status Share</h3>
            <p className="text-[10px] text-slate-400 font-medium">Proportional stay lifecycle distribution</p>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-50 text-[#C5A059] border border-amber-200 font-mono">
            {reservations.length} Bookings
          </span>
        </div>

        <div className="relative min-h-[180px] h-[180px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={reservationStatusData}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={70}
                paddingAngle={4}
                dataKey="count"
              >
                {reservationStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1E2B37', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(val, name) => [`${val} Bookings`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Donut Ring Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-['Poppins'] text-lg font-black text-[#1E2B37] leading-none">
              {reservations.length}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
              Stays
            </span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
          {reservationStatusData.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg border border-slate-100 bg-slate-50/80">
              <div className="flex items-center space-x-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-[#1E2B37] text-[11px] truncate font-bold">{p.name}</span>
              </div>
              <span className="font-['Poppins'] font-extrabold text-[#1E2B37] text-[11px] font-mono ml-1">
                {p.count} <span className="text-[9px] text-slate-400 font-normal">({p.percent}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Operational Tasks Checklist Widget Card (4 cols) */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Operational Tasks</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-1.5 rounded-lg bg-[#C5A059] text-white hover:bg-[#b08d48] transition-colors cursor-pointer shadow-xs flex items-center space-x-1 text-xs font-bold"
            title="Add New Operational Task"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>

        <div className="space-y-2.5 overflow-y-auto max-h-56 custom-scrollbar pr-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border transition-all flex items-start justify-between group ${
                task.completed
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-[#F7F2E7]/60 border-amber-200/80 hover:border-[#C5A059]'
              }`}
            >
              <div
                onClick={() => toggleTask(task.id)}
                className="flex items-start space-x-2.5 flex-1 cursor-pointer"
              >
                <button className="mt-0.5 shrink-0 cursor-pointer">
                  {task.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Circle className="w-4 h-4 text-slate-400" />}
                </button>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 font-mono block">{task.date}</span>
                  <p
                    className={`text-xs font-semibold leading-snug ${
                      task.completed ? 'line-through text-slate-400' : 'text-[#1E2B37]'
                    }`}
                  >
                    {task.title}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="text-slate-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0 ml-1"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Add New Operational Task
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Task Description / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="e.g. Inspect & Clean Conference Room A..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Task Category</label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="housekeeping">Housekeeping</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="event">Event / Catering</option>
                    <option value="frontdesk">Front Desk</option>
                    <option value="general">General Operational</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={taskForm.date}
                    onChange={(e) => setTaskForm({ ...taskForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold cursor-pointer shadow-xs"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

