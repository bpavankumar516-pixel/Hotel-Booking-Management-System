import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { CheckCircle2, Circle, Plus, Star } from 'lucide-react';

export const AnalyticsAndTasksSection = () => {
  const { metrics, platformData, tasks, toggleTask, openModal } = useHotel();
  const { rating } = metrics;

  const ratingBars = [
    { label: 'Facilities', score: rating.facilities },
    { label: 'Cleanliness', score: rating.cleanliness },
    { label: 'Services', score: rating.services },
    { label: 'Comfort', score: rating.comfort },
    { label: 'Location', score: rating.location },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
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

      {/* 2. Booking by Platform Donut Chart Card (4 cols) */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Booking by Platform</h3>
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
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
          {platformData.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                <span className="text-slate-500 text-[11px] truncate font-medium">{p.name}</span>
              </div>
              <span className="font-['Poppins'] font-bold text-[#1E2B37] text-[11px] font-mono ml-1">{p.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tasks Checklist Widget Card (4 cols) */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Operational Tasks</h3>
          <button
            onClick={() => openModal('booking')}
            className="p-1 rounded bg-[#C5A059] text-white hover:bg-[#b08d48] transition-colors cursor-pointer"
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
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                task.completed
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-[#F7F2E7]/60 border-amber-200/80 hover:border-[#C5A059]'
              }`}
            >
              <div className="flex items-start space-x-2.5">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
