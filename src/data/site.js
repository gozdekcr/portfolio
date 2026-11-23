// General site copy and links. Edit freely.

export const links = {
  email: 'gozdekacar02@gmail.com',
  github: 'https://github.com/gozdekcr',
  linkedin: 'https://www.linkedin.com/in/gözde-kacar-227a38322?',
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'learning', label: 'Learning' },
  { id: 'contact', label: 'Contact' },
]

export const hero = {
  label: 'Computer Engineering Student',
  headline: ["Hello! I'm", 'Gözde'],
  cta: { label: 'My Works', href: '#projects' },
  text: 'I build products and keep sharpening my skills in AI, backend development and data science.',
  image: 'images/hero-illustration.webp', // relative to /public
  imageAlt:
    'Pixel-art illustration of Gözde coding at a cozy desk with three monitors, a plant, books and a sleeping orange cat',
}

export const about = {
  intro:
    "I'm a second-year Computer Engineering student at Muğla Sıtkı Koçman University, in the English-medium program. I learn best by building, especially AI-powered tools that turn messy information into something clean and useful.",
  avatar: 'images/avatar.png', // relative to /public
  avatarAlt: 'Pixel-art portrait of Gözde with long dark hair and round glasses',
  // `icon` is a lucide-react icon name (see src/components/Icon.jsx)
  interests: [
    { icon: 'Bot', title: 'AI-powered tools', text: 'LLMs that structure data' },
    { icon: 'Workflow', title: 'Automation', text: 'Less repetitive work' },
    { icon: 'Server', title: 'Exploring backend', text: 'APIs and databases' },
    { icon: 'ChartLine', title: 'Data science', text: 'My long-term path' },
    { icon: 'Palette', title: 'Design & UI', text: 'Figma and clean interfaces' },
    { icon: 'Puzzle', title: 'Problem solving', text: 'Daily DSA and math' },
  ],
}

export const contact = {
  heading: "Let's talk!",
  text: 'Open to internships, collaborations and a kind hello.',
  copyright: '© 2026 Gözde Kacar',
}
