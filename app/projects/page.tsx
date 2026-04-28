import Link from "next/link"
import { projects } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Projects | Md Shahriar Hossein",
  description: "A complete list of projects built by Md Shahriar Hossein.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      {/* Film grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards", animationDuration: "0.6s" }}>
            The Complete Works
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl text-foreground mb-4 opacity-0 animate-slide-up"
            style={{ animationFillMode: "forwards", animationDuration: "0.7s", animationDelay: "100ms" }}
          >
            All Projects
          </h1>
          <p
            className="text-muted-foreground text-sm opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards", animationDuration: "0.7s", animationDelay: "300ms" }}
          >
            {projects.length} projects — from side experiments to production systems.
          </p>
        </div>

        {/* Divider */}
        <div
          className="border-t border-border mb-12 opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards", animationDuration: "0.6s", animationDelay: "400ms" }}
        />

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-card border border-border hover:border-primary p-6 transition-all opacity-0 animate-slide-up relative"
              style={{
                animationFillMode: "forwards",
                animationDuration: "0.6s",
                animationDelay: `${500 + index * 80}ms`,
              }}
            >
              {/* Featured badge */}
              {project.featured && (
                <span className="absolute top-4 right-4 text-[10px] font-mono text-primary/60 border border-primary/20 px-2 py-0.5 tracking-widest uppercase">
                  Featured
                </span>
              )}

              <h2 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors mb-2 pr-16">
                {project.name}
              </h2>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-primary/70 border border-primary/20 px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Hover arrow */}
              <div className="mt-4 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                <span>View project</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-16 pt-8 border-t border-border flex items-center justify-between opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards", animationDuration: "0.6s", animationDelay: "1200ms" }}
        >
          <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase">
            End of reel
          </p>
          <Link
            href="/"
            className="text-xs font-mono text-primary/70 hover:text-primary transition-colors tracking-widest uppercase"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}
