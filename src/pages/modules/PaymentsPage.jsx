import React, { useState } from 'react';
import { CreditCard, Download, Search, Filter, Printer, FileText, CheckCircle2, X } from 'lucide-react';

export const PaymentsPage = () => {
  const [payments, setPayments] = useState([
    { id: 'INV-9021', bookingId: 'LG-B00109', guest: 'Mitchel Johnson', room: '# No.301', amount: 535.5, date: '2026-09-20', status: 'Paid', method: 'Credit Card' },
    { id: 'INV-9022', bookingId: 'LG-B00105', guest: 'Robert Affleck', room: '# No.105', amount: 750.0, date: '2026-09-21', status: 'Paid', method: 'Debit Card' },
    { id: 'INV-9023', bookingId: 'LG-B00102', guest: 'Chris Hemsworth', room: '# No.402', amount: 420.0, date: '2026-09-22', status: 'Pending', method: 'Cash' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white uppercase">
              Module 07
            </span>
            <h2 className="font-['Poppins'] text-xl font-extrabold text-[#1E2B37]">Payments & Invoices</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Payment processing history, invoice generation, status filters, and guest receipt downloads.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by invoice ID, guest name or booking ID..."
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
            <option value="All">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500">
                <th className="py-3 px-4">Invoice ID</th>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Guest Name</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Invoice UI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#1E2B37]">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C5A059]">{p.id}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">{p.bookingId}</td>
                  <td className="py-3.5 px-4 font-['Poppins'] font-bold">{p.guest}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.method}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{p.date}</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-[#1E2B37]">${p.amount.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold text-white tracking-wider uppercase ${
                        p.status === 'Paid' ? 'bg-[#2ECC71]' : 'bg-[#E74C3C]'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(p)}
                      className="py-1.5 px-3 rounded bg-[#1E2B37] hover:bg-slate-800 text-white font-bold text-[11px] inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Generation & Print Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-['Poppins'] text-base font-extrabold text-[#1E2B37]">
                Official Guest Invoice ({selectedInvoice.id})
              </h3>
              <button onClick={() => setSelectedInvoice(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Print Layout */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <div>
                  <h4 className="font-['Poppins'] font-extrabold text-base text-[#1E2B37]">Hodelz PMS</h4>
                  <p className="text-[10px] text-slate-500">Luxury Hospitality & Suites</p>
                </div>
                <div className="text-right">
                  <p className="font-bold font-mono text-[#C5A059]">{selectedInvoice.id}</p>
                  <p className="text-[10px] text-slate-400">{selectedInvoice.date}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Billed To:</span>
                  <span className="font-bold text-[#1E2B37] block">{selectedInvoice.guest}</span>
                  <span className="text-slate-500 block">Room {selectedInvoice.room}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Payment Method:</span>
                  <span className="font-bold text-[#1E2B37] block">{selectedInvoice.method}</span>
                  <span className="text-emerald-600 font-extrabold block">{selectedInvoice.status}</span>
                </div>
              </div>

              <div className="border-t border-b border-slate-200 py-2 flex justify-between font-bold text-sm text-[#1E2B37]">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-[#C5A059]">${selectedInvoice.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-lg bg-[#C5A059] text-white font-bold text-xs hover:bg-[#b08d48] flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Invoice</span>
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="py-2.5 px-4 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
