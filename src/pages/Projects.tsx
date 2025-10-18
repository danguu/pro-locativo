import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FiltersBar } from "@/components/forms/FiltersBar";
import { ProjectsGrid } from "@/components/cards/ProjectsGrid";
import { Button } from "@/components/ui/button";
import { applyProjectFilters, getFiltersFromProjects } from "@/lib/projects";
import type { FilterState } from "@/lib/types";

const emptyFilters: FilterState = { category: [], city: [], status: [], search: "" };

const parseParam = (value: string | null) => (value ? value.split(",").filter(Boolean) : []);

export const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [visible, setVisible] = useState(3);

  const options = useMemo(() => getFiltersFromProjects(), []);
  useEffect(() => {
    const categories = parseParam(searchParams.get("category"));
    const cities = parseParam(searchParams.get("city"));
    const statuses = parseParam(searchParams.get("status"));
    const search = searchParams.get("search") ?? "";
    setFilters({ category: categories, city: cities, status: statuses, search });
  }, [searchParams]);

  const updateParams = (value: FilterState) => {
    const params = new URLSearchParams();
    if (value.category.length > 0) params.set("category", value.category.join(","));
    if (value.city.length > 0) params.set("city", value.city.join(","));
    if (value.status.length > 0) params.set("status", value.status.join(","));
    if (value.search) params.set("search", value.search);
    setSearchParams(params, { replace: true });
  };

  const handleFiltersChange = (value: FilterState) => {
    setFilters(value);
    updateParams(value);
    setVisible(3);
  };

  const filteredProjects = useMemo(() => applyProjectFilters(filters), [filters]);
  const visibleProjects = filteredProjects.slice(0, visible);
  const canLoadMore = visible < filteredProjects.length;

  return (
    <DefaultLayout>
      <section className="gradient-hero py-20">
        <div className="mx-auto max-w-6xl space-y-6 px-6">
          <Breadcrumbs items={[{ label: "Proyectos" }]} />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">Portafolio Kolbing</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Casos reales de mantenimiento, remodelación e instalaciones eléctricas ejecutados con supervisión técnica, protocolos de seguridad y garantía Kolbing.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <FiltersBar options={options} value={filters} onChange={handleFiltersChange} />
          <ProjectsGrid projects={visibleProjects} />
          {filteredProjects.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No encontramos proyectos con los filtros seleccionados. Ajusta los criterios para ver más resultados.
            </p>
          )}
          {canLoadMore && (
            <div className="flex justify-center">
              <Button onClick={() => setVisible((prev) => prev + 3)} variant="outline">
                Cargar más proyectos
              </Button>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Projects;
