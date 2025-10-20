import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackToTop } from "@/components/ui/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Wrench, Factory, Lock, Home, Zap, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import serviceMaintenanceImg from "@/assets/service-maintenance.jpg";
import serviceRenovationImg from "@/assets/service-renovation.jpg";
import serviceElectricalImg from "@/assets/service-electrical.jpg";

const services = [
  {
    title: "Mantenimiento Eléctrico y Mecánico Industrial",
    description: "Inspecciones, mantenimiento y fabricación de tableros eléctricos de media y baja tensión, mantenimiento de equipos industriales",
    image: serviceElectricalImg,
    icon: Factory,
    features: [
      "Mantenimiento de tableros eléctricos de media y baja tensión",
      "Fabricación e instalación de tableros eléctricos",
      "Mantenimiento mecánico a vinipeladoras y bandas transportadoras",
      "Inspección y revisión de equipos eléctricos",
      "Reparación de sistemas industriales",
    ],
  },
  {
    title: "Transportadores de Banda",
    description: "Fabricación, mantenimiento y suministro de componentes para transportadores de banda industriales",
    image: serviceMaintenanceImg,
    icon: Cog,
    features: [
      "Fabricación de transportadores de banda",
      "Suministro de rodillos motrices, de cola, de carga, de impacto y retorno",
      "Estaciones de rodillos y rodillos auto limpiantes",
      "Suministro e instalación de cajas reductoras",
      "Cintas transportadoras, piñones, poleas, cadenas y correas",
      "Mantenimiento preventivo y correctivo",
    ],
  },
  {
    title: "Servicios de Cerrajería",
    description: "Instalación, reparación, mantenimiento y suministro de sistemas de seguridad y cerrajería",
    image: serviceRenovationImg,
    icon: Lock,
    features: [
      "Cerraduras de sobreponer, embutidas y de alta seguridad",
      "Cerraduras multipunto y de pomo",
      "Cerrojos de seguridad y cerraduras gorjas",
      "Cerraduras digitales y electrónicas",
      "Apertura de emergencia y duplicado de llaves",
      "Configuración y programación de cerraduras inteligentes",
    ],
  },
  {
    title: "Reparaciones Locativas",
    description: "Mantenimiento integral de inmuebles para oficinas, hogares, industrias y colegios",
    image: serviceRenovationImg,
    icon: Home,
    features: [
      "Instalación de pisos, drywall, enchapes y cerámicos",
      "Servicios de plomería: instalación, destape, detección de fugas",
      "Acabados: pintura, enchapes, pisos laminados",
      "Impermeabilización de terrazas, cubiertas y jardines",
      "Reparación y cambio de tejas",
    ],
  },
  {
    title: "Electricidad Residencial",
    description: "Instalaciones, mantenimiento y reparaciones eléctricas para el hogar",
    image: serviceElectricalImg,
    icon: Zap,
    features: [
      "Instalación y reconexión de tableros eléctricos",
      "Cableado e instalación de interruptores, tomas y lámparas",
      "Reubicación de puntos eléctricos y puesta a tierra",
      "Reparación de cortos, breakers, poste a casa y acometidas",
      "Instalación de duchas eléctricas e iluminación LED",
      "Cableado eléctrico residencial completo",
    ],
  },
  {
    title: "Suministro de Resortes",
    description: "Fabricación y suministro de resortes mecánicos según especificaciones del cliente",
    image: serviceMaintenanceImg,
    icon: Wrench,
    features: [
      "Resortes fabricados según medidas del cliente",
      "Componentes con alta elasticidad",
      "Absorción de deformaciones considerables",
      "Recuperación de forma inicial",
      "Aplicaciones industriales y mecánicas",
    ],
  },
];

const plans = [
  {
    name: "Básico",
    price: "Desde $299",
    description: "Ideal para pequeños proyectos y hogares",
    features: [
      "Visita técnica inicial",
      "Cotización detallada",
      "Garantía de 3 meses",
      "Soporte telefónico",
    ],
  },
  {
    name: "Profesional",
    price: "Desde $599",
    description: "Perfecto para empresas y proyectos medianos",
    features: [
      "Todo lo del plan Básico",
      "Mantenimiento preventivo",
      "Garantía de 6 meses",
      "Soporte prioritario",
      "Reportes mensuales",
    ],
    featured: true,
  },
  {
    name: "Empresarial",
    price: "Personalizado",
    description: "Solución integral para grandes empresas",
    features: [
      "Todo lo del plan Profesional",
      "Atención 24/7",
      "Garantía de 12 meses",
      "Gerente de cuenta dedicado",
      "Contrato anual con descuentos",
    ],
  },
];

const Servicios = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BackToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Servicios" }]} />
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Servicios Kolbing Ingeniería SAS</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Mantenimiento eléctrico y mecánico en la industria y el hogar, fabricación de transportadores 
              de banda, cerrajería, y servicios locativos para oficinas, hogar y negocios.
            </p>
            <p className="text-lg text-muted-foreground">
              Prestamos servicios especializados de mantenimiento eléctrico a la industria y el hogar, 
              incluyendo tableros de media y baja tensión, instalaciones completas, y fabricación de 
              equipos industriales con garantía de calidad y profesionales certificados.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios Especializados</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones completas para la industria y el hogar con más de 20 años de experiencia
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="overflow-hidden animate-fade-in hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-full">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes y Precios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Selecciona el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.featured ? "border-2 border-primary shadow-glow-azul" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary my-2">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant={plan.featured ? "default" : "outline"}>
                    <Link to="/contacto">Solicitar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Tabs defaultValue="proceso" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="proceso">Proceso</TabsTrigger>
              <TabsTrigger value="materiales">Materiales</TabsTrigger>
              <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            </TabsList>
            <TabsContent value="proceso" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nuestro Proceso de Trabajo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Evaluación Inicial</h4>
                    <p className="text-sm text-muted-foreground">
                      Realizamos una visita técnica para evaluar el alcance del proyecto y las necesidades
                      específicas.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. Cotización Detallada</h4>
                    <p className="text-sm text-muted-foreground">
                      Presentamos un presupuesto transparente con desglose de materiales, mano de obra y
                      tiempos.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3. Ejecución Profesional</h4>
                    <p className="text-sm text-muted-foreground">
                      Nuestro equipo certificado ejecuta el proyecto con los más altos estándares de
                      calidad.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">4. Seguimiento y Garantía</h4>
                    <p className="text-sm text-muted-foreground">
                      Realizamos seguimiento post-servicio y respaldamos nuestro trabajo con garantías
                      extendidas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="materiales" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Materiales de Primera Calidad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Trabajamos únicamente con materiales certificados y de marcas reconocidas para
                    garantizar la durabilidad y seguridad de cada proyecto.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Materiales con certificación de calidad</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Proveedores confiables y verificados</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Garantía extendida en todos los materiales</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Opciones ecológicas disponibles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="seguridad" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compromiso con la Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    La seguridad es nuestra prioridad número uno. Cumplimos con todas las normativas
                    vigentes y empleamos las mejores prácticas de la industria.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Personal certificado y capacitado</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Equipo de protección personal obligatorio</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Cumplimiento de normativas locales</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Pólizas de seguro vigentes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Solicita una cotización sin compromiso y descubre cómo podemos ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/contacto">Solicitar cotización</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/testimonios">Ver testimonios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Servicios;
