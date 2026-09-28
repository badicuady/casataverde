import type { Locale } from './site';
export const categories = [
  {
    id: 'solar',
    number: '01',
    family: 0,
    related: ['heat', 'roof'],
    image: 'forest-residence',
    ro: {
      slug: 'panouri-fotovoltaice',
      name: 'Panouri fotovoltaice',
      short: 'Energie de la soare, pentru viața de acasă.',
      headline: 'Acoperișul tău. O nouă sursă de energie.',
      description:
        'Un sistem fotovoltaic începe cu felul în care folosești energia. Alegem punctele de plecare pentru un proiect adaptat consumului, acoperișului și planurilor tale.',
      connection:
        'Gândește panourile împreună cu învelitoarea și consumul pompei de căldură. Prinderile, puterea și traseele se verifică în proiect.',
      checks: [
        'Consumul de electricitate și orele în care îl folosești.',
        'Orientarea, umbrirea și starea structurii acoperișului.',
        'Spațiul pentru echipamente și posibilitatea unei extinderi.',
      ],
      question: 'Pot începe cu panouri și adăuga alte sisteme mai târziu?',
      answer:
        'Da, proiectul poate fi etapizat. Merită discutate de la început consumurile viitoare, spațiul disponibil și echipamentele care ar putea fi adăugate.',
    },
    en: {
      slug: 'solar-panels',
      name: 'Solar panels',
      short: 'Energy from the sun, for life at home.',
      headline: 'Your roof. A new source of energy.',
      description:
        'A photovoltaic system starts with how you use energy. Define a project around your consumption, your roof and your future plans.',
      connection:
        'Consider solar alongside the roof covering and heat pump consumption. Mounting, capacity and cable routes need project-specific review.',
      checks: [
        'Electricity consumption and when you use it.',
        'Roof orientation, shading and structural condition.',
        'Equipment space and potential future expansion.',
      ],
      question: 'Can I start with solar and add other systems later?',
      answer:
        'A project can be phased. Discuss future consumption, available space and possible additional equipment at the beginning.',
    },
  },
  {
    id: 'heat',
    number: '02',
    family: 0,
    related: ['solar', 'smart'],
    image: 'quiet-interior',
    ro: {
      slug: 'pompe-de-caldura',
      name: 'Pompe de căldură',
      short: 'Confortul începe cu o alegere bine dimensionată.',
      headline: 'Confort firesc. În fiecare anotimp.',
      description:
        'Încălzirea se alege pentru clădire, nu doar după suprafață. Punem în aceeași discuție izolația, necesarul termic și instalația existentă, pentru o soluție potrivită casei tale.',
      connection:
        'Producția fotovoltaică și un control compatibil pot fi analizate împreună cu pompa de căldură. Consumul real depinde de clădire, climă și utilizare.',
      checks: [
        'Necesarul termic și nivelul de izolare al clădirii.',
        'Încălzirea în pardoseală sau radiatoarele existente.',
        'Amplasarea unității, cerințele acustice și apa caldă.',
      ],
      question: 'Este potrivită și pentru o casă în renovare?',
      answer:
        'Poate fi o opțiune, după evaluarea pierderilor de căldură și a instalației. Temperatura necesară în radiatoare și lucrările de izolare influențează alegerea.',
    },
    en: {
      slug: 'heat-pumps',
      name: 'Heat pumps',
      short: 'Comfort begins with the right sizing.',
      headline: 'Everyday comfort. Through every season.',
      description:
        'Choose heating for the building, not just its floor area. Consider insulation, heat demand and the existing heating system together to find the right fit for your home.',
      connection:
        'Solar generation and compatible controls can be considered alongside a heat pump. Actual consumption depends on the building, climate and use.',
      checks: [
        'Building heat demand and insulation levels.',
        'Underfloor heating or existing radiators.',
        'Unit location, acoustic requirements and hot water.',
      ],
      question: 'Could a heat pump work in a renovation?',
      answer:
        'It may be suitable after an assessment of heat loss and the existing heating system. Required radiator temperatures and insulation work influence the choice.',
    },
  },
  {
    id: 'roof',
    number: '03',
    family: 1,
    related: ['rain', 'solar'],
    image: 'forest-residence',
    ro: {
      slug: 'tigla-metalica',
      name: 'Țiglă metalică',
      short: 'Protecție care respectă arhitectura casei.',
      headline: 'O linie clară. O casă protejată.',
      description:
        'Acoperișul este un ansamblu: învelitoare, accesorii și detalii de îmbinare. Pornește de la geometria clădirii și aspectul dorit, apoi discutăm cerințele tehnice ale sistemului.',
      connection:
        'Planifică învelitoarea alături de colectarea pluvială și eventualele panouri fotovoltaice. Tipul de prindere se verifică pentru profilul ales.',
      checks: [
        'Panta, geometria și suportul acoperișului.',
        'Profilul, finisajul și detaliile de ventilare.',
        'Accesoriile, evacuarea apei și prinderile viitoare.',
      ],
      question: 'Trebuie să aleg și accesoriile odată cu învelitoarea?',
      answer:
        'Este util să le planifici împreună. Coamele, doliile, elementele de etanșare și sistemul pluvial trebuie corelate cu geometria acoperișului.',
    },
    en: {
      slug: 'metal-roofing',
      name: 'Metal roof tiles',
      short: 'Protection that respects the architecture.',
      headline: 'A clear roofline. A protected home.',
      description:
        'A roof is an assembly of covering, accessories and carefully considered junctions. Start with the building geometry and your preferred finish, then define the system requirements.',
      connection:
        'Plan the covering alongside rainwater drainage and any solar panels. Mounting methods must be reviewed for the selected roof profile.',
      checks: [
        'Roof pitch, geometry and supporting structure.',
        'Profile, finish and ventilation details.',
        'Accessories, drainage and future mounting needs.',
      ],
      question: 'Should I choose accessories with the roof covering?',
      answer:
        'Planning them together is useful. Ridge caps, valleys, sealing details and rainwater drainage need to match the roof geometry.',
    },
  },
  {
    id: 'rain',
    number: '04',
    family: 1,
    related: ['roof'],
    image: 'forest-residence',
    ro: {
      slug: 'sisteme-pluviale',
      name: 'Sisteme pluviale',
      short: 'Apa își urmează traseul. Casa rămâne protejată.',
      headline: 'Fiecare detaliu are un rost. Inclusiv ploaia.',
      description:
        'Jgheaburile și burlanele preiau apa de pe acoperiș și o conduc spre evacuarea prevăzută în proiect. Dimensiunile și traseele se aleg împreună cu învelitoarea și fațada.',
      connection:
        'Un sistem pluvial se planifică odată cu acoperișul. Poziția burlanelor trebuie corelată cu fațada, aleile și evacuarea de la sol.',
      checks: [
        'Suprafața și forma versanților acoperișului.',
        'Poziția jgheaburilor, burlanelor și punctelor de evacuare.',
        'Materialele, nuanța și accesul pentru întreținere.',
      ],
      question: 'Pot înlocui doar sistemul pluvial?',
      answer:
        'Da, poate fi analizat separat. Sunt necesare verificarea punctelor de fixare, a stării streșinii și a traseului de evacuare a apei.',
    },
    en: {
      slug: 'rainwater-systems',
      name: 'Rainwater systems',
      short: 'Give rain a clear route away from your home.',
      headline: 'Every detail has a purpose. Even in the rain.',
      description:
        'Gutters and downpipes collect water from the roof and guide it toward the drainage specified for the property. Choose their size and routing alongside the roof and facade.',
      connection:
        'Plan rainwater drainage with the roof. Coordinate downpipe locations with the facade, paths and ground-level drainage.',
      checks: [
        'Area and geometry of the roof slopes.',
        'Gutter, downpipe and drainage outlet locations.',
        'Materials, colour and access for maintenance.',
      ],
      question: 'Can I replace the rainwater system on its own?',
      answer:
        'It can be considered separately. Fixing points, the condition of the eaves and the water drainage route need to be checked.',
    },
  },
  {
    id: 'smart',
    number: '05',
    family: 2,
    related: ['heat', 'ceiling'],
    image: 'quiet-interior',
    ro: {
      slug: 'casa-inteligenta',
      name: 'Automatizări smart home',
      short: 'Mai puține gesturi. Mai mult confort.',
      headline: 'O casă care ține pasul cu tine.',
      description:
        'Începe cu lucrurile pe care vrei să le simplifici: lumina, temperatura sau scenariul de plecare de acasă. Abia apoi alegem ce dispozitive și protocoale trebuie evaluate împreună.',
      connection:
        'Controlul încălzirii și al iluminatului depinde de interfețele echipamentelor. Verificăm cerințele de conectivitate și funcțiile disponibile înainte de alegere.',
      checks: [
        'Funcțiile dorite și modul de control preferat.',
        'Compatibilitatea, rețeaua și traseele de cablare.',
        'Funcționarea locală, dependența de internet și accesul utilizatorilor.',
      ],
      question: 'Pot păstra dispozitivele pe care le am deja?',
      answer:
        'Depinde de model, protocol și interfețele disponibile. Include-le în descrierea proiectului pentru a putea discuta integrarea lor.',
    },
    en: {
      slug: 'smart-home',
      name: 'Smart home automation',
      short: 'Fewer everyday tasks. More comfort.',
      headline: 'A home that moves with your day.',
      description:
        'Start with what you want to simplify: lighting, temperature or leaving-home routines. Then identify the devices and protocols that need to be assessed together.',
      connection:
        'Heating and lighting control depends on equipment interfaces. Connectivity requirements and available functions need to be checked before selection.',
      checks: [
        'Desired functions and preferred controls.',
        'Compatibility, network and cable routes.',
        'Local operation, internet dependency and user access.',
      ],
      question: 'Can I keep the devices I already own?',
      answer:
        'It depends on the model, protocol and available interfaces. Include them in your project description to discuss integration.',
    },
  },
  {
    id: 'ceiling',
    number: '06',
    family: 3,
    related: ['smart'],
    image: 'quiet-interior',
    ro: {
      slug: 'tavane-extensibile',
      name: 'Tavane extensibile',
      short: 'Un interior liniștit, până la ultimul detaliu.',
      headline: 'Spațiu pentru lumină. Loc pentru detalii.',
      description:
        'Un tavan extensibil conturează o suprafață continuă și o direcție clară pentru interior. Planifică finisajul, iluminatul și accesul tehnic în aceeași etapă.',
      connection:
        'Traseele de iluminat și automatizare se coordonează înainte de închiderea tavanului. Accesul la echipamente și cerințele materialului rămân esențiale.',
      checks: [
        'Dimensiunile încăperii și înălțimea disponibilă.',
        'Textura, culoarea și corpurile de iluminat dorite.',
        'Traseele tehnice și punctele care necesită acces.',
      ],
      question: 'Pot integra iluminatul în tavan?',
      answer:
        'Configurația se stabilește în funcție de corpurile alese, suporturi, disiparea căldurii și cerințele materialului. Aceste detalii trebuie discutate înainte de execuție.',
    },
    en: {
      slug: 'stretch-ceilings',
      name: 'Stretch ceilings',
      short: 'A calmer interior, down to the last detail.',
      headline: 'Room for light. Space for detail.',
      description:
        'A stretch ceiling creates a continuous surface and a considered finish for the interior. Plan the finish, lighting and technical access at the same stage.',
      connection:
        'Coordinate lighting and automation routes before closing the ceiling. Equipment access and material requirements remain essential.',
      checks: [
        'Room dimensions and available ceiling height.',
        'Preferred texture, colour and lighting fixtures.',
        'Service routes and points that need access.',
      ],
      question: 'Can lighting be integrated into the ceiling?',
      answer:
        'The arrangement depends on the chosen fittings, supports, heat dissipation and material requirements. Discuss these details before work begins.',
    },
  },
] as const;
export type Category = (typeof categories)[number];
export const categoryPath = (category: Category, lang: Locale) =>
  `${lang === 'en' ? '/en/solutions' : '/solutii'}/${category[lang].slug}/`;
export const families = {
  ro: [
    {
      title: 'Energie & confort',
      subtitle: 'Energia casei, gândită împreună.',
      description:
        'De la producția de electricitate la confortul interior. Panourile fotovoltaice și pompele de căldură se aleg pornind de la aceeași casă.',
      label: 'Panouri fotovoltaice · Pompe de căldură',
    },
    {
      title: 'Acoperiș & protecție',
      subtitle: 'Totul începe cu un înveliș bine gândit.',
      description:
        'Linii curate, materiale potrivite și un traseu clar pentru apă. Învelitoarea și sistemul pluvial sunt părți ale aceluiași ansamblu.',
      label: 'Țiglă metalică · Sisteme pluviale',
    },
    {
      title: 'Casă inteligentă',
      subtitle: 'Tehnologie care simplifică fiecare zi.',
      description:
        'Lumină, temperatură și scenarii adaptate vieții tale. Începem cu nevoile, apoi verificăm ce echipamente pot lucra împreună.',
      label: 'Automatizări smart home',
    },
    {
      title: 'Finisaje interioare',
      subtitle: 'Ultimul strat. Aceeași atenție.',
      description:
        'Suprafețe continue și lumină bine așezată. Tavanele extensibile completează arhitectura interioară, cu detaliile tehnice planificate din timp.',
      label: 'Tavane extensibile',
    },
  ],
  en: [
    {
      title: 'Energy & comfort',
      subtitle: 'Your home’s energy, considered together.',
      description:
        'From electricity generation to indoor comfort. Solar panels and heat pumps are selected around the needs of the same home.',
      label: 'Solar panels · Heat pumps',
    },
    {
      title: 'Roof & protection',
      subtitle: 'It starts with a thoughtful envelope.',
      description:
        'Clean lines, suitable materials and a clear path for rainwater. Roof covering and drainage belong to the same assembly.',
      label: 'Metal roof tiles · Rainwater systems',
    },
    {
      title: 'Smart living',
      subtitle: 'Technology that simplifies every day.',
      description:
        'Lighting, temperature and routines shaped around your life. Start with your needs, then check which devices can work together.',
      label: 'Smart home automation',
    },
    {
      title: 'Interior finishes',
      subtitle: 'The final layer. The same care.',
      description:
        'Continuous surfaces and considered lighting. Stretch ceilings complete the interior, with technical details planned from the start.',
      label: 'Stretch ceilings',
    },
  ],
};
