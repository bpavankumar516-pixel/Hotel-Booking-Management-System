import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Grid3X3, Eye, EyeOff, ArrowRight } from 'lucide-react';
import {
  AUTH_BACKGROUND_IMAGE,
  BRAND_NAME,
  BRAND_SUBTITLE,
  GOLD_BUTTON_CLASS,
  LINK_ACCENT_CLASS,
  OrganicWaveSvgDefs,
  DecorativeBackgroundBlobs,
  AuthImageQuoteOverlay,
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
      const msg = 'Password must be at least 6 characters long.';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match. Please re-enter matching passwords.';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: name,
        email: email,
        password: password,
        role: 'Admin',
        hotelName: 'Grand Horizon Luxury Resort & Hotel',
      });
      toast.success(`Account created successfully! Welcome to Grand Horizon, ${name}.`);
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.message || 'Registration failed. Please try again.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans overflow-x-hidden relative flex flex-col md:flex-row items-center justify-between">
      {/* SVG ClipPath Definition & Decorative Background Blobs */}
      <OrganicWaveSvgDefs />
      <DecorativeBackgroundBlobs />

      {/* TOP-LEFT BRAND LOGO */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-30 flex items-center space-x-3.5">
        <div className="w-11 h-11 rounded-full bg-[#C5A059] text-white flex items-center justify-center shadow-lg shadow-[#C5A059]/30 border border-amber-300/80 ring-2 ring-amber-400/30">
          <Grid3X3 className="w-6 h-6" />
        </div>
        <div>
          <span className="font-['Poppins'] text-xl font-extrabold tracking-tight text-white block leading-tight shadow-xs">{BRAND_NAME}</span>
          <span className="text-xs text-amber-300 tracking-wider font-bold block leading-tight">{BRAND_SUBTITLE}</span>
        </div>
      </div>

      {/* LEFT SIDE: 70% Screen Width Organic Wave Luxury Hotel Resort Image Panel */}
      <div className="w-full md:w-[72%] lg:w-[70%] relative md:absolute inset-y-0 left-0 text-white overflow-hidden bg-[#1E2B37] min-h-[380px] md:min-h-screen shadow-2xl z-10 [clip-path:none] md:[clip-path:url(#referenceOrganicWaveClip)] transition-all duration-300">
        {/* Vibrant Luxury Resort Pool & Hotel Architecture Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-105 saturate-[1.25] transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url('${AUTH_BACKGROUND_IMAGE}')` }}
        />

        {/* Subtle Light Gradient Overlay (Preserving Vibrant Hotel Colors) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2B37]/50 via-transparent to-[#1E2B37]/45" />

        {/* Simple Elegant Hotel Quote Overlay */}
        <AuthImageQuoteOverlay />
      </div>

      <MobileWaveDivider />

      {/* RIGHT SIDE: Lightly Visible Soft Glassmorphic Sign Up Card */}
      <div className="w-full md:w-[36%] lg:w-[34%] ml-auto relative z-20 p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center min-h-screen md:pr-10 lg:pr-16">
        <div className="w-full max-w-md space-y-6 my-auto bg-white/75 backdrop-blur-md p-8 sm:p-9 rounded-3xl border border-white/80 shadow-xl shadow-slate-200/50">
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
                placeholder="Pavan"
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
                placeholder="pavan@grandhorizon.com"
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
