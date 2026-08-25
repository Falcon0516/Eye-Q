'use client';

import Image from 'next/image';
import ScrollReveal from '../ScrollReveal';

export default function TargetAudience() {
  return (
    <section id="audience" className="relative w-full py-section bg-near-black overflow-hidden">
      <div className="section-container">
        <div className="section-divider mb-rhythm-xl" />

        <ScrollReveal variant="headline">
          <p className="eyebrow mb-rhythm-lg text-center">WHO IT&apos;S FOR</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* For anyone */}
          <ScrollReveal delay={0.1} variant="image">
            <div className="relative group rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/lifestyle.png"
                alt="Everyday user with Eye-Q"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="font-headline font-bold text-subheadline text-warm-white mb-2">
                  For anyone.
                </h3>
                <p className="font-body text-body text-warm-white/50 leading-relaxed max-w-[380px]">
                  Translate signs, describe scenes, control your phone hands-free — 
                  a smarter companion for everyday life.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* For accessibility */}
          <ScrollReveal delay={0.25} variant="image">
            <div className="relative group rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/accessibility-illustration.jpeg"
                alt="Person with visual impairment using Eye-Q smart glasses for navigation"
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <h3 className="font-headline font-bold text-subheadline text-warm-white mb-2">
                  For accessibility.
                </h3>
                <p className="font-body text-body text-warm-white/50 leading-relaxed max-w-[380px]">
                  Narrate the world for someone who can&apos;t see it. Turn sound
                  into words for someone who can&apos;t hear it.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
