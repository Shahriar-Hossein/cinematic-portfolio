"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, ChevronRight } from "lucide-react"
import Link from "next/link"

// Scene data
const scenes = [
  { id: 0, name: "INTRO", duration: 5000 },
  { id: 1, name: "ABOUT", duration: 6000 },
  { id: 2, name: "SKILLS", duration: 6000 },
  { id: 3, name: "EXPERIENCE", duration: 7000 },
  { id: 4, name: "PROJECTS", duration: 7000 },
  { id: 5, name: "CONTACT", duration: 0 }, // Final scene - no auto-advance
]

const projects = [
  {
    name: "Learning Platform",
    description: "An online marketplace for buying and selling courses. Teachers can create courses, quizzes, video lessons. Students can access materials after purchase through secure payment.",
    link: "#",
    tech: ["PHP", "TailwindCSS", "JavaScript", "SSLCOMMERZ"],
    featured: true,
  },
  {
    name: "Ecommerce Backend",
    description: "REST API backend for e-commerce with Swagger documentation. Features products, categories, banners, orders and user authentication.",
    link: "#",
    tech: ["Laravel", "REST API", "Sanctum", "L5-Swagger"],
    featured: true,
  },
  {
    name: "wowRevenue Plugin",
    description: "WordPress plugin for revenue optimization with React-based UI, cart updates, discounts, and real-time interactions.",
    link: "https://wpxpo.com",
    tech: ["WordPress", "React", "PHP", "jQuery"],
    featured: true,
  },
  {
    name: "University Automation",
    description: "Full-featured university management system with role-based access, real-time feedback, and integrations.",
    link: "#",
    tech: ["Laravel", "Livewire", "MySQL"],
    featured: false,
  },
  {
    name: "Portfolio Website V1",
    description: "Personal portfolio built with Vue.js and TypeScript to showcase projects and certifications.",
    link: "https://md-shahriar-hossein.vercel.app",
    tech: ["Vue.js", "TypeScript", "TailwindCSS"],
    featured: false,
  },
]

const experience = [
  {
    period: "July 2025 - Present",
    role: "Junior Software Engineer",
    company: "WPXPO",
    companyLink: "https://wpxpo.com",
    highlights: [
      "Improved WordPress plugin wowRevenue with React, jQuery, AJAX, PHP, and REST APIs",
      "Modularized React components and streamlined PHP logic, reducing file size by ~10%",
      "Optimized dynamic cart updates, discounts, and real-time UI changes",
    ],
  },
  {
    period: "September 2023 - 2024",
    role: "Junior Software Engineer",
    company: "DevSpace",
    companyLink: "#",
    highlights: [
      "Built full-stack web applications with Laravel and React",
      "Designed and implemented RESTful APIs",
      "Delivered features improving usability and performance",
    ],
  },
]

const skills = [
  { category: "Backend", items: ["PHP", "Laravel", "Node.js", "REST APIs"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { category: "Database", items: ["MySQL", "PostgreSQL", "Redis"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "WordPress"] },
]

const socialLinks = [
  { name: "GitHub", url: "https://github.com/md-shahriar-hossein", icon: "gh", type: "social" },
  { name: "LinkedIn", url: "https://linkedin.com/in/md-shahriar-hossein", icon: "li", type: "social" },
  { name: "Email", url: "mailto:contact@mdshahriar.dev", icon: "em", type: "social" },
]

const codingProfiles = [
  { name: "LeetCode", url: "https://leetcode.com/md-shahriar-hossein", description: "Problem Solving" },
  { name: "HackerRank", url: "https://hackerrank.com/md_shahriar_hossein", description: "Coding Challenges" },
  { name: "GitHub", url: "https://github.com/md-shahriar-hossein", description: "Open Source" },
]

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
      {!hasStarted && (
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
              onClick={startMovie}
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
      )}

      {/* Main Cinema Screen */}
      {hasStarted && (
        <div className={`transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {/* Scene: Intro */}
          {currentScene === 0 && (
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
          )}

          {/* Scene: About */}
          {currentScene === 1 && (
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
                      A software engineer with <span className="text-primary">2+ years</span> of experience 
                      building robust, scalable, and maintainable systems across multiple stacks and platforms.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4 opacity-0 animate-slide-up delay-300">
                      My focus spans backend development, API design, and full-stack web applications using 
                      <span className="text-foreground"> PHP, Laravel, WordPress, React, </span> and modern frameworks.
                    </p>
                    <p className="text-muted-foreground leading-relaxed opacity-0 animate-slide-up delay-400">
                      I write clean, efficient, and scalable code while continuously learning new technologies 
                      and collaborating effectively across teams.
                    </p>
                  </div>
                  <div className="relative opacity-0 animate-fade-in delay-500">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square bg-secondary/30 border border-border flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono text-4xl text-primary mb-1">2+</div>
                          <div className="text-muted-foreground text-xs tracking-widest uppercase">Years</div>
                        </div>
                      </div>
                      <div className="aspect-square bg-secondary/30 border border-border flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono text-4xl text-primary mb-1">10+</div>
                          <div className="text-muted-foreground text-xs tracking-widest uppercase">Projects</div>
                        </div>
                      </div>
                      <div className="aspect-square bg-secondary/30 border border-border flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono text-4xl text-primary mb-1">1M+</div>
                          <div className="text-muted-foreground text-xs tracking-widest uppercase">Users</div>
                        </div>
                      </div>
                      <div className="aspect-square bg-secondary/30 border border-border flex items-center justify-center">
                        <div className="text-center">
                          <div className="font-mono text-4xl text-primary mb-1">3</div>
                          <div className="text-muted-foreground text-xs tracking-widest uppercase">Companies</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-primary/30" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scene: Skills */}
          {currentScene === 2 && (
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
                      className={`opacity-0 animate-slide-up`}
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
          )}

          {/* Scene: Experience */}
          {currentScene === 3 && (
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
                      className={`group block border-l-2 border-border hover:border-primary pl-6 py-4 transition-colors opacity-0 animate-slide-up`}
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
                        <span className="font-mono text-sm text-muted-foreground shrink-0">
                          {exp.period}
                        </span>
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
          )}

          {/* Scene: Projects */}
          {currentScene === 4 && (
            <div className="min-h-screen flex items-center py-[8vh] px-6">
              <div className="max-w-5xl mx-auto w-full">
                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
                  Chapter IV
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-12 opacity-0 animate-slide-up delay-100">
                  The Works
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {projects.filter(p => p.featured).map((project, index) => (
                    <Link
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      className={`group block bg-card border border-border hover:border-primary p-6 transition-all opacity-0 animate-slide-up`}
                      style={{ animationDelay: `${200 + index * 100}ms` }}
                    >
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs font-mono text-primary/70 border border-primary/20 px-2 py-1">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="text-xs font-mono text-muted-foreground">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="text-center text-muted-foreground text-sm mt-8 opacity-0 animate-fade-in delay-500">
                  And {projects.filter(p => !p.featured).length} more projects...
                </p>
              </div>
            </div>
          )}

          {/* Scene: Contact (Final) */}
          {currentScene === 5 && (
            <div className="min-h-screen flex items-center justify-center py-[8vh] px-6">
              <div className="text-center max-w-3xl">
                <p className="text-primary text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in">
                  The End... Or The Beginning?
                </p>
                <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6 opacity-0 animate-slide-up delay-100">
                  Impressed with the trailer?
                </h2>
                <p className="text-muted-foreground text-xl mb-12 opacity-0 animate-slide-up delay-200">
                  Contact me for the <span className="text-primary font-serif italic">full movie</span>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in delay-300">
                  <Link
                    href="mailto:contact@mdshahriar.dev"
                    className="inline-block px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm tracking-widest uppercase animate-pulse-glow"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/resume.pdf"
                    target="_blank"
                    className="inline-block px-10 py-4 border border-primary text-primary hover:bg-primary/10 transition-colors text-sm tracking-widest uppercase"
                  >
                    Download Resume
                  </Link>
                </div>

                <div className="mt-12 opacity-0 animate-fade-in delay-500">
                  <p className="text-muted-foreground/50 text-xs tracking-widest uppercase mb-6">Connect</p>
                  <div className="flex justify-center gap-8">
                    {socialLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors group"
                      >
                        <span className="text-sm tracking-wide group-hover:underline underline-offset-4">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-10 opacity-0 animate-fade-in delay-600">
                  <p className="text-muted-foreground/50 text-xs tracking-widest uppercase mb-6">Coding Profiles</p>
                  <div className="flex justify-center gap-8">
                    {codingProfiles.map((profile) => (
                      <Link
                        key={profile.name}
                        href={profile.url}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition-colors group text-center"
                      >
                        <span className="block text-sm tracking-wide group-hover:underline underline-offset-4">
                          {profile.name}
                        </span>
                        <span className="text-xs text-muted-foreground/50">{profile.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border opacity-0 animate-fade-in delay-700">
                  <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">
                    A Md Shahriar Hossein Production
                  </p>
                  <p className="text-muted-foreground/30 text-xs mt-2">
                    Built with Next.js, Tailwind CSS, and imagination
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cinema Controls */}
      {hasStarted && (
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
                  const markerPosition = (scenes.slice(0, index + 1).reduce((acc, s) => acc + s.duration, 0) / totalDuration) * 100
                  return (
                    <button
                      key={index}
                      onClick={() => goToScene(index + 1)}
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
                  onClick={prevScene}
                  disabled={currentScene === 0}
                  className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={nextScene}
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
                    onClick={() => goToScene(index)}
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
                  onClick={() => setIsMuted(!isMuted)}
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
      )}
    </div>
  )
}
