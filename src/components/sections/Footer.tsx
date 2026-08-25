'use client';

const submissionLinks = [
  { label: 'Demo Video', href: 'https://youtu.be/9gwLNZzoLmQ' },
  { label: 'GitHub Repo', href: 'https://github.com/Falcon0516' },
  { label: 'Architecture Doc', href: 'https://docs.google.com' },
];

export default function Footer() {
  return (
    <footer className="relative w-full pt-section-sm pb-rhythm-lg bg-near-black overflow-hidden">
      {/* Top gradient divider */}
      <div className="section-divider mb-rhythm-xl" />

      <div className="section-container text-center">
        {/* Closing tagline */}
        <p className="font-headline font-bold text-section tracking-headline leading-[1.12] text-warm-white max-w-[700px] mx-auto mb-rhythm-lg">
          Proof that a phone alone can give someone their{' '}
          <span className="text-gradient-accent">independence back.</span>
        </p>

        {/* Submission material chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-rhythm-xl">
          {submissionLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-warm-white/8 text-warm-white/50 font-body text-body-sm
                         hover:border-warm-white/20 hover:text-warm-white/80 hover:bg-warm-white/[0.03] transition-all duration-400"
            >
              {link.label} ↗
            </a>
          ))}
        </div>

        {/* Logo + Bottom line */}
        <div className="flex flex-col items-center gap-4">
          {/* Small Eye-Q logo mark */}
          <div className="w-8 h-8 rounded-full border border-warm-white/8 flex items-center justify-center mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" className="text-warm-white/20" />
              <circle cx="12" cy="12" r="2" fill="currentColor" className="text-warm-white/20" />
            </svg>
          </div>
          <div className="flex items-center gap-3 text-warm-white/20 font-body text-caption">
            <span>Eye-Q</span>
            <span className="w-1 h-1 rounded-full bg-warm-white/10" />
            <span>iQOO Hackathon 2026</span>
            <span className="w-1 h-1 rounded-full bg-warm-white/10" />
            <span>Bengaluru</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
