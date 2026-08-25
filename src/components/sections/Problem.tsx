'use client';

import Image from 'next/image';
import ScrollReveal from '../ScrollReveal';

export default function Problem() {
  return (
    <section id="problem" className="relative w-full py-section bg-near-black overflow-hidden">
      {/* Section ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.03] bg-warm-white pointer-events-none" />

      <div className="section-container">
        {/* Top divider */}
        <div className="section-divider mb-rhythm-xl" />

        <ScrollReveal variant="headline">
          <p className="font-headline font-bold text-section tracking-headline leading-[1.08] text-warm-white max-w-[700px] mb-rhythm-xl">
            The real fix isn&apos;t{' '}
            <span className="text-silver">new hardware.</span>
          </p>
        </ScrollReveal>

        {/* Live-coded comparison */}
        <ScrollReveal delay={0.15} variant="image">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* The Problem side */}
            <div className="card-premium p-8 md:p-10">
              <p className="eyebrow mb-rhythm-md">The Problem</p>
              <h3 className="font-headline font-bold text-subheadline text-warm-white/70 mb-rhythm-md leading-snug">
                Smart glasses are expensive &amp; locked down.
              </h3>
              <ul className="space-y-5">
                {[
                  { label: '$699+', desc: 'High cost limits access' },
                  { label: 'Locked', desc: 'Proprietary systems you can\'t customize' },
                  { label: 'Rigid', desc: 'Not built for makers or developers' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="mt-2 w-1 h-1 rounded-full bg-warm-white/20 flex-shrink-0" />
                    <div>
                      <span className="font-headline font-semibold text-body text-warm-white/50">{item.label}</span>
                      <span className="text-body-sm text-warm-white/25 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution side */}
            <div className="card-premium p-8 md:p-10 border-warm-white/[0.08]">
              <p className="eyebrow mb-rhythm-md text-accent">The Solution</p>
              <h3 className="font-headline font-bold text-subheadline text-warm-white mb-rhythm-md leading-snug">
                One modular device. Endless possibilities.
              </h3>
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-rhythm-md">
                <Image
                  src="/product-lineup.jpeg"
                  alt="Eye-Q modular sensor — glasses, wristband, and standalone configurations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <ul className="space-y-5">
                {[
                  { label: 'Affordable', desc: 'A fraction of the price' },
                  { label: 'Open', desc: 'Open source, built for makers' },
                  { label: 'Modular', desc: 'Glasses, wrist, or any mount' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <div>
                      <span className="font-headline font-semibold text-body text-warm-white/80">{item.label}</span>
                      <span className="text-body-sm text-warm-white/40 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} variant="headline">
          <p className="font-headline font-bold text-section tracking-headline leading-[1.08] text-warm-white max-w-[800px] mt-rhythm-xl ml-auto text-right">
            It&apos;s smarter use of the phone{' '}
            <span className="text-gradient-accent">already in your hand.</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
