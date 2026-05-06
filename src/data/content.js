/** YouTube portfolio video: plain 11-char id, or full watch / youtu.be / embed URL. */
export const FEATURE_PORTFOLIO_YOUTUBE_ID = '914ajpP5lag'

const EN_TIMELINE = [
  {
    year: '2017–2022',
    title: 'High school: electrical engineering & code',
    body: 'Five years at the Vocational High School of Electrical Engineering, Varna. Built a foundation in OOP, C#, .NET, Xamarin, Blazor, MySQL, and network protocols — alongside real electronics and hardware coursework.',
    image: '/images/high-school-room.jpg',
  },
  {
    year: '2022–2023',
    title: 'Quanterall — first real codebase',
    body: "Started as mandatory school practice, earned a place in Quanterall's internship programme. Built a Kotlin Android app against a live API, studied Erlang and functional programming deeply enough to implement a graph with DFT and BFT traversal, then moved to Elixir — building the backend for a Discord-inspired messaging service.",
    image: '/images/quanteral-internship.jpg',
  },
  {
    year: '2022–2026',
    title: "TU Varna — bachelor's degree",
    body: "Four-year bachelor's in Software & Internet Technologies at the Technical University of Varna. Covered algorithms, OOP, databases, networks, operating systems, web technologies, software architecture, design patterns, low-level programming, project management, and leadership.",
    image: '/images/TU-Varna.jpg',
  },
  {
    year: 'Jun–Oct 2024',
    title: 'First season in the USA · Vermont Tent Company',
    body: "Spent the summer working in Vermont's event and wedding industry — fully immersed in an English-speaking, multicultural team. Learned to be adaptable, resourceful, and independent far from home.",
    image: '/images/vermont-tent-company.jpeg',
  },
  {
    year: '2023–2025',
    title: 'YouTube content creator',
    body: 'Built a monetised YouTube channel alongside university. One video testing the political biases of GPT-4 vs Gemini went viral with 200,000+ views — an early, hands-on exploration of LLM behaviour and science communication.',
    image: '/images/research-projects.webp',
  },
  {
    year: '2024–2025',
    title: 'Projects & research',
    body: 'Productive solo and team period: built the Winery operations platform (Java, team project), PipePrompt Android app (Kotlin + Jetpack Compose) backed by a Flask/Gemini dispatcher API deployed on Railway, ShopAssist web crawler (ASP.NET + AI ranking), and co-authored a cybersecurity team management paper presented at the TU-Varna Student Science Session.',
    image: '/images/research-projects.webp',
  },
  {
    year: 'May 2025 – now',
    title: 'Second USA season, ISP internship & final year',
    body: 'Returned to Vermont (Jun–Oct 2025) — took on greater responsibilities and helped train new staff, building leadership and communication skills. Completed a network infrastructure internship at Asparuhovo Net (ISP operations, protocols, Cisco Packet Tracer). Now in the final stretch: building DopeyUserAPI (Elixir/Phoenix, PostgreSQL, Docker, Oban, Prometheus, Grafana) and graduating June 2026.',
    image: '/images/isp-work.jpg',
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
    body: 'Team university project — a full winery management platform with role-based access for CEO, managers, warehouse workers, and accountants. Built in Java with a strong focus on software architecture and design patterns; features order processing, inventory tracking, worker performance scoring, automated task generation, and real-time notifications.',
    tags: ['Java', 'OOP', 'Team project', 'SQL', 'Role-based access'],
    link: 'https://github.com/KostadinTodorov/winery',
    image: '/images/winary-app.png',
  },
  {
    id: 'shop-assist',
    title: 'ShopAssist',
    value: 15,
    body: 'An ASP.NET web crawler that collects product listings from e-commerce sites, filters them against user-defined criteria, and ranks the best matches. An AI-based layer explains and scores results in natural language — making it easy to compare options without trawling through pages.',
    tags: ['C#', 'ASP.NET', 'Web scraping', 'AI', 'In progress'],
    link: '#',
    image: '/images/ShopAssist.jpg',
  },
  {
    id: 'dopey-user-api',
    title: 'DopeyUserAPI',
    value: 25,
    body: 'A production-grade authentication and user management API built in Elixir/Phoenix. Covers registration, login, email verification, password reset, and OAuth social auth. Backed by PostgreSQL, containerised with Docker, uses Oban for background jobs, and ships with Prometheus + Grafana observability out of the box.',
    tags: ['Elixir', 'Phoenix', 'PostgreSQL', 'Docker', 'OAuth'],
    link: 'https://github.com/KamenKarchev',
    image: '/images/DopeyAPI.jpg',
  },
  {
    id: 'pipe-prompt',
    title: 'PipePrompt',
    value: 10,
    body: 'Android app in Kotlin and Jetpack Compose for fast, structured AI prompt workflows. The backend is a Flask/Python dispatcher API deployed on Railway — it routes prompts to Gemini 2.5 Flash, supports base64 image inputs for multimodal queries, and can relay responses directly to Telegram.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Python', 'Flask', 'Gemini API', 'Railway'],
    link: 'https://github.com/KamenKarchev/PipePrompt-BackEnd',
    image: '/images/project-pipeprompt.jpg',
  },
  {
    id: 'punch-pro',
    title: 'PunchPro',
    value: 10,
    body: 'A JavaScript front-end project — an interactive UI experiment focused on responsive composition, smooth animations, and component-driven layout.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/KamenKarchev/PunchPro',
    image: '/images/project-punchpro.jpg',
  },
  {
    id: 'fsm-java',
    title: 'Finite-State Machine',
    value: 10,
    body: 'OOP course project: a command-line finite-state machine in Java. Implements state transitions, input parsing, and acceptance logic — operated entirely through CLI commands.',
    tags: ['Java', 'OOP', 'Automata'],
    link: 'https://github.com/KamenKarchev/oop1-project-T4--Finite-state_machine-',
    image: '/images/finite-state-machine.png',
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
    body: 'An early C# desktop application — a hospital management system built as a high school OOP assignment using .NET and Windows Forms.',
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
    description: 'Open-source projects and code',
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
    image: '/images/high-school-room.jpg',
  },
  {
    year: '2022-2023',
    title: 'Quanterall - първа реална кодова база',
    body: 'Стаж: Kotlin Android приложение с реален API; Erlang функционално програмиране и структури от данни; Elixir backend; messaging app, вдъхновен от Discord.',
    image: '/images/quanteral-internship.jpg',
  },
  {
    year: '2022-2026',
    title: 'ТУ Варна - бакалавър',
    body: 'Софтуерни и интернет технологии - алгоритми, бази данни, мрежи, архитектура, сигурност, design patterns и екипни проекти.',
    image: '/images/TU-Varna.jpg',
  },
  {
    year: 'юни-окт 2024',
    title: 'САЩ · Vermont Tent Company',
    body: 'Работа и живот в чужбина - среда само на английски, междукултурна комуникация, практична адаптивност и самостоятелност.',
    image: '/images/vermont-tent-company.jpeg',
  },
  {
    year: '2023–2025',
    title: 'Създател на съдържание в YouTube',
    body: 'Изградих монетизиран YouTube канал успоредно с университета. Едно видео, сравняващо политическите пристрастия на GPT-4 и Gemini, стана вирусно с над 200 000 гледания — ранен практически поглед към поведението на LLM и научната комуникация.',
    image: '/images/research-projects.webp',
  },
  {
    year: '2024-2025',
    title: 'Проекти и изследователска работа',
    body: 'Winery екипна платформа (Java), ShopAssist (ASP.NET + AI ranking), доклад за управление на екипи в киберсигурността, представен на студентска научна сесия в ТУ-Варна.',
    image: '/images/research-projects.webp',
  },
  {
    year: 'май 2025 - сега',
    title: 'ISP стаж + финален тласък',
    body: 'Аспарухово Нет - ISP операции, мрежови протоколи, Packet Tracer; DopeyUserAPI (Phoenix · Oban · Prometheus · Grafana); дипломиране юни 2026.',
    image: '/images/isp-work.jpg',
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
    image: '/images/winary-app.png',
  },
  {
    id: 'shop-assist',
    title: 'ShopAssist',
    value: 90,
    body: 'ASP.NET услуга, която обхожда онлайн магазини, филтрира продукти по критерии на потребителя и показва най-добрите попадения. Планирана AI интеграция за ranking и обяснения на естествен език.',
    tags: ['C#', 'ASP.NET', 'Web scraping', 'AI', 'В разработка'],
    link: '#',
    image: '/images/ShopAssist.jpg',
  },
  {
    id: 'dopey-user-api',
    title: 'DopeyUserAPI',
    value: 80,
    body: 'Phoenix/Elixir backend за authentication, user flows, JWT tokens, email logic и OAuth.',
    tags: ['Elixir', 'Phoenix', 'PostgreSQL', 'Docker', 'OAuth'],
    link: 'https://github.com/KamenKarchev',
    image: '/images/DopeyAPI.jpg',
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
    image: '/images/finite-state-machine.png',
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
      body: "I build software that's reliable, maintainable, and actually enjoyable to use — backend systems in Elixir and Java, mobile apps in Kotlin, and interfaces in React. Graduating June 2026.",
      actions: {
        feature: 'Watch and read',
        projects: 'Open projects',
        contact: 'Contact',
      },
      portraitAlt: 'Kamen Karchev portrait',
      portraitName: 'Kamen Karchev',
      portraitMeta: 'Software engineering student · Varna, Bulgaria',
      pullQuote: '"Curious by nature, creative by habit — I build things I would actually want to use."',
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
      title: 'Start with the voice, then follow the path that built it.',
      deck: "Vocational high school, a bachelor's degree, software internships, two seasons living and working in the USA, and a growing body of solo and team projects.",
      videoTitle: 'Video portfolio - introduction',
      videoLabel: 'Video portfolio',
      videoMeta: "A short introduction - who I am, what I build, and where I'm headed next.",
      emptyVideo: 'Set FEATURE_PORTFOLIO_YOUTUBE_ID in src/data/content.js to the 11-character id or a full YouTube / youtu.be URL.',
      body: "I didn't arrive at software from a single direction. Curiosity, hands-on work across different industries, and time spent abroad all shaped how I approach problems — and how I build solutions.",
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
      deck: "Graduating TU Varna in June 2026. I work with Elixir, Java, Kotlin, C#, and React. I'm looking for roles where I can keep building real things. Reach out through any channel below.",
      items: EN_CONTACT,
      cvHref: 'https://kamenkarchev.com/cv',
    },
    footer: {
      copyright: '© 2026 Kamen Karchev',
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
export { EN_PROJECTS, BG_PROJECTS }
export const CONTACT = CONTENT.en.contact.items
