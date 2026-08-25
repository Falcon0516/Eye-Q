'use client';

import ScrollReveal from '../ScrollReveal';
import { IconInfo } from '../icons';

export default function OfflineFirst() {
  return (
    <section id="offline" className="relative w-full py-section bg-near-black overflow-hidden">
      {/* Large background icon — Apple editorial style */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 pointer-events-none select-none opacity-[0.015]">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-warm-white">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" />
          <path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0122.56 9" />
          <path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
          <path d="M8.53 16.11a6 6 0 016.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      </div>

      <div className="section-container">
        <div className="section-divider mb-rhythm-xl" />

        <div className="max-w-[800px]">
          <ScrollReveal variant="headline">
            <p className="eyebrow mb-rhythm-sm">OFFLINE-FIRST</p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} variant="headline">
            <h2 className="font-headline font-bold text-section tracking-headline leading-[1.08] text-warm-white mb-rhythm-md">
              No signal. No problem.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-body-lg text-warm-white/45 leading-[1.7] mb-rhythm-sm">
              The entire core experience — scene description, OCR, translation,
              voice commands, accessibility mode — works with zero internet
              connection. Everything is computed on-device, always available.
            </p>
          </ScrollReveal>

          {/* Info callout */}
          <ScrollReveal delay={0.4}>
            <div className="mt-rhythm-md p-6 rounded-2xl border border-warm-white/[0.06] bg-warm-white/[0.02]">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">
                  <IconInfo size={16} className="text-warm-white/30" />
                </div>
                <p className="font-body text-body text-warm-white/35 leading-relaxed">
                  One feature — mood-based music — needs a connection, by nature.
                  Everything else never does.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
