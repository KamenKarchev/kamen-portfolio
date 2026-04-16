export const NAV_LINKS = [
  { href: '#hero',     label: 'Home' },
  { href: '#feature',  label: 'Video / About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact' },
]

export const QUICK_CARDS = [
  { label: 'Contains',     value: 'CV and resume links' },
  { label: 'Lead section', value: 'Video portfolio and personal timeline' },
  { label: 'Focus',        value: 'Selected engineering and creative projects' },
]

export const TIMELINE = [
  {
    year: 'Before uni',
    title: 'Early experiments and self-driven learning',
    body: 'Before formal experience mattered, I was already learning by building small projects and exploring how software works.',
    image: '/images/timeline-before-uni.jpg',
  },
  {
    year: 'Media work',
    title: 'Creative work sharpened communication',
    body: 'Editing, scripting, design, and audience-focused work taught me how to shape attention and present ideas clearly.',
    image: '/images/timeline-media-work.jpg',
  },
  {
    year: 'Year 1',
    title: 'University and first real structure',
    body: 'Formal computer science introduced algorithms, data structures, and the discipline of thinking in systems rather than scripts.',
    image: '/images/timeline-year-1.jpg',
  },
  {
    year: 'Year 2',
    title: 'Backend focus and first Elixir project',
    body: 'Phoenix and Elixir clicked immediately — the functional model, fault tolerance, and concurrency felt like the right way to think about servers.',
    image: '/images/timeline-year-2.jpg',
  },
  {
    year: 'Internship',
    title: 'Real codebase, real standards',
    body: 'Working inside a production system changed how I read code, write reviews, and think about reliability under pressure.',
    image: '/images/timeline-internship.jpg',
  },
  {
    year: 'Now',
    title: 'From interest to technical direction',
    body: 'Elixir, backend systems, and real-world work experience pushed me toward more serious engineering and higher personal standards.',
    image: '/images/timeline-now.jpg',
  },
]

/**
 * PROJECTS — flat array, order matters for packing.
 *
 * w  — tile width  as % of the container width
 * h  — tile height as % of the container width
 *
 * Tiles pack shelf by shelf left-to-right.
 * To add a project: add an entry with your desired w/h percentages.
 */
export const PROJECTS = [
  // ── Row 1 — big flagship projects ──────────────────────────────────────
  {
    id: 'winery',
    title: 'Winery',
    w: 40,
    h: 55,
    body: 'University team project — a full winery management system with role-based access for CEO, managers, warehouse staff and accountants. Covers order processing, inventory, worker scoring, automated task generation, and real-time notifications.',
    tags: ['Java', 'OOP', 'Team project', 'SQL', 'Role-based access'],
    link: 'https://github.com/KostadinTodorov/winery',
    image: '/images/project-winery.jpg',
  },
  {
    id: 'shop-assist',
    title: 'ShopAssist',
    w: 35,
    h: 55,
    body: 'An ASP.NET service that webcrawls e-commerce sites, filters items by user-defined criteria, and surfaces the best matches. AI integration planned to rank and explain results in natural language.',
    tags: ['C#', 'ASP.NET', 'Web scraping', 'AI', 'In progress'],
    link: '#',
    image: '/images/project-shop-assist.jpg',
  },
  {
    id: 'dopey-user-api',
    title: 'DopeyUserAPI',
    w: 25,
    h: 55,
    body: 'A Phoenix/Elixir backend covering authentication, user flows, JWT tokens, email logic, and OAuth.',
    tags: ['Elixir', 'Phoenix', 'PostgreSQL', 'Docker', 'OAuth'],
    link: 'https://github.com/KamenKarchev',
    image: '/images/project-dopeyuserapi.jpg',
  },
  // ── Row 2 ──────────────────────────────────────────────────────────────────
  {
    id: 'pipe-prompt',
    title: 'PipePrompt',
    w: 45,
    h: 40,
    body: 'Android app built with Kotlin and Jetpack Compose for fast AI prompt workflows. Backed by a Flask dispatcher API.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android', 'Python', 'Flask'],
    link: 'https://github.com/KamenKarchev/PipePrompt-BackEnd',
    image: '/images/project-pipeprompt.jpg',
  },
  {
    id: 'punch-pro',
    title: 'PunchPro',
    w: 30,
    h: 40,
    body: 'A JavaScript web project — a punchy front-end experiment exploring UI composition and interactive design.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://github.com/KamenKarchev/PunchPro',
    image: '/images/project-punchpro.jpg',
  },
  {
    id: 'fsm-java',
    title: 'Finite-State Machine',
    w: 25,
    h: 40,
    body: 'OOP course project — a command-line finite-state machine in Java covering state transitions, input parsing, and acceptance logic.',
    tags: ['Java', 'OOP', 'Automata'],
    link: 'https://github.com/KamenKarchev/oop1-project-T4--Finite-state_machine-',
    image: '/images/project-fsm.jpg',
  },
  // ── Row 3 ──────────────────────────────────────────────────────────────────
  {
    id: 'front-end-ui',
    title: 'Front-end UI Lab',
    w: 25,
    h: 30,
    body: 'A TypeScript front-end lab pushing UI components, layout experiments, and interactive patterns.',
    tags: ['TypeScript', 'UI', 'Frontend'],
    link: 'https://github.com/KamenKarchev/front-end-more-ui-',
    image: '/images/project-frontend-ui.jpg',
  },
  {
    id: 'students-compiler',
    title: 'Students Compiler',
    w: 25,
    h: 30,
    body: 'A Java compiler-style project processing student records — parsing, validation, and structured output.',
    tags: ['Java', 'Compiler', 'Parsing'],
    link: 'https://github.com/KamenKarchev/students_compiler',
    image: '/images/project-students-compiler.jpg',
  },
  {
    id: 'backend-tests',
    title: 'Back-end Test Suite',
    w: 25,
    h: 30,
    body: 'A Java back-end testing project — unit and integration tests covering service layers and API contracts.',
    tags: ['Java', 'Testing', 'Backend'],
    link: 'https://github.com/KamenKarchev/back-end-tests-',
    image: '/images/project-backend-tests.jpg',
  },
  {
    id: 'hospital-app',
    title: 'HospitalApp',
    w: 25,
    h: 30,
    body: 'An early C# assignment modelling a hospital management system — one of the first structured OOP projects.',
    tags: ['C#', 'OOP', '.NET'],
    link: 'https://github.com/KamenKarchev/HospitalApp',
    image: '/images/project-hospital-app.jpg',
  },
]

export const CONTACT = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kamen-karchev',
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
    href: 'mailto:kamen@example.com',
    text: 'kamen@example.com',
    brand: 'email',
    gradient: 'linear-gradient(100deg, #d85b50 0%, #bb4a4f 60%, #c0392b 100%)',
    description: 'Best way to reach me directly',
  },
  {
    label: 'CV',
    href: '/cv-kamen-karchev.pdf',
    text: 'Download CV',
    brand: 'cv',
    gradient: 'linear-gradient(100deg, #5f4b47 0%, #8b6b66 60%, #6d4c41 100%)',
    description: 'Full academic and work history',
  },
  {
    label: 'Resume',
    href: '/resume-kamen-karchev.pdf',
    text: 'Download resume',
    brand: 'resume',
    gradient: 'linear-gradient(100deg, #3d3d5c 0%, #5c5c8a 60%, #4a4a70 100%)',
    description: 'One-page internship-focused version',
  },
]
