export const scenes = [
  { id: 0, name: "INTRO", duration: 5000 },
  { id: 1, name: "ABOUT", duration: 6000 },
  { id: 2, name: "SKILLS", duration: 6000 },
  { id: 3, name: "EXPERIENCE", duration: 7000 },
  { id: 4, name: "PROJECTS", duration: 7000 },
  { id: 5, name: "CONTACT", duration: 0 }, // Final scene - no auto-advance
]

export const projects = [
  {
    name: "Learning Platform",
    description:
      "An online marketplace for buying and selling courses. Teachers can create courses, quizzes, video lessons. Students can access materials after purchase through secure payment.",
    link: "#",
    tech: ["PHP", "TailwindCSS", "JavaScript", "SSLCOMMERZ"],
    featured: true,
  },
  {
    name: "Ecommerce Backend",
    description:
      "REST API backend for e-commerce with Swagger documentation. Features products, categories, banners, orders and user authentication.",
    link: "#",
    tech: ["Laravel", "REST API", "Sanctum", "L5-Swagger"],
    featured: true,
  },
  {
    name: "wowRevenue Plugin",
    description:
      "WordPress plugin for revenue optimization with React-based UI, cart updates, discounts, and real-time interactions.",
    link: "https://wpxpo.com",
    tech: ["WordPress", "React", "PHP", "jQuery"],
    featured: true,
  },
  {
    name: "University Automation",
    description:
      "Full-featured university management system with role-based access, real-time feedback, and integrations.",
    link: "#",
    tech: ["Laravel", "Livewire", "MySQL"],
    featured: false,
  },
  {
    name: "Portfolio Website V1",
    description: "Personal portfolio built with Vue.js and TypeScript to showcase projects and certifications.",
    link: "https://md-shahriar-hossein.vercel.app",
    tech: ["Vue.js", "TypeScript", "TailwindCSS"],
    featured: true,
  },
]

export const experience = [
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

export const skills = [
  { category: "Backend", items: ["PHP", "Laravel", "Node.js", "REST APIs"] },
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { category: "Database", items: ["MySQL", "PostgreSQL", "Redis"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "WordPress"] },
]

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/md-shahriar-hossein", icon: "gh", type: "social" },
  { name: "LinkedIn", url: "https://linkedin.com/in/md-shahriar-hossein", icon: "li", type: "social" },
  { name: "Email", url: "mailto:contact@mdshahriar.dev", icon: "em", type: "social" },
]

export const codingProfiles = [
  { name: "LeetCode", url: "https://leetcode.com/md-shahriar-hossein", description: "Problem Solving" },
  { name: "HackerRank", url: "https://hackerrank.com/md_shahriar_hossein", description: "Coding Challenges" },
  { name: "GitHub", url: "https://github.com/md-shahriar-hossein", description: "Open Source" },
]
