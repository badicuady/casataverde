import { Language } from './content';

export type PartnerCategory =
  'all' | 'roof' | 'climate' | 'interior' | 'smart' | 'energy' | 'materials';
export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  additionalCategories?: readonly PartnerCategory[];
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
  {
    id: 'deye',
    name: 'Deye',
    category: 'energy',
    url: 'https://deye.com/',
    logo: media + 'logo-deye.webp',
    image: media + 'deye-inverter.webp',
    accent: '#ac93fa',
    keywords: 'hybrid inverter invertor hibrid baterii stocare ess storage monitoring deye cloud',
    description: {
      ro: 'Invertoare hibride, baterii și monitorizare Deye Cloud pentru energia casei tale.',
      en: 'Hybrid inverters, batteries and Deye Cloud monitoring for your home’s energy.',
    },
  },
  {
    id: 'genway',
    name: 'Genway',
    category: 'energy',
    additionalCategories: ['smart'],
    url: 'https://www.genway.ro/',
    logo: media + 'logo-genway.webp',
    image: media + 'genway-battery.webp',
    accent: '#c6f47a',
    keywords:
      'solar fotovoltaice panouri baterii storage interfoane videointerfoane supraveghere video alarma security porti automatizari incarcare ev',
    description: {
      ro: 'Fotovoltaice și stocare, videointerfoane, supraveghere video și automatizări de acces.',
      en: 'Solar and storage, video intercoms, video surveillance and access automation.',
    },
  },
  {
    id: 'maxbau',
    name: 'MaxBau',
    category: 'materials',
    additionalCategories: ['roof', 'interior', 'energy'],
    url: 'https://www.maxbau.ro/',
    image: media + 'materials-timber.webp',
    accent: '#9bead6',
    keywords:
      'constructii lemn osb izolatii gips carton zidarie finisaje sanitare timber insulation building materials fotovoltaice',
    description: {
      ro: 'Lemn, izolații, finisaje și echipamente fotovoltaice pentru construcție și renovare.',
      en: 'Timber, insulation, finishes and photovoltaic equipment for building and renovation.',
    },
  },
  {
    id: 'bimicat',
    name: 'Bimicat Construct',
    category: 'materials',
    url: 'https://listafirme.ro/bimicat-construct-srl-36701388/',
    image: media + 'materials-sanitary.webp',
    accent: '#75e7f0',
    keywords:
      'bimicat construct srl constructii materiale lemn sanitare timber building materials sanitary',
    description: {
      ro: 'Materiale de construcții, lemn și echipamente sanitare pentru proiectul casei tale.',
      en: 'Construction materials, timber and sanitary equipment for your home project.',
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
      materials: 'Construcții',
    },
    marquee: 'Tehnologii care se completează.',
    directory: 'Explorează ecosistemul',
    connected: 'Totul este',
    connectedEnd: 'conectat.',
    connection: 'De la energia de pe acoperiș la confortul din fiecare cameră.',
    fieldLabel: 'Șapte perspective. O singură casă.',
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
      materials: 'Construction',
    },
    marquee: 'Technologies that work together.',
    directory: 'Explore the ecosystem',
    connected: 'Everything is',
    connectedEnd: 'connected.',
    connection: 'From the energy on your roof to the comfort in every room.',
    fieldLabel: 'Seven perspectives. One home.',
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
  imageBrand?: string;
  detailBrand?: string;
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
    brand: 'Huawei FusionSolar · Deye',
    imageBrand: 'Huawei FusionSolar',
    detailBrand: 'Deye',
    source: 'https://solar.huawei.com/ro/',
    image: media + 'huawei-battery.webp',
    detail: media + 'deye-inverter.webp',
  },
  {
    id: 'smart',
    brand: 'Case Smart · Genway',
    source: 'https://case-smart.ro/',
    image: media + 'smart-concept.webp',
    detail: media + 'smart-curtain.webp',
    imageConcept: true,
  },
  {
    id: 'solar',
    brand: 'SolarHev · Genway',
    imageBrand: 'SolarHev',
    source: 'https://solarhev.ro/',
    image: media + 'solar-detail.webp',
    detail: media + 'solar-panels.webp',
  },
  {
    id: 'materials',
    brand: 'MaxBau · Bimicat Construct',
    source: 'https://www.maxbau.ro/',
    image: media + 'materials-timber.webp',
    detail: media + 'materials-sanitary.webp',
    imageConcept: true,
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
    category: 'HUAWEI & DEYE · ENERGIE ȘI STOCARE',
    title: 'Soarele apune.',
    end: 'Energia continuă.',
    body: 'Producție, stocare, consum. Huawei FusionSolar și Deye oferă opțiuni pentru energia casei tale. Alegem invertorul, bateria și monitorizarea în funcție de proiect și de compatibilitatea echipamentelor.',
    features: [
      {
        title: 'Stocare rezidențială',
        body: 'Baterii Huawei LUNA2000 sau Deye ESS pentru a păstra energia zilei și a o folosi mai târziu.',
      },
      {
        title: 'Invertoare hibride',
        body: 'Huawei SUN2000 și invertoare hibride Deye, selectate împreună cu baterii compatibile.',
      },
      {
        title: 'Monitorizare',
        body: 'FusionSolar sau Deye Cloud: urmărește producția, stocarea și consumul în platforma sistemului ales.',
      },
    ],
    imageAlt: 'Baterie rezidențială Huawei LUNA2000 S1',
    detailAlt: 'Invertor hibrid Deye, imagine din prezentarea producătorului',
  },
  {
    category: 'SMART HOME ȘI INSTALAȚII ELECTRICE',
    title: 'Un gest mic.',
    end: 'O casă care răspunde.',
    body: 'Lumina potrivită, draperii automate și acces controlat. Echipamentele Case Smart și soluțiile de securitate Genway completează o instalație electrică bine proiectată, în jurul rutinei tale.',
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
        title: 'Supraveghere și alarmă',
        body: 'Camere video și sisteme de alarmă din portofoliul Genway, alese pentru spațiile de protejat.',
      },
      {
        title: 'Acces și interfonie',
        body: 'Videointerfoane, control de acces și automatizări pentru porți batante sau culisante.',
      },
    ],
    imageAlt: 'Concept de locuință inteligentă cu întrerupător tactil și draperii automatizate',
    detailAlt: 'Întrerupător pentru draperii Livolo, Case Smart',
  },
  {
    category: 'FOTOVOLTAICE ȘI ENERGIE REGENERABILĂ',
    title: 'Mai mult soare.',
    end: 'Mai multe posibilități.',
    body: 'Panourile sunt începutul. Cu echipamente SolarHev și Genway, producția, stocarea și încărcarea mașinii electrice pot fi planificate în jurul acoperișului și consumului tău.',
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
      {
        title: 'Încarcă',
        body: 'Stații de încărcare pentru mașini electrice din oferta Genway, dimensionate pentru instalația disponibilă.',
      },
    ],
    imageAlt: 'Panouri fotovoltaice la apus, imagine de prezentare SolarHev',
    detailAlt: 'Panouri fotovoltaice din prezentarea SolarHev',
  },
  {
    category: 'MATERIALE DE CONSTRUCȚII ȘI FINISAJE',
    title: 'O casă bună.',
    end: 'Strat cu strat.',
    body: 'Eficiența începe cu materialele potrivite. MaxBau și Bimicat Construct aduc în portofoliu soluții pentru construcție și amenajare, de la lemn și izolație la finisaje și echipamente sanitare.',
    features: [
      {
        title: 'Lemn și structură',
        body: 'Lemn pentru construcții și plăci OSB, alături de materiale pentru zidărie din oferta MaxBau.',
      },
      {
        title: 'Izolații și finisaje',
        body: 'Vată minerală, sisteme de gips-carton, pardoseli și finisaje MaxBau pentru anvelopă și interior.',
      },
      {
        title: 'Materiale și sanitare',
        body: 'Materiale de construcții, lemn și echipamente sanitare Bimicat Construct, selectate pentru proiect.',
      },
    ],
    imageAlt: 'Imagine conceptuală cu lemn pentru construcții și plăci OSB',
    detailAlt: 'Imagine conceptuală cu lavoar, baterie și accesorii sanitare',
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
    category: 'HUAWEI & DEYE · ENERGY AND STORAGE',
    title: 'The sun sets.',
    end: 'The energy stays.',
    body: 'Generation, storage, consumption. Huawei FusionSolar and Deye offer options for your home’s energy. Inverters, batteries and monitoring are selected for your project and equipment compatibility.',
    features: [
      {
        title: 'Residential storage',
        body: 'Huawei LUNA2000 or Deye ESS batteries store daytime generation for use later.',
      },
      {
        title: 'Hybrid inverters',
        body: 'Huawei SUN2000 and Deye hybrid inverters, selected alongside compatible batteries.',
      },
      {
        title: 'Monitoring',
        body: 'FusionSolar or Deye Cloud: follow generation, storage and consumption in your chosen system’s platform.',
      },
    ],
    imageAlt: 'Huawei LUNA2000 S1 residential battery',
    detailAlt: 'Deye hybrid inverter, manufacturer presentation image',
  },
  {
    category: 'SMART HOME AND ELECTRICAL SYSTEMS',
    title: 'One small gesture.',
    end: 'A home that responds.',
    body: 'The right light, automated curtains and controlled access. Case Smart equipment and Genway security solutions complement a well-designed electrical installation, built around your routines.',
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
        title: 'Surveillance and alarms',
        body: 'Video cameras and alarm systems from Genway’s range, selected for the spaces you want to protect.',
      },
      {
        title: 'Access and intercoms',
        body: 'Video intercoms, access control and automation for swing or sliding gates.',
      },
    ],
    imageAlt: 'Smart home concept with touch control and automated blinds',
    detailAlt: 'Livolo curtain switch, Case Smart',
  },
  {
    category: 'PHOTOVOLTAICS AND RENEWABLE ENERGY',
    title: 'More sunlight.',
    end: 'More possibilities.',
    body: 'Panels are the beginning. SolarHev and Genway equipment lets you plan generation, storage and electric vehicle charging around your roof and energy use.',
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
      {
        title: 'Charge',
        body: 'Electric vehicle charging stations from Genway’s range, sized for the available electrical installation.',
      },
    ],
    imageAlt: 'Solar panels at sunset, SolarHev presentation image',
    detailAlt: 'Photovoltaic panels presented by SolarHev',
  },
  {
    category: 'CONSTRUCTION MATERIALS AND FINISHES',
    title: 'A better home.',
    end: 'Layer by layer.',
    body: 'Efficiency starts with the right materials. MaxBau and Bimicat Construct expand the portfolio with building and finishing solutions, from timber and insulation to finishes and sanitary equipment.',
    features: [
      {
        title: 'Timber and structure',
        body: 'Construction timber and OSB boards, alongside masonry materials from MaxBau’s range.',
      },
      {
        title: 'Insulation and finishes',
        body: 'MaxBau mineral wool, plasterboard systems, flooring and finishes for the building envelope and interior.',
      },
      {
        title: 'Materials and sanitary',
        body: 'Bimicat Construct construction materials, timber and sanitary equipment, selected for your project.',
      },
    ],
    imageAlt: 'Concept image of construction timber and OSB boards',
    detailAlt: 'Concept image of a washbasin, mixer tap and sanitary fittings',
  },
];
export const stories: Record<Language, readonly Story[]> = {
  ro: ro.map((s, i) => ({ ...storyMedia[i], ...s })),
  en: en.map((s, i) => ({ ...storyMedia[i], ...s })),
};
