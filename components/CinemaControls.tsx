import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize } from "lucide-react"
import { scenes } from "@/lib/data"

interface CinemaControlsProps {
  currentScene: number
  isPlaying: boolean
  isMuted: boolean
  progress: number
  showControls: boolean
  onPlayPause: () => void
  onMuteToggle: () => void
  onNext: () => void
  onPrev: () => void
  onGoToScene: (index: number) => void
}

export default function CinemaControls({
  currentScene,
  isPlaying,
  isMuted,
  progress,
  showControls,
  onPlayPause,
  onMuteToggle,
  onNext,
  onPrev,
  onGoToScene,
}: CinemaControlsProps) {
  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0)

  return (
    <div
      className={`fixed bottom-[8vh] left-0 right-0 z-50 transition-all duration-500 ${
        showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span className="font-mono">{scenes[currentScene].name}</span>
            <span className="font-mono">
              {currentScene + 1} / {scenes.length}
            </span>
          </div>
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            {/* Scene markers */}
            {scenes.slice(0, -1).map((_, index) => {
              const markerPosition =
                (scenes.slice(0, index + 1).reduce((acc, s) => acc + s.duration, 0) / totalDuration) * 100
              return (
                <button
                  key={index}
                  onClick={() => onGoToScene(index + 1)}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-muted-foreground/30 hover:bg-primary rounded-full transition-colors"
                  style={{ left: `${markerPosition}%` }}
                />
              )
            })}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrev}
              disabled={currentScene === 0}
              className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={onPlayPause}
              className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={onNext}
              disabled={currentScene === scenes.length - 1}
              className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Scene Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                onClick={() => onGoToScene(index)}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  currentScene === index
                    ? "text-primary border-b border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onMuteToggle}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => document.documentElement.requestFullscreen?.()}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
