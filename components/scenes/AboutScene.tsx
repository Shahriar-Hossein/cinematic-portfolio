export default function AboutScene() {
  return (
    <div className="min-h-screen flex items-center py-[8vh] px-6">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
              Chapter I
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 opacity-0 animate-slide-up delay-100">
              The Developer
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 opacity-0 animate-slide-up delay-200">
              A software engineer with <span className="text-primary">2+ years</span> of experience building
              robust, scalable, and maintainable systems across multiple stacks and platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 opacity-0 animate-slide-up delay-300">
              My focus spans backend development, API design, and full-stack web applications using
              <span className="text-foreground"> PHP, Laravel, WordPress, React, </span> and modern frameworks.
            </p>
            <p className="text-muted-foreground leading-relaxed opacity-0 animate-slide-up delay-400">
              I write clean, efficient, and scalable code while continuously learning new technologies and
              collaborating effectively across teams.
            </p>
          </div>
          <div className="relative opacity-0 animate-fade-in delay-500">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2+", label: "Years" },
                { value: "10+", label: "Projects" },
                { value: "1M+", label: "Users" },
                { value: "3", label: "Companies" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="aspect-square bg-secondary/30 border border-border flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="font-mono text-4xl text-primary mb-1">{value}</div>
                    <div className="text-muted-foreground text-xs tracking-widest uppercase">{label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-primary/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
