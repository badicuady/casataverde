export type Language = 'ro' | 'en';
export interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
  slides: readonly string[];
}
export const categories: Record<Language, readonly Category[]> = {
  ro: [
    {
      id: 'roof',
      name: 'Acoperișuri',
      title: 'Protecție. De la prima linie.',
      description: 'Sisteme complete de acoperiș, de la învelitoare la accesorii.',
      slides: ['Învelitori fălțuite', 'Țiglă metalică', 'Sisteme pluviale'],
    },
    {
      id: 'climate',
      name: 'Climatizare',
      title: 'Confort, în fiecare anotimp.',
      description: 'Soluții pentru încălzire, răcire și prepararea apei calde menajere.',
      slides: ['Pompe de căldură', 'Aer condiționat', 'Apă caldă menajeră'],
    },
    {
      id: 'ceiling',
      name: 'Tavane extensibile',
      title: 'O altă perspectivă. Deasupra ta.',
      description: 'Tavane extensibile și lumină integrată pentru spații cu personalitate.',
      slides: ['Finisaj mat', 'Finisaj lucios', 'Tavan luminos'],
    },
    {
      id: 'storage',
      name: 'Huawei: energie & stocare',
      title: 'Energia zilei. Păstrată pentru tine.',
      description:
        'Baterii și soluții solare Huawei. Imaginile sunt ilustrative și nu reprezintă modele Huawei.',
      slides: ['Stocare rezidențială', 'Invertoare solare', 'Energie integrată'],
    },
    {
      id: 'smart',
      name: 'Smart Home & electric',
      title: 'Casa care ține pasul cu tine.',
      description:
        'Automatizări Smart Home, instalații electrice moderne și echipamente pentru o casă conectată.',
      slides: ['Control inteligent', 'Întrerupătoare și prize', 'Tablouri electrice'],
    },
    {
      id: 'solar',
      name: 'Sisteme fotovoltaice',
      title: 'Un nou început. Cu energie solară.',
      description:
        'Echipamente complete pentru sisteme fotovoltaice și soluții de energie regenerabilă.',
      slides: ['Panouri fotovoltaice', 'Structuri de montaj', 'Conversie și conectare'],
    },
  ],
  en: [
    {
      id: 'roof',
      name: 'Roofing systems',
      title: 'Protection. From the very first layer.',
      description: 'Complete roofing systems, from roof coverings to finishing accessories.',
      slides: ['Standing-seam roofing', 'Metal roof tiles', 'Rainwater systems'],
    },
    {
      id: 'climate',
      name: 'Heating & cooling',
      title: 'Comfort, through every season.',
      description: 'Solutions for heating, cooling and domestic hot water preparation.',
      slides: ['Heat pumps', 'Air conditioning', 'Domestic hot water'],
    },
    {
      id: 'ceiling',
      name: 'Stretch ceilings',
      title: 'A fresh perspective. Above you.',
      description: 'Stretch ceilings and integrated lighting for spaces with character.',
      slides: ['Matte finish', 'Gloss finish', 'Luminous ceiling'],
    },
    {
      id: 'storage',
      name: 'Huawei: energy & storage',
      title: 'Today’s energy. Saved for you.',
      description:
        'Huawei batteries and solar solutions. Images are illustrative and do not depict Huawei models.',
      slides: ['Home battery storage', 'Solar inverters', 'Integrated energy'],
    },
    {
      id: 'smart',
      name: 'Smart Home & electrical',
      title: 'A home that moves with you.',
      description:
        'Smart Home automation, modern electrical installations and equipment for a connected home.',
      slides: ['Smart controls', 'Switches and sockets', 'Distribution boards'],
    },
    {
      id: 'solar',
      name: 'Photovoltaic systems',
      title: 'A new beginning. Powered by sunlight.',
      description: 'Complete equipment for photovoltaic systems and renewable energy solutions.',
      slides: ['Photovoltaic panels', 'Mounting systems', 'Conversion and connection'],
    },
  ],
};
export const copy = {
  ro: {
    solutions: 'Soluții',
    about: 'Despre noi',
    contact: 'Contact',
    hero: 'Viitorul casei tale.',
    green: 'Mai verde.',
    intro: 'Tehnologii inteligente pentru o casă eficientă, confortabilă și conectată.',
    explore: 'Explorează soluțiile',
    ecosystem: 'O casă. Un ecosistem complet.',
    heading: 'Tot ce are nevoie',
    headingEnd: 'o casă de mâine.',
    vision: 'Șase direcții. Aceeași viziune: confort, eficiență și energie curată.',
    conceptual: 'Imagine conceptuală',
    placeholder: 'Selecție demonstrativă · Produsele vor fi adăugate în curând.',
    aboutTitle: 'Tehnologia potrivită.',
    aboutEnd: 'Pentru felul tău de a locui.',
    aboutText:
      'Aducem împreună soluții pentru anvelopa casei, confort interior și energie regenerabilă. Un punct de plecare pentru proiectul tău.',
    contactTitle: 'Casa ta,',
    contactEnd: 'următorul capitol.',
    talk: 'Spune-ne ce ai în plan.',
    whatsapp: 'Hai să vorbim pe WhatsApp',
    message: 'Bună! Aș dori mai multe informații despre soluțiile Casa Ta Verde.',
    footer: 'Tehnologie pentru un viitor mai verde.',
    top: 'Înapoi sus',
    next: 'Imaginea următoare',
    previous: 'Imaginea anterioară',
    gallery: 'Galerie de imagini',
    pause: 'Oprește animația',
    play: 'Pornește animația',
    skip: 'Sari la conținut',
    menu: 'Deschide meniul',
    close: 'Închide meniul',
    language: 'Limba site-ului',
    title: 'Casa Ta Verde — Tehnologie pentru un viitor mai verde',
  },
  en: {
    solutions: 'Solutions',
    about: 'About us',
    contact: 'Contact',
    hero: 'Your home’s future.',
    green: 'Greener.',
    intro: 'Intelligent technologies for an efficient, comfortable and connected home.',
    explore: 'Explore the solutions',
    ecosystem: 'One home. A complete ecosystem.',
    heading: 'Everything a home',
    headingEnd: 'of tomorrow needs.',
    vision: 'Six directions. One vision: comfort, efficiency and clean energy.',
    conceptual: 'Concept image',
    placeholder: 'Illustrative selection · Products coming soon.',
    aboutTitle: 'The right technology.',
    aboutEnd: 'For the way you live.',
    aboutText:
      'We bring together solutions for your home’s exterior, indoor comfort and renewable energy. A starting point for your project.',
    contactTitle: 'Your home,',
    contactEnd: 'the next chapter.',
    talk: 'Tell us what you have in mind.',
    whatsapp: 'Let’s talk on WhatsApp',
    message: 'Hello! I would like to learn more about Casa Ta Verde solutions.',
    footer: 'Technology for a greener future.',
    top: 'Back to top',
    next: 'Next image',
    previous: 'Previous image',
    gallery: 'Image gallery',
    pause: 'Pause animation',
    play: 'Play animation',
    skip: 'Skip to content',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Website language',
    title: 'Casa Ta Verde — Technology for a greener future',
  },
} as const;
