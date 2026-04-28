import { skills } from "@/lib/data"

export default function SkillsScene() {
  return (
    <div className="min-h-screen flex items-center py-[8vh] px-6">
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
          Chapter II
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-12 opacity-0 animate-slide-up delay-100">
          The Arsenal
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <h3 className="text-primary text-xs tracking-[0.2em] uppercase mb-4 font-mono">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li key={item} className="text-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
