import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackToTop } from "@/components/ui/BackToTop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Target, Shield, Users, Award } from "lucide-react";
import teamImg from "@/assets/team.jpg";
import buildingImg from "@/assets/building-management.jpg";

const values = [
  { icon: Target, label: "Excelencia" },
  { icon: Shield, label: "Confianza" },
  { icon: Users, label: "Trabajo en equipo" },
  { icon: Award, label: "Profesionalismo" },
];

const timeline = [
  {
    year: "2015",
    title: "Fundación",
    description: "Iniciamos operaciones con un equipo de 5 profesionales",
  },
  {
    year: "2018",
    title: "Expansión",
    description: "Ampliamos servicios a nivel nacional y aumentamos el equipo",
  },
  {
    year: "2022",
    title: "Certificación",
    description: "Obtuvimos certificaciones internacionales de calidad",
  },
];

const team = [
  {
    role: "Equipo Técnico",
    description: "Profesionales certificados con más de 10 años de experiencia en el sector",
  },
  {
    role: "Gestión de Proyectos",
    description: "Coordinadores expertos que aseguran la ejecución exitosa de cada proyecto",
  },
  {
    role: "Atención al Cliente",
    description: "Equipo dedicado a brindar soporte y seguimiento personalizado",
  },
];

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BackToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Nosotros" }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
            <p className="text-xl text-muted-foreground">
              Somos un equipo de profesionales dedicados a brindar servicios de mantenimiento y
              remodelación de la más alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestro Enfoque</h2>
              <p className="text-muted-foreground mb-6">
                Nos especializamos en ofrecer soluciones integrales de mantenimiento, remodelación e
                instalaciones eléctricas para empresas y hogares. Con más de 8 años de experiencia,
                hemos consolidado nuestra posición como líderes en el sector.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Profesionales certificados y capacitados continuamente</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Uso de materiales de primera calidad</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Cumplimiento riguroso de normativas de seguridad</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Garantía extendida en todos nuestros servicios</span>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src={buildingImg}
                alt="Gestión de edificios"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un camino de crecimiento constante y compromiso con la excelencia
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-8 border-l-2 border-primary pb-8 last:pb-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary -translate-x-[9px]" />
                  <div className="text-sm text-primary font-semibold mb-1">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Valores</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold">{value.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 border-l-4 border-l-primary">
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground">
                <strong>Nota importante:</strong> Contamos con pólizas de responsabilidad civil y
                seguros vigentes que protegen tanto a nuestros clientes como a nuestro equipo de
                trabajo. Todas nuestras operaciones cumplen con las normativas de seguridad locales e
                internacionales.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Profesionales comprometidos con la excelencia
            </p>
          </div>

          <div className="mb-12 animate-scale-in">
            <img
              src={teamImg}
              alt="Nuestro equipo"
              className="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle>{member.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Nosotros;
