import { Link } from "react-router-dom";
import type { Project } from "@/assets/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/FallbackImage";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden">
        {project.heroImage ? (
          <img
            src={project.heroImage}
            alt={project.heroImageAlt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <FallbackImage label="Proyecto Kolbing" className="h-full" />
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur">
            {project.category}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-slate-900">
            {project.status}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">
            <Link to={`/proyectos/${project.slug}`} className="transition hover:text-primary">
              {project.name}
            </Link>
          </h3>
          <p className="text-sm uppercase tracking-wider text-emerald-500">{project.city}</p>
          <p className="text-sm text-slate-600">{project.summary}</p>
        </div>
        <ul className="flex flex-wrap gap-2 text-xs text-slate-500">
          {project.services.slice(0, 3).map((service) => (
            <li key={service} className="rounded-full border border-slate-200 px-3 py-1">
              {service}
            </li>
          ))}
        </ul>
        <Button asChild variant="ghost" className="mt-auto justify-start px-0 text-primary hover:text-primary">
          <Link to={`/proyectos/${project.slug}`}>Ver más</Link>
        </Button>
      </div>
    </article>
  );
};
