import { Component, computed, effect, input, signal } from '@angular/core';
import { Language } from '../data/content';
import { businessContact, consultancyCopy } from '../data/consultancy';
import { Icon } from './icon';

@Component({
  selector: 'app-project-enquiry',
  imports: [Icon],
  templateUrl: './project-enquiry.html',
  styleUrl: './project-enquiry.css',
})
export class ProjectEnquiry {
  readonly language = input.required<Language>();
  readonly copy = computed(() => consultancyCopy[this.language()]);
  readonly service = signal('project');
  readonly prepared = signal<string | null>(null);
  readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${businessContact.whatsapp}?text=${encodeURIComponent(this.prepared() ?? '')}`,
  );
  readonly emailUrl = computed(
    () =>
      `mailto:${businessContact.email}?subject=${encodeURIComponent(this.copy().subject)}&body=${encodeURIComponent(this.prepared() ?? '')}`,
  );
  constructor() {
    effect(() => {
      this.language();
      this.prepared.set(null);
    });
  }
  selectService(id: string): void {
    if (this.copy().services.some((service) => service.id === id)) this.service.set(id);
    this.prepared.set(null);
  }
  clearPrepared(event: Event): void {
    const control = event.target;
    if (control instanceof HTMLInputElement) control.setCustomValidity('');
    this.prepared.set(null);
  }
  prepare(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? '').trim();
    for (const key of ['name', 'locality']) {
      const control = form.elements.namedItem(key) as HTMLInputElement;
      control.setCustomValidity(
        read(key)
          ? ''
          : this.language() === 'ro'
            ? 'Completează acest câmp.'
            : 'Please fill in this field.',
      );
    }
    const phone = form.elements.namedItem('phone') as HTMLInputElement;
    const digits = read('phone').replace(/\D/g, '');
    phone.setCustomValidity(
      digits.length >= 7 && digits.length <= 15
        ? ''
        : this.language() === 'ro'
          ? 'Introdu un număr de telefon valid.'
          : 'Enter a valid phone number.',
    );
    if (!form.reportValidity()) return;
    const copy = this.copy();
    const service = copy.services.find((item) => item.id === read('service'));
    if (!service) return;
    this.prepared.set(
      [
        copy.greeting,
        '',
        `${copy.name}: ${read('name')}`,
        `${copy.phone}: ${read('phone')}`,
        `${copy.service}: ${service.name}`,
        `${copy.locality}: ${read('locality')}`,
        ...(read('message') ? ['', read('message')] : []),
      ].join('\n'),
    );
  }
}
