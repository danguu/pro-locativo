import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getProjectBySlug } from "@/lib/projects";

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = useMemo(() => (slug ? getProjectBySlug(slug) : undefined), [slug]);

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <DefaultLayout>
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background" />
          <img src={project.heroImage} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-6">
          <Breadcrumbs items={[{ label: "Proyectos", href: "/proyectos" }, { label: project.name }]} />
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{project.category}</Badge>
              <Badge variant="outline" className="border-border/60">
                {project.city}
              </Badge>
              <Badge variant="default" className="bg-secondary">
                {project.status}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">{project.name}</h1>
            <p className="text-lg text-muted-foreground">{project.summary}</p>
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <GalleryCarousel images={project.gallery} title={project.name} />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Descripción del proyecto</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Ficha técnica</h3>
              <Accordion type="multiple" className="space-y-4">
                {project.technicalSheet.map((section, index) => (
                  <AccordionItem key={section.title} value={`${index}`} className="rounded-xl border border-border/40">
                    <AccordionTrigger className="px-4 text-left text-base font-medium">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {section.items.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <aside className="space-y-8">
            <div className="rounded-2xl border border-border/50 bg-ink-2 p-6">
              <h3 className="text-lg font-semibold text-foreground">Datos clave</h3>
              <Table className="mt-4 text-sm text-muted-foreground">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Categoría</TableCell>
                    <TableCell>{project.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Ciudad</TableCell>
                    <TableCell>{project.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Estado</TableCell>
                    <TableCell>{project.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Ubicación</TableCell>
                    <TableCell>{project.location.address}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="space-y-3 rounded-2xl border border-dashed border-primary/40 p-6">
              <h3 className="text-lg font-semibold text-foreground">Ubicación de referencia</h3>
              <p className="text-sm text-muted-foreground">
                Vista referencial del proyecto. El mapa se activará en la implementación final.
              </p>
              <div className="flex h-40 items-center justify-center rounded-xl bg-ink-3 text-xs text-muted-foreground">
                Mapa embebido próximamente
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <a
                  href={`https://www.google.com/maps?q=${project.location.lat},${project.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en mapa
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>
      <div className="fixed bottom-6 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
        <div className="glass-effect flex items-center justify-between rounded-full border border-border/40 px-6 py-3 shadow-lg">
          <div>
            <p className="text-sm font-medium text-foreground">¿Necesitas una cotización?</p>
            <p className="text-xs text-muted-foreground">Un especialista responde en menos de 24 horas.</p>
          </div>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/contacto">Agendar llamada</Link>
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProjectDetail;
