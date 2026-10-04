import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { Icon } from './icon';
import { MotionScope } from './motion-scope';
import { Language } from '../data/content';
import { ecosystemCopy, partners, PartnerCategory } from '../data/ecosystem';

gsap.registerPlugin(Flip);
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
@Component({
  selector: 'app-partner-directory',
  standalone: true,
  imports: [Icon],
  templateUrl: './partner-directory.html',
  styleUrl: './partner-directory.css',
})
export class PartnerDirectory implements AfterViewInit, OnDestroy {
  readonly language = input.required<Language>();
  readonly whatsappUrl = input.required<string>();
  readonly paused = input(false);
  readonly activeCategory = signal<PartnerCategory>('all');
  readonly searchTerm = signal('');
  readonly copy = computed(() => ecosystemCopy[this.language()]);
  readonly categories: readonly PartnerCategory[] = [
    'all',
    'roof',
    'climate',
    'interior',
    'smart',
    'energy',
  ];
  readonly filteredPartners = computed(() => {
    const query = normalize(this.searchTerm().trim());
    const category = this.activeCategory();
    const lang = this.language();
    return partners.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        normalize(
          `${p.name} ${p.description[lang]} ${p.keywords} ${this.copy().filters[p.category]}`,
        ).includes(query),
    );
  });
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly zone = inject(NgZone);
  private motion?: MotionScope;
  private transitionContext?: gsap.Context;
  private previousLayout?: Flip.FlipState;
  private readonly media = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly stopTransitions = () => {
    this.transitionContext?.revert();
    this.transitionContext = undefined;
  };
  private readonly onMotionChange = () => {
    this.stopTransitions();
    const category = this.activeCategory();
    this.host.nativeElement.style.setProperty(
      '--active-glow',
      category === 'interior' || category === 'energy' ? '#ac93fa' : '#75e7f0',
    );
  };
  constructor() {
    afterRenderEffect(() => {
      this.filteredPartners();
      const paused = this.paused();
      const category = this.activeCategory();
      this.zone.runOutsideAngular(() => {
        this.motion?.setPaused(paused);
        if (!this.motion) return;
        this.stopTransitions();
        const color = category === 'interior' || category === 'energy' ? '#ac93fa' : '#75e7f0';
        if (!this.motion.enabled) {
          this.host.nativeElement.style.setProperty('--active-glow', color);
          this.previousLayout = undefined;
          return;
        }
        const state = this.previousLayout;
        this.previousLayout = undefined;
        this.transitionContext = gsap.context(() => {
          gsap.to(this.host.nativeElement, { '--active-glow': color, duration: 0.5 });
          if (state)
            Flip.from(state, {
              targets: this.cards(),
              duration: 0.55,
              ease: 'power3.inOut',
              stagger: 0.035,
              scale: true,
              prune: true,
              onEnter: (elements) =>
                gsap.fromTo(
                  elements,
                  { opacity: 0, y: 26, scale: 0.96 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.06,
                    clearProps: 'transform,opacity',
                  },
                ),
            });
        }, this.host.nativeElement);
      });
    });
  }
  private cards(): HTMLElement[] {
    return Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.partner-item'));
  }
  private capture(): void {
    this.zone.runOutsideAngular(() => {
      // Finish the previous layout before measuring to avoid cumulative transforms on rapid input.
      this.stopTransitions();
      if (this.motion?.enabled) this.previousLayout = Flip.getState(this.cards());
    });
  }
  filter(category: PartnerCategory): void {
    if (category === this.activeCategory()) return;
    this.capture();
    this.activeCategory.set(category);
  }
  search(value: string): void {
    if (value === this.searchTerm()) return;
    this.capture();
    this.searchTerm.set(value);
  }
  reset(): void {
    this.capture();
    this.searchTerm.set('');
    this.activeCategory.set('all');
  }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.media.addEventListener('change', this.onMotionChange);
      this.motion = new MotionScope(
        this.host.nativeElement,
        () => {
          gsap.from(this.host.nativeElement.querySelectorAll('.directory-heading, .partner-grid'), {
            y: 35,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: this.host.nativeElement, start: 'top 80%', once: true },
          });
        },
        this.paused(),
      );
    });
  }
  ngOnDestroy(): void {
    this.motion?.destroy();
    this.stopTransitions();
    this.media.removeEventListener('change', this.onMotionChange);
    this.previousLayout = undefined;
  }
}
