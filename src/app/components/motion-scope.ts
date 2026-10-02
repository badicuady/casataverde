import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Construct and call outside Angular. Each component owns only its own animations. */
export class MotionScope {
  private context?: gsap.Context;
  private readonly media = matchMedia('(prefers-reduced-motion: reduce)');
  private paused: boolean;
  private destroyed = false;
  get enabled(): boolean {
    return !this.destroyed && !this.paused && !this.media.matches;
  }
  constructor(
    private host: HTMLElement,
    private build: () => void,
    paused = false,
  ) {
    this.paused = paused;
    this.media.addEventListener('change', this.rebuild);
    this.rebuild();
  }
  private rebuild = (): void => {
    this.context?.revert();
    this.context = undefined;
    if (this.enabled) this.context = gsap.context(this.build, this.host);
  };
  setPaused(paused: boolean): void {
    if (paused === this.paused || this.destroyed) return;
    this.paused = paused;
    this.rebuild();
  }
  destroy(): void {
    this.destroyed = true;
    this.context?.revert();
    this.context = undefined;
    this.media.removeEventListener('change', this.rebuild);
  }
}
