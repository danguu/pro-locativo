import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Filter, X } from "lucide-react";
import type { FilterState } from "@/lib/types";

interface FiltersBarProps {
  options: {
    categories: string[];
    cities: string[];
    statuses: string[];
  };
  value: FilterState;
  onChange: (value: FilterState) => void;
}

const toggleValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export const FiltersBar = ({ options, value, onChange }: FiltersBarProps) => {
  const [openCities, setOpenCities] = useState(false);

  const handleCategory = (category: string) => {
    onChange({ ...value, category: toggleValue(value.category, category) });
  };

  const handleStatus = (status: string) => {
    onChange({ ...value, status: toggleValue(value.status, status) });
  };

  const handleCity = useCallback(
    (city: string) => {
      const updated = toggleValue(value.city, city);
      onChange({ ...value, city: updated });
    },
    [value, onChange]
  );

  const handleSearch = (search: string) => {
    onChange({ ...value, search });
  };

  const clearFilters = () => {
    onChange({ category: [], city: [], status: [], search: "" });
  };

  return (
    <div className="glass-effect rounded-2xl border border-border/40 p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="h-4 w-4" />
          Filtrar proyectos
        </div>
        <div className="flex flex-1 flex-wrap gap-3">
          <Input
            value={value.search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Buscar por nombre o descripción"
            className="max-w-xs"
            aria-label="Buscar proyectos"
          />
          <div className="flex flex-wrap gap-2">
            {options.categories.map((category) => {
              const active = value.category.includes(category);
              return (
                <Button
                  key={category}
                  type="button"
                  variant={active ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => handleCategory(category)}
                  aria-pressed={active}
                >
                  {category}
                </Button>
              );
            })}
          </div>
          <Popover open={openCities} onOpenChange={setOpenCities}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="min-w-[200px] justify-between">
                Seleccionar ciudades
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-2" align="start">
              <p className="text-sm font-medium text-foreground">Ciudades</p>
              <div className="max-h-48 space-y-2 overflow-auto">
                {options.cities.map((city) => (
                  <label key={city} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={value.city.includes(city)}
                      onCheckedChange={() => handleCity(city)}
                      aria-label={`Filtrar por ${city}`}
                    />
                    {city}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2">
            {options.statuses.map((status) => {
              const active = value.status.includes(status);
              return (
                <Badge
                  key={status}
                  variant={active ? "secondary" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => handleStatus(status)}
                  aria-pressed={active}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleStatus(status);
                    }
                  }}
                >
                  {status}
                </Badge>
              );
            })}
          </div>
          {(value.category.length > 0 || value.city.length > 0 || value.status.length > 0 || value.search) && (
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
              <X className="h-4 w-4" /> Limpiar filtros
            </Button>
          )}
        </div>
      </div>
      {value.city.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.city.map((city) => (
            <Badge
              key={city}
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleCity(city)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCity(city);
                }
              }}
            >
              {city}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiltersBar;
