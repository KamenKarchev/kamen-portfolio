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

export const PROJECTS = {
  lead: {
    id: 'hero-project',
    title: 'DopeyUserAPI',
    value: 3,
    body: 'A Phoenix backend for authentication, user flows, tokens, and email logic, built to reflect production-minded backend thinking.',
    tags: ['Elixir', 'Phoenix', 'PostgreSQL', 'Docker', 'OAuth'],
    link: 'https://github.com/KamenKarchev',
    image: '/images/project-dopeyuserapi.jpg',
  },
  mini: [
    {
      id: 'side-project',
      title: 'PipePrompt',
      value: 1.5,
      body: 'An Android app built with Kotlin and Jetpack Compose, focused on fast prompt workflows and clean mobile interaction.',
      tags: ['Kotlin', 'Compose', 'Android'],
      link: 'https://github.com/KamenKarchev',
      image: '/images/project-pipeprompt.jpg',
    },
    {
      id: 'small-project',
      value: 0.8,
      title: 'Media and storytelling',
      body: 'Creative and media work that proves I can shape narratives, not just implement features.',
      tags: ['Photoshop', 'Video', 'Script'],
      link: '#',
      image: '/images/project-media-storytelling.jpg',
    },
    {
      id: 'misc-project',
      title: 'Systems notebook',
      // Explicit value so it doesn't accidentally inherit the average weight.
      // Tune this number to adjust how much space this tile occupies.
      value: 0.5,
      body: 'A running collection of backend architecture notes, reliability patterns, and practical experiments from course and internship work.',
      tags: ['Architecture', 'Notes', 'Backend'],
      link: 'https://github.com/KamenKarchev',
      image: '/images/project-systems-notebook.jpg',
    },
  ],
}

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
