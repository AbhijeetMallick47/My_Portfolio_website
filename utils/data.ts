/**
 * Single source of truth for all portfolio content.
 * Edit the values here to personalise the site — every section reads from this file.
 */

export const profile = {
  name: 'Abhijeet Mallick',
  firstName: 'Abhijeet',
  initials: 'AM',
  role: 'Front-End Developer',
  tagline: 'I build clean, responsive web experiences',
  // Second line of the hero headline (after the gradient role).
  heroLine: 'crafting the modern web',
  subtitle:
    'Final-year B.Tech (IT) student at NIT Kurukshetra and a front-end developer who turns ideas into fast, accessible and responsive web apps with React, JavaScript and the modern web stack.',
  location: 'Kurukshetra, India',
  email: 'abhijeetmallick.gusknp2022@gmail.com',
  altEmail: '12213047@nitkkr.ac.in',
  phone: '+91 63951 03805',
  available: true,
  availabilityText: 'Open to internships & full-time roles',
  // The full resume lives in /public so the button can serve it directly.
  resumeUrl: '/Abhijeet_Mallick_Resume.pdf',
} as const

/**
 * Contact form delivery (Web3Forms — https://web3forms.com).
 * The access key is safe to expose on the client; it only allows submitting
 * to YOUR configured inbox. Get a free key by entering your email at
 * https://web3forms.com — then either paste it below or set VITE_WEB3FORMS_KEY
 * in a `.env` file (the env var wins if present).
 */
export const contactConfig = {
  web3formsAccessKey:
    (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ??
    '7afae53f-60a6-4b74-8a53-6ce8975bf595',
  // Subject line of the email you receive.
  subject: 'New message from your portfolio',
} as const

export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: '7.46', label: 'CGPA · B.Tech IT' },
  { value: '3★', label: 'CodeChef coder' },
  { value: '200+', label: 'Lives impacted' },
  { value: '2026', label: 'Graduating' },
]

export type Skill = { name: string; level: number; category: string }

export const skills: Skill[] = [
  { name: 'React.js', level: 88, category: 'Frontend' },
  { name: 'JavaScript (ES6+)', level: 90, category: 'Frontend' },
  { name: 'HTML & CSS', level: 92, category: 'Frontend' },
  { name: 'Node.js / Express', level: 78, category: 'Backend' },
  { name: 'C / C++', level: 85, category: 'Languages' },
  { name: 'Python', level: 80, category: 'Languages' },
  { name: 'SQL / MySQL', level: 78, category: 'Database' },
  { name: 'Git & GitHub', level: 85, category: 'Tools' },
]

export const skillBadges = [
  'React',
  'JavaScript',
  'HTML',
  'CSS',
  'Node.js',
  'Express.js',
  'Python',
  'C',
  'C++',
  'SQL',
  'MySQL',
  'Git',
  'GitHub',
  'REST APIs',
  'Fetch API',
  'VS Code',
]

export type Project = {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  accent: string
  link: string
  repo: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'weather',
    title: 'Weather App',
    category: 'Web App · API',
    description:
      'A responsive single-page weather dashboard showing live forecasts and air quality, with async data fetching, robust error handling and friendly loading states.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    accent: '#22d3ee',
    link: '#',
    repo: '#',
    featured: true,
  },
  {
    id: 'travel',
    title: 'Tour & Travel Website',
    category: 'Responsive Website',
    description:
      'A responsive travel site showcasing packages with a reusable grid layout, client-side search/filter, a validated lead-capture form and a mobile-first sticky navigation.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Font Awesome'],
    accent: '#f472b6',
    link: '#',
    repo: '#',
    featured: true,
  },
  {
    id: 'portfolio',
    title: '3D Developer Portfolio',
    category: 'Portfolio · 3D',
    description:
      'This very site — an immersive, fully responsive portfolio with a real-time WebGL hero, scroll-driven motion and premium micro-interactions.',
    tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
    accent: '#7c5cff',
    link: '#',
    repo: '#',
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
  tags: string[]
}

export const experiences: Experience[] = [
  {
    role: 'B.Tech in Information Technology',
    company: 'NIT Kurukshetra',
    period: '2022 — 2026',
    description:
      'Pursuing my bachelor’s degree (CGPA 7.46) with coursework spanning DSA, DBMS, operating systems, computer networks and OOP — alongside hands-on web development.',
    tags: ['CGPA 7.46', 'DSA', 'DBMS'],
  },
  {
    role: 'Coordinator',
    company: 'Rooh Society, NIT Kurukshetra',
    period: 'Nov 2022 — Present',
    description:
      'Lead 50+ volunteers across donation drives and outreach events, running social initiatives that have impacted 200+ individuals and supporting students through mentorship.',
    tags: ['Leadership', 'Community', '50+ volunteers'],
  },
  {
    role: 'Senior Secondary (Class XII)',
    company: 'JNV, Lucknow',
    period: '2021',
    description:
      'Completed intermediate education under the UP Board, scoring 91% with a focus on the science stream.',
    tags: ['UP Board', '91%'],
  },
  {
    role: 'Secondary (Class X)',
    company: 'JNV, Bareilly',
    period: '2019',
    description:
      'Completed matriculation under the UP Board, scoring 98.2% and laying the foundation for an engineering path.',
    tags: ['UP Board', '98.2%'],
  },
]

export type Achievement = { title: string; detail: string; year: string }

export const achievements: Achievement[] = [
  {
    title: '3★ on CodeChef',
    detail: 'Maximum competitive-programming rating of 1665.',
    year: '2025',
  },
  {
    title: 'Flipkart GRiD 6.0',
    detail: 'Qualified Round 2 of the national-level software development hackathon.',
    year: '2024',
  },
  {
    title: 'Meesho DICE Challenge',
    detail: 'Cleared the problem-solving round in the software development domain.',
    year: '2024',
  },
]

export type Social = { label: string; href: string; icon: string }

// NOTE: replace the GitHub & LinkedIn URLs below with your exact profile links.
export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:abhijeetmallick.gusknp2022@gmail.com', icon: 'mail' },
]
