export type Locale = 'ro' | 'en';
export const locales: Locale[] = ['ro', 'en'];
export const site = {
  name: 'Casa Ta Verde',
  origin: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  draft: import.meta.env.PUBLIC_DRAFT !== 'false',
  whatsapp: 'https://wa.me/40723200709',
  phone: /^\+[1-9]\d{7,14}$/.test(import.meta.env.PUBLIC_PHONE || '')
    ? import.meta.env.PUBLIC_PHONE
    : '',
};
export const routes = {
  home: { ro: '/', en: '/en/' },
  residential: { ro: '/pentru-casa/', en: '/en/for-your-home/' },
  professional: { ro: '/pentru-profesionisti/', en: '/en/for-professionals/' },
  about: { ro: '/despre/', en: '/en/about/' },
  contact: { ro: '/contact/', en: '/en/contact/' },
  configure: { ro: '/configureaza/', en: '/en/configure/' },
  privacy: { ro: '/confidentialitate/', en: '/en/privacy/' },
};
export type PageKey = keyof typeof routes;
export const route = (key: PageKey, lang: Locale) => routes[key][lang];
export const t = (lang: Locale, ro: string, en: string) => (lang === 'ro' ? ro : en);
export const ui = {
  ro: {
    home: 'Acasă',
    residential: 'Pentru casa ta',
    professional: 'Pentru profesioniști',
    systems: 'Soluțiile noastre',
    about: 'Despre noi',
    quote: 'Solicită o ofertă',
    configure: 'Configurează proiectul',
    discover: 'Descoperă soluția',
    privacy: 'Confidențialitate',
    whatsapp: 'Discută cu noi pe WhatsApp (se deschide într-o filă nouă)',
    concept: 'Concept arhitectural · imagine generată cu AI',
    compatibility:
      'Fiecare proiect este diferit. Compatibilitatea și dimensionarea se verifică pentru produsele și clădirea alese.',
  },
  en: {
    home: 'Home',
    residential: 'For your home',
    professional: 'For professionals',
    systems: 'Our solutions',
    about: 'About us',
    quote: 'Request a quote',
    configure: 'Configure your project',
    discover: 'Explore the solution',
    privacy: 'Privacy',
    whatsapp: 'Chat with us on WhatsApp (opens in a new tab)',
    concept: 'Architectural concept · AI-generated image',
    compatibility:
      'Every project is different. Compatibility and sizing require review for the selected products and building.',
  },
};
