'use client';

import ScrollReveal from '../ScrollReveal';
import ParticleField from '../ParticleField';

export default function Idea() {
  return (
    <section id="idea" className="relative w-full py-section bg-near-black overflow-hidden">
      <ParticleField className="z-0" opacity={0.06} particleCount={30} spread={12} />

      {/* Editorial section number — Apple-style */}
      <div className="absolute top-rhythm-xl right-container-px pointer-events-none select-none">
        <span className="font-headline font-bold text-[180px] md:text-[240px] leading-none text-warm-white/[0.015] tracking-tighter">
          01
        </span>
      </div>

      <div className="section-container relative z-10">
        <div className="section-divider mb-rhythm-xl" />

        <ScrollReveal variant="headline">
          <p className="eyebrow mb-rhythm-sm">THE THESIS</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15} variant="headline">
          <h2 className="font-headline font-bold text-section tracking-headline leading-[1.08] text-warm-white max-w-[700px] mb-rhythm-md">
            One phone. Every capability.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="max-w-[600px]">
            <p className="font-body text-body-lg text-warm-white/45 leading-[1.7] mb-rhythm-sm">
              The iQOO 15&apos;s camera, microphone, and on-device NPU are the entire
              system. Scene description, OCR, translation, voice commands — all
              computed locally, all in real time.
            </p>
            <p className="font-body text-body-lg text-warm-white/45 leading-[1.7]">
              The optional wearable sensor module — glasses or wristband — is just
              a camera and mic. Zero onboard intelligence. The phone does all the
              thinking.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
