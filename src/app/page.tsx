import dynamic from 'next/dynamic';
import Problem from '@/components/sections/Problem';
import Idea from '@/components/sections/Idea';
import USP from '@/components/sections/USP';
import TargetAudience from '@/components/sections/TargetAudience';
import PhoneFirst from '@/components/sections/PhoneFirst';
import OfflineFirst from '@/components/sections/OfflineFirst';
import BuildStatus from '@/components/sections/BuildStatus';
import Team from '@/components/sections/Team';
import Footer from '@/components/sections/Footer';

const CinematicIntro = dynamic(() => import('@/components/sections/CinematicIntro'), {
  ssr: false,
  loading: () => (
    <section className="w-full h-screen bg-near-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-warm-white/10 border-t-warm-white/60 animate-spin" />
        <span className="font-headline text-body-sm text-warm-white/30 tracking-eyebrow uppercase">Eye-Q</span>
      </div>
    </section>
  ),
});

const LiveDemo = dynamic(() => import('@/components/demo/LiveDemo'), {
  ssr: false,
  loading: () => (
    <section className="w-full min-h-[500px] bg-near-black flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-warm-white/10 border-t-warm-white/40 rounded-full animate-spin" />
        <span className="font-body text-caption text-warm-white/30">Loading interactive demo…</span>
      </div>
    </section>
  ),
});

export default function Home() {
  return (
    <>
      <CinematicIntro />
      <Problem />
      <Idea />
      <LiveDemo />
      <USP />
      <TargetAudience />
      <PhoneFirst />
      <OfflineFirst />
      <BuildStatus />
      <Team />
      <Footer />
    </>
  );
}
