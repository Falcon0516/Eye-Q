'use client';

import ScrollReveal from '../ScrollReveal';
import { IconCheckmark } from '../icons';

const researched = [
  'On-device NPU capabilities (iQOO 15)',
  'ML Kit vision & OCR pipeline',
  'Android STT/TTS integration',
  'Kannada↔English translation models',
  'XIAO ESP32S3 Sense wearable module',
  'Accessibility standards & use cases',
  'Offline-first architecture patterns',
];

const built = [
  'Scene description via on-device ML',
  'Real-time OCR + live translation',
  'Voice command engine (hands-free)',
  'Accessibility Mode — narration',
  'Accessibility Mode — captioning',
  'Offline SOS with location',
  'Wearable sensor streaming to phone',
];

export default function BuildStatus() {
  return (
    <section id="build-status" className="relative w-full py-section bg-near-black overflow-hidden">
      <div className="section-container">
        <div className="section-divider mb-rhythm-xl" />

        <ScrollReveal variant="headline">
          <p className="eyebrow mb-rhythm-lg text-center">MVP STATUS</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {/* Researched */}
          <ScrollReveal delay={0.1}>
            <div className="card-premium p-8 md:p-10 h-full">
              <h3 className="font-headline font-bold text-subheadline text-warm-white/35 mb-rhythm-md tracking-tight">
                Researched &amp; validated
              </h3>
              <ul className="space-y-4">
                {researched.map((item, i) => (
                  <li key={i} className="font-body text-body text-warm-white/40 flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-warm-white/15 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Built */}
          <ScrollReveal delay={0.25}>
            <div className="card-premium p-8 md:p-10 h-full border-warm-white/[0.08]">
              <h3 className="font-headline font-bold text-subheadline text-warm-white mb-rhythm-md tracking-tight">
                Built in the 30 hours
              </h3>
              <ul className="space-y-4">
                {built.map((item, i) => (
                  <li key={i} className="font-body text-body text-warm-white/60 flex items-start gap-3">
                    <IconCheckmark size={14} className="text-accent mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
