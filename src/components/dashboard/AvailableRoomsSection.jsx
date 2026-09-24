import React, { useRef } from 'react';
import { useHotel } from '../../contexts/HotelContext';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AvailableRoomsSection = () => {
  const { availableRoomsList } = useHotel();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="font-['Poppins'] text-sm font-bold text-[#1E2B37]">Available Rooms</h3>
            <p className="text-[10px] text-slate-400 font-medium">Real-time room readiness</p>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#C5A059] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
            {availableRoomsList.length} Available
          </span>
        </div>

        {/* User-Friendly Controls: Left/Right Scroll Arrows + View All */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 border-r border-slate-200 pr-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#1E2B37] hover:text-white text-slate-600 transition-colors cursor-pointer"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#1E2B37] hover:text-white text-slate-600 transition-colors cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/rooms"
            className="text-[11px] font-bold text-[#C5A059] hover:underline flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Horizontal Scrollable Container showing 4 cards in viewport (Hidden Scrollbar) */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 pt-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {availableRoomsList.map((room) => (
          <div
            key={room.id}
            onClick={() => navigate(`/rooms/${room.id}`)}
            className="min-w-[240px] max-w-[260px] flex-1 shrink-0 bg-slate-50/60 border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            {/* Room Image */}
            <div className="h-32 w-full overflow-hidden relative">
              <img
                src={room.image}
                alt={room.number}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 shadow-2xs">
                ${room.price}/night
              </span>
            </div>

            {/* Room Details & Highlighted Amenities */}
            <div className="p-3 bg-white border-t border-slate-100 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="font-['Poppins'] text-xs font-bold text-[#1E2B37] group-hover:text-[#C5A059] transition-colors block leading-tight">
                  {room.number}
                </span>
                <span className="text-[10px] font-medium text-slate-500 block leading-tight mt-0.5">
                  {room.type}
                </span>
              </div>

              {/* Highlighted Amenities Tags */}
              <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100">
                {(room.amenities ? room.amenities.split(',') : ['Free WiFi', 'Ocean View']).slice(0, 2).map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-50 text-[#1E2B37] border border-amber-200/80 flex items-center space-x-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#C5A059] shrink-0" />
                    <span className="truncate max-w-[90px]">{amenity.trim()}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
