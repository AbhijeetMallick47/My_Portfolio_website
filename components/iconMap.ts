import { Github, Linkedin, Twitter, Dribbble, Mail } from './Icons'

/** Lookup map so data-driven lists (e.g. socials) can resolve an icon by name. */
export const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
  mail: Mail,
} as const

export type IconName = keyof typeof iconMap
