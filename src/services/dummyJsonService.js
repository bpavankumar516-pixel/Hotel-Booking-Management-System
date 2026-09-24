import apiClient from './apiClient';
import { toast } from 'react-toastify';

/**
 * Fetch guest users from DummyJSON API (/users?limit=30) using Axios
 */
export const fetchDummyJsonUsers = async (limit = 30) => {
  try {
    const response = await apiClient.get(`/users?limit=${limit}`);
    const users = response.data?.users || [];

    // Map DummyJSON Users to Hotel Guest Schema
    const mappedGuests = users.map((u, index) => ({
      id: u.id || index + 100,
      fullName: `${u.firstName} ${u.lastName}`,
      email: u.email || `${u.firstName.toLowerCase()}.${u.lastName.toLowerCase()}@x.dummyjson.com`,
      mobile: u.phone || `+1 555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      idProof: `PASSPORT-${Math.floor(100000 + Math.random() * 900000)}`,
      nationality: u.address?.country || 'United States',
      address: u.address ? `${u.address.address}, ${u.address.city}, ${u.address.state}` : 'Resort Guest Suite',
      status: index % 3 === 0 ? 'Checked-In' : index % 3 === 1 ? 'Active' : 'Checked-Out',
      avatar: u.image || `https://dummyjson.com/icon/${u.username}/128`,
    }));

    return mappedGuests;
  } catch (error) {
    console.error('Error fetching users from DummyJSON API:', error);
    toast.warn('Could not connect to DummyJSON API. Loading cached local guest directory.');
    return [];
  }
};
