import React from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AvailableRoomsSection = () => {
  const { availableRoomsList } = useHotel();

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs space-y-4 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Available Rooms</h3>
          <p className="text-[10px] text-slate-400 font-medium">Real-time room readiness</p>
        </div>
        <Link
          to="/rooms"
          className="text-[10px] font-bold text-[#C5A059] hover:underline flex items-center space-x-0.5"
        >
          <span>View All Rooms</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Grid of 5 Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 my-auto">
        {availableRoomsList.map((room) => (
          <div
            key={room.id}
            className="bg-slate-50/60 border border-slate-200/80 rounded-lg overflow-hidden shadow-2xs hover:shadow-md transition-all group"
          >
            {/* Room Image */}
            <div className="h-28 w-full overflow-hidden relative">
              <img
                src={room.image}
                alt={room.number}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Room Details & Price Tag */}
            <div className="p-2.5 flex items-center justify-between bg-white border-t border-slate-100">
              <div>
                <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] block leading-tight">{room.number}</span>
                <span className="text-[10px] font-medium text-slate-500 block leading-tight mt-0.5">{room.type}</span>
              </div>
              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-[#C5A059] text-white shadow-2xs">
                {room.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
