import {
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { categories, copy, Language } from '../data/content';
import { Icon } from './icon';
@Component({
  selector: 'app-product-gallery',
  imports: [Icon],
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
})
export class ProductGallery {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  readonly language = input<Language>('ro');
  readonly active = input(0);
  readonly activeChange = output<number>();
  readonly items = computed(() => categories[this.language()]);
  readonly text = computed(() => copy[this.language()]);
  readonly category = computed(() => this.items()[this.active()]);
  readonly slides = signal<Record<number, number>>({});
  readonly slide = computed(() => this.slides()[this.active()] ?? 0);
  readonly artwork = computed(() => `url('/images/${this.category().id}-gallery.webp')`);
  constructor() {
    afterRenderEffect(() => {
      this.active();
      const list = this.host.nativeElement.querySelector<HTMLElement>('.category-list');
      const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (list && tab && list.scrollWidth > list.clientWidth) {
        list.scrollLeft +=
          tab.getBoundingClientRect().left - list.getBoundingClientRect().left - 24;
      }
    });
  }
  setSlide(index: number): void {
    this.slides.update((current) => ({ ...current, [this.active()]: (index + 3) % 3 }));
  }
  onTabKey(event: KeyboardEvent): void {
    const keys: Record<string, number> = {
      ArrowDown: (this.active() + 1) % 6,
      ArrowRight: (this.active() + 1) % 6,
      ArrowUp: (this.active() + 5) % 6,
      ArrowLeft: (this.active() + 5) % 6,
      Home: 0,
      End: 5,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    this.activeChange.emit(next);
    document.getElementById(`category-${next}`)?.focus();
  }
}
