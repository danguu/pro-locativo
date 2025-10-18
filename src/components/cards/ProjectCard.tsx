import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/media/FallbackImage";
import type { ProjectData } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectData;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <Card className="flex h-full flex-col overflow-hidden border-border/60">
    <div className="relative aspect-[16/10]">
      <FallbackImage
        src={project.thumbnail}
        alt={`Proyecto ${project.name}`}
        className="h-full w-full object-cover"
        fallbackLabel={project.name}
      />
      <div className="absolute left-4 top-4 flex gap-2">
        <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur">
          {project.status}
        </Badge>
        <Badge variant="outline" className="bg-black/40 text-white border-white/30 backdrop-blur">
          {project.city}
        </Badge>
      </div>
    </div>
    <CardContent className="flex flex-1 flex-col gap-4 p-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="border-border/60 bg-background/60">
            {tag}
          </Badge>
        ))}
      </div>
      <Button asChild className="mt-4 w-full" variant="secondary">
        <Link to={`/proyectos/${project.slug}`}>Ver detalles</Link>
      </Button>
    </CardContent>
  </Card>
);

export default ProjectCard;
