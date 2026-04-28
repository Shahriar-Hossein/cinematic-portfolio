"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { scenes } from "@/lib/data"
import StartScreen from "@/components/StartScreen"
import CinemaControls from "@/components/CinemaControls"
import IntroScene from "@/components/scenes/IntroScene"
import AboutScene from "@/components/scenes/AboutScene"
import SkillsScene from "@/components/scenes/SkillsScene"
import ExperienceScene from "@/components/scenes/ExperienceScene"
import ProjectsScene from "@/components/scenes/ProjectsScene"
import ContactScene from "@/components/scenes/ContactScene"

export default function CinemaPortfolio() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [sceneProgress, setSceneProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalDuration = scenes.reduce((acc, s) => acc + s.duration, 0)

  const goToScene = useCallback((sceneIndex: number) => {
    if (sceneIndex < 0 || sceneIndex >= scenes.length) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScene(sceneIndex)
      setSceneProgress(0)
      setIsTransitioning(false)
    }, 500)
  }, [])

  const nextScene = useCallback(() => {
    if (currentScene < scenes.length - 1) {
      goToScene(currentScene + 1)
    }
  }, [currentScene, goToScene])

  const prevScene = useCallback(() => {
    if (currentScene > 0) {
      goToScene(currentScene - 1)
    }
  }, [currentScene, goToScene])

  // Auto-play through scenes
  useEffect(() => {
    if (!isPlaying || !hasStarted) return

    const currentDuration = scenes[currentScene].duration
    if (currentDuration === 0) return // Don't auto-advance on final scene

    progressIntervalRef.current = setInterval(() => {
      setSceneProgress((prev) => {
        const newProgress = prev + 100
        if (newProgress >= currentDuration) {
          nextScene()
          return 0
        }
        return newProgress
      })
    }, 100)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, currentScene, hasStarted, nextScene])

  // Calculate total progress
  useEffect(() => {
    const completedDuration = scenes.slice(0, currentScene).reduce((acc, s) => acc + s.duration, 0)
    const currentProgress = completedDuration + sceneProgress
    setProgress((currentProgress / totalDuration) * 100)
  }, [currentScene, sceneProgress, totalDuration])

  // Hide controls after inactivity
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (!hasStarted) {
          setHasStarted(true)
        } else {
          setIsPlaying((prev) => !prev)
        }
      }
      if (e.code === "ArrowRight") nextScene()
      if (e.code === "ArrowLeft") prevScene()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [hasStarted, nextScene, prevScene])

  const startMovie = () => {
    setHasStarted(true)
    setIsPlaying(true)
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden film-grain">
      {/* Letterbox bars */}
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />

      {/* Start Screen */}
      {!hasStarted && <StartScreen onStart={startMovie} />}

      {/* Main Cinema Screen */}
      {hasStarted && (
        <div className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {currentScene === 0 && <IntroScene />}
          {currentScene === 1 && <AboutScene />}
          {currentScene === 2 && <SkillsScene />}
          {currentScene === 3 && <ExperienceScene />}
          {currentScene === 4 && <ProjectsScene />}
          {currentScene === 5 && <ContactScene />}
        </div>
      )}

      {/* Cinema Controls */}
      {hasStarted && (
        <CinemaControls
          currentScene={currentScene}
          isPlaying={isPlaying}
          isMuted={isMuted}
          progress={progress}
          showControls={showControls}
          onPlayPause={() => setIsPlaying((prev) => !prev)}
          onMuteToggle={() => setIsMuted((prev) => !prev)}
          onNext={nextScene}
          onPrev={prevScene}
          onGoToScene={goToScene}
        />
      )}
    </div>
  )
}
