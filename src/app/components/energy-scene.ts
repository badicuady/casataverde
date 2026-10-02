import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  ViewChild,
  effect,
  inject,
  input,
} from '@angular/core';

/** Decorative scene. All pointer/scroll animation runs outside Angular rendering. */
@Component({
  selector: 'app-energy-scene',
  template: `<div #layer class="scene-layer">
    <img src="/images/hero.webp" alt="" fetchpriority="high" width="1536" height="1024" /><canvas
      #canvas
      aria-hidden="true"
    ></canvas>
  </div>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        overflow: hidden;
      }
      .scene-layer {
        position: absolute;
        inset: 0;
        will-change: transform;
      }
      img,
      canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        inset: 0;
      }
      img {
        object-fit: cover;
        object-position: center;
        mask-image: linear-gradient(to bottom, #000 88%, transparent 100%);
      }
      @media (max-width: 760px) {
        .scene-layer {
          top: var(--scene-top, 260px);
          bottom: 70px;
          left: -65%;
          right: -10%;
        }
        img {
          object-fit: cover;
          object-position: 68% center;
          mask-image: linear-gradient(to bottom, transparent, #000 24%, #000 80%, transparent);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .scene-layer {
          will-change: auto;
          transform: none !important;
        }
      }
    `,
  ],
})
export class EnergyScene implements AfterViewInit {
  readonly paused = input(false);
  @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('layer', { static: true }) private layer!: ElementRef<HTMLDivElement>;
  private readonly zone = inject(NgZone);
  private readonly destroy = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private refresh = () => {};
  constructor() {
    effect(() => {
      this.paused();
      this.zone.runOutsideAngular(() => this.refresh());
    });
  }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const canvas = this.canvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      let visible = true,
        frame = 0,
        width = 0,
        height = 0,
        phase = 0,
        last = 0,
        disposed = false;
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        const scale = Math.min(width / 1536, height / 1024);
        const point = (t: number) => ({
          x: width * (0.7 + 0.34 * Math.cos(t)),
          y: height * (0.44 + 0.19 * Math.sin(t) - 0.075 * Math.cos(t)),
        });
        // Two arcs leave the far side naturally occluded by the solar roof.
        for (const [start, end] of [
          [0.9, 3.8],
          [4.8, 5.7],
        ]) {
          ctx.beginPath();
          for (let i = 0; i <= 130; i++) {
            const p = point(start + ((end - start) * i) / 130);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = 'rgba(214,255,149,0.88)';
          ctx.lineWidth = Math.max(1, 1.6 * scale);
          ctx.shadowColor = '#c6f47a';
          ctx.shadowBlur = 14;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
        for (let j = 0; j < 3; j++) {
          const t = (phase + j * 2.1) % (Math.PI * 2);
          if (!((t >= 0.9 && t <= 3.8) || (t >= 4.8 && t <= 5.7))) continue;
          const p = point(t);
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1.3, 2.2 * scale), 0, Math.PI * 2);
          ctx.fillStyle = '#e8ffc0';
          ctx.shadowColor = '#c6f47a';
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      };
      const running = () =>
        !disposed && visible && !document.hidden && !motion.matches && !this.paused();
      const tick = (now: number) => {
        frame = 0;
        if (!running()) {
          if (motion.matches) this.layer.nativeElement.style.transform = 'none';
          return;
        }
        const delta = Math.min(now - last, 50);
        last = now;
        phase += delta * 0.0002;
        const bounds = this.host.nativeElement.getBoundingClientRect();
        this.layer.nativeElement.style.transform = `translate3d(0,${Math.max(-100, Math.min(140, -bounds.top * 0.12))}px,0)`;
        draw();
        frame = requestAnimationFrame(tick);
      };
      const sync = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        if (motion.matches || this.paused()) this.layer.nativeElement.style.transform = 'none';
        draw();
        if (running()) {
          last = performance.now();
          frame = requestAnimationFrame(tick);
        }
      };
      const resize = new ResizeObserver(() => {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        const dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sync();
      });
      resize.observe(canvas);
      const intersection = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        sync();
      });
      intersection.observe(this.host.nativeElement);
      motion.addEventListener('change', sync);
      document.addEventListener('visibilitychange', sync);
      this.refresh = sync;
      this.destroy.onDestroy(() => {
        disposed = true;
        cancelAnimationFrame(frame);
        resize.disconnect();
        intersection.disconnect();
        motion.removeEventListener('change', sync);
        document.removeEventListener('visibilitychange', sync);
        this.refresh = () => {};
      });
    });
  }
}
