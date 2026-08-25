'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = 'default' | 'headline' | 'image';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  variant?: RevealVariant;
}

const variantConfig: Record<RevealVariant, { y: number; scale: number; duration: number }> = {
  default:  { y: 35,  scale: 1,    duration: 1.0 },
  headline: { y: 12,  scale: 1,    duration: 0.7 },
  image:    { y: 0,   scale: 0.97, duration: 0.9 },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration,
  once = true,
  variant = 'default',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    const cfg = variantConfig[variant];
    const dur = duration ?? cfg.duration;

    gsap.set(el, {
      opacity: 0,
      y: cfg.y,
      scale: cfg.scale,
    });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: dur,
      delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        end: 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, duration, once, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
