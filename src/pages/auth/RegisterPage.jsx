import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Grid3X3, Eye, EyeOff } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'Admin', // Default Single Role
        hotelName: 'Lodgify Hotel PMS', // Default Hotel System Name
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EAF0EC] p-6 text-[#1A1A1A]">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-[#1A1A1A] text-white rounded-2xl">
              <Grid3X3 className="w-8 h-8" />
            </div>
          </div>
          <h2 className="font-['Poppins'] text-3xl font-bold tracking-tight text-[#1A1A1A]">Register Account</h2>
          <p className="text-xs text-[#6B7280]">Join Lodgify Hotel Operations System</p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jaylon Dorwart"
              className="w-full px-4 py-3 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#D6E85A] focus:bg-white text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="jaylon@lodgify.com"
              className="w-full px-4 py-3 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#D6E85A] focus:bg-white text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#D6E85A] focus:bg-white pr-12 text-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A1A]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-2xl bg-[#EAF0EC]/60 border border-slate-200 text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#D6E85A] focus:bg-white text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl font-bold text-[#1A1A1A] bg-[#D6E85A] hover:bg-[#cbe04a] border border-lime-300 shadow-xs transition-all disabled:opacity-50 text-xs"
          >
            {isLoading ? 'Creating Account...' : 'Register Account'}
          </button>

          <div className="text-center text-xs text-[#6B7280] pt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#1A1A1A] hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
