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
} from '@angular/core';
import { gsap } from 'gsap';
import { Language } from '../data/content';
import { consultancyCopy } from '../data/consultancy';
import { Icon } from './icon';
import { MotionScope } from './motion-scope';

@Component({
  selector: 'app-project-context',
  imports: [Icon],
  templateUrl: './project-context.html',
  styleUrl: './project-context.css',
})
export class ProjectContext implements AfterViewInit, OnDestroy {
  readonly language = input.required<Language>();
  readonly section = input.required<'project' | 'trust' | 'details'>();
  readonly paused = input(false);
  readonly copy = computed(() => consultancyCopy[this.language()]);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly zone = inject(NgZone);
  private motion?: MotionScope;

  constructor() {
    afterRenderEffect(() => {
      const paused = this.paused();
      this.zone.runOutsideAngular(() => this.motion?.setPaused(paused));
    });
  }

  ngAfterViewInit(): void {
    const section = this.host.nativeElement.querySelector<HTMLElement>('.consultancy-story');
    if (!section) return;

    this.zone.runOutsideAngular(() => {
      this.motion = new MotionScope(
        this.host.nativeElement,
        () => {
          gsap.from(section.querySelectorAll('h2, .content-list > div, .process-list > li'), {
            y: 35,
            opacity: 0,
            duration: 0.9,
            stagger: 0.11,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          });
          gsap.fromTo(
            section.querySelector('.story-visual img'),
            { yPercent: -5, scale: 1.12 },
            {
              yPercent: 5,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          );
          gsap.from(section.querySelector('.story-line'), {
            scaleX: 0,
            transformOrigin: 'left',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 65%', scrub: 0.5 },
          });
        },
        this.paused(),
      );
    });
  }

  ngOnDestroy(): void {
    this.motion?.destroy();
  }
}
