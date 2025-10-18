import { useEffect, useRef, useState } from "react";
import { LandingLayout } from "@/layouts/LandingLayout";
import { HeroSlider } from "@/components/media/HeroSlider";
import {
  heroSlides,
  clientLogos,
  serviceHighlights,
  kpis,
  projects,
  testimonials,
  insights,
} from "@/assets/content";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Building2, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { formatNumber } from "@/lib/format";

const serviceIcons = {
  mantenimiento: Building2,
  remodelacion: Sparkles,
  electrico: ShieldCheck,
} as const;

export const Home = () => {
  const [animatedValues, setAnimatedValues] = useState(kpis.map(() => 0));
  const kpiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.4 },
    );

    if (kpiRef.current) {
      observer.observe(kpiRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 1400;
    const steps = 60;
    const increment = kpis.map((kpi) => kpi.value / steps);

    let currentStep = 0;
    const interval = window.setInterval(() => {
      currentStep += 1;
      setAnimatedValues((prev) =>
        prev.map((value, index) => Math.min(Math.round(value + increment[index]), kpis[index].value)),
      );
      if (currentStep >= steps) {
        window.clearInterval(interval);
      }
    }, duration / steps);
  };

  return (
    <LandingLayout>
      <HeroSlider slides={heroSlides} />
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {serviceHighlights.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <article
                  key={service.title}
                  className="group rounded-3xl border border-slate-200 bg-slate-50/60 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" aria-hidden />
                    </div>
                    <Badge variant="outline">Servicio</Badge>
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-900">{service.title}</h2>
                  <p className="mt-3 text-sm text-slate-600">{service.description}</p>
                  <Button asChild variant="link" className="mt-4 px-0 text-primary">
                    <Link to={service.href} className="inline-flex items-center gap-2 text-sm font-semibold">
                      Explorar servicio <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Confían en Kolbing</p>
            <h2 className="mt-4 text-3xl font-semibold">Relaciones de largo plazo con clientes empresariales y residenciales</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 text-center text-sm text-slate-300 md:grid-cols-6">
            {clientLogos.map((client) => (
              <div key={client} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Indicadores</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Resultados respaldados por procesos y calidad certificada</h2>
              <p className="mt-4 text-slate-600">
                Implementamos planes preventivos, remodelaciones integrales e instalaciones eléctricas con protocolos
                documentados y seguimiento permanente. Cada proyecto se gestiona con herramientas digitales y equipos
                especializados.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/proyectos">Ver portafolio completo</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/nosotros">Conocer nuestro enfoque</Link>
                </Button>
              </div>
            </div>
            <div ref={kpiRef} className="grid gap-6 sm:grid-cols-3">
              {kpis.map((kpi, index) => (
                <div
                  key={kpi.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm"
                  aria-label={`${kpi.label}: ${formatNumber(kpi.value, kpi.suffix)}`}
                >
                  <div className="text-4xl font-bold text-primary">
                    {formatNumber(animatedValues[index], kpi.suffix)}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{kpi.label}</p>
                  <p className="text-xs text-slate-500">{kpi.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Proyectos Kolbing</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Experiencia en sectores corporativo y residencial</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/proyectos">Ver todos los proyectos</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Voces Kolbing</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Testimonios que respaldan nuestro servicio</h2>
              <p className="mt-4 text-slate-600">
                Trabajamos de la mano con administradores, propietarios y gerentes de facilities para asegurar continuidad y
                satisfacción en cada entrega.
              </p>
              <Button asChild className="mt-6">
                <Link to="/testimonios">Ver más historias</Link>
              </Button>
            </div>
            <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} isActive={index === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Insights Kolbing</p>
              <h2 className="mt-3 text-3xl font-semibold">Consejos y buenas prácticas para tus proyectos</h2>
            </div>
            <Button asChild variant="secondary" className="bg-white text-slate-900 hover:bg-white/90">
              <Link to="/contacto">Solicitar asesoría</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {insights.map((insight) => (
              <article key={insight.id} className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-widest text-emerald-300">{insight.date}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{insight.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{insight.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-emerald-200">
                  {insight.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-emerald-500/20 px-3 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Home;
