import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Grid3X3, Eye, EyeOff, UserCheck, ArrowRight, Sparkles, ShieldCheck, Star, Building2, Lock } from 'lucide-react';
import {
  AUTH_BACKGROUND_IMAGE,
  BRAND_NAME,
  BRAND_SUBTITLE,
  GOLD_BUTTON_CLASS,
  LINK_ACCENT_CLASS,
  CurvedWaveDivider,
  MobileWaveDivider,
} from './AuthConstants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('jaylon@lodgify.com');
  const [password, setPassword] = useState('password123');
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
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const autoFillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen w-full bg-white font-sans overflow-x-hidden relative flex flex-col md:flex-row">
      {/* LEFT SIDE: Full-Height Edge-to-Edge Media Panel (Hodelz Theme) */}
      <div className="w-full md:w-1/2 relative p-8 sm:p-12 md:p-16 flex flex-col justify-between text-white overflow-hidden bg-[#1E2B37] min-h-[420px] md:min-h-screen">
        {/* Ocean Background Image with Sailboat silhouette & warm horizon glow */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${AUTH_BACKGROUND_IMAGE}')` }}
        />

        {/* Ambient Warm Gold & Deep Slate Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2B37]/50 via-[#1E2B37]/75 to-[#17222C]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(197,160,89,0.22),_transparent_55%)] pointer-events-none" />

        {/* Top-Left Brand Logo: Circular icon + brand name */}
        <div className="relative z-10 flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-full bg-[#C5A059] text-white flex items-center justify-center shadow-lg shadow-[#C5A059]/20 border border-amber-300/60 ring-2 ring-amber-400/20">
            <Grid3X3 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-['Poppins'] text-xl font-extrabold tracking-tight text-white block leading-tight">{BRAND_NAME}</span>
            <span className="text-xs text-[#C5A059] tracking-wider font-bold block leading-tight">{BRAND_SUBTITLE}</span>
          </div>
        </div>

        {/* Overlaid Bottom-Left Heading + Glassmorphism Badge */}
        <div className="relative z-10 space-y-5 mt-auto pt-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#C5A059]/25 border border-[#C5A059]/40 text-amber-200 text-xs font-bold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Enterprise Hotel PMS Platform</span>
          </div>

          <h1 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Let's go to<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E8C570] to-[#C5A059] bg-clip-text text-transparent">
              a new journey
            </span>
          </h1>

          {/* Glassmorphic Stats Strip */}
          <div className="pt-2">
            <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center justify-between shadow-xl max-w-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#C5A059]/30 text-[#C5A059] flex items-center justify-center border border-[#C5A059]/40">
                  <Building2 className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-1">
                    <span>500+ Luxury Properties</span>
                  </div>
                  <div className="text-[11px] text-slate-300 flex items-center space-x-1 mt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-amber-300">4.9 / 5.0</span>
                    <span className="text-slate-400">• Verified Hospitality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ORGANIC CURVED WAVE SVG DIVIDER */}
      <CurvedWaveDivider />
      <MobileWaveDivider />

      {/* RIGHT SIDE: White Panel with Centered Login Form */}
      <div className="w-full md:w-1/2 relative z-10 p-8 sm:p-12 md:p-20 bg-gradient-to-br from-white via-slate-50/40 to-amber-50/15 flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md space-y-7 my-auto">
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
                onClick={() => autoFillDemo('jaylon@lodgify.com', 'password123')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#F7F2E7] hover:bg-amber-100/90 text-[#C5A059] font-extrabold text-xs border border-amber-300/70 transition-all duration-200 cursor-pointer text-center flex items-center justify-center space-x-1.5 shadow-2xs hover:shadow-xs active:scale-[0.98]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Admin Demo Auto-Fill</span>
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
                placeholder="jaylon@lodgify.com"
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

