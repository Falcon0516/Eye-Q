import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple-grade monochrome system
        'near-black': '#000000',
        'graphite': '#1d1d1f',
        'graphite-light': '#2d2d2f',
        'silver': '#86868b',
        'silver-light': '#a1a1a6',
        'warm-white': '#f5f5f7',
        
        // Single restrained accent — used like Apple uses blue
        'accent': '#2997ff',
        'accent-light': '#64b5f6',
        'teal': '#2997ff',
        'teal-light': '#64b5f6',
        'dark-teal': '#0a1628',
        'amber': '#bf5af2',
        
        // Surface & Glassmorphism tokens
        'surface-elevated': '#161617',
        'surface-glass': 'rgba(0, 0, 0, 0.72)',
        'border-subtle': 'rgba(245, 245, 247, 0.06)',
        'border-hover': 'rgba(245, 245, 247, 0.15)',
      },
      fontFamily: {
        headline: ['var(--font-headline)', "'Space Grotesk'", 'sans-serif'],
        body: ['var(--font-body)', "'Inter'", 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(48px, 6vw, 96px)',
        'section': 'clamp(36px, 4.2vw, 72px)',
        'subheadline': 'clamp(19px, 2vw, 28px)',
        'eyebrow': 'clamp(11px, 0.8vw, 13px)',
        'body-lg': 'clamp(17px, 1.3vw, 21px)',
        'body': 'clamp(15px, 1.05vw, 17px)',
        'body-sm': '14px',
        'caption': '12px',
      },
      spacing: {
        'section': 'clamp(120px, 14vw, 200px)',
        'section-sm': 'clamp(80px, 10vw, 140px)',
        'container-px': 'clamp(24px, 5vw, 80px)',
        'rhythm-xs': '16px',
        'rhythm-sm': '24px',
        'rhythm-md': '40px',
        'rhythm-lg': '64px',
        'rhythm-xl': '96px',
        'rhythm-2xl': '160px',
      },
      letterSpacing: {
        'eyebrow': '0.2em',
        'headline': '-0.03em',
      },
      maxWidth: {
        'container': '1280px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      boxShadow: {
        'product': '0 30px 80px rgba(0, 0, 0, 0.7)',
        'glow': '0 0 80px rgba(41, 151, 255, 0.08)',
        'glow-white': '0 0 60px rgba(245, 245, 247, 0.04)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'draw-line': 'draw-line 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
