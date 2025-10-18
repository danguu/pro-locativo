import projectsData from "@/assets/projects.json";
import type { FilterState, ProjectData } from "./types";

const projects: ProjectData[] = projectsData;

export const getProjects = () => projects;

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getFiltersFromProjects = () => {
  const categories = Array.from(new Set(projects.map((project) => project.category))).sort();
  const cities = Array.from(new Set(projects.map((project) => project.city))).sort();
  const statuses = Array.from(new Set(projects.map((project) => project.status))).sort();

  return { categories, cities, statuses };
};

export const applyProjectFilters = (filters: FilterState) => {
  const { category, city, status, search } = filters;
  return projects.filter((project) => {
    const matchesCategory =
      category.length === 0 || category.includes(project.category);
    const matchesCity = city.length === 0 || city.includes(project.city);
    const matchesStatus = status.length === 0 || status.includes(project.status);
    const matchesSearch = search
      ? project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.summary.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesCategory && matchesCity && matchesStatus && matchesSearch;
  });
};
