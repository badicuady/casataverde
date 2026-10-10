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
      name: 'Huawei & Deye: stocare',
      title: 'Energia zilei. Păstrată pentru tine.',
      description:
        'Baterii, invertoare hibride și monitorizare Huawei FusionSolar sau Deye, alese în funcție de proiect. Imagini conceptuale.',
      slides: ['Stocare rezidențială', 'Invertoare solare', 'Energie integrată'],
    },
    {
      id: 'smart',
      name: 'Smart Home & electric',
      title: 'Casa care ține pasul cu tine.',
      description:
        'Control inteligent Case Smart, videointerfoane, supraveghere video, alarme și automatizări de porți Genway.',
      slides: ['Control inteligent', 'Întrerupătoare și prize', 'Tablouri electrice'],
    },
    {
      id: 'solar',
      name: 'Sisteme fotovoltaice',
      title: 'Un nou început. Cu energie solară.',
      description:
        'Panouri, acumulatori și echipamente fotovoltaice SolarHev și Genway, completate de stații de încărcare pentru mașini electrice.',
      slides: ['Panouri fotovoltaice', 'Structuri de montaj', 'Conversie și conectare'],
    },
    {
      id: 'materials',
      name: 'Construcții & finisaje',
      title: 'O casă bună. Strat cu strat.',
      description:
        'Lemn, izolații, zidărie și finisaje MaxBau, alături de materiale de construcții, lemn și echipamente sanitare Bimicat Construct.',
      slides: ['Lemn și plăci OSB', 'Izolații și zidărie', 'Echipamente sanitare'],
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
      name: 'Huawei & Deye: storage',
      title: 'Today’s energy. Saved for you.',
      description:
        'Batteries, hybrid inverters and monitoring from Huawei FusionSolar or Deye, selected for your project. Concept images.',
      slides: ['Home battery storage', 'Solar inverters', 'Integrated energy'],
    },
    {
      id: 'smart',
      name: 'Smart Home & electrical',
      title: 'A home that moves with you.',
      description:
        'Case Smart controls, plus Genway video intercoms, video surveillance, alarms and gate automation.',
      slides: ['Smart controls', 'Switches and sockets', 'Distribution boards'],
    },
    {
      id: 'solar',
      name: 'Photovoltaic systems',
      title: 'A new beginning. Powered by sunlight.',
      description:
        'SolarHev and Genway panels, batteries and photovoltaic equipment, complemented by electric vehicle charging stations.',
      slides: ['Photovoltaic panels', 'Mounting systems', 'Conversion and connection'],
    },
    {
      id: 'materials',
      name: 'Construction & finishes',
      title: 'A better home. Layer by layer.',
      description:
        'MaxBau timber, insulation, masonry and finishes, alongside construction materials, timber and sanitary equipment from Bimicat Construct.',
      slides: ['Timber and OSB boards', 'Insulation and masonry', 'Sanitary equipment'],
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
    vision: 'Șapte direcții. Aceeași viziune: confort, eficiență și energie curată.',
    conceptual: 'Imagine conceptuală',
    placeholder: 'Imagini conceptuale · Echipamentele se aleg în funcție de proiect.',
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
    vision: 'Seven directions. One vision: comfort, efficiency and clean energy.',
    conceptual: 'Concept image',
    placeholder: 'Concept images · Equipment is selected for each project.',
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
