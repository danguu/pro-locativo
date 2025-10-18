import type { ProjectData } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

interface ProjectsGridProps {
  projects: ProjectData[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => (
  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

export default ProjectsGrid;
