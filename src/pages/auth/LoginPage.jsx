import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Grid3X3, Eye, EyeOff, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
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

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('pavan@grandhorizon.com');
  const [password, setPassword] = useState('pavan123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, rememberMe);
      toast.success(`Welcome back, Pavan! Logged in successfully.`);
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.message || 'Invalid credentials. Please try again.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const autoFillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    toast.info('Pavan Demo Credentials Loaded');
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

      {/* RIGHT SIDE: Clean Flat Normal Login Form (No Card Box Wrapper) */}
      <div className="w-full md:w-[34%] lg:w-[32%] ml-auto relative z-20 p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center min-h-screen md:pr-10 lg:pr-16">
        <div className="w-full max-w-sm space-y-7 my-auto">
          {/* Small Centered Logo with Glowing Ring at Top */}
          <div className="flex justify-center mb-1">
            <div className="w-14 h-14 rounded-full bg-[#1E2B37] border-2 border-[#C5A059] text-[#C5A059] flex items-center justify-center shadow-[0_0_25px_rgba(197,160,89,0.35)] ring-4 ring-[#C5A059]/10 transition-transform duration-300 hover:scale-105">
              <Grid3X3 className="w-7 h-7 text-[#C5A059]" />
            </div>
          </div>

          {/* Page Title: "Login" */}
          <div className="text-center space-y-1">
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-[#1E2B37] tracking-tight">
              Login
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Welcome back! Please sign in to access your admin portal</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center shadow-xs animate-shake">
              {error}
            </div>
          )}

          {/* Quick Demo Fill Buttons Bar with Icons */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">One-Click Demo Access</span>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Lock className="w-2.5 h-2.5 mr-1" /> Active Demo
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => autoFillDemo('pavan@grandhorizon.com', 'pavan123')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F7F2E7] hover:bg-amber-100/90 text-[#C5A059] font-extrabold text-xs border border-amber-300/70 transition-all duration-200 cursor-pointer text-center flex items-center justify-center space-x-1.5 shadow-2xs hover:shadow-xs active:scale-[0.98]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Admin Demo Auto-Fill (Pavan)</span>
              </button>
            </div>
          </div>

          {/* Form with Gold Focus Underline Inputs */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#1E2B37] font-extrabold tracking-wide block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pavan@grandhorizon.com"
                className="w-full py-3 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium bg-transparent"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs text-[#1E2B37] font-extrabold tracking-wide block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full py-3 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium pr-10 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1E2B37] cursor-pointer transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#1E2B37] focus:ring-[#C5A059] cursor-pointer accent-[#C5A059]"
                />
                <span className="text-slate-600 font-semibold">Remember me</span>
              </label>

              <Link to="/forgot-password" className="font-extrabold text-[#1E2B37] hover:text-[#C5A059] transition-colors hover:underline decoration-[#C5A059] decoration-2">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button: Gold Accent Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`${GOLD_BUTTON_CLASS} hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200`}
            >
              <span>{isLoading ? 'Signing In...' : 'Login'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-xs text-slate-500 pt-2">
            <span>Don't have an account? </span>
            <Link to="/signup" className={LINK_ACCENT_CLASS}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

