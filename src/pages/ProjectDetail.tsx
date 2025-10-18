import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { projects } from "@/assets/content";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contact2, MapPin, Clock, Phone } from "lucide-react";
import { mapEmbed } from "@/assets/content";

export const ProjectDetail = () => {
  const { slug } = useParams();

  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);

  if (!project) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <DefaultLayout>
      <section className="bg-slate-900 pb-16 pt-32 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Proyectos", href: "/proyectos" },
              { label: project.name },
            ]}
          />
          <div className="mt-6 max-w-3xl space-y-4">
            <Badge variant="secondary" className="bg-white/10 text-white">
              {project.category}
            </Badge>
            <h1 className="text-4xl font-semibold">{project.name}</h1>
            <p className="text-lg text-slate-200">{project.headline}</p>
            <div className="flex flex-wrap gap-3 text-sm text-emerald-200">
              <span>{project.city}</span>
              <span>{project.status}</span>
              <span>{project.services[0]}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary" className="bg-white text-slate-900 hover:bg-white/90">
                <Link to="/contacto">Agendar llamada</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10">
                <Link to="/proyectos">Volver al portafolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="-mt-12 bg-transparent pb-20">
        <div className="container mx-auto px-4">
          <GalleryCarousel items={project.gallery} />
          <div className="mt-12 grid gap-10 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-900">Descripción del proyecto</h2>
                <p className="mt-4 text-slate-600">{project.description}</p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {project.techSheet.map((section, index) => (
                  <AccordionItem
                    key={`${section.title}-${index}`}
                    value={`${index}`}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold text-slate-900">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <ul className="grid gap-2 text-sm text-slate-600">
                        {section.items.map((item) => (
                          <li key={item} className="rounded-xl bg-slate-100 px-4 py-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900">Resultados clave</h3>
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Indicador</TableHead>
                      <TableHead>Detalle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {project.highlights.map((highlight) => (
                      <TableRow key={highlight.label}>
                        <TableCell className="font-medium text-slate-900">{highlight.label}</TableCell>
                        <TableCell className="text-slate-600">{highlight.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <aside className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900">Ficha rápida</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden /> {project.city}
                  </li>
                  {project.highlights[0] && (
                    <li className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary" aria-hidden /> {project.highlights[0].value}
                    </li>
                  )}
                  <li className="flex items-center gap-3">
                    <Contact2 className="h-4 w-4 text-primary" aria-hidden /> {project.clientNote}
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900">Servicios involucrados</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {project.services.map((service) => (
                    <li key={service} className="rounded-xl bg-slate-100 px-4 py-2">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900">Agenda una llamada</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Cuéntanos sobre tu proyecto y armaremos un plan a la medida con cronograma y presupuesto detallado.
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link to="/contacto" className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" aria-hidden /> Hablar con un especialista
                  </Link>
                </Button>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-slate-900">Mapa del proyecto</h3>
                <p className="mt-2 text-sm text-slate-600">{mapEmbed.description}</p>
                <div className="mt-4 h-48 w-full rounded-2xl bg-slate-200"></div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default ProjectDetail;
