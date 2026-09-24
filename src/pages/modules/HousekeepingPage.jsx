import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Wrench,
  AlertTriangle,
  UserCheck,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

export const HousekeepingPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, roomNumber: '# No.102', type: 'Grand Deluxe King', status: 'Needs Cleaning', housekeeper: 'Maria Garcia', priority: 'High' },
    { id: 2, roomNumber: '# No.202', type: 'A/c Royal Double', status: 'Inspecting', housekeeper: 'John Smith', priority: 'Medium' },
    { id: 3, roomNumber: '# No.302', type: 'A/c Queen Garden', status: 'Maintenance', housekeeper: 'Carlos Diaz', priority: 'Urgent' },
    { id: 4, roomNumber: '# No.101', type: 'Presidential Suite', status: 'Clean & Ready', housekeeper: 'Ana Lopez', priority: 'Normal' },
    { id: 5, roomNumber: '# No.301', type: 'Luxury Horizon Villa', status: 'Clean & Ready', housekeeper: 'Maria Garcia', priority: 'Normal' },
  ]);

  const handleUpdateStatus = (id, newStatus) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    toast.success(`Room status updated to "${newStatus}"!`);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">
            Housekeeping & Room Readiness
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor room sanitation status, assign housekeeping staff, and mark rooms ready for check-in.
          </p>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">{task.roomNumber}</h4>
                <span className="text-xs text-slate-500">{task.type}</span>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  task.status === 'Clean & Ready'
                    ? 'bg-emerald-100 text-emerald-800'
                    : task.status === 'Needs Cleaning'
                    ? 'bg-amber-100 text-amber-800'
                    : task.status === 'Inspecting'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {task.status}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between items-center">
              <span>Staff: <strong>{task.housekeeper}</strong></span>
              <span className="text-slate-400 font-mono">Priority: {task.priority}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
              <button
                onClick={() => handleUpdateStatus(task.id, 'Clean & Ready')}
                className="py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] cursor-pointer"
              >
                Mark Clean & Ready
              </button>
              <button
                onClick={() => handleUpdateStatus(task.id, 'Needs Cleaning')}
                className="py-2 rounded bg-amber-500 hover:bg-amber-600 text-white text-[11px] cursor-pointer"
              >
                Mark Dirty / Cleaning
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
