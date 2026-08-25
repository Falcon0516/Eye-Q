'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import CanvasScrub, { CanvasScrubHandle } from '../demo/CanvasScrub';

gsap.registerPlugin(ScrollTrigger);

const GLASSES_FRAMES = 70;
const WATCH_FRAMES = 70;

export default function CinematicIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const glassesRef = useRef<CanvasScrubHandle>(null);
  const watchRef = useRef<CanvasScrubHandle>(null);

  const [act, setAct] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!sectionRef.current || !pinnedRef.current) return;

    if (prefersReducedMotion) {
      setAct(2);
      setProgress(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=400%',
      pin: pinnedRef.current,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        if (p < 0.33) {
          setAct(0);
          const frameProgress = p / 0.33;
          glassesRef.current?.scrubTo(Math.round(frameProgress * (GLASSES_FRAMES - 1)));
        } else if (p < 0.66) {
          setAct(1);
          const frameProgress = (p - 0.33) / 0.33;
          watchRef.current?.scrubTo(Math.round(frameProgress * (WATCH_FRAMES - 1)));
        } else {
          setAct(2);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  const scrollToDemo = () => {
    const el = document.querySelector('#live-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const act3Progress = Math.max(0, Math.min(1, (progress - 0.66) / 0.34));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-near-black"
      style={{ height: '500vh' }}
    >
      {/* Premium branded loader */}
      {!loaded && (
        <div className="fixed inset-0 z-[100] bg-near-black flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo mark */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border border-warm-white/20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" className="text-warm-white/60" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" className="text-warm-white/60" />
                </svg>
              </div>
            </div>
            <span className="font-headline text-caption text-warm-white/20 tracking-[0.3em] uppercase">Eye-Q</span>
          </motion.div>
        </div>
      )}

      <div ref={pinnedRef} className="w-full h-screen overflow-hidden relative">
        {/* Act 1: Glasses — full-bleed scrub */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: act === 0 ? 1 : 0 }}
        >
          <div className="w-full h-full">
            <CanvasScrub
              ref={glassesRef}
              sequence="glasses"
              frameCount={GLASSES_FRAMES}
              className="!aspect-auto w-full h-full !rounded-none"
            />
          </div>
          {/* Cinematic vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

          {/* Act 1 overlay text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-[12vh] pointer-events-none">
            <motion.div
              animate={{ opacity: act === 0 && progress < 0.22 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="font-headline text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-white/40">
                iQOO Hackathon 2026
              </p>
              <p className="font-headline font-bold text-subheadline text-warm-white/80 text-center max-w-[500px]">
                Clip it onto any glasses.
              </p>
              <p className="font-body text-body text-warm-white/40 text-center max-w-[400px]">
                Hands-free vision assistance for everyone.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Act 2: Watch — full-bleed scrub */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: act === 1 ? 1 : 0 }}
        >
          <div className="w-full h-full">
            <CanvasScrub
              ref={watchRef}
              sequence="watch"
              frameCount={WATCH_FRAMES}
              className="!aspect-auto w-full h-full !rounded-none"
            />
          </div>
          {/* Cinematic vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-[12vh] pointer-events-none">
            <motion.div
              animate={{ opacity: act === 1 && progress > 0.38 && progress < 0.58 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="font-headline font-bold text-subheadline text-warm-white/80 text-center max-w-[500px]">
                Or wear it on your wrist.
              </p>
              <p className="font-body text-body text-warm-white/40 text-center max-w-[400px]">
                Same brain, different form factor.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Act 3: Side-by-side reveal + phone hero + tagline + CTA */}
        <div
          className="absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center"
          style={{ opacity: act === 2 ? 1 : 0 }}
        >
          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-[0.04] bg-accent pointer-events-none" />

          <div className="w-full max-w-[1100px] mx-auto px-6 flex flex-col items-center">
            {/* Product trio */}
            <motion.div
              animate={{
                scale: act === 2 ? 1 : 0.85,
                opacity: act === 2 ? 1 : 0,
              }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-3 gap-4 md:gap-8 items-center mb-rhythm-lg w-full max-w-[900px]"
            >
              {/* Glasses final frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src="/sequences/glasses/glasses_070.jpg"
                  alt="Eye-Q glasses module"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Phone — center, larger */}
              <div className="relative flex justify-center">
                <motion.div
                  animate={{ y: act === 2 ? 0 : 30, opacity: act === 2 ? 1 : 0 }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="w-[120px] md:w-[180px] lg:w-[220px]"
                >
                  <Image
                    src="/phone-hero.png"
                    alt="iQOO 15"
                    width={440}
                    height={880}
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </motion.div>
              </div>

              {/* Watch final frame */}
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src="/sequences/watch/watch_070.jpg"
                  alt="Eye-Q wrist module"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.h1
              animate={{ opacity: act3Progress > 0.25 ? 1 : 0, y: act3Progress > 0.25 ? 0 : 25 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-headline font-bold text-hero tracking-headline leading-[1.05] text-center max-w-[800px] mb-rhythm-xs text-warm-white"
            >
              Your phone was always{' '}
              <span className="text-gradient-accent">smart enough.</span>
            </motion.h1>

            {/* Sub-line */}
            <motion.p
              animate={{ opacity: act3Progress > 0.4 ? 0.5 : 0 }}
              transition={{ duration: 0.5 }}
              className="font-body text-body-lg text-warm-white/50 text-center max-w-[460px] mb-rhythm-md"
            >
              One device. Real intelligence. Zero cloud.
            </motion.p>

            {/* CTA */}
            <motion.div
              animate={{ opacity: act3Progress > 0.55 ? 1 : 0, y: act3Progress > 0.55 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <button onClick={scrollToDemo} className="btn-primary">
                See it work
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <a href="https://youtu.be/9gwLNZzoLmQ" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Watch demo →
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint — visible at start only */}
        <motion.div
          animate={{ opacity: progress < 0.04 ? 1 : 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-caption text-warm-white/20 font-body tracking-widest uppercase">Scroll</span>
          <motion.svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="text-warm-white/20"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
