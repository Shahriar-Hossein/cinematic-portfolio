import Link from "next/link"
import { socialLinks } from "@/lib/data"

export default function IntroScene() {
  return (
    <div className="min-h-screen flex items-center justify-center py-[8vh] px-6">
      <div className="text-center max-w-4xl">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
          Introducing
        </p>
        <h1 className="font-serif text-5xl md:text-8xl text-foreground mb-6 opacity-0 animate-slide-up delay-200">
          Md Shahriar Hossein
        </h1>
        <p className="text-muted-foreground text-xl md:text-2xl opacity-0 animate-slide-up delay-400">
          A Software Engineer Story
        </p>
        <div className="flex justify-center gap-6 mt-12 opacity-0 animate-fade-in delay-600">
          {socialLinks.slice(0, 3).map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors text-sm tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
