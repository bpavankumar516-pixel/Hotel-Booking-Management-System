import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RefreshCw, AlertTriangle, Filter, Search } from 'lucide-react';

export const HousekeepingPage = () => {
  const [housekeepingRooms, setHousekeepingRooms] = useState([
    { id: 101, room: '# No.301', type: 'A/c King', floor: 'Floor 3', status: 'Clean', assignedTo: 'Maria Garcia', lastCleaned: 'Today 09:30 AM' },
    { id: 102, room: '# No.105', type: 'A/c Queen', floor: 'Floor 1', status: 'Needs Cleaning', assignedTo: 'Elena Rostova', lastCleaned: 'Yesterday 04:00 PM' },
    { id: 103, room: '# No.402', type: 'A/c Double', floor: 'Floor 4', status: 'In Progress', assignedTo: 'John Doe', lastCleaned: 'Today 10:15 AM' },
    { id: 104, room: '# No.281', type: 'A/c King', floor: 'Floor 2', status: 'Clean', assignedTo: 'Maria Garcia', lastCleaned: 'Today 08:00 AM' },
    { id: 105, room: '# No.321', type: 'A/c King', floor: 'Floor 3', status: 'Needs Cleaning', assignedTo: 'Elena Rostova', lastCleaned: 'Yesterday 06:00 PM' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredRooms = housekeepingRooms.filter((r) => {
    const matchesSearch = r.room.toLowerCase().includes(searchQuery.toLowerCase()) || r.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleCleanStatus = (id) => {
    setHousekeepingRooms(
      housekeepingRooms.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Clean' ? 'Needs Cleaning' : r.status === 'Needs Cleaning' ? 'In Progress' : 'Clean';
          return { ...r, status: nextStatus, lastCleaned: 'Just now' };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Operations
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Housekeeping & Room Readiness</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Monitor room cleaning status, housekeeping staff assignments, and room inspection queues.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search room number or staff member..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Cleaning Statuses</option>
            <option value="Clean">Clean</option>
            <option value="Needs Cleaning">Needs Cleaning</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Grid of Housekeeping Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((r) => (
          <div key={r.id} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-['Poppins'] text-sm font-extrabold text-[#1E2B37]">{r.room}</span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded text-white ${
                    r.status === 'Clean' ? 'bg-[#2ECC71]' : r.status === 'Needs Cleaning' ? 'bg-[#E74C3C]' : 'bg-amber-500'
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <p><span className="font-semibold text-slate-700">Type:</span> {r.type} ({r.floor})</p>
                <p><span className="font-semibold text-slate-700">Assigned Staff:</span> {r.assignedTo}</p>
                <p><span className="font-semibold text-slate-700">Last Inspection:</span> {r.lastCleaned}</p>
              </div>
            </div>

            <button
              onClick={() => toggleCleanStatus(r.id)}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1E2B37] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Cycle Cleaning Status</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
