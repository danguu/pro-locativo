import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { valuesList, timeline, managementCopy, teamFocus } from "@/assets/content";
import { ShieldCheck, Target } from "lucide-react";

export const About = () => (
  <DefaultLayout>
    <section className="gradient-hero py-20">
      <div className="mx-auto max-w-6xl space-y-6 px-6">
        <Breadcrumbs items={[{ label: "Nosotros" }]} />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Sobre Kolbing Like</h1>
          <p className="text-lg text-muted-foreground">
            Somos un equipo de profesionales dedicados a brindar servicios de mantenimiento, remodelación e instalaciones eléctricas con enfoque corporativo y atención personalizada.
          </p>
        </div>
      </div>
    </section>
    <section className="bg-background py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-foreground">Nuestro enfoque</h2>
          <p className="text-muted-foreground">{managementCopy.description}</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {managementCopy.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-secondary" /> {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 rounded-2xl border border-border/40 bg-ink-2 p-6">
          <h3 className="text-xl font-semibold text-foreground">Cronología Kolbing</h3>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="rounded-xl border border-border/40 bg-background/40 p-4">
                <p className="text-sm font-semibold text-primary">{item.year}</p>
                <p className="text-base font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="bg-ink-2 py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <h2 className="text-3xl font-semibold text-foreground">Valores que nos guían</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valuesList.map((value) => (
            <Card key={value.label} className="border-border/60">
              <CardContent className="space-y-3 p-6">
                <Target className="h-6 w-6 text-primary" />
                <p className="text-base font-semibold text-foreground">{value.label}</p>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <h2 className="text-3xl font-semibold text-foreground">Nuestro equipo</h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Profesionales certificados con más de 8 años de experiencia en proyectos corporativos y residenciales. Coordinamos especialistas para cada disciplina y aseguramos seguimiento continuo.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {teamFocus.map((team) => (
            <Card key={team.role} className="border-border/60">
              <CardContent className="space-y-2 p-6">
                <p className="text-base font-semibold text-foreground">{team.role}</p>
                <p className="text-xs text-muted-foreground">{team.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </DefaultLayout>
);

export default About;
