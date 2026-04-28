import type { Metadata } from "next"
import ProjectsScroller from "./ProjectsScroller"

export const metadata: Metadata = {
  title: "All Projects | Md Shahriar Hossein",
  description: "A complete list of projects built by Md Shahriar Hossein.",
}

export default function ProjectsPage() {
  return <ProjectsScroller />
}
