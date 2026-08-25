'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import CanvasScrub, { CanvasScrubHandle } from './CanvasScrub';
import PhoneMockup from './PhoneMockup';
import {
  IconCoffee, IconSmartphone, IconLeaf, IconBook,
  IconCamera, IconHome, IconArrowLeft, IconMic, IconSpeaker,
  IconLocation, IconCheckmark, IconCpu,
} from '../icons';

const TOTAL_STATES = 12;
const GLASSES_FRAMES = 70;
const WATCH_FRAMES = 70;
const AUTO_ADVANCE_MS = 4500;

interface DemoState {
  id: number;
  title: string;
  caption: string;
  tag?: string;
}

const states: DemoState[] = [
  { id: 0, title: 'Modularity', caption: 'This is how Eye-Q becomes part of your day.' },
  { id: 1, title: 'Smart Glasses', caption: 'Clip it onto any glasses — hands-free vision assistance.', tag: 'OPTIONAL' },
  { id: 2, title: 'Wrist Module', caption: 'Or wear it on your wrist. Same brain, different form.', tag: 'OPTIONAL' },
  { id: 3, title: 'On-Device Brain', caption: 'Every bit of neural computing happens right on your phone.' },
  { id: 4, title: 'Scene Analysis', caption: 'Point it anywhere. Real-time object and spatial description.' },
  { id: 5, title: 'Instant OCR & Translation', caption: 'Read any sign or document in any Indian language instantly.' },
  { id: 6, title: 'Voice Navigation', caption: 'Complete system control without ever touching the screen.' },
  { id: 7, title: 'Audio Narration', caption: 'Real-time environmental narration for the visually impaired.' },
  { id: 8, title: 'Live Captioning', caption: 'Turns speech and audio into on-screen text in real time.' },
  { id: 9, title: 'Offline SOS', caption: 'Emergency SOS with GPS coordinates over mesh, zero cell signal required.' },
  { id: 10, title: 'NPU Inference', caption: 'Sub-30ms neural inference computed completely offline.' },
  { id: 11, title: 'Independence', caption: 'Proof that a phone alone can give someone their independence back.' },
];

/* ── State Views ── */

function StateIntro() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-[420px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-warm-white/10">
        <Image src="/product-lineup.jpeg" alt="Eye-Q modular ecosystem" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black/80 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function StateGlasses() {
  const scrubRef = useRef<CanvasScrubHandle>(null);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % GLASSES_FRAMES;
      scrubRef.current?.scrubTo(frame);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[480px]">
        <CanvasScrub ref={scrubRef} sequence="glasses" frameCount={GLASSES_FRAMES} />
      </div>
    </div>
  );
}

function StateWatch() {
  const scrubRef = useRef<CanvasScrubHandle>(null);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame = (frame + 1) % WATCH_FRAMES;
      scrubRef.current?.scrubTo(frame);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[480px]">
        <CanvasScrub ref={scrubRef} sequence="watch" frameCount={WATCH_FRAMES} />
      </div>
    </div>
  );
}

function StatePhoneReveal() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[220px] md:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl">
        <Image src="/phone-hero.png" alt="iQOO 15 — On-Device Hub" fill className="object-cover" />
      </div>
    </div>
  );
}

function FeatureSceneDescription() {
  const labels = [
    { icon: IconCoffee, text: 'Coffee mug — 0.4m ahead' },
    { icon: IconSmartphone, text: 'Smartphone on desk' },
    { icon: IconLeaf, text: 'Indoor plant' },
    { icon: IconBook, text: 'Notebook open' },
  ];
  const [visibleLabels, setVisibleLabels] = useState(0);

  useEffect(() => {
    setVisibleLabels(0);
    const interval = setInterval(() => {
      setVisibleLabels((prev) => (prev < labels.length ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(interval);
  }, [labels.length]);

  return (
    <PhoneMockup>
      <div className="w-full h-full bg-gradient-to-b from-graphite/80 to-near-black p-6 pt-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-headline uppercase tracking-eyebrow text-accent">Scene Perception</span>
            <span className="text-[10px] text-warm-white/40 font-mono">60 FPS · NPU</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {labels.map((label, i) => (
              <motion.div
                key={label.text}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: i < visibleLabels ? 1 : 0, x: i < visibleLabels ? 0 : -15 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-accent/10 border border-accent/20"
              >
                <label.icon size={15} className="text-accent flex-shrink-0" />
                <span className="text-body-sm text-warm-white font-body">{label.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-warm-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-caption text-warm-white/50 font-body">Active Vision Engine</span>
          </div>
          <IconSpeaker size={14} className="text-accent" />
        </div>
      </div>
    </PhoneMockup>
  );
}

function FeatureOCR() {
  const [showTranslation, setShowTranslation] = useState(false);
  useEffect(() => {
    setShowTranslation(false);
    const timer = setTimeout(() => setShowTranslation(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PhoneMockup>
      <div className="w-full h-full flex flex-col justify-between bg-near-black">
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <Image src="/kannada-sign.jpeg" alt="Kannada Signboard" fill className="object-cover" />
          <div className="absolute inset-4 border-2 border-accent/60 rounded-xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showTranslation ? 1 : 0, y: showTranslation ? 0 : 20 }}
          transition={{ duration: 0.4 }}
          className="p-5 bg-graphite border-t border-warm-white/10"
        >
          <p className="text-[10px] font-headline uppercase tracking-eyebrow text-accent mb-1">OCR &amp; Translation</p>
          <p className="text-body font-body text-warm-white font-medium">ಮಾರುಕಟ್ಟೆಗೆ ದಾರಿ</p>
          <p className="text-body text-accent font-body font-semibold mt-1">&ldquo;Way to Market&rdquo; (Spoken in English &amp; Hindi)</p>
        </motion.div>
      </div>
    </PhoneMockup>
  );
}

function FeatureVoiceControl() {
  const commands = [
    { icon: IconCamera, text: '"Take a high-res photo"' },
    { icon: IconSpeaker, text: '"Read the text in front of me"' },
    { icon: IconLocation, text: '"Where is the exit?"' },
    { icon: IconHome, text: '"Return to home screen"' },
  ];
  const [activeCmd, setActiveCmd] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCmd((prev) => (prev + 1) % commands.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [commands.length]);

  return (
    <PhoneMockup>
      <div className="w-full h-full bg-near-black p-6 pt-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
              <IconMic size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-[11px] font-headline uppercase tracking-eyebrow text-accent">Voice Pipeline</p>
              <p className="text-caption text-warm-white/50 font-body">On-device Whisper Small</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {commands.map((cmd, i) => (
              <motion.div
                key={cmd.text}
                animate={{
                  backgroundColor: i === activeCmd ? 'rgba(41,151,255,0.18)' : 'rgba(255,255,255,0.03)',
                  borderColor: i === activeCmd ? 'rgba(41,151,255,0.4)' : 'rgba(255,255,255,0.06)',
                  scale: i === activeCmd ? 1.02 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
              >
                <cmd.icon size={16} className={i === activeCmd ? 'text-accent' : 'text-warm-white/40'} />
                <span className="text-body-sm text-warm-white font-body font-medium">{cmd.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 py-2">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [6, 18, 6] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.04 }}
              className="w-1 bg-accent/70 rounded-full"
            />
          ))}
        </div>
      </div>
    </PhoneMockup>
  );
}

function FeatureAccessNarration() {
  const lines = [
    'Crosswalk ahead, approximately 4 meters.',
    'Pedestrian signal is green. Safe to cross.',
    'Two people approaching on your left side.',
  ];
  const [visibleLines, setVisibleLines] = useState(0);
  useEffect(() => {
    setVisibleLines(0);
    const interval = setInterval(() => {
      setVisibleLines((prev) => (prev < lines.length ? prev + 1 : prev));
    }, 1100);
    return () => clearInterval(interval);
  }, [lines.length]);

  return (
    <PhoneMockup>
      <div className="w-full h-full bg-near-black p-6 pt-10 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-headline uppercase tracking-eyebrow text-accent mb-4">Spatial Audio Narration</p>
          <div className="space-y-4">
            {lines.map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: i < visibleLines ? 1 : 0, y: i < visibleLines ? 0 : 10 }}
                transition={{ duration: 0.4 }}
                className="p-3.5 rounded-xl bg-warm-white/5 border border-warm-white/10"
              >
                <p className="text-body-sm text-warm-white font-body leading-relaxed">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-warm-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span className="text-caption text-warm-white/60 font-body">Spatial binaural audio stream active</span>
        </div>
      </div>
    </PhoneMockup>
  );
}

function FeatureAccessCaptioning() {
  const captions = [
    '"Good morning! Would you like the usual latte?"',
    '"Yes please, with oat milk and an espresso shot."',
    '"Sure, that will be ₹140. Scan the QR code whenever ready."',
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % captions.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [captions.length]);

  return (
    <PhoneMockup>
      <div className="w-full h-full bg-near-black p-6 pt-10 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-headline uppercase tracking-eyebrow text-accent mb-6">Live Sound-to-Text</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl bg-accent/10 border border-accent/25"
            >
              <p className="text-body text-warm-white font-body italic leading-relaxed">{captions[activeIdx]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2 pt-4">
          <IconSpeaker size={14} className="text-accent" />
          <span className="text-caption text-warm-white/40 font-body">Real-time STT latency &lt; 20ms</span>
        </div>
      </div>
    </PhoneMockup>
  );
}

function FeatureOfflineSOS() {
  return (
    <PhoneMockup>
      <div className="w-full h-full bg-near-black p-6 pt-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-6">
          <IconLocation size={28} className="text-red-400 animate-bounce" />
        </div>
        <p className="text-[11px] font-headline uppercase tracking-eyebrow text-red-400 mb-2">Emergency Mesh Beacon</p>
        <p className="text-body font-mono font-semibold text-warm-white mb-2">12.9716° N, 77.5946° E</p>
        <p className="text-caption text-warm-white/50 max-w-[220px] mb-6">Encrypted emergency beacon broadcast over BLE mesh network.</p>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40">
          <IconCheckmark size={14} className="text-accent" />
          <span className="text-caption text-accent font-headline font-semibold">Broadcast Verified (0 Cloud)</span>
        </div>
      </div>
    </PhoneMockup>
  );
}

function FeatureNPUPerformance() {
  const [inferenceMs, setInferenceMs] = useState(21);
  useEffect(() => {
    const interval = setInterval(() => {
      setInferenceMs(Math.round(18 + Math.random() * 8));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <PhoneMockup>
      <div className="w-full h-full bg-near-black p-6 pt-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <IconCpu size={16} className="text-accent" />
            <span className="text-[11px] font-headline uppercase tracking-eyebrow text-accent">NPU Performance</span>
          </div>
          <div className="text-center py-4">
            <span className="font-headline font-bold text-[56px] text-gradient-accent tabular-nums leading-none">
              {inferenceMs}
            </span>
            <span className="text-body text-warm-white/60 font-body ml-2">ms latency</span>
          </div>
          <div className="space-y-3 mt-4">
            {[
              { label: 'Vision Scene Model', value: '22ms' },
              { label: 'OCR & Text Extract', value: '16ms' },
              { label: 'Audio Speech Engine', value: '12ms' },
            ].map((metric) => (
              <div key={metric.label} className="flex justify-between items-center text-caption py-1.5 border-b border-warm-white/5">
                <span className="text-warm-white/50">{metric.label}</span>
                <span className="text-accent font-mono font-semibold">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-center text-warm-white/40">Powered by Snapdragon 8 Elite NPU</p>
      </div>
    </PhoneMockup>
  );
}

function StateClose() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <div className="relative w-[180px] aspect-[9/16] rounded-2xl overflow-hidden mb-4 shadow-2xl">
        <Image src="/phone-hero.png" alt="Eye-Q Flagship" fill className="object-cover" />
      </div>
      <p className="font-headline font-bold text-subheadline text-warm-white">One device. Endless freedom.</p>
    </div>
  );
}

const stateRenderers = [
  StateIntro, StateGlasses, StateWatch, StatePhoneReveal,
  FeatureSceneDescription, FeatureOCR, FeatureVoiceControl,
  FeatureAccessNarration, FeatureAccessCaptioning, FeatureOfflineSOS,
  FeatureNPUPerformance, StateClose,
];

/* ── Interactive Showcase Component ── */
export default function LiveDemo() {
  const [currentState, setCurrentState] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4 }); // Triggers when 40% of section is visible

  // Auto-advance and progress bar
  useEffect(() => {
    // If auto-play is paused or section is not in view, don't run animation
    if (!isPlaying || !isInView) {
      setProgress(0);
      return;
    }

    let startTime = Date.now();
    let animationFrameId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
      setProgress(p);

      if (elapsed >= AUTO_ADVANCE_MS) {
        setCurrentState((prev) => (prev + 1) % TOTAL_STATES);
        startTime = Date.now();
        setProgress(0);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, currentState, isInView]);

  const goNext = useCallback(() => {
    setIsPlaying(false);
    setCurrentState((prev) => (prev + 1) % TOTAL_STATES);
  }, []);

  const goPrev = useCallback(() => {
    setIsPlaying(false);
    setCurrentState((prev) => (prev - 1 + TOTAL_STATES) % TOTAL_STATES);
  }, []);

  const selectState = (index: number) => {
    setIsPlaying(false);
    setCurrentState(index);
  };

  const state = states[currentState];
  const StateRenderer = stateRenderers[currentState];

  return (
    <section ref={sectionRef} id="live-demo" className="relative w-full py-section bg-near-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px] opacity-[0.02] bg-accent pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-rhythm-lg max-w-[700px]">
          <p className="eyebrow mb-rhythm-xs">LIVE PRODUCT WALKTHROUGH</p>
          <h2 className="font-headline font-bold text-section text-warm-white tracking-headline mb-rhythm-sm">
            Experience Eye-Q in action.
          </h2>
          <p className="font-body text-body-lg text-warm-white/60">
            12 key capabilities executed completely on-device. Step through the live simulation.
          </p>
        </div>

        {/* Demo Stage Container */}
        <div className="w-full max-w-[1000px] glass rounded-[32px] p-8 md:p-12 shadow-product flex flex-col items-center relative overflow-hidden">
          
          {/* Top Progress Bar for Auto-play */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-warm-white/[0.04]">
            <div 
              className="h-full bg-accent transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* State Pills Navigation */}
          <div className="w-full flex items-center justify-center gap-1.5 md:gap-2 mb-8 overflow-x-auto py-2 scrollbar-none">
            {states.map((s, i) => (
              <button
                key={s.id}
                onClick={() => selectState(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentState === i
                    ? 'w-10 bg-accent shadow-[0_0_12px_rgba(41,151,255,0.4)]'
                    : 'w-3 bg-warm-white/15 hover:bg-warm-white/30'
                }`}
                title={s.title}
              />
            ))}
          </div>

          {/* Interactive Screen & Render Stage */}
          <div className="w-full min-h-[420px] md:min-h-[480px] flex items-center justify-center mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentState}
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full flex items-center justify-center absolute inset-0"
              >
                <StateRenderer />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption & Title */}
          <div className="text-center max-w-[600px] min-h-[100px] flex flex-col items-center justify-center">
            {state.tag && <span className="tag-optional mb-3">{state.tag}</span>}
            <h3 className="font-headline font-bold text-[22px] md:text-[28px] text-warm-white mb-2 tracking-tight">{state.title}</h3>
            <p className="font-body text-body text-warm-white/60 leading-relaxed">{state.caption}</p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-8 pt-6 border-t border-warm-white/10">
            <button
              onClick={goPrev}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-warm-white/5 hover:bg-warm-white/10 text-warm-white transition-all"
              aria-label="Previous step"
            >
              <IconArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-4">
              <span className="font-mono text-caption text-warm-white/40 tracking-widest">
                {String(currentState + 1).padStart(2, '0')} / {TOTAL_STATES}
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 rounded-full text-caption font-headline font-semibold tracking-wide text-accent border border-accent/30 hover:bg-accent/10 transition-all uppercase"
              >
                {isPlaying ? 'Pause' : 'Auto Play'}
              </button>
            </div>

            <button
              onClick={goNext}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-warm-white text-near-black hover:bg-white hover:scale-105 transition-all shadow-md"
              aria-label="Next step"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

