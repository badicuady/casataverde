import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Language } from '../data/content';
import { Icon } from './icon';
import { BUILD_DURATION, drawHomeBuild } from './home-build-renderer';

const copy = {
  ro: {
    title: 'De la releveu',
    end: 'la casa ta.',
    precision: 'Precizie în fiecare linie.',
    pace: 'Ritm în fiecare etapă.',
    replay: 'Reia animația',
    pause: 'Oprește construcția',
    resume: 'Continuă construcția',
    concept: 'Vizualizare conceptuală',
    stagesLabel: 'Etapele transformării',
    stages: ['Releveu', 'Structură', 'Anvelopă', 'Acasă'],
    description:
      'Vizualizare conceptuală: un releveu cotat se transformă în structura unei case, apoi într-o casă finisată, cu acoperiș fotovoltaic și grădină.',
  },
  en: {
    title: 'From measured plan',
    end: 'to your home.',
    precision: 'Precision in every line.',
    pace: 'Momentum at every stage.',
    replay: 'Replay animation',
    pause: 'Pause construction',
    resume: 'Resume construction',
    concept: 'Concept visualisation',
    stagesLabel: 'Stages of the transformation',
    stages: ['Survey', 'Structure', 'Envelope', 'Home'],
    description:
      'Concept visualisation: a dimensioned as-built plan becomes a house structure, then a finished home with a solar roof and garden.',
  },
} as const;

@Component({
  selector: 'app-home-build',
  imports: [Icon],
  templateUrl: './home-build.html',
  styleUrl: './home-build.css',
})
export class HomeBuild implements AfterViewInit {
  readonly language = input.required<Language>();
  readonly paused = input(false);
  readonly copy = computed(() => copy[this.language()]);
  readonly step = signal(0);
  readonly finished = signal(false);
  readonly locallyPaused = signal(false);
  readonly reducedMotion = signal(false);
  readonly canvasUnavailable = signal(false);
  private readonly zone = inject(NgZone);
  private readonly destroy = inject(DestroyRef);
  @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stage', { static: true }) private stage!: ElementRef<HTMLDivElement>;
  private sync = () => {};
  private restart = () => {};

  constructor() {
    effect(() => {
      this.paused();
      this.locallyPaused();
      this.language();
      this.zone.runOutsideAngular(() => this.sync());
    });
  }

  togglePause(): void {
    this.locallyPaused.update((value) => !value);
  }

  replay(): void {
    this.locallyPaused.set(false);
    this.zone.runOutsideAngular(() => this.restart());
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const canvas = this.canvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        this.canvasUnavailable.set(true);
        this.step.set(3);
        this.finished.set(true);
        return;
      }
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      const home = new Image();
      let width = 0,
        height = 0,
        dpr = 1,
        elapsed = 0,
        last = 0,
        frame = 0;
      let visible = false,
        disposed = false,
        loaded = false,
        requested = false,
        failed = false;

      const updateState = () => {
        const stage = elapsed < 1900 ? 0 : elapsed < 3650 ? 1 : elapsed < 5200 ? 2 : 3;
        const done = elapsed >= BUILD_DURATION;
        if (this.step() !== stage || this.finished() !== done) {
          this.zone.run(() => {
            this.step.set(stage);
            this.finished.set(done);
          });
        }
      };
      const draw = () => {
        if (!width || !height || disposed) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawHomeBuild(ctx, width, height, elapsed, loaded ? home : null, this.language());
        updateState();
      };
      const running = () =>
        !disposed &&
        visible &&
        !document.hidden &&
        (loaded || failed) &&
        !motion.matches &&
        !this.paused() &&
        !this.locallyPaused() &&
        elapsed < BUILD_DURATION;
      const tick = (now: number) => {
        frame = 0;
        if (!running()) return;
        elapsed = Math.min(BUILD_DURATION, elapsed + Math.min(now - last, 64));
        last = now;
        draw();
        if (running()) frame = requestAnimationFrame(tick);
      };
      const sync = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        if (motion.matches) elapsed = BUILD_DURATION;
        this.reducedMotion.set(motion.matches);
        draw();
        if (running()) {
          last = performance.now();
          frame = requestAnimationFrame(tick);
        }
      };
      const load = () => {
        if (requested || disposed) return;
        requested = true;
        home.onload = () => {
          if (!disposed) {
            loaded = true;
            sync();
          }
        };
        home.onerror = () => {
          if (!disposed) {
            failed = true;
            sync();
          }
        };
        home.src = '/images/home-build.webp';
      };
      const preload = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            load();
            preload.disconnect();
          }
        },
        { rootMargin: '500px' },
      );
      preload.observe(this.stage.nativeElement);
      const intersection = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) load();
          sync();
        },
        { threshold: 0.2 },
      );
      intersection.observe(this.stage.nativeElement);
      const resize = new ResizeObserver(() => {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        sync();
      });
      resize.observe(canvas);
      this.sync = sync;
      this.restart = () => {
        elapsed = 0;
        sync();
      };
      motion.addEventListener('change', sync);
      document.addEventListener('visibilitychange', sync);
      sync();
      this.destroy.onDestroy(() => {
        disposed = true;
        cancelAnimationFrame(frame);
        preload.disconnect();
        intersection.disconnect();
        resize.disconnect();
        motion.removeEventListener('change', sync);
        document.removeEventListener('visibilitychange', sync);
        home.onload = home.onerror = null;
        this.sync = this.restart = () => {};
      });
    });
  }
}
