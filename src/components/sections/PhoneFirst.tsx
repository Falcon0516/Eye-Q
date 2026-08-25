'use client';

import Image from 'next/image';
import ScrollReveal from '../ScrollReveal';

export default function PhoneFirst() {
  return (
    <section id="phone-first" className="relative w-full py-section overflow-hidden">
      {/* Background with subtle gradient shift */}
      <div className="absolute inset-0 z-0 bg-near-black">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(29,29,31,0.6) 0%, transparent 60%)' }}
        />
      </div>

      {/* Editorial section number */}
      <div className="absolute top-rhythm-xl right-container-px pointer-events-none select-none z-[1]">
        <span className="font-headline font-bold text-[180px] md:text-[240px] leading-none text-warm-white/[0.015] tracking-tighter">
          03
        </span>
      </div>

      <div className="section-container relative z-10">
        <div className="section-divider mb-rhythm-xl" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-rhythm-lg lg:gap-rhythm-xl items-center">
          {/* Copy */}
          <div>
            <ScrollReveal variant="headline">
              <p className="eyebrow mb-rhythm-sm">PHONE-FIRST ARCHITECTURE</p>
            </ScrollReveal>

            <ScrollReveal delay={0.15} variant="headline">
              <h2 className="font-headline font-bold text-section tracking-headline leading-[1.08] text-warm-white mb-rhythm-md">
                Everything happens on the device in your hand.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-rhythm-sm">
                <p className="font-body text-body-lg text-warm-white/45 leading-[1.7]">
                  On-device NPU for real-time inference. ML Kit for vision, OCR,
                  and translation. Android STT/TTS for voice — all running locally
                  on the iQOO 15.
                </p>
                <p className="font-body text-body-lg text-warm-white/45 leading-[1.7]">
                  Zero cloud dependency for the core experience. Your data stays on
                  your phone, your features work everywhere.
                </p>
              </div>
            </ScrollReveal>

            {/* Spec badges */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-3 mt-rhythm-md">
                {['Snapdragon 8 Elite', '60 FPS NPU', 'On-Device ML Kit', 'Zero Latency'].map((spec) => (
                  <span key={spec} className="px-4 py-1.5 rounded-full border border-warm-white/[0.06] text-caption text-warm-white/30 font-headline font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Phone image with floating animation */}
          <ScrollReveal delay={0.2} variant="image">
            <div className="relative flex justify-center">
              <div className="relative w-[280px] md:w-[320px] lg:w-[360px] animate-float">
                <Image
                  src="/phone-hero.png"
                  alt="iQOO 15 — all computation happens here"
                  width={720}
                  height={900}
                  className="w-full h-auto drop-shadow-2xl"
                />
                {/* Static subtle ambient glow behind phone */}
                <div className="absolute -inset-12 -z-10"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(245,245,247,0.02) 0%, transparent 70%)' }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
