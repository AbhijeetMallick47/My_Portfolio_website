import { navLinks, profile } from '../utils/data'
import { SocialLinks } from '../components/SocialLinks'
import { ArrowUpRight } from '../components/Icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-current/10 py-14">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          {/* Brand + CTA */}
          <div className="max-w-sm">
            <a href="#home" className="font-display text-2xl font-bold">
              {profile.firstName}
              <span className="text-gradient">.dev</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-current/55">
              Crafting immersive, high-performance web experiences from {profile.location}.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-current/80 hover:text-gradient"
            >
              {profile.email}
              <ArrowUpRight
                width={15}
                height={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-current/55 transition-colors hover:text-current"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-current/10 pt-6 text-xs text-current/40 sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono">
            Built with React · Three.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
