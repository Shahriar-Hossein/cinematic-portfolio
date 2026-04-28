import Link from "next/link"
import { socialLinks, codingProfiles } from "@/lib/data"

export default function ContactScene() {
  return (
    <div className="min-h-screen flex items-center justify-center py-[8vh] px-6">
      <div className="text-center max-w-3xl">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
          The End... Or The Beginning?
        </p>
        <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6 opacity-0 animate-slide-up delay-100">
          Impressed with the trailer?
        </h2>
        <p className="text-muted-foreground text-xl mb-12 opacity-0 animate-slide-up delay-200">
          Contact me for the <span className="text-primary font-serif italic">full movie</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in delay-300">
          <Link
            href="mailto:contact@mdshahriar.dev"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm tracking-widest uppercase animate-pulse-glow"
          >
            Get in Touch
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="inline-block px-10 py-4 border border-primary text-primary hover:bg-primary/10 transition-colors text-sm tracking-widest uppercase"
          >
            Download Resume
          </Link>
        </div>

        <div className="mt-12 opacity-0 animate-fade-in delay-500">
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase mb-6">Connect</p>
          <div className="flex justify-center gap-8">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="text-sm tracking-wide group-hover:underline underline-offset-4">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 opacity-0 animate-fade-in delay-600">
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase mb-6">Coding Profiles</p>
          <div className="flex justify-center gap-8">
            {codingProfiles.map((profile) => (
              <Link
                key={profile.name}
                href={profile.url}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors group text-center"
              >
                <span className="block text-sm tracking-wide group-hover:underline underline-offset-4">
                  {profile.name}
                </span>
                <span className="text-xs text-muted-foreground/50">{profile.description}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border opacity-0 animate-fade-in delay-700">
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">
            A Md Shahriar Hossein Production
          </p>
          <p className="text-muted-foreground/30 text-xs mt-2">
            Built with Next.js, Tailwind CSS, and imagination
          </p>
        </div>
      </div>
    </div>
  )
}
