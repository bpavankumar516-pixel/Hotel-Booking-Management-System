import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Utensils,
  Shirt,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  Building2,
  Layers,
} from 'lucide-react';
import { toast } from 'react-toastify';

export const MaintenancePage = () => {
  // Active Maintenance Sub-Tab: 'housekeeping' | 'culinary' | 'facilities' | 'laundry' | 'security'
  const [activeTab, setActiveTab] = useState('housekeeping');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Dummy operational tasks for Housekeeping
  const [housekeepingTasks, setHousekeepingTasks] = useState([
    { id: 'HK-101', room: 'Suite #101', type: 'Deep Cleaning', assignedTo: 'Maria Garcia', status: 'In Progress', priority: 'High', time: '10:30 AM' },
    { id: 'HK-102', room: 'Room #204', type: 'Turn Down Service', assignedTo: 'John Doe', status: 'Pending', priority: 'Medium', time: '11:15 AM' },
    { id: 'HK-103', room: 'Suite #305', type: 'Sanitization & Linen', assignedTo: 'Anna Smith', status: 'Completed', priority: 'Low', time: '09:45 AM' },
    { id: 'HK-104', room: 'Room #412', type: 'Express Room Prep', assignedTo: 'Carlos Ruiz', status: 'In Progress', priority: 'High', time: '11:45 AM' },
  ]);

  // Dummy operational tasks for Kitchen & Dining
  const [kitchenTasks, setKitchenTasks] = useState([
    { id: 'KT-201', dept: 'Main Kitchen', item: 'Executive Breakfast Prep', supervisor: 'Chef Marco', status: 'Active Ops', time: '06:30 AM' },
    { id: 'KT-202', dept: 'Skyline Restaurant', item: 'Buffet Replenishment & Hygiene', supervisor: 'Chef Sarah', status: 'In Progress', time: '08:00 AM' },
    { id: 'KT-203', dept: 'Room Service Pantry', item: 'VIP In-Room Dining Order #882', supervisor: 'Pierre V.', status: 'Pending', time: '11:20 AM' },
  ]);

  // Dummy operational tasks for HVAC, Plumbing & Facilities
  const [facilityTasks, setFacilityTasks] = useState([
    { id: 'FC-301', location: 'Floor 3 East Wing', issue: 'AC Climate Control Inspection', tech: 'David Miller', status: 'In Progress', urgency: 'High' },
    { id: 'FC-302', location: 'Penthouse Suite 501', issue: 'Jacuzzi Plumbing Valve Service', tech: 'Robert Chen', status: 'Pending', urgency: 'Critical' },
    { id: 'FC-303', location: 'Main Lobby', issue: 'Lighting & Chandelier Replacement', tech: 'Alex Thorne', status: 'Completed', urgency: 'Medium' },
  ]);

  // Dummy operational tasks for Laundry & Linen
  const [laundryTasks, setLaundryTasks] = useState([
    { id: 'LD-401', batch: 'Batch #891', item: 'King Suite Bed Linens & Duvets', qty: '120 Sets', status: 'Washing & Steam', time: '09:00 AM' },
    { id: 'LD-402', batch: 'Batch #892', item: 'Spa & Swimming Pool Towels', qty: '250 Pcs', status: 'Folding & Stocking', time: '10:15 AM' },
  ]);

  // Dummy operational tasks for Security & Safety
  const [securityTasks, setSecurityTasks] = useState([
    { id: 'SC-501', zone: 'Perimeter & Parking B1', check: 'CCTV Camera Surveillance Audit', officer: 'Officer James', status: 'Passed' },
    { id: 'SC-502', zone: 'Emergency Exits (Floors 1-5)', check: 'Fire Alarm & Exit Light Inspection', officer: 'Officer Elena', status: 'In Progress' },
  ]);

  const handleCreateTask = () => {
    toast.info('New maintenance dispatch ticket created!');
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Module Title Bar matching GuestManagementPage & RoomBookingPage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">
            Maintenance & Hotel Operations Engine
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Centralized management for Housekeeping, Kitchen & Dining, Facilities HVAC/Plumbing, Laundry Linens, and Safety Ops.
          </p>
        </div>

        <button
          onClick={handleCreateTask}
          className="py-2.5 px-4 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Dispatch Ticket</span>
        </button>
      </div>

      {/* Hotel Operations Department Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('housekeeping');
            setSearchQuery('');
          }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'housekeeping'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span>Housekeeping & Cleaning ({housekeepingTasks.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('culinary');
            setSearchQuery('');
          }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'culinary'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Utensils className="w-4 h-4 text-[#C5A059]" />
          <span>Kitchen & Dining ({kitchenTasks.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('facilities');
            setSearchQuery('');
          }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'facilities'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Wrench className="w-4 h-4 text-[#C5A059]" />
          <span>Facilities & HVAC ({facilityTasks.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('laundry');
            setSearchQuery('');
          }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'laundry'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <Shirt className="w-4 h-4 text-[#C5A059]" />
          <span>Laundry & Linens ({laundryTasks.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('security');
            setSearchQuery('');
          }}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shrink-0 ${
            activeTab === 'security'
              ? 'bg-[#1E2B37] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#1E2B37] hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>Security & Safety ({securityTasks.length})</span>
        </button>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-[#F7F2E7] text-[#C5A059] flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Active Tasks</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">13 Dispatches</span>
            <span className="text-[11px] text-[#C5A059] font-semibold block mt-0.5">Across All Depts</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Completed Today</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">8 Tasks</span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Inspected & Verified</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">In Progress</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">4 Active</span>
            <span className="text-[11px] text-amber-600 font-semibold block mt-0.5">Staff On Duty</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">High Priority</span>
            <span className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">1 Urgent</span>
            <span className="text-[11px] text-rose-600 font-semibold block mt-0.5">Attention Required</span>
          </div>
        </div>
      </div>

      {/* TAB CONTENT: HOUSEKEEPING */}
      {activeTab === 'housekeeping' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Housekeeping & Room Turn-Down Ops
              </h3>
              <p className="text-xs text-slate-500 font-medium">Daily room cleaning schedules, bed linen replacement, and room inspection status.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search room or staff name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Ticket Ref</th>
                  <th className="py-3.5 px-4">Target Room</th>
                  <th className="py-3.5 px-4">Service Type</th>
                  <th className="py-3.5 px-4">Assigned Attendant</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Dispatch Time</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {housekeepingTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{t.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1E2B37]">{t.room}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{t.type}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{t.assignedTo}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{t.time}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        t.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : t.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: KITCHEN & DINING */}
      {activeTab === 'culinary' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Kitchen, Culinary & Dining Facilities
              </h3>
              <p className="text-xs text-slate-500 font-medium">Food preparation hygiene, room service pantry orders, and restaurant buffet schedules.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Log ID</th>
                  <th className="py-3.5 px-4">Facility / Kitchen</th>
                  <th className="py-3.5 px-4">Culinary Operation</th>
                  <th className="py-3.5 px-4">Head Supervisor</th>
                  <th className="py-3.5 px-4">Time Slot</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {kitchenTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{t.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1E2B37]">{t.dept}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold">{t.item}</td>
                    <td className="py-3.5 px-4 text-slate-800">{t.supervisor}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{t.time}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FACILITIES & HVAC */}
      {activeTab === 'facilities' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                HVAC, Plumbing & Electrical Maintenance
              </h3>
              <p className="text-xs text-slate-500 font-medium">Air conditioning climate maintenance, plumbing repairs, lighting, and elevator maintenance.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Dispatch Ref</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Maintenance Issue</th>
                  <th className="py-3.5 px-4">Lead Engineer</th>
                  <th className="py-3.5 px-4">Urgency</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {facilityTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{t.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1E2B37]">{t.location}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{t.issue}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{t.tech}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.urgency === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.urgency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LAUNDRY & LINEN */}
      {activeTab === 'laundry' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Laundry & Linen Supply Management
              </h3>
              <p className="text-xs text-slate-500 font-medium">Linen washing cycles, steam pressing, towel inventory, and guest laundry services.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Batch Ref</th>
                  <th className="py-3.5 px-4">Item Type</th>
                  <th className="py-3.5 px-4">Quantity</th>
                  <th className="py-3.5 px-4">Cycle Stage</th>
                  <th className="py-3.5 px-4">Started At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {laundryTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{t.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1E2B37]">{t.item}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{t.qty}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{t.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SECURITY & SAFETY */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Security, Fire & Facility Safety Ops
              </h3>
              <p className="text-xs text-slate-500 font-medium">CCTV perimeter security, fire safety equipment, access control fobs, and night patrols.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Security Log</th>
                  <th className="py-3.5 px-4">Facility Zone</th>
                  <th className="py-3.5 px-4">Safety Check Item</th>
                  <th className="py-3.5 px-4">Duty Officer</th>
                  <th className="py-3.5 px-4">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
                {securityTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{t.id}</td>
                    <td className="py-3.5 px-4 font-bold text-[#1E2B37]">{t.zone}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{t.check}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{t.officer}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
