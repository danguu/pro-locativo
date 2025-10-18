import type { NavigationItem } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "blog", label: "Blog" },
];

const posts = [
  {
    title: "TODO: Título de artículo destacado",
    excerpt: "TODO: Resumen del artículo con insights sobre tendencias inmobiliarias.",
    href: "#",
  },
  {
    title: "TODO: Análisis de mercado",
    excerpt: "TODO: Actualizar con indicadores de vivienda y oficinas para 2025.",
    href: "#",
  },
  {
    title: "TODO: Guía de mantenimiento",
    excerpt: "TODO: Añadir recomendaciones para propietarios y administradores.",
    href: "#",
  },
];

export const Blog = () => (
  <>
    <Seo
      title="Blog"
      description="Recursos, noticias y guías del sector inmobiliario. Próximamente disponibles."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="Blog"
      title="Tendencias inmobiliarias, insights y casos de éxito"
      description="Próximamente encontrarás artículos, guías y entrevistas con expertos del sector locativo."
      imageId="hero-blog"
      breadcrumbs={breadcrumbs}
      ctas={[{ label: "Suscribirme", href: "/contacto", variant: "secondary" }]}
    />

    <section className="container-responsive page-section" aria-labelledby="blog-list">
      <div className="section-heading">
        <p className="section-heading__subtitle">Contenido</p>
        <h2 id="blog-list" className="section-heading__title">
          Próximas publicaciones
        </h2>
        <p className="section-heading__description">
          Estamos preparando recursos descargables y herramientas interactivas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="card-surface flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">En producción</p>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{post.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
            <Button asChild variant="outline" className="mt-8">
              <a href={post.href}>Notificarme</a>
            </Button>
          </article>
        ))}
      </div>
    </section>
  </div>
  </>
);

export default Blog;
