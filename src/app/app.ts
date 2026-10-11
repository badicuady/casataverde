import {
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  afterRenderEffect,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CategoryStories } from './components/category-stories';
import { PartnerMarquee } from './components/partner-marquee';
import { PartnerDirectory } from './components/partner-directory';
import { EnergyField } from './components/energy-field';
import { Icon } from './components/icon';
import { EnergyScene } from './components/energy-scene';
import { ProductGallery } from './components/product-gallery';
import { ProjectContext } from './components/project-context';
import { ProjectEnquiry } from './components/project-enquiry';
import { HomeBuild } from './components/home-build';
import { businessContact, businessIdentity } from './data/consultancy';
import { categories, copy, Language } from './data/content';
@Component({
  selector: 'app-root',
  imports: [
    Icon,
    EnergyScene,
    ProductGallery,
    ProjectContext,
    ProjectEnquiry,
    HomeBuild,
    CategoryStories,
    PartnerMarquee,
    PartnerDirectory,
    EnergyField,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.updateHeaderScrolled();
      window.addEventListener('scroll', this.updateHeaderScrolled, { passive: true });
      window.addEventListener('pageshow', this.updateHeaderScrolled);
    });
  }
  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.updateHeaderScrolled);
    window.removeEventListener('pageshow', this.updateHeaderScrolled);
    ScrollTrigger.killAll();
  }
  private readonly zone = inject(NgZone);
  readonly language = signal<Language>(this.savedLanguage());
  readonly text = computed(() => copy[this.language()]);
  readonly company = businessIdentity;
  readonly categories = computed(() => categories[this.language()]);
  readonly activeCategory = signal(0);
  readonly menuOpen = signal(false);
  readonly headerScrolled = signal(false);
  readonly paused = signal(false);
  readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${businessContact.whatsapp}?text=${encodeURIComponent(this.text().message)}`,
  );
  private readonly updateHeaderScrolled = (): void => {
    const scrolled = window.scrollY > 0;
    if (scrolled !== this.headerScrolled()) {
      this.zone.run(() => this.headerScrolled.set(scrolled));
    }
  };
  constructor() {
    afterRenderEffect(() => {
      this.language();
      this.paused();
      this.zone.runOutsideAngular(() => ScrollTrigger.refresh());
    });
    effect(() => {
      const language = this.language();
      const text = this.text();
      document.documentElement.lang = language;
      document.title = text.title;
      const metadata = {
        'meta[name="description"]': text.metaDescription,
        'meta[property="og:title"]': text.title,
        'meta[property="og:description"]': text.metaDescription,
        'meta[property="og:locale"]': language === 'ro' ? 'ro_RO' : 'en_GB',
        'meta[property="og:image:alt"]':
          language === 'ro'
            ? 'Casa Ta Verde — soluții pentru locuințe'
            : 'Casa Ta Verde — home solutions',
      };
      for (const [selector, content] of Object.entries(metadata)) {
        document.querySelector(selector)?.setAttribute('content', content);
      }
      try {
        localStorage.setItem('casa-ta-verde-language', language);
      } catch {
        /* Storage is optional. */
      }
    });
  }
  private savedLanguage(): Language {
    try {
      return localStorage.getItem('casa-ta-verde-language') === 'en' ? 'en' : 'ro';
    } catch {
      return 'ro';
    }
  }
  selectCategory(index: number): void {
    this.activeCategory.set(index);
    this.menuOpen.set(false);
  }
}
