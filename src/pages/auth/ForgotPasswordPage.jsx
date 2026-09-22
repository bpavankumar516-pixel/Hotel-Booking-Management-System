import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Grid3X3, ArrowLeft, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import {
  AUTH_BACKGROUND_IMAGE,
  BRAND_NAME,
  BRAND_SUBTITLE,
  GOLD_BUTTON_CLASS,
  CurvedWaveDivider,
  MobileWaveDivider,
} from './AuthConstants';

export const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
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

        {/* Center Heading */}
        <div className="relative z-10 space-y-3 mt-auto pt-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Account Recovery Services</span>
          </div>
          <h1 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Reset Your<br /><span className="text-[#C5A059]">Password</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-sm font-medium">
            We'll send password recovery instructions directly to your email address.
          </p>
        </div>
      </div>

      {/* ORGANIC CURVED WAVE SVG DIVIDER */}
      <CurvedWaveDivider />
      <MobileWaveDivider />

      {/* RIGHT SIDE: White Panel with Centered Form */}
      <div className="w-full md:w-1/2 relative z-10 p-8 sm:p-12 md:p-20 bg-white flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md space-y-8 my-auto">
          <Link to="/login" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-[#1E2B37] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1 text-[#C5A059]" /> Back to Login
          </Link>

          <div>
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl font-extrabold text-[#1E2B37]">
              Forgot Password
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Enter your registered email address to receive reset instructions
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#F7F2E7] border border-amber-200 text-center space-y-3 shadow-xs">
              <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
              <h3 className="font-['Poppins'] font-extrabold text-[#1E2B37]">Instructions Sent!</h3>
              <p className="text-xs text-slate-600">
                Password reset instructions sent to <span className="font-mono font-bold text-[#1E2B37]">{email}</span>.
              </p>
              <Link
                to="/login"
                className="inline-block mt-2 py-3 px-6 rounded-full font-extrabold text-xs text-white bg-[#C5A059] shadow-md hover:bg-[#b08d48] transition-all"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs text-[#1E2B37] font-bold tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jaylon@lodgify.com"
                  className="w-full py-3 border-b-2 border-slate-200 text-sm text-[#1E2B37] placeholder-slate-400 focus:outline-none focus:border-[#C5A059] transition-colors font-medium bg-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={GOLD_BUTTON_CLASS}
              >
                <span>{loading ? 'Sending Request...' : 'Send Reset Link'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
