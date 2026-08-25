'use client';

import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';

export interface CanvasScrubHandle {
  scrubTo: (frame: number) => void;
  getFrameCount: () => number;
}

interface CanvasScrubProps {
  sequence: 'glasses' | 'watch';
  frameCount: number;
  className?: string;
}

const CanvasScrub = forwardRef<CanvasScrubHandle, CanvasScrubProps>(
  function CanvasScrub({ sequence, frameCount, className = '' }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const [loaded, setLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Preload all frames
    useEffect(() => {
      if (isMobile) return;

      let cancelled = false;
      const images: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const num = String(i).padStart(3, '0');
        img.src = `/sequences/${sequence}/${sequence}_${num}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount && !cancelled) {
            setLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === frameCount && !cancelled) {
            setLoaded(true);
          }
        };
        images.push(img);
      }

      imagesRef.current = images;
      return () => { cancelled = true; };
    }, [sequence, frameCount, isMobile]);

    // Draw frame on canvas
    const drawFrame = useCallback((index: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];
      if (!canvas || !img || !img.complete) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      // Draw image cover
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = rect.width / rect.height;

      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
    }, []);

    // Draw initial frame when loaded
    useEffect(() => {
      if (loaded) drawFrame(0);
    }, [loaded, drawFrame]);

    // Expose scrubTo via imperative handle — this is the fix for §2
    useImperativeHandle(ref, () => ({
      scrubTo: (frame: number) => {
        const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(frame)));
        if (clamped !== currentFrameRef.current) {
          currentFrameRef.current = clamped;
          drawFrame(clamped);
        }
      },
      getFrameCount: () => frameCount,
    }), [frameCount, drawFrame]);

    // Mobile: show video instead
    if (isMobile) {
      return (
        <div className={`relative w-full aspect-video rounded-xl overflow-hidden ${className}`}>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={`/videos/${sequence === 'glasses' ? 'glasses-orbit' : 'watch-orbit'}.mp4`} type="video/mp4" />
          </video>
        </div>
      );
    }

    return (
      <div ref={containerRef} className={`relative w-full aspect-video ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-accent/30 border-t-teal rounded-full animate-spin" />
              <span className="font-body text-caption text-warm-white/40">Loading frames…</span>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full rounded-xl ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        />
      </div>
    );
  }
);

export default CanvasScrub;
