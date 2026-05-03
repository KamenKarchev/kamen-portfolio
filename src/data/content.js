/** YouTube portfolio video: plain 11-char id, or full watch / youtu.be / embed URL. */
export const FEATURE_PORTFOLIO_YOUTUBE_ID = '914ajpP5lag'

const EN_TIMELINE = [
  {
    year: '2017–2022',
    title: 'High school: electrical engineering & code',
    body: 'Vocational HS Varna — OOP, C#, .NET, Xamarin, Blazor, mySQL; first structured contact with software and hardware.',
    image: '/images/timeline-before-uni.jpg',
  },
  {
    year: '2022–2023',
    title: 'Quanterall — first real codebase',
    body: 'Internship: Kotlin Android app with a real API; Erlang FP and data structures (graph + DFT/BFT); Elixir backend; Discord-inspired messaging app.',
    image: '/images/timeline-internship.jpg',
  },
  {
    year: '2022–2026',
    title: "TU Varna — bachelor's degree",
    body: 'Software & Internet Technologies — algorithms, databases, networks, architecture, security, design patterns, and team projects.',
    image: '/images/timeline-year-1.jpg',
  },
  {
    year: 'Jun–Oct 2024',
    title: 'USA · Vermont Tent Company',
    body: 'Working and living abroad — English-only environment, cross-cultural collaboration, hands-on adaptability and independence.',
    image: '/images/timeline-media-work.jpg',
  },
  {
    year: '2024–2025',
    title: 'Projects & research',
    body: 'Winery team platform (Java), ShopAssist (ASP.NET + AI ranking), cybersecurity team management paper presented at TU-Varna Student Science Session.',
    image: '/images/timeline-year-2.jpg',
  },
  {
    year: 'May 2025 – now',
    title: 'ISP internship + final push',
    body: 'Asparuhovo Net — ISP operations, network protocols, Packet Tracer; DopeyUserAPI (Phoenix · Oban · Prometheus · Grafana); graduating June 2026.',
    image: '/images/timeline-now.jpg',
  },
]

/**
 * PROJECTS — flat array. Squarified treemap packer sorts descending by value
 * and fills the container pixel-perfectly without empty space.
 *
 * value — relative size weight (arbitrary scale).
 *   Each tile's pixel area = (value / sum_of_all_values) x containerArea.
 *   Tile w/h are derived dynamically; the same value can produce different
 *   shapes depending on the available container geometry.
 *
 * Higher value = proportionally larger tile area.
 */
const EN_PROJECTS = [
  {
    id: 'winery',
    title: 'Winery',
    value: 15,
    body: 'University team project — a full winery management system with role-based access for CEO, managers, warehouse staff and accountants. Covers order processing, inventory, worker scoring, automated task generation, and real-time notifications.',
    tags: ['Java', 'OOP', 'Team project', 'SQL', 'Role-based access'],
    link: 'https://github.com/KostadinTodorov/winery',
    image: '/images/project-winery.jpg',
  },
  {
    id: 'shop-assist',
    title: 'ShopAssist',
    value: 15,
    body: 'An ASP.NET service that webcrawls e-commerce sites, filters items by user-defined criteria, and surfaces the best matches. AI integration planned to rank and explain results in natural language.',
    tags: ['C#', 'ASP.NET', 'Web scraping', 'AI', 'In progress'],
    link: '#',
    image: '/images/project-shop-assist.jpg',
  },
  {
    id: 'dopey-user-api',
    title: 'DopeyUserAPI',
    value: 25,
    body: 'A Phoenix/Elixir backend covering authentication, user flows, JWT tokens, email logic, and OAuth.',
    tags: ['Elixir', 'Phoenix', 'PostgreSQL', 'Docker', 'OAuth'],
    link: 'https://github.com/KamenKarchev',
    image: '/images/project-dopeyuserapi.jpg',
  },
  {
    id: 'pipe-prompt',
    title: 'PipePrompt',
    value: 10,
    body: 'Android app built with Kotlin and Jetpack Compose for fast AI prompt workflows. Backed by a Flask dispatcher API.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Python', 'Flask'],
    link: 'https://github.com/KamenKarchev/PipePrompt-BackEnd',
    image: '/images/project-pipeprompt.jpg',
  },
  {
    id: 'punch-pro',
    title: 'PunchPro',
    value: 10,
    body: 'A JavaScript web project — a punchy front-end experiment exploring UI composition and interactive design.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/KamenKarchev/PunchPro',
    image: '/images/project-punchpro.jpg',
  },
  {
    id: 'fsm-java',
    title: 'Finite-State Machine',
    value: 10,
    body: 'OOP course project — a command-line finite-state machine in Java covering state transitions, input parsing, and acceptance logic.',
    tags: ['Java', 'OOP', 'Automata'],
    link: 'https://github.com/KamenKarchev/oop1-project-T4--Finite-state_machine-',
    image: '/images/project-fsm.jpg',
  },
  // {
  //   id: 'front-end-ui',
  //   title: 'Front-end UI Lab',
  //   value: 10,
  //   body: 'A TypeScript front-end lab pushing UI components, layout experiments, and interactive patterns.',
  //   tags: ['TypeScript', 'UI', 'Frontend'],
  //   link: 'https://github.com/KamenKarchev/front-end-more-ui-',
  //   image: '/images/project-frontend-ui.jpg',
  // },
  // {
  //   id: 'students-compiler',
  //   title: 'Students Compiler',
  //   value: 55,
  //   body: 'A Java compiler-style project processing student records — parsing, validation, and structured output.',
  //   tags: ['Java', 'Compiler', 'Parsing'],
  //   link: 'https://github.com/KamenKarchev/students_compiler',
  //   image: '/images/project-students-compiler.jpg',
  // },
  // {
  //   id: 'backend-tests',
  //   title: 'Back-end Test Suite',
  //   value: 55,
  //   body: 'A Java back-end testing project — unit and integration tests covering service layers and API contracts.',
  //   tags: ['Java', 'Testing', 'Backend'],
  //   link: 'https://github.com/KamenKarchev/back-end-tests-',
  //   image: '/images/project-backend-tests.jpg',
  // },
  {
    id: 'hospital-app',
    title: 'HospitalApp',
    value: 5,
    body: 'An early C# assignment modelling a hospital management system — one of the first structured OOP projects.',
    tags: ['C#', 'OOP', '.NET'],
    link: 'https://github.com/KamenKarchev/HospitalApp',
    image: '/images/project-hospital-app.jpg',
  },
]

const EN_CONTACT = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kamen-karchev-4014a519a',
    text: 'linkedin.com/in/kamen-karchev',
    external: true,
    brand: 'linkedin',
    gradient: 'linear-gradient(100deg, #0077b5 0%, #00a0dc 60%, #0e76a8 100%)',
    description: 'Professional profile and work history',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/KamenKarchev',
    text: 'github.com/KamenKarchev',
    external: true,
    brand: 'github',
    gradient: 'linear-gradient(100deg, #161b22 0%, #30363d 60%, #21262d 100%)',
    description: 'Open source projects and code',
  },
  {
    label: 'Email',
    href: 'mailto:kamen.karchev03@gmail.com',
    text: 'kamen.karchev03@gmail.com',
    brand: 'email',
    gradient: 'linear-gradient(100deg, #d85b50 0%, #bb4a4f 60%, #c0392b 100%)',
    description: 'Best way to reach me directly',
  },
]

const BG_TIMELINE = [
  {
    year: '2017-2022',
    title: 'Гимназия: електротехника и код',
    body: 'Професионална гимназия във Варна - ООП, C#, .NET, Xamarin, Blazor, mySQL; първият ми структуриран досег със софтуер и хардуер.',
    image: '/images/timeline-before-uni.jpg',
  },
  {
    year: '2022-2023',
    title: 'Quanterall - първа реална кодова база',
    body: 'Стаж: Kotlin Android приложение с реален API; Erlang функционално програмиране и структури от данни; Elixir backend; messaging app, вдъхновен от Discord.',
    image: '/images/timeline-internship.jpg',
  },
  {
    year: '2022-2026',
    title: 'ТУ Варна - бакалавър',
    body: 'Софтуерни и интернет технологии - алгоритми, бази данни, мрежи, архитектура, сигурност, design patterns и екипни проекти.',
    image: '/images/timeline-year-1.jpg',
  },
  {
    year: 'юни-окт 2024',
    title: 'САЩ · Vermont Tent Company',
    body: 'Работа и живот в чужбина - среда само на английски, междукултурна комуникация, практична адаптивност и самостоятелност.',
    image: '/images/timeline-media-work.jpg',
  },
  {
    year: '2024-2025',
    title: 'Проекти и изследователска работа',
    body: 'Winery екипна платформа (Java), ShopAssist (ASP.NET + AI ranking), доклад за управление на екипи в киберсигурността, представен на студентска научна сесия в ТУ-Варна.',
    image: '/images/timeline-year-2.jpg',
  },
  {
    year: 'май 2025 - сега',
    title: 'ISP стаж + финален тласък',
    body: 'Аспарухово Нет - ISP операции, мрежови протоколи, Packet Tracer; DopeyUserAPI (Phoenix · Oban · Prometheus · Grafana); дипломиране юни 2026.',
    image: '/images/timeline-now.jpg',
  },
]

const BG_PROJECTS = [
  {
    id: 'winery',
    title: 'Winery',
    value: 95,
    body: 'Университетски екипен проект - цялостна система за управление на винарна с роли за CEO, мениджъри, складови служители и счетоводители. Покрива поръчки, инвентар, оценяване на работници, автоматични задачи и известия в реално време.',
    tags: ['Java', 'ООП', 'Екипен проект', 'SQL', 'Ролеви достъп'],
    link: 'https://github.com/KostadinTodorov/winery',
    image: '/images/project-winery.jpg',
  },
  {
    id: 'shop-assist',
    title: 'ShopAssist',
    value: 90,
    body: 'ASP.NET услуга, която обхожда онлайн магазини, филтрира продукти по критерии на потребителя и показва най-добрите попадения. Планирана AI интеграция за ranking и обяснения на естествен език.',
    tags: ['C#', 'ASP.NET', 'Web scraping', 'AI', 'В разработка'],
    link: '#',
    image: '/images/project-shop-assist.jpg',
  },
  {
    id: 'dopey-user-api',
    title: 'DopeyUserAPI',
    value: 80,
    body: 'Phoenix/Elixir backend за authentication, user flows, JWT tokens, email logic и OAuth.',
    tags: ['Elixir', 'Phoenix', 'PostgreSQL', 'Docker', 'OAuth'],
    link: 'https://github.com/KamenKarchev',
    image: '/images/project-dopeyuserapi.jpg',
  },
  {
    id: 'pipe-prompt',
    title: 'PipePrompt',
    value: 85,
    body: 'Android приложение с Kotlin и Jetpack Compose за бързи AI prompt workflows. Поддържа се от Flask dispatcher API.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Python', 'Flask'],
    link: 'https://github.com/KamenKarchev/PipePrompt-BackEnd',
    image: '/images/project-pipeprompt.jpg',
  },
  {
    id: 'punch-pro',
    title: 'PunchPro',
    value: 70,
    body: 'JavaScript web проект - енергичен front-end експеримент с UI композиция и interactive design.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/KamenKarchev/PunchPro',
    image: '/images/project-punchpro.jpg',
  },
  {
    id: 'fsm-java',
    title: 'Finite-State Machine',
    value: 65,
    body: 'ООП курсов проект - command-line finite-state machine на Java с преходи между състояния, input parsing и acceptance logic.',
    tags: ['Java', 'ООП', 'Автомати'],
    link: 'https://github.com/KamenKarchev/oop1-project-T4--Finite-state_machine-',
    image: '/images/project-fsm.jpg',
  },
  {
    id: 'front-end-ui',
    title: 'Front-end UI Lab',
    value: 55,
    body: 'TypeScript front-end lab за UI компоненти, layout експерименти и интерактивни patterns.',
    tags: ['TypeScript', 'UI', 'Frontend'],
    link: 'https://github.com/KamenKarchev/front-end-more-ui-',
    image: '/images/project-frontend-ui.jpg',
  },
  {
    id: 'students-compiler',
    title: 'Students Compiler',
    value: 55,
    body: 'Java compiler-style проект за обработка на студентски записи - parsing, validation и структуриран output.',
    tags: ['Java', 'Compiler', 'Parsing'],
    link: 'https://github.com/KamenKarchev/students_compiler',
    image: '/images/project-students-compiler.jpg',
  },
  {
    id: 'backend-tests',
    title: 'Back-end Test Suite',
    value: 55,
    body: 'Java back-end testing проект - unit и integration tests за service layers и API contracts.',
    tags: ['Java', 'Testing', 'Backend'],
    link: 'https://github.com/KamenKarchev/back-end-tests-',
    image: '/images/project-backend-tests.jpg',
  },
  {
    id: 'hospital-app',
    title: 'HospitalApp',
    value: 55,
    body: 'Ранно C# задание, моделиращо hospital management system - един от първите ми структурирани ООП проекти.',
    tags: ['C#', 'ООП', '.NET'],
    link: 'https://github.com/KamenKarchev/HospitalApp',
    image: '/images/project-hospital-app.jpg',
  },
]

const BG_CONTACT = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kamen-karchev-4014a519a',
    text: 'linkedin.com/in/kamen-karchev',
    external: true,
    brand: 'linkedin',
    gradient: 'linear-gradient(100deg, #0077b5 0%, #00a0dc 60%, #0e76a8 100%)',
    description: 'Професионален профил и опит',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/KamenKarchev',
    text: 'github.com/KamenKarchev',
    external: true,
    brand: 'github',
    gradient: 'linear-gradient(100deg, #161b22 0%, #30363d 60%, #21262d 100%)',
    description: 'Open source проекти и код',
  },
  {
    label: 'Email',
    href: 'mailto:kamen.karchev03@gmail.com',
    text: 'kamen.karchev03@gmail.com',
    brand: 'email',
    gradient: 'linear-gradient(100deg, #d85b50 0%, #bb4a4f 60%, #c0392b 100%)',
    description: 'Най-директният начин за връзка',
  },
]

export const CONTENT = {
  en: {
    nav: {
      brandName: 'Kamen Karchev',
      brandTagline: 'Portfolio - editorial',
      links: [
        { to: '/', label: 'Home' },
        { href: '/#feature', label: 'Video / About' },
        { href: '/#projects', label: 'Projects' },
        { href: '/#contact', label: 'Contact' },
        { to: '/nemotry', label: 'Nemotry' },
      ],
    },
    languageSwitch: {
      currentLabel: 'Current language',
      options: {
        en: { code: 'EN', name: 'English', flag: '🇬🇧' },
        bg: { code: 'BG', name: 'Bulgarian', flag: '🇧🇬' },
      },
      ariaLabel: {
        en: 'Switch language to English',
        bg: 'Switch language to Bulgarian',
      },
    },
    masthead: {
      left: ['Varna edition', 'Portfolio website', 'Classic paper x digital news'],
      title: 'Kamen Karchev',
      right: ['Issue two', 'Backend · Android · growth', 'Dark and light themes'],
      bottom: [
        'Video portfolio, project links, contact information',
        'Newspaper structure with minimal futuristic finish',
        'Varna, Bulgaria',
      ],
    },
    hero: {
      eyebrow: 'Front page',
      title: 'Backend engineer in progress, editorial thinker by instinct.',
      body: 'I build software with a systems mindset, a strong visual sense, and a growing focus on reliable backend architecture.',
      actions: {
        feature: 'Watch and read',
        projects: 'Open projects',
        contact: 'Contact',
      },
      portraitAlt: 'Kamen Karchev portrait',
      portraitName: 'Kamen Karchev',
      portraitMeta: 'Software engineering student · Varna, Bulgaria',
      pullQuote: '"Curious by nature, creative by habit - ideas become real with a few lines of code."',
      quickCards: [
        { label: 'Role', value: 'Full-stack · backend focus' },
        { label: 'Graduating', value: 'TU Varna · June 2026' },
        { label: 'Focus', value: 'Java · Elixir · Kotlin · React' },
      ],
    },
    sections: {
      feature: { eyebrow: 'Lead article', title: 'Video portfolio and about me' },
      projects: { eyebrow: 'Second article', title: 'Projects' },
      contact: { eyebrow: 'Back page', title: 'Links and contact' },
    },
    feature: {
      eyebrow: 'Headline feature',
      title: 'Start with the voice, then show the path that built it.',
      deck: 'Electrical engineering high school, a university degree in progress, a software internship, two seasons working in the USA, and a string of projects built alone and in teams.',
      videoTitle: 'Video portfolio - introduction',
      videoLabel: 'Video portfolio',
      videoMeta: "A short introduction - who I am, what I build, and where I'm headed next.",
      emptyVideo: 'Set FEATURE_PORTFOLIO_YOUTUBE_ID in src/data/content.js to the 11-character id or a full YouTube / youtu.be URL.',
      body: 'I did not arrive at software from a single direction - curiosity, media work, and hands-on experience across different environments shaped how I approach problems.',
      timelineEyebrow: 'Timeline',
      timeline: EN_TIMELINE,
    },
    projects: {
      eyebrow: 'Work article',
      title: 'Projects sized by importance.',
      deck: 'Packed like a portfolio heatmap - larger work gets more space, smaller work still keeps its place in the grid.',
      items: EN_PROJECTS,
    },
    contact: {
      eyebrow: 'Back page',
      title: 'Final-year student, open to internships and junior roles where the work actually matters.',
      deck: 'Graduating TU Varna June 2026. Built with Java, Elixir, Kotlin, C# and React. Reach out through any channel below.',
      items: EN_CONTACT,
      cvHref: 'https://kamenkarchev.com/cv',
    },
    footer: {
      copyright: 'Kamen Karchev',
      tagline: 'Varna edition · Classic paper x digital news',
    },
  },
  bg: {
    nav: {
      brandName: 'Камен Кърчев',
      brandTagline: 'Портфолио - editorial',
      links: [
        { to: '/', label: 'Начало' },
        { href: '/#feature', label: 'Видео / За мен' },
        { href: '/#projects', label: 'Проекти' },
        { href: '/#contact', label: 'Контакти' },
        { to: '/nemotry', label: 'Nemotry' },
      ],
    },
    languageSwitch: {
      currentLabel: 'Текущ език',
      options: {
        en: { code: 'EN', name: 'Английски', flag: '🇬🇧' },
        bg: { code: 'BG', name: 'Български', flag: '🇧🇬' },
      },
      ariaLabel: {
        en: 'Превключи езика на английски',
        bg: 'Превключи езика на български',
      },
    },
    masthead: {
      left: ['Варненско издание', 'Портфолио сайт', 'Класически вестник x дигитални новини'],
      title: 'Камен Кърчев',
      right: ['Втори брой', 'Backend · Android · развитие', 'Тъмна и светла тема'],
      bottom: [
        'Видео портфолио, проекти, контакти',
        'Вестникарска структура с минимален футуристичен завършек',
        'Варна, България',
      ],
    },
    hero: {
      eyebrow: 'Първа страница',
      title: 'Backend инженер в развитие, editorial thinker по инстинкт.',
      body: 'Създавам софтуер със системно мислене, силен визуален усет и все по-ясен фокус върху надеждна backend архитектура.',
      actions: {
        feature: 'Гледай и чети',
        projects: 'Отвори проектите',
        contact: 'Контакт',
      },
      portraitAlt: 'Портрет на Камен Кърчев',
      portraitName: 'Камен Кърчев',
      portraitMeta: 'Студент по софтуерно инженерство · Варна, България',
      pullQuote: '"Любопитен по природа, креативен по навик - идеите стават реални с няколко реда код."',
      quickCards: [
        { label: 'Роля', value: 'Full-stack · backend фокус' },
        { label: 'Дипломиране', value: 'ТУ Варна · юни 2026' },
        { label: 'Фокус', value: 'Java · Elixir · Kotlin · React' },
      ],
    },
    sections: {
      feature: { eyebrow: 'Водеща статия', title: 'Видео портфолио и за мен' },
      projects: { eyebrow: 'Втора статия', title: 'Проекти' },
      contact: { eyebrow: 'Последна страница', title: 'Линкове и контакт' },
    },
    feature: {
      eyebrow: 'Водещ материал',
      title: 'Първо гласът, после пътят, който го изгради.',
      deck: 'Електротехническа гимназия, университетско образование, софтуерен стаж, два сезона работа в САЩ и поредица от проекти самостоятелно и в екип.',
      videoTitle: 'Видео портфолио - представяне',
      videoLabel: 'Видео портфолио',
      videoMeta: 'Кратко представяне - кой съм, какво създавам и накъде продължавам.',
      emptyVideo: 'Задай FEATURE_PORTFOLIO_YOUTUBE_ID в src/data/content.js като 11-символен id или пълен YouTube / youtu.be URL.',
      body: 'Не стигнах до софтуера от една посока - любопитство, медийна работа и практически опит в различни среди оформиха начина, по който решавам проблеми.',
      timelineEyebrow: 'Времева линия',
      timeline: BG_TIMELINE,
    },
    projects: {
      eyebrow: 'Работна статия',
      title: 'Проекти, оразмерени по значение.',
      deck: 'Подредени като portfolio heatmap - по-важната работа получава повече място, а по-малките проекти запазват своето място в мрежата.',
      items: BG_PROJECTS,
    },
    contact: {
      eyebrow: 'Последна страница',
      title: 'Студент последна година, отворен към стажове и junior роли, където работата наистина има значение.',
      deck: 'Дипломиране в ТУ Варна през юни 2026. Работя с Java, Elixir, Kotlin, C# и React. Свържи се през който канал е най-удобен.',
      items: BG_CONTACT,
      cvHref: 'https://kamenkarchev.com/cv',
    },
    footer: {
      copyright: 'Камен Кърчев',
      tagline: 'Варненско издание · Класически вестник x дигитални новини',
    },
  },
}

export const NAV_LINKS = CONTENT.en.nav.links
export const QUICK_CARDS = CONTENT.en.hero.quickCards
export const TIMELINE = CONTENT.en.feature.timeline
export const PROJECTS = CONTENT.en.projects.items
export { EN_PROJECTS }
export const CONTACT = CONTENT.en.contact.items
