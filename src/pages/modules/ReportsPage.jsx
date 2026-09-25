import React, { useState } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  BedDouble,
  Users,
  Calendar,
  Download,
  Printer,
  Filter,
  PieChart as PieIcon,
  BarChart3,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard,
  Building2,
  FileText,
  Percent,
  Globe,
} from 'lucide-react';
import { toast } from 'react-toastify';

export const ReportsPage = () => {
  const { reservations = [], rooms = [], guests = [], revenueData = [], reservationsChartData = [] } = useHotel();

  // Filters State
  const [timeRange, setTimeRange] = useState('All Time');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Dynamic Financial & Operational Metrics
  const paidReservations = reservations.filter((r) => r.paymentStatus === 'Paid');
  const totalPaidRevenue = paidReservations.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
  const pendingRevenue = reservations
    .filter((r) => r.paymentStatus === 'Pending')
    .reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);

  const occupiedRoomsCount = rooms.filter((r) => r.status === 'Occupied').length;
  const totalRoomsCount = rooms.length || 1;
  const occupancyRatePercent = Math.round((occupiedRoomsCount / totalRoomsCount) * 100);

  const averageDailyRate = paidReservations.length > 0 ? Math.round(totalPaidRevenue / paidReservations.length) : 0;
  const activeInHouseGuestsCount = guests.filter((g) => g.status === 'Checked-In' || g.status === 'Active').length;

  // Filtered Revenue Chart Data based on timeRange
  const displayRevenueData = React.useMemo(() => {
    if (timeRange === 'This Month') {
      return revenueData.slice(-2);
    } else if (timeRange === 'This Quarter') {
      return revenueData.slice(-4);
    }
    return revenueData;
  }, [revenueData, timeRange]);

  // Compute Reservation Status Distribution for Pie Chart
  const statusCounts = reservations.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const statusPieData = [
    { name: 'Confirmed', value: statusCounts['Confirmed'] || 0, color: '#C5A059' },
    { name: 'Checked-In', value: statusCounts['Checked-In'] || 0, color: '#10B981' },
    { name: 'Completed', value: statusCounts['Completed'] || 0, color: '#3B82F6' },
    { name: 'Cancelled', value: statusCounts['Cancelled'] || 0, color: '#EF4444' },
  ].filter((d) => d.value > 0);

  // Compute Payment Method Distribution for Pie Chart
  const methodCounts = reservations.reduce((acc, r, idx) => {
    const methods = ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash'];
    const method = r.method || methods[idx % methods.length];
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const methodPieData = [
    { name: 'Credit Card', value: methodCounts['Credit Card'] || 0, color: '#1E2B37' },
    { name: 'Debit Card', value: methodCounts['Debit Card'] || 0, color: '#C5A059' },
    { name: 'Bank Transfer', value: methodCounts['Bank Transfer'] || 0, color: '#3B82F6' },
    { name: 'Cash', value: methodCounts['Cash'] || 0, color: '#10B981' },
  ].filter((d) => d.value > 0);

  // Compute Room Type Performance Summary Breakdown
  const roomTypesList = Array.from(new Set(rooms.map((r) => r.type)));
  const roomTypeMetrics = roomTypesList.map((type) => {
    const matchingRooms = rooms.filter((r) => r.type === type);
    const matchingRes = reservations.filter(
      (r) => r.roomType === type || matchingRooms.some((rm) => rm.number === r.roomNumber)
    );
    const totalRev = matchingRes.reduce((sum, r) => sum + (Number(r.totalAmount) || 0), 0);
    const occupiedCount = matchingRooms.filter((r) => r.status === 'Occupied').length;

    return {
      type,
      totalRooms: matchingRooms.length,
      occupiedRooms: occupiedCount,
      availableRooms: matchingRooms.length - occupiedCount,
      bookingsCount: matchingRes.length,
      revenue: totalRev,
      occupancyPercent: Math.round((occupiedCount / (matchingRooms.length || 1)) * 100),
    };
  });

  // Filtered Room Type metrics for table & bar charts
  const filteredRoomTypeMetrics = roomTypeMetrics.filter((m) => {
    if (categoryFilter === 'All') return true;
    return m.type.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  // Export CSV Report
  const handleExportReportCSV = () => {
    const headers = ['Room Category', 'Total Units', 'Occupied Units', 'Occupancy Rate (%)', 'Total Bookings', 'Total Revenue ($)'];
    const rows = roomTypeMetrics.map((m) => [
      `"${m.type}"`,
      m.totalRooms,
      m.occupiedRooms,
      `${m.occupancyPercent}%`,
      m.bookingsCount,
      m.revenue.toFixed(2),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `grand_horizon_executive_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Exported Executive Business Intelligence Report to CSV!');
  };

  // Print Report View
  const handlePrintReport = () => {
    window.print();
    toast.info('Sent executive report layout to printer / PDF viewer.');
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1E2B37] text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <p className="font-bold text-[#C5A059] border-b border-slate-700/60 pb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300">{entry.name}:</span>
              <strong className="font-mono text-white">
                {typeof entry.value === 'number' && entry.name.toLowerCase().includes('revenue')
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value}
              </strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Title Bar & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-50 text-[#C5A059]">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="font-['Poppins'] text-2xl font-extrabold text-[#1E2B37]">
              Executive Reports & Business Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time resort performance analytics, dynamic revenue trends, room category yield, and booking distribution.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handlePrintReport}
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#1E2B37] font-bold text-xs inline-flex items-center space-x-2 cursor-pointer transition-colors shadow-2xs"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportReportCSV}
            className="py-2.5 px-4 rounded-xl bg-[#C5A059] hover:bg-[#b08d48] text-white font-bold text-xs inline-flex items-center space-x-2 cursor-pointer transition-colors shadow-md shadow-amber-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Dynamic Data Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-[#C5A059]" />
          <span>Interactive Report Filter Engine</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Time Range Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
            >
              <option value="All Time">All Time Analytics</option>
              <option value="This Month">Current Month</option>
              <option value="This Quarter">Current Quarter</option>
              <option value="Year to Date">Year to Date (YTD)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E2B37] focus:outline-none focus:border-[#C5A059]"
            >
              <option value="All">All Room Categories</option>
              <option value="Presidential">Presidential Suite</option>
              <option value="Deluxe">Deluxe Suite</option>
              <option value="Penthouse">Penthouse Suite</option>
              <option value="Standard">Standard Room</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Dynamic Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Paid Revenue Card */}
        <div className="bg-[#1E2B37] text-white p-5 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Settled Revenue</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-[#C5A059] mt-1">
                ${totalPaidRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-[#2B3A4A] text-[#C5A059]">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-300 mt-3 flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>${pendingRevenue.toLocaleString()} Pending collections</span>
          </p>
        </div>

        {/* Live Occupancy Rate Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Resort Occupancy Rate</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-blue-600 mt-1">
                {occupancyRatePercent}%
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <BedDouble className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-medium">
            {occupiedRoomsCount} of {totalRoomsCount} Suites currently occupied
          </p>
        </div>

        {/* Average Daily Rate Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Folio Rate (ADR)</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-emerald-600 mt-1">
                ${averageDailyRate.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-medium">Per confirmed reservation folio</p>
        </div>

        {/* Active Guests In-House Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Guests In-House</p>
              <h3 className="font-['Poppins'] text-2xl font-black text-amber-600 mt-1">
                {activeInHouseGuestsCount} <span className="text-xs font-semibold text-slate-400">Guests</span>
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 font-medium">Verified active checked-in profiles</p>
        </div>
      </div>

      {/* Grid Layout of Dynamic BI Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Monthly Revenue Curve */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37]">Monthly Revenue Performance Curve</h3>
              <p className="text-xs text-slate-400">Dynamic financial revenue timeline ({timeRange})</p>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-50 text-[#C5A059] border border-amber-200 uppercase font-mono">
              Financial Trend
            </span>
          </div>

          <div className="min-h-[300px] h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={displayRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="repRevGradFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A059" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#C5A059" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Gross Revenue"
                  stroke="#C5A059"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#repRevGradFull)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Weekly Booking Demand */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37]">Weekly Booking Demand & Stays</h3>
              <p className="text-xs text-slate-400">Confirmed vs cancelled stay volume</p>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 uppercase font-mono">
              Weekly Volume
            </span>
          </div>

          <div className="min-h-[300px] h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reservationsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="booked" name="Confirmed Bookings" fill="#1E2B37" radius={[6, 6, 0, 0]} />
                <Bar dataKey="canceled" name="Cancelled Stays" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Room Category Inventory vs Occupied Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37]">Category Inventory Breakdown</h3>
              <p className="text-xs text-slate-400">Occupied vs available room units by category</p>
            </div>
            <BedDouble className="w-4 h-4 text-[#C5A059]" />
          </div>

          <div className="min-h-[300px] h-[300px] w-full pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredRoomTypeMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="type" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="occupiedRooms" name="Occupied Units" fill="#C5A059" radius={[6, 6, 0, 0]} />
                <Bar dataKey="availableRooms" name="Available Vacant Units" fill="#94A3B8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Reservation Lifecycle & Status Share Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37]">Reservation Status & Stay Share</h3>
              <p className="text-xs text-slate-400">Lifecycle breakdown across Confirmed, Checked-In, Completed & Cancelled</p>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-amber-50 text-[#C5A059] border border-amber-200 font-mono">
              {reservations.length} Bookings
            </span>
          </div>

          <div className="min-h-[300px] h-[300px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={
                    [
                      { name: 'Confirmed', value: statusCounts['Confirmed'] || 0, color: '#C5A059' },
                      { name: 'Checked-In', value: statusCounts['Checked-In'] || 0, color: '#10B981' },
                      { name: 'Completed', value: statusCounts['Completed'] || 0, color: '#3B82F6' },
                      { name: 'Cancelled', value: statusCounts['Cancelled'] || 0, color: '#EF4444' },
                    ]
                  }
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    { name: 'Confirmed', value: statusCounts['Confirmed'] || 0, color: '#C5A059' },
                    { name: 'Checked-In', value: statusCounts['Checked-In'] || 0, color: '#10B981' },
                    { name: 'Completed', value: statusCounts['Completed'] || 0, color: '#3B82F6' },
                    { name: 'Cancelled', value: statusCounts['Cancelled'] || 0, color: '#EF4444' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Badge */}
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-['Poppins'] text-2xl font-black text-[#1E2B37] leading-none">
                {reservations.length}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                Stays
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Type Yield Performance Executive Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-['Poppins'] font-bold text-sm text-[#1E2B37]">
              Room Category Yield & Revenue Performance ({filteredRoomTypeMetrics.length})
            </h3>
            <p className="text-xs text-slate-400">Granular performance by room category and occupancy yield</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Updated Real-Time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                <th className="py-3.5 px-4">Room Category</th>
                <th className="py-3.5 px-4 text-center">Total Inventory</th>
                <th className="py-3.5 px-4 text-center">Occupied Units</th>
                <th className="py-3.5 px-4 text-center">Category Occupancy %</th>
                <th className="py-3.5 px-4 text-center">Bookings Count</th>
                <th className="py-3.5 px-4 text-right">Total Revenue ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
              {filteredRoomTypeMetrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#1E2B37] flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                    <span>{m.type}</span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-600">{m.totalRooms} Units</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-blue-600">{m.occupiedRooms} Units</td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                        m.occupancyPercent >= 70
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.occupancyPercent >= 40
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {m.occupancyPercent}% Occupied
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-700">{m.bookingsCount}</td>
                  <td className="py-4 px-4 text-right font-mono font-extrabold text-[#C5A059] text-sm">
                    ${m.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
