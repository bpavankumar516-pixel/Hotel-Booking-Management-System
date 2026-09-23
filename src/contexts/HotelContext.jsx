import React, { createContext, useContext, useState } from 'react';

const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    availableRooms: 35,
    todayCheckout: 8,
    cancellations: 12,
    enquiries: 82,
    pendingPayments: 7,

    newBookings: 840,
    newBookingsGrowth: '+ 8.70%',
    checkIn: 231,
    checkInGrowth: '+ 3.56%',
    checkOut: 124,
    checkOutGrowth: '- 1.06%',
    totalRevenue: '$123,980',
    totalRevenueGrowth: '+ 5.70%',
    
    roomAvailability: {
      occupied: 286,
      reserved: 87,
      available: 32,
      notReady: 13,
      total: 418,
    },

    rating: {
      score: '4.6',
      totalReviews: '2546',
      status: 'Impressive',
      facilities: 4.4,
      cleanliness: 4.7,
      services: 4.6,
      comfort: 4.8,
      location: 4.5,
    },
  });

  // Booking Status Area Chart Data matching the "Hodelz" reference image (Jan - Oct)
  const [bookingStatusChartData] = useState([
    { month: 'Jan', Bookings: 25, Enquiries: 35 },
    { month: 'Feb', Bookings: 45, Enquiries: 65 },
    { month: 'Mar', Bookings: 75, Enquiries: 45 },
    { month: 'Apr', Bookings: 35, Enquiries: 55 },
    { month: 'May', Bookings: 85, Enquiries: 80 },
    { month: 'Jun', Bookings: 55, Enquiries: 40 },
    { month: 'Jul', Bookings: 95, Enquiries: 65 },
    { month: 'Aug', Bookings: 65, Enquiries: 85 },
    { month: 'Sep', Bookings: 40, Enquiries: 50 },
    { month: 'Oct', Bookings: 80, Enquiries: 60 },
  ]);

  // Recent Enquiries matching reference image
  const [recentEnquiries] = useState([
    { id: 1, name: 'Micheal M', tag: 'BOOKINGS', tagColor: '#1E2B37', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    { id: 2, name: 'Peterson K', tag: 'AMENITIES', tagColor: '#2563EB', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150' },
    { id: 3, name: 'Johnson T', tag: 'PAYMENTS', tagColor: '#1E2B37', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { id: 4, name: 'Albert G', tag: 'CHECKOUT', tagColor: '#2563EB', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 5, name: 'Thomas R', tag: 'PAYMENTS', tagColor: '#1E2B37', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150' },
    { id: 6, name: 'Hendry W', tag: 'CANCELLATION', tagColor: '#DC2626', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
  ]);

  // Available Rooms Grid matching reference image
  const [availableRoomsList] = useState([
    { id: 1, number: '# No.301', type: 'A/c King', price: '$29/day', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=500' },
    { id: 2, number: '# No.105', type: 'A/c Queen', price: '$35/day', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=500' },
    { id: 3, number: '# No.402', type: 'A/c Double', price: '$25/day', image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=500' },
    { id: 4, number: '# No.281', type: 'A/c King', price: '$29/day', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=500' },
    { id: 5, number: '# No.321', type: 'A/c King', price: '$27/day', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=500' },
  ]);

  // Booking Details Table Rows matching reference image
  const [bookingDetailsList] = useState([
    {
      id: 1,
      bookingDate: '14.02.2020',
      customer: 'Mitchel Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      persons: '2 adults x 1 Child',
      phone: '+99 256 896 8855',
      checkIn: '15-02-2020 11:00am',
      checkOut: '16-02-2020 12:00pm',
      status: 'Received',
    },
    {
      id: 2,
      bookingDate: '16.02.2020',
      customer: 'Robert Affleck',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      persons: '2 adults x 2 Childs',
      phone: '+81 569 854 8866',
      checkIn: '17-02-2020 09:00am',
      checkOut: '19-02-2020 11:00am',
      status: 'Received',
    },
    {
      id: 3,
      bookingDate: '15.02.2020',
      customer: 'Chris Hemsworth',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      persons: '2 adults',
      phone: '+92 745 856 1144',
      checkIn: '17-02-2020 10:00am',
      checkOut: '18-02-2020 11:00am',
      status: 'Pending',
    },
  ]);

  const [revenueData] = useState([
    { month: 'Dec 2027', revenue: 220000 },
    { month: 'Jan 2028', revenue: 250000 },
    { month: 'Feb 2028', revenue: 315060 },
    { month: 'Mar 2028', revenue: 210000 },
    { month: 'Apr 2028', revenue: 290000 },
    { month: 'May 2028', revenue: 270000 },
  ]);

  const [reservationsChartData] = useState([
    { day: 'Mon', booked: 85, canceled: 12 },
    { day: 'Tue', booked: 92, canceled: 8 },
    { day: 'Wed', booked: 78, canceled: 15 },
    { day: 'Thu', booked: 95, canceled: 6 },
    { day: 'Fri', booked: 110, canceled: 10 },
    { day: 'Sat', booked: 125, canceled: 5 },
    { day: 'Sun', booked: 105, canceled: 9 },
  ]);

  const [platformData] = useState([
    { name: 'Direct Booking', value: 61, color: '#C5A059' },
    { name: 'Booking.com', value: 12, color: '#1E2B37' },
    { name: 'Airbnb', value: 18, color: '#2563EB' },
    { name: 'Agoda', value: 9, color: '#10B981' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, date: 'June 19, 2028', title: 'Set Up Conference Room B for 10 AM Meeting', completed: false, category: 'event' },
    { id: 2, date: 'June 19, 2028', title: 'Restock Housekeeping Supplies on 3rd Floor', completed: true, category: 'housekeeping' },
    { id: 3, date: 'June 20, 2028', title: 'Inspect and Clean the Pool Area', completed: false, category: 'maintenance' },
  ]);

  const [recentBookings, setRecentBookings] = useState([
    { id: 'GH-B00109', guest: 'Angus Copper', room: 'Deluxe 101', checkIn: 'June 19, 2024', checkOut: 'June 22, 2024', status: 'Deluxe', amount: '$535.50' },
    { id: 'GH-B00105', guest: 'Catherine Ross', room: 'Suite 305', checkIn: 'March 20, 2028', checkOut: 'March 23, 2028', status: 'Suite', amount: '$750.00' },
    { id: 'GH-B00102', guest: 'Edgar Irving', room: 'Standard 202', checkIn: 'June 19, 2028', checkOut: 'June 24, 2028', status: 'Pending', amount: '$420.00' },
  ]);

  const [notifications] = useState([
    { id: 1, title: 'New Booking', desc: 'Angus Copper booked Deluxe 101', time: '10m ago', read: false },
    { id: 2, title: 'Payment Confirmed', desc: '$535.50 received for GH-B00109', time: '25m ago', read: false },
    { id: 3, title: 'Housekeeping Alert', desc: 'Restock Housekeeping Supplies on 3rd Floor', time: '1h ago', read: false },
    { id: 4, title: 'Task Completed', desc: 'Room 204 cleaned & inspected', time: '2h ago', read: false },
  ]);

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addBooking = (newBooking) => {
    setRecentBookings((prev) => [newBooking, ...prev]);
  };

  const addGuest = () => {
    setMetrics((prev) => ({
      ...prev,
      enquiries: prev.enquiries + 1,
    }));
  };

  const addRoom = () => {
    setMetrics((prev) => ({
      ...prev,
      availableRooms: prev.availableRooms + 1,
    }));
  };

  return (
    <HotelContext.Provider
      value={{
        metrics,
        bookingStatusChartData,
        recentEnquiries,
        availableRoomsList,
        bookingDetailsList,
        revenueData,
        reservationsChartData,
        platformData,
        tasks,
        recentBookings,
        notifications,
        activeModal,
        openModal,
        closeModal,
        toggleTask,
        addBooking,
        addGuest,
        addRoom,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
