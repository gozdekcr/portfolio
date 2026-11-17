import {
  AudioLines,
  Bot,
  Braces,
  ChartLine,
  Cloud,
  Coffee,
  Component,
  FileJson,
  GraduationCap,
  MessageSquareText,
  Network,
  Palette,
  Puzzle,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Trophy,
  Workflow,
} from 'lucide-react'

// Icons referenced by name from src/data/*.js. Add new ones here.
const icons = {
  AudioLines,
  Bot,
  Braces,
  ChartLine,
  Cloud,
  Coffee,
  Component,
  FileJson,
  GraduationCap,
  MessageSquareText,
  Network,
  Palette,
  Puzzle,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Trophy,
  Workflow,
}

export default function Icon({ name, ...props }) {
  const Cmp = icons[name] ?? Sparkles
  return <Cmp aria-hidden {...props} />
}
