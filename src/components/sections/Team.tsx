'use client';

import Image from 'next/image';
import ScrollReveal from '../ScrollReveal';

const teamMembers = [
  {
    name: 'Eshan H',
    role: 'Mobile Development & AI Agents Lead',
    image: '/team/divya.jpg',
    desc: 'Owns the iQOO 15 app: on-device AI agent orchestration, voice routing, UI/UX for both personas, and the live demo build.',
    linkedin: 'https://linkedin.com/in/eshan-h',
    github: 'https://github.com/Falcon0516',
  },
  {
    name: 'Divya D',
    role: 'Backend & Software Systems Lead',
    image: '/team/akshay.png',
    desc: 'Owns backend services, data/model pipeline integration, and app-side software architecture connecting sensor input to on-device inference.',
    linkedin: 'https://www.linkedin.com/in/divyad03/',
    github: 'https://github.com/divyaddinesh',
  },
  {
    name: 'Akshay K',
    role: 'On-Device AI/ML + Integration Lead',
    image: '/team/eshan.jpg',
    desc: 'Owns model selection, quantisation, and NPU pipeline tuning for vision/ASR/OCR/translation, plus light-touch integration of the capture accessory.',
    linkedin: 'https://linkedin.com/in/akshayk44776',
    github: 'https://github.com/Akshay44776',
  },
];

export default function Team() {
  return (
    <section id="team" className="relative w-full py-section bg-near-black overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[160px] opacity-[0.03] bg-warm-white pointer-events-none" />

      <div className="section-container">
        <ScrollReveal variant="headline">
          <p className="eyebrow mb-rhythm-sm text-center">THE TEAM</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} variant="headline">
          <h2 className="font-headline font-bold text-section tracking-headline leading-[1.1] text-warm-white text-center mb-rhythm-xl">
            Built by three.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1060px] mx-auto">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="card-premium p-8 flex flex-col items-center text-center h-full group hover:border-warm-white/20 transition-all duration-500">
                {/* Profile Picture Frame */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-rhythm-sm border-2 border-warm-white/10 group-hover:border-accent/40 shadow-product transition-all duration-500">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="96px"
                  />
                  {/* Subtle inner ring highlight */}
                  <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
                </div>

                <h3 className="font-headline font-bold text-body-lg text-warm-white mb-1">
                  {member.name}
                </h3>
                <p className="font-headline text-caption text-accent font-semibold uppercase tracking-wider mb-rhythm-xs">
                  {member.role}
                </p>
                <p className="font-body text-body-sm text-warm-white/40 leading-relaxed mb-rhythm-sm flex-1">
                  {member.desc}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-warm-white/8 flex items-center justify-center hover:border-warm-white/20 hover:bg-warm-white/[0.04] transition-all duration-400"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(245,245,247,0.4)">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-warm-white/8 flex items-center justify-center hover:border-warm-white/20 hover:bg-warm-white/[0.04] transition-all duration-400"
                    aria-label={`${member.name} GitHub`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(245,245,247,0.4)">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
