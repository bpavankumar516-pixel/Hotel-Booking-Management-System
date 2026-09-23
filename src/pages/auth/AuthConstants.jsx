// Shared Constants & Theme Colors for Auth Pages (LoginPage, SignUpPage, ForgotPasswordPage)

export const AUTH_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600";

export const AUTH_SECONDARY_HOTEL_IMAGE =
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800";

export const BRAND_NAME = "Grand Horizon";
export const BRAND_SUBTITLE = "Luxury Hotel & Resort PMS";

// Grand Horizon Design System Palette
export const COLOR_NAVY_DARK = "#1E2B37";
export const COLOR_GOLD_ACCENT = "#C5A059";
export const COLOR_NEUTRAL_BG = "#F0F2F5";
export const COLOR_TEXT_DARK = "#1E2B37";
export const COLOR_TEXT_MUTED = "#64748B";

// Primary Button Classes
export const GOLD_BUTTON_CLASS =
  "w-full py-3.5 px-6 rounded-full font-extrabold text-sm text-white bg-[#C5A059] hover:bg-[#b08d48] active:scale-[0.98] shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 font-['Poppins'] tracking-wide";

export const NAVY_BUTTON_CLASS =
  "w-full py-3.5 px-6 rounded-full font-bold text-sm text-white bg-[#1E2B37] hover:bg-slate-800 active:scale-[0.98] shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 font-['Poppins'] tracking-wide";

export const LINK_ACCENT_CLASS =
  "font-extrabold text-[#1E2B37] hover:text-[#C5A059] transition-colors ml-1 cursor-pointer underline decoration-[#C5A059] decoration-2";

// SVG Wave Clip Path Definition for 70% Screen Image Coverage with Organic Wave
export const OrganicWaveSvgDefs = () => (
  <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
    <defs>
      <clipPath id="referenceOrganicWaveClip" clipPathUnits="objectBoundingBox">
        <path d="M0,0 L0.88,0 C0.74,0.18 0.68,0.32 0.78,0.48 C0.94,0.68 0.98,0.82 0.80,1 L0,1 Z" />
      </clipPath>
    </defs>
  </svg>
);

// Decorative Organic Background Blobs (Disabled for clean white background)
export const DecorativeBackgroundBlobs = () => null;

// Hotel Related Quote Overlay for Image Panel
export const AuthImageQuoteOverlay = () => (
  <div className="absolute bottom-10 left-8 sm:bottom-14 sm:left-12 max-w-md z-20 space-y-2 pointer-events-none drop-shadow-md">
    <p className="font-['Playfair_Display',Georgia,serif] text-lg sm:text-2xl italic font-semibold text-white/95 leading-relaxed">
      “Experience luxury beyond expectations, tailored for timeless memories.”
    </p>
    <div className="flex items-center space-x-2 text-xs text-amber-300/90 font-medium tracking-wider uppercase">
      <span className="w-6 h-[2px] bg-amber-400 inline-block" />
      <span>Grand Horizon Resort</span>
    </div>
  </div>
);

// SVG Curved Wave Divider Component for Desktop Split View
export const CurvedWaveDivider = () => (
  <div className="hidden md:block absolute top-0 bottom-0 left-[50%] -ml-16 w-32 h-full z-20 pointer-events-none overflow-hidden">
    <svg
      className="h-full w-full text-slate-50/50 fill-current filter drop-shadow-[ -4px_0_12px_rgba(0,0,0,0.15) ]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0,0 C65,25 15,75 100,100 L100,0 Z" />
    </svg>
  </div>
);

// Mobile Top Curved Wave Divider Component
export const MobileWaveDivider = () => (
  <div className="md:hidden w-full h-14 -mt-7 relative z-20 pointer-events-none">
    <svg
      className="w-full h-full text-slate-50 fill-current filter drop-shadow-[0_-4px_8px_rgba(0,0,0,0.12)]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path d="M0,0 C30,70 70,70 100,0 L100,100 L0,100 Z" />
    </svg>
  </div>
);
