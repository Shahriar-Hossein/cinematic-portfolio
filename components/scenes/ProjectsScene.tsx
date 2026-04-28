import Link from "next/link"
import { projects } from "@/lib/data"

export default function ProjectsScene() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherCount = projects.filter((p) => !p.featured).length

  return (
    <div className="min-h-screen flex items-center py-[8vh] px-6">
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
          Chapter IV
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-12 opacity-0 animate-slide-up delay-100">
          The Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.name}
              href={project.link}
              target="_blank"
              className="group block bg-card border border-border hover:border-primary p-6 transition-all opacity-0 animate-slide-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                {project.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-primary/70 border border-primary/20 px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs font-mono text-muted-foreground">+{project.tech.length - 3}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8 opacity-0 animate-fade-in delay-500">
          And {otherCount} more projects...
        </p>
      </div>
    </div>
  )
}
