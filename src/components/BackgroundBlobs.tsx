"use client";

import { useEffect, useRef } from "react";

type Blob = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  startTime: number;
  duration: number;
  radius: number;
  hue: number;
};

export default function BackgroundBlobs() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null); // fix: provide initial value
  const reduceMotionRef = useRef<boolean>(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = prefersReduced.matches;
    const onChange = (e: MediaQueryListEvent) => (reduceMotionRef.current = e.matches);
    prefersReduced.addEventListener?.("change", onChange);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const corners = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    const pickCorner = (except?: { x: number; y: number }) => {
      const opts = except
        ? corners.filter((c) => c.x !== except.x || c.y !== except.y)
        : corners;
      return opts[Math.floor(Math.random() * opts.length)];
    };

    const toPx = (corner: { x: number; y: number }, pad = 80) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      return {
        x: Math.round(pad + corner.x * (w - pad * 2)),
        y: Math.round(pad + corner.y * (h - pad * 2)),
      };
    };

    const now = () => performance.now();

    const makeBlob = (): Blob => {
      const startCorner = pickCorner();
      const endCorner = pickCorner(startCorner);
      return {
        start: toPx(startCorner),
        end: toPx(endCorner),
        startTime: now(),
        duration: 12000 + Math.random() * 10000, // 12–22s
        radius: 140 + Math.random() * 220,
        hue: 195 + Math.random() * 10, // around light blue
      };
    };

    const blobCount = 5;
    const blobs: Blob[] = Array.from({ length: blobCount }, makeBlob);

    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Clear with gentle fade for trails
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const t = Math.min(1, (now() - b.startTime) / b.duration);
        const k = ease(t);

        // Interpolate position + subtle sinusoidal drift
        const dx = b.end.x - b.start.x;
        const dy = b.end.y - b.start.y;
        const baseX = b.start.x + dx * k;
        const baseY = b.start.y + dy * k;

        const driftAmp = 40 + (i * 7) % 25;
        const driftX = Math.sin((now() / 1000 + i) * 0.8) * driftAmp;
        const driftY = Math.cos((now() / 1100 + i * 0.5) * 0.9) * driftAmp;

        const x = baseX + driftX;
        const y = baseY + driftY;

        // Draw radial gradient glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, b.radius);
        const c1 = `hsla(${b.hue}, 85%, 70%, ${reduceMotionRef.current ? 0.12 : 0.16})`;
        const c2 = `hsla(${b.hue}, 85%, 70%, 0)`;
        grd.addColorStop(0, c1);
        grd.addColorStop(1, c2);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset when complete
        if (t >= 1) {
          const nextStart = { ...b.end };
          const nextEnd = toPx(pickCorner({ x: nextStart.x ? 1 : 0, y: nextStart.y ? 1 : 0 }));
          b.start = nextStart;
          b.end = nextEnd;
          b.startTime = now();
          b.duration = 12000 + Math.random() * 10000;
          b.radius = 140 + Math.random() * 220;
        }
      }

      ctx.restore();

      if (!reduceMotionRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // If reduced motion, render a single static frame
    if (reduceMotionRef.current) {
      // Draw static blobs once
      tick();
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      prefersReduced.removeEventListener?.("change", onChange);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current); // fix: null check
    };
  }, []);

  return (
    <div className="bg-blobs" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
