'use client';

import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: '300px' }}>
      {/* Phone frame with realistic bezel and shadow */}
      <div className="relative rounded-[46px] border-[6px] border-[#222224] bg-near-black overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        {/* Dynamic Island style notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[26px] bg-black rounded-full shadow-[inset_0_-1px_1px_rgba(255,255,255,0.2)] flex items-center justify-end px-3">
          {/* Camera lens reflection */}
          <div className="w-[10px] h-[10px] rounded-full bg-[#111111] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]" />
        </div>
        
        {/* Screen content */}
        <div className="relative w-full aspect-[9/19.5] overflow-hidden bg-[#050505]">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[120px] h-[5px] rounded-full bg-warm-white/40" />
      </div>
      
      {/* Side buttons */}
      <div className="absolute top-[120px] -left-[2px] w-[2px] h-[32px] bg-[#333333] rounded-l-sm" />
      <div className="absolute top-[170px] -left-[2px] w-[2px] h-[48px] bg-[#333333] rounded-l-sm" />
      <div className="absolute top-[230px] -left-[2px] w-[2px] h-[48px] bg-[#333333] rounded-l-sm" />
      <div className="absolute top-[180px] -right-[2px] w-[2px] h-[72px] bg-[#333333] rounded-r-sm" />
    </div>
  );
}
