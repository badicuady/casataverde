import { Component, input } from '@angular/core';
@Component({
  selector: 'app-icon',
  template: `<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    @switch (name()) {
      @case ('arrow') {
        <path d="M4 12h15m-6-6 6 6-6 6" />
      }
      @case ('down') {
        <path d="M12 4v16m-6-6 6 6 6-6" />
      }
      @case ('up') {
        <path d="M12 20V4m-6 6 6-6 6 6" />
      }
      @case ('pause') {
        <path d="M9 5v14M15 5v14" />
      }
      @case ('play') {
        <path d="m8 5 11 7-11 7Z" />
      }
      @case ('menu') {
        <path d="M4 8h16M4 16h16" />
      }
      @case ('close') {
        <path d="m6 6 12 12M6 18 18 6" />
      }
      @case ('whatsapp') {
        <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" />
        <path
          d="M8.2 7.5c-.8.4-.8 1.6-.3 2.8 1.1 2.6 3.1 4.6 5.7 5.2 1.1.3 2.1-.3 2.3-1.2l-2.5-1.5-1.2 1c-1.6-.8-2.7-1.9-3.3-3.3l.8-1.2-1.1-2Z"
        />
      }
    }
  </svg>`,
  styles: [
    ':host{display:inline-flex;width:24px;height:24px;flex:none}svg{width:100%;height:100%}',
  ],
})
export class Icon {
  readonly name = input('arrow');
}
