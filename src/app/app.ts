import {
  Component,
  NgZone,
  OnDestroy,
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
import { categories, copy, Language } from './data/content';
@Component({
  selector: 'app-root',
  imports: [
    Icon,
    EnergyScene,
    ProductGallery,
    CategoryStories,
    PartnerMarquee,
    PartnerDirectory,
    EnergyField,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnDestroy {
  ngOnDestroy(): void {
    ScrollTrigger.killAll();
  }
  private readonly zone = inject(NgZone);
  readonly language = signal<Language>(this.savedLanguage());
  readonly text = computed(() => copy[this.language()]);
  readonly categories = computed(() => categories[this.language()]);
  readonly activeCategory = signal(0);
  readonly menuOpen = signal(false);
  readonly paused = signal(false);
  readonly whatsappUrl = computed(
    () => `https://wa.me/40723200709?text=${encodeURIComponent(this.text().message)}`,
  );
  constructor() {
    afterRenderEffect(() => {
      this.language();
      this.paused();
      this.zone.runOutsideAngular(() => ScrollTrigger.refresh());
    });
    effect(() => {
      document.documentElement.lang = this.language();
      document.title = this.text().title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', this.text().intro);
      try {
        localStorage.setItem('casa-ta-verde-language', this.language());
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
