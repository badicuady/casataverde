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
import { ecosystemCopy, partners } from '../data/ecosystem';
import { MotionScope } from './motion-scope';
@Component({
  selector: 'app-partner-marquee',
  standalone: true,
  template: `<section
    class="marquee"
    [class.still]="paused()"
    (mouseenter)="hold(true)"
    (mouseleave)="hold(false)"
    (focusin)="hold(true)"
    (focusout)="release($event)"
    [attr.aria-label]="copy().marquee"
  >
    <div class="marquee-heading page-width">
      <p>{{ copy().marquee }}</p>
      <a href="#ecosystem">{{ copy().directory }} ↗</a>
    </div>
    <div class="marquee-window">
      <div class="marquee-track">
        @for (duplicate of [false, true]; track duplicate) {
          <div class="marquee-lane" [attr.aria-hidden]="duplicate ? 'true' : null">
            @for (partner of partners; track partner.id) {
              <a
                href="#ecosystem"
                [attr.tabindex]="duplicate ? -1 : null"
                [attr.aria-label]="partner.name"
                [attr.data-brand]="partner.id"
              >
                @if (partner.logo) {
                  <img [src]="partner.logo" alt="" width="160" height="40" />
                } @else {
                  <span>{{ partner.name }}</span>
                }
                @if (partner.id === 'huawei') {
                  <small>FusionSolar</small>
                }
              </a>
            }
          </div>
        }
      </div>
    </div>
  </section>`,
  styles: [
    `
      :host {
        display: block;
        border-bottom: 1px solid var(--line);
        background: #0a1410;
      }
      .marquee {
        padding: 36px 0 42px;
        overflow: hidden;
      }
      .marquee-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 30px;
      }
      .marquee-heading p {
        font-size: 14px;
        color: var(--muted);
        margin: 0;
      }
      .marquee-heading a {
        font-size: 11px;
        color: var(--accent);
      }
      .marquee-window {
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      }
      .marquee-track {
        display: flex;
        width: max-content;
      }
      .marquee-lane {
        display: flex;
        align-items: center;
        flex: none;
        gap: 0;
      }
      .marquee-lane a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 56px;
        border-right: 1px solid var(--line);
        padding: 4px 45px;
        filter: grayscale(1);
        opacity: 0.64;
        transition:
          opacity 0.2s,
          filter 0.2s;
      }
      .marquee-lane a:hover,
      .marquee-lane a:focus-visible {
        opacity: 1;
        filter: none;
      }
      .marquee-lane img {
        max-width: 160px;
        width: auto;
        height: 40px;
        object-fit: contain;
        filter: brightness(0) invert(1);
      }
      .marquee-lane span {
        font-size: 24px;
        font-weight: 700;
        white-space: nowrap;
        letter-spacing: -0.04em;
      }
      .marquee-lane small {
        font-size: 10px;
        letter-spacing: 0.15em;
      }
      .marquee-lane [data-brand='huawei'] img {
        height: 31px;
      }
      .marquee-lane [data-brand='solarhev'] img {
        filter: brightness(0) invert(1);
      }
      .still .marquee-track {
        width: 100%;
        transform: none !important;
      }
      .still .marquee-lane {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 25px;
      }
      .still .marquee-lane[aria-hidden='true'] {
        display: none;
      }
      @media (max-width: 760px) {
        .marquee {
          padding: 28px 0;
        }
        .marquee-heading {
          display: block;
        }
        .marquee-heading p {
          margin-bottom: 10px;
        }
        .marquee-lane a {
          width: 195px;
          padding-inline: 25px;
        }
        .marquee-lane img {
          max-width: 135px;
        }
        .marquee-lane span {
          font-size: 22px;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track {
          width: 100%;
          transform: none !important;
        }
        .marquee-lane {
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          row-gap: 25px;
        }
        .marquee-lane[aria-hidden='true'] {
          display: none;
        }
        .marquee-window {
          mask-image: none;
        }
      }
    `,
  ],
})
export class PartnerMarquee implements AfterViewInit, OnDestroy {
  readonly language = input.required<Language>();
  readonly paused = input(false);
  readonly partners = partners;
  readonly copy = computed(() => ecosystemCopy[this.language()]);
  private readonly zone = inject(NgZone);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private motion?: MotionScope;
  private loop?: gsap.core.Tween;
  private observer?: IntersectionObserver;
  private visible = false;
  private held = false;
  private readonly sync = () => {
    this.loop?.paused(this.held || !this.visible || document.hidden || this.paused());
  };
  constructor() {
    afterRenderEffect(() => {
      const paused = this.paused();
      this.zone.runOutsideAngular(() => {
        this.motion?.setPaused(paused);
        this.sync();
      });
    });
  }
  hold(held: boolean): void {
    this.held = held;
    this.zone.runOutsideAngular(this.sync);
  }
  release(event: FocusEvent): void {
    if (!this.host.nativeElement.contains(event.relatedTarget as Node | null)) this.hold(false);
  }
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.motion = new MotionScope(
        this.host.nativeElement,
        () => {
          this.loop = gsap.to('.marquee-track', {
            xPercent: -50,
            duration: 35,
            ease: 'none',
            repeat: -1,
          });
          gsap.fromTo(
            '.marquee-window',
            { y: 8 },
            {
              y: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: this.host.nativeElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
          this.sync();
          return () => {
            this.loop?.kill();
            this.loop = undefined;
          };
        },
        this.paused(),
      );
      this.observer = new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
        this.sync();
      });
      this.observer.observe(this.host.nativeElement);
      document.addEventListener('visibilitychange', this.sync);
    });
  }
  ngOnDestroy(): void {
    this.motion?.destroy();
    this.loop?.kill();
    this.loop = undefined;
    this.observer?.disconnect();
    document.removeEventListener('visibilitychange', this.sync);
  }
}
