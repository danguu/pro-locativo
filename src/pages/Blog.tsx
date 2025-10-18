import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackToTop } from "@/components/ui/BackToTop";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 Consejos para el Mantenimiento Preventivo de tu Hogar",
    excerpt: "Descubre cómo prevenir problemas costosos con un mantenimiento adecuado y programado.",
    tags: ["mantenimiento", "hogares"],
    date: "2024-03-15",
  },
  {
    id: 2,
    title: "Tendencias en Remodelación para 2024",
    excerpt: "Las últimas tendencias en diseño interior y remodelación que están marcando pauta este año.",
    tags: ["remodelación", "diseño"],
    date: "2024-03-10",
  },
  {
    id: 3,
    title: "Importancia de las Instalaciones Eléctricas Certificadas",
    excerpt: "Por qué es crucial contar con instalaciones eléctricas que cumplan con todas las normativas.",
    tags: ["eléctrico", "seguridad"],
    date: "2024-03-05",
  },
  {
    id: 4,
    title: "Cómo Preparar tu Empresa para Inspecciones de Seguridad",
    excerpt: "Guía práctica para asegurar que tu empresa cumpla con todos los requisitos de seguridad.",
    tags: ["seguridad", "empresas"],
    date: "2024-02-28",
  },
  {
    id: 5,
    title: "Ahorro Energético: Iluminación LED en tu Negocio",
    excerpt: "Cómo la iluminación LED puede reducir significativamente tus costos de energía.",
    tags: ["eléctrico", "empresas"],
    date: "2024-02-20",
  },
];

const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BackToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Consejos, noticias y tendencias sobre mantenimiento, remodelación e instalaciones
              eléctricas.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-ink-2 sticky top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar artículos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                Todos
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron artículos con esos criterios.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  data-tags={post.tags.join(",")}
                >
                  <div className="aspect-video bg-gradient-hero rounded-t-lg" />
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CardTitle className="hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
