'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasScrub, { CanvasScrubHandle } from '../demo/CanvasScrub';
import ScrollReveal from '../ScrollReveal';
import ParticleField from '../ParticleField';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'phone' | 'glasses' | 'watch'>('phone');
  const glassesScrubRef = useRef<CanvasScrubHandle>(null);
  const watchScrubRef = useRef<CanvasScrubHandle>(null);

  // Auto slow-rotation preview on hover or tab switch
  useEffect(() => {
    if (activeTab === 'glasses') {
      let f = 0;
      const interval = setInterval(() => {
        f = (f + 1) % 70;
        glassesScrubRef.current?.scrubTo(f);
      }, 70);
      return () => clearInterval(interval);
    } else if (activeTab === 'watch') {
      let f = 0;
      const interval = setInterval(() => {
        f = (f + 1) % 70;
        watchScrubRef.current?.scrubTo(f);
      }, 70);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen pt-32 pb-20 bg-near-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(36,168,131,0.4) 0%, rgba(15,47,43,0.15) 50%, transparent 80%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-near-black/60 to-near-black" />
      </div>

      <ParticleField className="z-[1]" opacity={0.12} particleCount={40} spread={20} />

      <div className="relative z-10 section-container text-center flex flex-col items-center">
        {/* Eyebrow */}
        <ScrollReveal variant="headline">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 mb-rhythm-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="eyebrow tracking-widest text-[11px]">iQOO HACKATHON 2026 · PHONE-FIRST AI</span>
          </div>
        </ScrollReveal>

        {/* Hero Title */}
        <ScrollReveal delay={0.1} variant="headline">
          <h1 className="font-headline font-bold text-hero tracking-headline leading-[1.04] max-w-[950px] mb-rhythm-sm text-warm-white">
            Your phone was always{' '}
            <span className="text-gradient-accent">smart enough.</span>
          </h1>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal delay={0.2}>
          <p className="font-body text-subheadline text-warm-white/60 max-w-[620px] mb-rhythm-md leading-relaxed">
            Eye-Q turns the phone in your hand into an autonomous real-time intelligence hub.
            Zero cloud latency. 100% on-device privacy.
          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-rhythm-lg">
            <button onClick={() => scrollToSection('#live-demo')} className="btn-primary">
              See Live Demo
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            <button onClick={() => scrollToSection('#problem')} className="btn-secondary">
              Why Phone-First?
            </button>
          </div>
        </ScrollReveal>

        {/* Interactive Hardware Showcase Stage */}
        <ScrollReveal delay={0.4} variant="image" className="w-full max-w-[1000px]">
          <div className="glass rounded-3xl p-6 md:p-8 shadow-product border border-warm-white/10 relative overflow-hidden">
            {/* Stage Selector Tabs */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[
                { id: 'phone', label: 'iQOO 15 Core Engine' },
                { id: 'glasses', label: 'Smart Glasses Clip' },
                { id: 'watch', label: 'Smart Wristband' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'phone' | 'glasses' | 'watch')}
                  className={`px-4 py-2 rounded-full font-headline text-body-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-warm-white text-near-black font-semibold shadow-md'
                      : 'text-warm-white/60 hover:text-warm-white bg-warm-white/5 hover:bg-warm-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Stage Visual */}
            <div className="relative w-full min-h-[380px] md:min-h-[460px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'phone' && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative w-[260px] md:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src="/phone-hero.png"
                        alt="iQOO 15 Flagship"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-headline font-semibold text-body text-warm-white">Snapdragon 8 Elite · Neural Engine</p>
                      <p className="font-body text-caption text-warm-white/50">All perception, OCR, and AI pipelines run on-device at 60 FPS.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'glasses' && (
                  <motion.div
                    key="glasses"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[620px] flex flex-col items-center"
                  >
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-warm-white/5">
                      <CanvasScrub
                        ref={glassesScrubRef}
                        sequence="glasses"
                        frameCount={70}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-headline font-semibold text-body text-warm-white">Universal Glasses Mount (360° Studio View)</p>
                      <p className="font-body text-caption text-warm-white/50">Lightweight clip-on sensor for hands-free scene navigation.</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'watch' && (
                  <motion.div
                    key="watch"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[620px] flex flex-col items-center"
                  >
                    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-warm-white/5">
                      <CanvasScrub
                        ref={watchScrubRef}
                        sequence="watch"
                        frameCount={70}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-headline font-semibold text-body text-warm-white">Wrist Mount Configuration (360° Studio View)</p>
                      <p className="font-body text-caption text-warm-white/50">Haptic feedback & directional sensor module for tactile assistance.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
