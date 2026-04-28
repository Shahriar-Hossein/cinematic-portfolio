import { Play } from "lucide-react"

interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-6 animate-fade-in">
          A Developer Portfolio Experience
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 animate-slide-up">
          Md Shahriar Hossein
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-4 animate-slide-up delay-200">
          Software Engineer
        </p>
        <p className="text-muted-foreground/60 text-sm max-w-md mx-auto mb-12 animate-fade-in delay-300">
          2+ years building robust systems with PHP, Laravel, React, and WordPress
        </p>
        <button
          onClick={onStart}
          className="group relative px-8 py-4 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-fade-in delay-500"
        >
          <span className="flex items-center gap-3 text-sm tracking-widest uppercase">
            <Play className="w-4 h-4" />
            Play Trailer
          </span>
        </button>
        <p className="text-muted-foreground/50 text-xs mt-8 animate-fade-in delay-700">
          Press SPACE to start | Use arrow keys to navigate
        </p>
      </div>
    </div>
  )
}
