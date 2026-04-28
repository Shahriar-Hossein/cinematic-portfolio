import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { experience } from "@/lib/data"

export default function ExperienceScene() {
  return (
    <div className="min-h-screen flex items-center py-[8vh] px-6">
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
          Chapter III
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-12 opacity-0 animate-slide-up delay-100">
          The Journey
        </h2>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <Link
              key={exp.company}
              href={exp.companyLink}
              target="_blank"
              className="group block border-l-2 border-border hover:border-primary pl-6 py-4 transition-colors opacity-0 animate-slide-up"
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-muted-foreground">
                    at <span className="font-serif italic text-foreground">{exp.company}</span>
                  </p>
                </div>
                <span className="font-mono text-sm text-muted-foreground shrink-0">{exp.period}</span>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {exp.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-primary mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                <span>View more</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
