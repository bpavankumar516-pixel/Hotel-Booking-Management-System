import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Grid3X3, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import {
  AUTH_BACKGROUND_IMAGE,
  BRAND_NAME,
  BRAND_SUBTITLE,
  GOLD_BUTTON_CLASS,
  LINK_ACCENT_CLASS,
  CurvedWaveDivider,
  MobileWaveDivider,
} from './AuthConstants';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter matching passwords.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: name,
        email: email,
        password: password,
        role: 'Admin',
        hotelName: 'Hodelz Hotel PMS',
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans overflow-x-hidden relative flex flex-col md:flex-row">
      {/* LEFT SIDE: Full-Height Edge-to-Edge Media Panel (Hodelz Theme) */}
      <div className="w-full md:w-1/2 relative p-8 sm:p-12 md:p-16 flex flex-col justify-between text-white overflow-hidden bg-[#1E2B37] min-h-[360px] md:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${AUTH_BACKGROUND_IMAGE}')` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2B37]/40 via-[#1E2B37]/65 to-[#17222C]/95" />

        {/* Top-Left Brand Logo */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-11 h-11 rounded-full bg-[#C5A059] text-white flex items-center justify-center shadow-lg border border-amber-300">
            <Grid3X3 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-['Poppins'] text-xl font-extrabold tracking-tight text-white block leading-tight">{BRAND_NAME}</span>
            <span className="text-xs text-[#C5A059] tracking-wider font-bold block leading-tight">{BRAND_SUBTITLE}</span>
          </div>
        </div>

        {/* Overlaid Bottom-Left Heading */}
        <div className="relative z-10 space-y-3 mt-auto pt-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Hodelz Hotel PMS</span>
          </div>
          <h1 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Let's go to<br /><span className="text-[#C5A059]">a new journey</span>
          </h1>
        </div>
      </div>

      {/* ORGANIC CURVED WAVE SVG DIVIDER */}
      <CurvedWaveDivider />
      <MobileWaveDivider />

      {/* RIGHT SIDE: White Panel with Centered Form */}
      <div className="w-full md:w-1/2 relative z-10 p-8 sm:p-12 md:p-20 bg-white flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md space-y-7 my-auto">
          {/* Small Centered Logo at Top */}
          <div className="flex justify-center mb-1">
            <div className="w-14 h-14 rounded-full bg-[#1E2B37] border-2 border-[#C5A059] text-[#C5A059] flex items-center justify-center shadow-lg">
              <Grid3X3 className="w-7 h-7" />
            </div>
          </div>

          {/* Page Title: "Sign Up" */}
          <div className="text-center space-y-1">
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-[#1E2B37]">
              Sign Up
            </h2>
            <p className="text-xs text-slate-500 font-medium">Create your admin account to manage your property</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center shadow-2xs">
              {error}
            </div>
          )}

          {/* Underline-Style Input Fields: Name, Email, Password, Confirm Password */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-xs text-[#1E2B37] font-bold tracking-wide">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jaylon Dorwart"
                className="w-full py-2.5 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium bg-transparent"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs text-[#1E2B37] font-bold tracking-wide">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jaylon@lodgify.com"
                className="w-full py-2.5 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium bg-transparent"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs text-[#1E2B37] font-bold tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full py-2.5 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium pr-10 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1E2B37] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label className="text-xs text-[#1E2B37] font-bold tracking-wide">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full py-2.5 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium pr-10 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1E2B37] cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={GOLD_BUTTON_CLASS}
            >
              <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-500 pt-1">
            <span>Already have an account?</span>
            <Link to="/login" className={LINK_ACCENT_CLASS}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
