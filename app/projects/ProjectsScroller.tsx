"use client"

import Link from "next/link"
import { useState } from "react"
import { projects } from "@/lib/data"

// Duplicate list for seamless infinite loop
const doubled = [...projects, ...projects]

export default function ProjectsScroller() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden film-grain">
      {/* Header */}
      <div className="shrink-0 px-8 pt-10 pb-6 flex items-end justify-between border-b border-border">
        <div>
          <p
            className="text-primary text-xs tracking-[0.3em] uppercase mb-2 opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards" }}
          >
            The Complete Works
          </p>
          <h1
            className="font-serif text-3xl md:text-4xl text-foreground opacity-0 animate-slide-up"
            style={{ animationFillMode: "forwards", animationDelay: "80ms" }}
          >
            All Projects
          </h1>
        </div>
        <div
          className="text-right opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards", animationDelay: "300ms" }}
        >
          <p className="text-muted-foreground text-xs font-mono">
            {projects.length} projects
          </p>
          <p className="text-muted-foreground/50 text-[10px] font-mono mt-1 tracking-widest uppercase">
            Hover to pause
          </p>
        </div>
      </div>

      {/* Scrolling area */}
      <div className="flex-1 overflow-hidden relative">
        {/* Left fade */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div
          className="h-full flex items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-6 w-max px-8"
          style={{
            animation: `scroll-left ${projects.length * 6}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
          >
            {doubled.map((project, index) => (
              <Link
                key={`${project.name}-${index}`}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-75 md:w-85 shrink-0 border border-border hover:border-primary bg-card hover:bg-primary/5 p-6 transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-mono text-xs text-muted-foreground/40 mt-1 shrink-0 select-none">
                    {String((index % projects.length) + 1).padStart(2, "0")}
                  </span>
                  {project.featured && (
                    <span className="shrink-0 text-[10px] font-mono text-primary/50 border border-primary/20 px-2 py-0.5 tracking-widest uppercase">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors leading-tight mb-2 min-h-14">
                  {project.name}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 min-h-16">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-primary/60 border border-primary/20 px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary font-mono text-sm tracking-wider uppercase">
                  View Project -{'>'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="shrink-0 px-8 py-4 border-t border-border flex items-center justify-between">
        <p className="text-muted-foreground/40 text-[10px] font-mono tracking-widest uppercase">
          End of reel — looping
        </p>
        <Link
          href="/"
          className="text-xs font-mono text-primary/60 hover:text-primary transition-colors tracking-widest uppercase"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
