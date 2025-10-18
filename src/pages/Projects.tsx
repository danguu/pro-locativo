import { useEffect, useMemo, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FiltersBar } from "@/components/ui/FiltersBar";
import { projects } from "@/assets/content";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { useQueryState } from "@/lib/hooks/useQueryState";
import { usePagination } from "@/lib/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

export const Projects = () => {
  const { query, setQuery } = useQueryState();
  const [search, setSearch] = useState(query.q?.[0] ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(query.categoria ?? []);
  const [selectedCities, setSelectedCities] = useState<string[]>(query.ciudad ?? []);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(query.estado ?? []);

  useEffect(() => {
    setQuery({
      q: search ? [search] : undefined,
      categoria: selectedCategories.length ? selectedCategories : undefined,
      ciudad: selectedCities.length ? selectedCities : undefined,
      estado: selectedStatus.length ? selectedStatus : undefined,
    });
  }, [search, selectedCategories, selectedCities, selectedStatus, setQuery]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchSearch =
        search.trim().length === 0 ||
        [project.name, project.summary, ...project.services]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategories =
        selectedCategories.length === 0 || selectedCategories.includes(project.category);

      const matchCities = selectedCities.length === 0 || selectedCities.includes(project.city);

      const matchStatus = selectedStatus.length === 0 || selectedStatus.includes(project.status);

      return matchSearch && matchCategories && matchCities && matchStatus;
    });
  }, [search, selectedCategories, selectedCities, selectedStatus]);

  const { currentItems, page, pageCount, goToPage, reset } = usePagination(filteredProjects, 6);

  useEffect(() => {
    reset();
  }, [search, selectedCategories, selectedCities, selectedStatus, reset]);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(projects.map((project) => project.category))).map((category) => ({
        label: category,
        value: category,
      })),
    [],
  );

  const cityOptions = useMemo(
    () =>
      Array.from(new Set(projects.map((project) => project.city))).map((city) => ({
        label: city,
        value: city,
      })),
    [],
  );

  const statusOptions = useMemo(
    () =>
      Array.from(new Set(projects.map((project) => project.status))).map((status) => ({
        label: status,
        value: status,
      })),
    [],
  );

  return (
    <DefaultLayout>
      <section className="bg-slate-900 pb-16 pt-32 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Proyectos" }]} />
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold">Portafolio Kolbing</h1>
            <p className="text-lg text-slate-200">
              Explora proyectos de mantenimiento, remodelación e instalaciones eléctricas diseñados para asegurar
              continuidad operativa y experiencias memorables.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-emerald-200">
              <span>Planes preventivos</span>
              <span>Remodelación integral</span>
              <span>Tableros certificados</span>
            </div>
          </div>
        </div>
      </section>
      <section className="-mt-12 bg-transparent pb-20">
        <div className="container mx-auto px-4">
          <FiltersBar
            categories={categoryOptions}
            cities={cityOptions}
            status={statusOptions}
            selectedCategories={selectedCategories}
            selectedCities={selectedCities}
            selectedStatus={selectedStatus}
            search={search}
            onSearchChange={setSearch}
            onCategoriesChange={setSelectedCategories}
            onCitiesChange={setSelectedCities}
            onStatusChange={setSelectedStatus}
            onReset={() => {
              setSearch("");
              setSelectedCategories([]);
              setSelectedCities([]);
              setSelectedStatus([]);
            }}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {currentItems.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {currentItems.length === 0 && (
            <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-lg font-semibold text-slate-900">No encontramos proyectos con esos filtros.</p>
              <p className="mt-2 text-sm text-slate-500">Ajusta la búsqueda o restablece los filtros para ver más opciones.</p>
              <Button className="mt-4" onClick={() => {
                setSearch("");
                setSelectedCategories([]);
                setSelectedCities([]);
                setSelectedStatus([]);
              }}>
                Restablecer filtros
              </Button>
            </div>
          )}
          {currentItems.length > 0 && (
            <div className="mt-10 flex items-center justify-center">
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: pageCount }).map((_, index) => {
                    const currentPage = index + 1;
                    return (
                      <PaginationItem key={currentPage}>
                        <PaginationLink
                          href="#"
                          onClick={(event) => {
                            event.preventDefault();
                            goToPage(currentPage);
                          }}
                          isActive={page === currentPage}
                          aria-label={`Ir a la página ${currentPage}`}
                        >
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Projects;
