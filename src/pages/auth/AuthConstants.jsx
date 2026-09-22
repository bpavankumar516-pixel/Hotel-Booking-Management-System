// Shared Constants & Theme Colors for Auth Pages (LoginPage, SignUpPage, ForgotPasswordPage)

export const AUTH_BACKGROUND_IMAGE = 
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1600';

export const BRAND_NAME = 'Hodelz';
export const BRAND_SUBTITLE = 'Hotel PMS';

// Hodelz Design System Palette
export const COLOR_NAVY_DARK = '#1E2B37';
export const COLOR_GOLD_ACCENT = '#C5A059';
export const COLOR_NEUTRAL_BG = '#F0F2F5';
export const COLOR_TEXT_DARK = '#1E2B37';
export const COLOR_TEXT_MUTED = '#64748B';

// Primary Button Classes
export const GOLD_BUTTON_CLASS =
  'w-full py-3.5 px-6 rounded-full font-extrabold text-sm text-white bg-[#C5A059] hover:bg-[#b08d48] active:scale-[0.98] shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 font-[\'Poppins\'] tracking-wide';

export const NAVY_BUTTON_CLASS =
  'w-full py-3.5 px-6 rounded-full font-bold text-sm text-white bg-[#1E2B37] hover:bg-slate-800 active:scale-[0.98] shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 font-[\'Poppins\'] tracking-wide';

export const LINK_ACCENT_CLASS =
  'font-extrabold text-[#1E2B37] hover:text-[#C5A059] transition-colors ml-1 cursor-pointer underline decoration-[#C5A059] decoration-2';

// SVG Curved Wave Divider Component for Desktop Split View
export const CurvedWaveDivider = () => (
  <div className="hidden md:block absolute top-0 bottom-0 left-[50%] -ml-12 w-24 h-full z-20 pointer-events-none overflow-hidden">
    <svg
      className="h-full w-full text-white fill-current"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0,0 C45,25 55,75 100,100 L100,0 Z" />
    </svg>
  </div>
);

// Mobile Top Curved Wave Divider Component
export const MobileWaveDivider = () => (
  <div className="md:hidden w-full h-12 -mt-6 relative z-20 pointer-events-none">
    <svg
      className="w-full h-full text-white fill-current"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0,0 C30,70 70,70 100,0 L100,100 L0,100 Z" />
    </svg>
  </div>
);
