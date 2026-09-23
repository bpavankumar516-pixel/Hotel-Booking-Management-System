import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Grid3X3, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import {
  AUTH_BACKGROUND_IMAGE,
  BRAND_NAME,
  BRAND_SUBTITLE,
  GOLD_BUTTON_CLASS,
  OrganicWaveSvgDefs,
  DecorativeBackgroundBlobs,
  AuthImageQuoteOverlay,
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
      toast.success(`Password reset instructions sent to ${email}`);
    } catch (err) {
      const errMsg = err.message || 'Something went wrong.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
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

      {/* RIGHT SIDE: Cardless Flat Clean Forgot Password Form */}
      <div className="w-full md:w-[34%] lg:w-[32%] ml-auto relative z-20 p-6 sm:p-10 md:p-12 flex flex-col justify-center items-center min-h-screen md:pr-10 lg:pr-16">
        <div className="w-full max-w-sm space-y-8 my-auto">
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
                  placeholder="pavan@grandhorizon.com"
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
