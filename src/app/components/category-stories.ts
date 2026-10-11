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
  output,
} from '@angular/core';
import { gsap } from 'gsap';
import { Icon } from './icon';
import { MotionScope } from './motion-scope';
import { Language } from '../data/content';
import { stories, ecosystemCopy } from '../data/ecosystem';

@Component({
  selector: 'app-category-stories',
  standalone: true,
  imports: [Icon],
  templateUrl: './category-stories.html',
  styleUrl: './category-stories.css',
})
export class CategoryStories implements AfterViewInit, OnDestroy {
  readonly language = input.required<Language>();
  readonly whatsappUrl = input.required<string>();
  readonly paused = input(false);
  readonly serviceRequest = output<string>();
  readonly stories = computed(() => stories[this.language()]);
  readonly copy = computed(() => ecosystemCopy[this.language()]);
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
    this.zone.runOutsideAngular(() => {
      this.motion = new MotionScope(
        this.host.nativeElement,
        () => {
          for (const section of this.host.nativeElement.querySelectorAll<HTMLElement>('.story')) {
            gsap.from(section.querySelectorAll('.reveal'), {
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
              section.querySelector('.story-main img'),
              { yPercent: -5, scale: 1.08 },
              {
                yPercent: 5,
                scale: 1.01,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              },
            );
            const detail = section.querySelector('.story-detail');
            if (detail)
              gsap.fromTo(
                detail,
                { y: 30 },
                {
                  y: -30,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                  },
                },
              );
            gsap.from(section.querySelector('.story-line'), {
              scaleX: 0,
              transformOrigin: 'left',
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 65%', scrub: 0.5 },
            });
          }
        },
        this.paused(),
      );
    });
  }
  ngOnDestroy(): void {
    this.motion?.destroy();
  }
}
