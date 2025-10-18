import { useMemo } from "react";
import { LandingLayout } from "@/layouts/LandingLayout";
import { HeroSlider } from "@/components/media/HeroSlider";
import { ProjectsGrid } from "@/components/cards/ProjectsGrid";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  kpis,
  serviceHighlights,
  managementCopy,
  valuesList,
  testimonials,
  teamFocus
} from "@/assets/content";
import { getProjects } from "@/lib/projects";
import { Wrench, Home as HomeIcon, Zap, Building2, Calendar, ShieldCheck } from "lucide-react";

const iconMap = {
  Wrench,
  Home: HomeIcon,
  Zap
};

export const Home = () => {
  const projects = useMemo(() => getProjects().slice(0, 3), []);

  return (
    <LandingLayout>
      <HeroSlider />
      <section className="bg-background py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-6 px-6">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="flex-1 min-w-[180px] border-border/60 bg-ink-2">
              <CardContent className="space-y-2 p-6">
                <p className="text-4xl font-bold text-primary">
                  {kpi.value}
                  {kpi.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-ink-2 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Soluciones Kolbing</h2>
            <p className="text-lg text-muted-foreground">
              Servicios integrales de mantenimiento, remodelación e instalaciones eléctricas.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {serviceHighlights.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <Card key={service.title} className="border-border/60">
                  <CardContent className="space-y-4 p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <Button asChild variant="link" className="px-0">
                      <Link to="/proyectos">Ver proyectos</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-primary">Gestión integral</p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{managementCopy.title}</h2>
            <p className="text-muted-foreground">{managementCopy.description}</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {managementCopy.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <ShieldCheck className="mt-1 h-5 w-5 text-secondary" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contacto">Agendar llamada</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/nosotros">Conocer equipo</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/40 bg-ink-2 p-6">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                <p className="text-lg font-semibold text-foreground">Casos destacados</p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Supervisamos cada proyecto con gerencia dedicada, cronogramas visibles y reportes digitales en tiempo real.
              </p>
              <Separator className="my-6" />
              <div className="space-y-4 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" /> Planificación por fases sin detener operaciones.
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-secondary" /> Protocolos de seguridad certificados.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {valuesList.map((value) => (
                <Card key={value.label} className="border-border/60">
                  <CardContent className="space-y-2 p-5">
                    <h3 className="text-lg font-semibold text-foreground">{value.label}</h3>
                    <p className="text-xs text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-20">
        <div className="mx-auto max-w-6xl space-y-8 px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Proyectos Kolbing</h2>
              <p className="text-sm text-muted-foreground">
                Resultados tangibles en mantenimiento, remodelación e instalaciones eléctricas.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/proyectos">Ver todos los proyectos</Link>
            </Button>
          </div>
          <ProjectsGrid projects={projects} />
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Clientes que confían</h2>
            <p className="text-sm text-muted-foreground">
              Testimonios reales de empresas y familias que confían en Kolbing Like.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                content={testimonial.content}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-ink-2 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-foreground">Equipo Kolbing</h2>
            <p className="text-sm text-muted-foreground">
              Profesionales certificados con experiencia en proyectos corporativos y residenciales.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {teamFocus.map((team) => (
                <li key={team.role} className="rounded-xl border border-border/40 bg-background/40 p-4">
                  <h3 className="text-base font-semibold text-foreground">{team.role}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{team.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-effect rounded-2xl border border-border/40 p-8">
            <h3 className="text-2xl font-semibold text-foreground">¿Listo para tu próximo proyecto?</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Agenda una reunión de diagnóstico con nuestro equipo y recibe una propuesta integral.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contacto">Agendar llamada</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/faq">Ver preguntas frecuentes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Home;
