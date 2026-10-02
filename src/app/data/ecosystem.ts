import { Language } from './content';

export type PartnerCategory = 'all' | 'roof' | 'climate' | 'interior' | 'smart' | 'energy';
export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  url: string;
  logo?: string;
  image: string;
  description: Record<Language, string>;
  keywords: string;
  accent: string;
}
const media = '/images/partners/';
export const partners: readonly Partner[] = [
  {
    id: 'bilka',
    name: 'BILKA',
    category: 'roof',
    url: 'https://www.bilka.ro/',
    logo: media + 'logo-bilka.svg',
    image: media + 'roof-detail.webp',
    accent: '#75e7f0',
    keywords: 'roof acoperis metal tigla invelitori',
    description: {
      ro: 'Învelitori metalice, sisteme pluviale și accesorii pentru un acoperiș complet.',
      en: 'Metal roofing, rainwater systems and accessories for a complete roof.',
    },
  },
  {
    id: 'ferroli',
    name: 'Ferroli',
    category: 'climate',
    url: 'https://www.ferroli.com/',
    logo: media + 'logo-ferroli.svg',
    image: media + 'climate-air.webp',
    accent: '#9bead6',
    keywords: 'heat heating cooling incalzire racire pompe caldura apa calda',
    description: {
      ro: 'Pompe de căldură, climatizare și prepararea apei calde. Confort în fiecare anotimp.',
      en: 'Heat pumps, air conditioning and domestic hot water. Comfort in every season.',
    },
  },
  {
    id: 'tero',
    name: 'Tavane Tero',
    category: 'interior',
    url: '#story-ceiling',
    image: media + 'ceiling-concept.webp',
    accent: '#ac93fa',
    keywords: 'ceiling tavan interior lumina extensibil',
    description: {
      ro: 'Explorează posibilitățile tavanelor extensibile: suprafețe, finisaje și lumină.',
      en: 'Explore stretch ceiling possibilities: surfaces, finishes and light.',
    },
  },
  {
    id: 'case-smart',
    name: 'Case Smart',
    category: 'smart',
    url: 'https://case-smart.ro/',
    image: media + 'smart-switch.webp',
    accent: '#75e7f0',
    keywords: 'switch intrerupator automatizare electric senzori draperii',
    description: {
      ro: 'Întrerupătoare tactile, senzori și automatizări pentru o casă care răspunde.',
      en: 'Touch switches, sensors and automation for a home that responds.',
    },
  },
  {
    id: 'solarhev',
    name: 'SolarHev',
    category: 'energy',
    url: 'https://solarhev.ro/',
    logo: media + 'logo-solarhev.webp',
    image: media + 'solar-detail.webp',
    accent: '#c6f47a',
    keywords: 'solar panouri fotovoltaice invertor baterii photovoltaics',
    description: {
      ro: 'Panouri fotovoltaice, invertoare și acumulatori. Piesele unui sistem de energie.',
      en: 'Photovoltaic panels, inverters and batteries. The elements of an energy system.',
    },
  },
  {
    id: 'huawei',
    name: 'Huawei FusionSolar',
    category: 'energy',
    url: 'https://solar.huawei.com/ro/',
    logo: media + 'logo-huawei.webp',
    image: media + 'huawei-battery.webp',
    accent: '#ac93fa',
    keywords: 'luna sun2000 huawei stocare baterie storage monitoring',
    description: {
      ro: 'Producție solară, stocare și monitorizare într-un ecosistem conectat.',
      en: 'Solar generation, storage and monitoring in a connected ecosystem.',
    },
  },
];
export const ecosystemCopy = {
  ro: {
    label: 'ECOSISTEM',
    title: 'Un ecosistem.',
    end: 'Mai multe posibilități.',
    intro: 'Explorează brandurile și soluțiile pentru următorul capitol al casei tale.',
    search: 'Caută un brand sau o soluție',
    clear: 'Șterge căutarea',
    reset: 'Resetează filtrele',
    empty: 'Niciun rezultat deocamdată.',
    emptyHint: 'Încearcă alt nume sau explorează toate categoriile.',
    results: 'branduri',
    explore: 'Explorează',
    visit: 'Deschide site-ul',
    filters: {
      all: 'Toate',
      roof: 'Acoperișuri',
      climate: 'Climatizare',
      interior: 'Interior',
      smart: 'Smart Home',
      energy: 'Energie',
    },
    marquee: 'Tehnologii care se completează.',
    directory: 'Explorează ecosistemul',
    connected: 'Totul este',
    connectedEnd: 'conectat.',
    connection: 'De la energia de pe acoperiș la confortul din fiecare cameră.',
    fieldLabel: 'Șase perspective. O singură casă.',
    source: 'Imagini de prezentare',
    concept: 'Imagine conceptuală',
  },
  en: {
    label: 'ECOSYSTEM',
    title: 'One ecosystem.',
    end: 'More possibilities.',
    intro: 'Explore the brands and solutions for your home’s next chapter.',
    search: 'Search for a brand or solution',
    clear: 'Clear search',
    reset: 'Reset filters',
    empty: 'No matches just yet.',
    emptyHint: 'Try another name or explore all categories.',
    results: 'brands',
    explore: 'Explore',
    visit: 'Visit website',
    filters: {
      all: 'All',
      roof: 'Roofing',
      climate: 'Climate',
      interior: 'Interior',
      smart: 'Smart Home',
      energy: 'Energy',
    },
    marquee: 'Technologies that work together.',
    directory: 'Explore the ecosystem',
    connected: 'Everything is',
    connectedEnd: 'connected.',
    connection: 'From the energy on your roof to the comfort in every room.',
    fieldLabel: 'Six perspectives. One home.',
    source: 'Presentation images',
    concept: 'Concept image',
  },
};
export interface Story {
  id: string;
  category: string;
  title: string;
  end: string;
  body: string;
  features: readonly { title: string; body: string }[];
  brand: string;
  source: string;
  image: string;
  detail: string;
  imageAlt: string;
  detailAlt: string;
  concept?: boolean;
  imageConcept?: boolean;
}
const storyMedia = [
  {
    id: 'roof',
    brand: 'BILKA',
    source: 'https://www.bilka.ro/retro-panel/',
    image: media + 'roof-architecture.webp',
    detail: media + 'roof-detail.webp',
  },
  {
    id: 'climate',
    brand: 'Ferroli',
    source: 'https://www.ferroli.com/',
    image: media + 'climate-room.webp',
    detail: media + 'climate-heatpump.webp',
  },
  {
    id: 'ceiling',
    brand: 'Tavane Tero',
    source: 'https://www.tavanetero.ro/',
    image: media + 'ceiling-concept.webp',
    detail: '/images/ceiling-gallery.webp',
    concept: true,
  },
  {
    id: 'storage',
    brand: 'Huawei FusionSolar',
    source: 'https://solar.huawei.com/ro/',
    image: media + 'huawei-battery.webp',
    detail: media + 'huawei-inverter.webp',
  },
  {
    id: 'smart',
    brand: 'Case Smart',
    source: 'https://case-smart.ro/',
    image: media + 'smart-concept.webp',
    detail: media + 'smart-curtain.webp',
    imageConcept: true,
  },
  {
    id: 'solar',
    brand: 'SolarHev',
    source: 'https://solarhev.ro/',
    image: media + 'solar-detail.webp',
    detail: media + 'solar-panels.webp',
  },
];
const ro = [
  {
    category: 'ACOPERIȘURI COMPLETE',
    title: 'Prima linie de protecție.',
    end: 'Ultimul detaliu de design.',
    body: 'O casă începe cu un acoperiș bine gândit. Învelitoarea, evacuarea apei și accesoriile formează un sistem în care fiecare detaliu își are locul.',
    features: [
      {
        title: 'Învelitori metalice',
        body: 'Țiglă metalică și profile cu linii contemporane, în culori și finisaje care definesc arhitectura.',
      },
      {
        title: 'Sisteme pluviale',
        body: 'Jgheaburi și burlane alese împreună cu învelitoarea, pentru un ansamblu coerent.',
      },
      {
        title: 'Accesorii și finisaje',
        body: 'Coame, dolii, membrane și elemente de închidere care completează proiectul.',
      },
    ],
    imageAlt: 'Arhitectură rezidențială cu acoperiș metalic BILKA',
    detailAlt: 'Casă cu acoperiș BILKA Retro Panel',
  },
  {
    category: 'CONFORT INTERIOR',
    title: 'Anotimpurile se schimbă.',
    end: 'Confortul rămâne.',
    body: 'Dimineți de iarnă, după-amiezi de vară, rutina de fiecare zi. Încălzirea, răcirea și apa caldă se aleg în funcție de spațiu, izolație și felul în care locuiești.',
    features: [
      {
        title: 'Pompe de căldură',
        body: 'Un punct de plecare pentru încălzire și, în funcție de sistem, răcire și apă caldă.',
      },
      {
        title: 'Climatizare',
        body: 'Soluții pentru temperatură interioară, adaptate camerelor și utilizării lor.',
      },
      {
        title: 'Apă caldă menajeră',
        body: 'Echipamente și rezervoare dimensionate pentru ritmul și nevoile locuinței.',
      },
    ],
    imageAlt: 'Interior luminos din prezentarea Ferroli',
    detailAlt: 'Pompe de căldură din gama Ferroli',
  },
  {
    category: 'TAVANE EXTENSIBILE',
    title: 'Ridică privirea.',
    end: 'Schimbă perspectiva.',
    body: 'Un tavan poate schimba complet felul în care simți un spațiu. Suprafețe continue, reflexii discrete și lumină integrată — un nou plan pentru imaginație.',
    features: [
      { title: 'Mat', body: 'O suprafață calmă, discretă, care lasă arhitectura să vorbească.' },
      {
        title: 'Lucios',
        body: 'Reflexii care adaugă profunzime și o perspectivă diferită asupra camerei.',
      },
      { title: 'Luminos', body: 'Membrane translucide și scenarii de iluminat gândite împreună.' },
    ],
    imageAlt: 'Concept de interior cu tavan luminos curbat',
    detailAlt: 'Concepte de finisaje pentru tavane extensibile',
  },
  {
    category: 'HUAWEI · ENERGIE ȘI STOCARE',
    title: 'Soarele apune.',
    end: 'Energia continuă.',
    body: 'Producție, stocare, consum. Explorează cum se leagă bateriile LUNA2000, invertoarele și monitorizarea FusionSolar într-un sistem ales pentru casa ta.',
    features: [
      {
        title: 'Stocare rezidențială',
        body: 'Energia produsă în timpul zilei poate fi păstrată pentru un consum ulterior.',
      },
      {
        title: 'Conversie și control',
        body: 'Invertorul conectează producția fotovoltaică la utilizarea energiei în locuință.',
      },
      {
        title: 'Monitorizare',
        body: 'Urmărește producția și consumul pentru a înțelege cum funcționează sistemul.',
      },
    ],
    imageAlt: 'Baterie rezidențială Huawei LUNA2000 S1',
    detailAlt: 'Invertor Huawei SUN2000 MAP0',
  },
  {
    category: 'SMART HOME ȘI INSTALAȚII ELECTRICE',
    title: 'Un gest mic.',
    end: 'O casă care răspunde.',
    body: 'Lumina potrivită, temperatura dorită, draperiile care urmăresc programul tău. Automatizările pornesc de la rutinele tale și de la o instalație electrică bine proiectată.',
    features: [
      {
        title: 'Control tactil',
        body: 'Întrerupătoare și prize cu finisaje din sticlă, integrate în designul interior.',
      },
      {
        title: 'Scenarii inteligente',
        body: 'Senzori, relee și control pentru iluminat, temperatură și draperii.',
      },
      {
        title: 'Baza electrică',
        body: 'Circuite, protecții și echipamente selectate pentru proiect și compatibilitatea sistemului.',
      },
    ],
    imageAlt: 'Concept de locuință inteligentă cu întrerupător tactil și draperii automatizate',
    detailAlt: 'Întrerupător pentru draperii Livolo, Case Smart',
  },
  {
    category: 'FOTOVOLTAICE ȘI ENERGIE REGENERABILĂ',
    title: 'Mai mult soare.',
    end: 'Mai multe posibilități.',
    body: 'Panourile sunt începutul. Invertoarele, stocarea, structurile de montaj și conexiunile completează un sistem fotovoltaic adaptat acoperișului și consumului tău.',
    features: [
      {
        title: 'Captează',
        body: 'Panouri fotovoltaice alese în funcție de suprafață, orientare și proiect.',
      },
      {
        title: 'Transformă',
        body: 'Invertoare și echipamente care fac energia solară utilizabilă în casă.',
      },
      {
        title: 'Conectează',
        body: 'Montaj, cablare și protecții: detaliile care leagă întregul sistem.',
      },
    ],
    imageAlt: 'Panouri fotovoltaice la apus, imagine de prezentare SolarHev',
    detailAlt: 'Panouri fotovoltaice din prezentarea SolarHev',
  },
];
const en = [
  {
    category: 'COMPLETE ROOFING SYSTEMS',
    title: 'The first line of protection.',
    end: 'The final design detail.',
    body: 'A home starts with a thoughtfully designed roof. The covering, rainwater drainage and accessories form a system where every detail belongs.',
    features: [
      {
        title: 'Metal roofing',
        body: 'Metal tiles and contemporary profiles in colours and finishes that shape the architecture.',
      },
      {
        title: 'Rainwater systems',
        body: 'Gutters and downpipes selected alongside the roof covering for a coherent whole.',
      },
      {
        title: 'Accessories and finishes',
        body: 'Ridges, valleys, membranes and finishing elements that complete the project.',
      },
    ],
    imageAlt: 'Residential architecture with a BILKA metal roof',
    detailAlt: 'House with a BILKA Retro Panel roof',
  },
  {
    category: 'INDOOR COMFORT',
    title: 'Seasons change.',
    end: 'Comfort stays.',
    body: 'Winter mornings, summer afternoons, everyday routines. Heating, cooling and hot water are selected around your space, insulation and the way you live.',
    features: [
      {
        title: 'Heat pumps',
        body: 'A starting point for heating and, depending on the system, cooling and hot water.',
      },
      {
        title: 'Air conditioning',
        body: 'Indoor temperature solutions adapted to each room and how you use it.',
      },
      {
        title: 'Domestic hot water',
        body: 'Equipment and tanks sized around the rhythm and needs of your household.',
      },
    ],
    imageAlt: 'Bright interior from Ferroli’s presentation',
    detailAlt: 'Heat pumps from the Ferroli range',
  },
  {
    category: 'STRETCH CEILINGS',
    title: 'Look up.',
    end: 'See things differently.',
    body: 'A ceiling can transform how a space feels. Continuous surfaces, subtle reflections and integrated light — a new dimension for your imagination.',
    features: [
      { title: 'Matte', body: 'A calm, understated surface that lets the architecture speak.' },
      {
        title: 'Gloss',
        body: 'Reflections that add depth and a different perspective on the room.',
      },
      {
        title: 'Luminous',
        body: 'Translucent membranes and lighting scenarios designed together.',
      },
    ],
    imageAlt: 'Interior concept with a curved luminous ceiling',
    detailAlt: 'Stretch ceiling finish concepts',
  },
  {
    category: 'HUAWEI · ENERGY AND STORAGE',
    title: 'The sun sets.',
    end: 'The energy stays.',
    body: 'Generation, storage, consumption. Explore how LUNA2000 batteries, inverters and FusionSolar monitoring connect in a system selected for your home.',
    features: [
      {
        title: 'Residential storage',
        body: 'Energy generated during the day can be stored for use later.',
      },
      {
        title: 'Conversion and control',
        body: 'The inverter connects photovoltaic generation to energy use in your home.',
      },
      {
        title: 'Monitoring',
        body: 'Follow generation and consumption to understand how the system works.',
      },
    ],
    imageAlt: 'Huawei LUNA2000 S1 residential battery',
    detailAlt: 'Huawei SUN2000 MAP0 inverter',
  },
  {
    category: 'SMART HOME AND ELECTRICAL SYSTEMS',
    title: 'One small gesture.',
    end: 'A home that responds.',
    body: 'The right light, your favourite temperature, curtains that follow your schedule. Automation starts with your routines and a well-designed electrical installation.',
    features: [
      {
        title: 'Touch control',
        body: 'Glass-finish switches and outlets that complement your interior.',
      },
      {
        title: 'Smart scenarios',
        body: 'Sensors, relays and controls for lighting, temperature and curtains.',
      },
      {
        title: 'The electrical foundation',
        body: 'Circuits, protection and equipment selected for the project and system compatibility.',
      },
    ],
    imageAlt: 'Smart home concept with touch control and automated blinds',
    detailAlt: 'Livolo curtain switch, Case Smart',
  },
  {
    category: 'PHOTOVOLTAICS AND RENEWABLE ENERGY',
    title: 'More sunlight.',
    end: 'More possibilities.',
    body: 'Panels are the beginning. Inverters, storage, mounting structures and connections complete a photovoltaic system adapted to your roof and energy use.',
    features: [
      {
        title: 'Capture',
        body: 'Photovoltaic panels selected for your available space, orientation and project.',
      },
      { title: 'Convert', body: 'Inverters and equipment that make solar energy usable at home.' },
      {
        title: 'Connect',
        body: 'Mounting, cabling and protection: the details that bring the whole system together.',
      },
    ],
    imageAlt: 'Solar panels at sunset, SolarHev presentation image',
    detailAlt: 'Photovoltaic panels presented by SolarHev',
  },
];
export const stories: Record<Language, readonly Story[]> = {
  ro: ro.map((s, i) => ({ ...storyMedia[i], ...s })),
  en: en.map((s, i) => ({ ...storyMedia[i], ...s })),
};
