import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { missionHighlights, timeline, valuePillars, teamHighlights } from "@/assets/content";
import { Check, Award, Users, Shield, Target } from "lucide-react";

const valueIcons = [Target, Shield, Users, Award];

export const About = () => {
  return (
    <DefaultLayout>
      <section className="bg-slate-900 pb-16 pt-32 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Nosotros" }]} />
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold">Sobre Kolbing Like</h1>
            <p className="text-lg text-slate-200">
              Somos un equipo de profesionales dedicados a brindar servicios de mantenimiento, remodelación e instalaciones
              eléctricas de la más alta calidad.
            </p>
          </div>
        </div>
      </section>
      <section className="-mt-12 bg-transparent pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl" id="enfoque">
              <h2 className="text-3xl font-semibold text-slate-900">Nuestro enfoque</h2>
              <p className="mt-4 text-slate-600">
                Nos especializamos en ofrecer soluciones integrales que cubren desde mantenimiento preventivo hasta remodelaciones
                y proyectos eléctricos. Con más de ocho años de experiencia, garantizamos procesos eficientes y resultados de
                alto estándar.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-slate-600">
                {missionHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-slate-100 px-4 py-3">
                    <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl" id="historia">
              <h2 className="text-3xl font-semibold text-slate-900">Historia Kolbing</h2>
              <p className="mt-4 text-slate-600">
                Un camino de crecimiento constante marcado por la confianza de nuestros clientes y la especialización del
                talento humano.
              </p>
              <div className="mt-8 space-y-6">
                {timeline.map((item) => (
                  <div key={item.year} className="relative border-l-2 border-primary pl-6">
                    <span className="absolute -left-[11px] top-0 h-4 w-4 rounded-full bg-primary"></span>
                    <div className="text-sm font-semibold text-primary">{item.year}</div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl" id="equipo">
            <h2 className="text-3xl font-semibold text-slate-900">Equipo multidisciplinario</h2>
            <p className="mt-4 text-slate-600">
              Profesionales certificados en mantenimiento, arquitectura, ingeniería eléctrica y atención al cliente trabajan en
              conjunto para asegurar entregas oportunas y confiables.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {teamHighlights.map((team) => (
                <div key={team.role} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900">{team.role}</h3>
                  <p className="mt-3 text-sm">{team.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {valuePillars.map((pillar, index) => {
              const Icon = valueIcons[index] ?? Award;
              return (
                <div key={pillar} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{pillar}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Sostenemos esta promesa en cada proyecto mediante comunicación constante, seguimiento y garantía.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 rounded-3xl border border-dashed border-primary/50 bg-primary/5 p-10 text-slate-700">
            <h3 className="text-2xl font-semibold text-slate-900">Compromiso con la seguridad</h3>
            <p className="mt-3 text-sm">
              Contamos con pólizas de responsabilidad civil y seguros vigentes que protegen a nuestros clientes y equipos. Todas
              las operaciones cumplen normativas locales e internacionales.
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default About;
