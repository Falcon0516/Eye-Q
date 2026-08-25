'use client';

import ScrollReveal from '../ScrollReveal';
import { IconWifiOff, IconEye, IconTranslate } from '../icons';

const usps = [
  {
    icon: IconWifiOff,
    title: 'Fully offline.',
    body: 'Every core feature — scene description, OCR, translation, voice commands, accessibility — works with zero internet connection.',
  },
  {
    icon: IconEye,
    title: 'Dual-persona accessibility, same hardware.',
    body: 'Blind/low-vision narration with hazard alerts. Hard-of-hearing live captioning. One device, two modes, identical software.',
  },
  {
    icon: IconTranslate,
    title: "Built for the host city\u2019s own language.",
    body: 'English↔Kannada translation, on-device, spoken back in real time. Designed for Bengaluru, useful everywhere.',
  },
];

export default function USP() {
  return (
    <section id="usp" className="relative w-full py-section bg-near-black overflow-hidden">
      {/* Editorial section number */}
      <div className="absolute top-rhythm-xl left-container-px pointer-events-none select-none">
        <span className="font-headline font-bold text-[180px] md:text-[240px] leading-none text-warm-white/[0.015] tracking-tighter">
          02
        </span>
      </div>

      <div className="section-container">
        <div className="section-divider mb-rhythm-xl" />

        <ScrollReveal variant="headline">
          <p className="eyebrow mb-rhythm-xl text-center">WHAT SETS EYE-Q APART</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-[1100px] mx-auto">
          {usps.map((usp, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className={`p-8 md:p-10 space-y-rhythm-sm ${
                i < usps.length - 1 ? 'md:border-r md:border-warm-white/[0.04]' : ''
              }`}>
                <usp.icon size={22} className="text-warm-white/30 mb-rhythm-xs" />
                <h3 className="font-headline font-bold text-subheadline tracking-tight text-warm-white leading-snug">
                  {usp.title}
                </h3>
                <p className="font-body text-body text-warm-white/35 leading-[1.7]">
                  {usp.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
