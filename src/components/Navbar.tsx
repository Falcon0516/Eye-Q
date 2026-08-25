'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Problem', href: 'problem' },
  { label: 'Demo', href: 'live-demo' },
  { label: 'USPs', href: 'usp' },
  { label: 'Architecture', href: 'phone-first' },
  { label: 'Team', href: 'team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-warm-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-[48px]">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded-full bg-warm-white/[0.06] border border-warm-white/[0.08] flex items-center justify-center group-hover:bg-warm-white/10 transition-all duration-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" className="text-warm-white/60" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
              <circle cx="12" cy="12" r="2" fill="currentColor" className="text-warm-white/60" />
            </svg>
          </div>
          <span className="font-headline font-semibold text-body-sm text-warm-white/90 tracking-tight">
            Eye-Q
          </span>
        </a>

        {/* Desktop Links — Apple-style compact nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className={`relative font-body text-caption tracking-wide transition-colors duration-300 ${
                activeSection === link.href
                  ? 'text-warm-white'
                  : 'text-warm-white/50 hover:text-warm-white/80'
              }`}
            >
              {link.label}
              {/* Animated underline indicator */}
              <span
                className={`absolute -bottom-1 left-0 right-0 h-[1px] bg-warm-white transition-all duration-400 ${
                  activeSection === link.href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`w-[18px] h-[1.5px] bg-warm-white/70 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`w-[18px] h-[1.5px] bg-warm-white/70 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-2xl border-t border-warm-white/[0.04]">
          <div className="section-container py-rhythm-md flex flex-col gap-rhythm-sm">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`font-body text-body text-left transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-warm-white'
                    : 'text-warm-white/40 hover:text-warm-white/70'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
