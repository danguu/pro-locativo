import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FiltersBarProps {
  categories: FilterOption[];
  cities: FilterOption[];
  status: FilterOption[];
  selectedCategories: string[];
  selectedCities: string[];
  selectedStatus: string[];
  search: string;
  onSearchChange: (value: string) => void;
  onCategoriesChange: (values: string[]) => void;
  onCitiesChange: (values: string[]) => void;
  onStatusChange: (values: string[]) => void;
  onReset: () => void;
}

const ToggleGroup = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="min-w-[160px] justify-between text-sm"
          aria-label={`${label}. Selecciona opciones`}
        >
          <span>{selected.length > 0 ? `${label}: ${selected.length}` : label}</span>
          <ChevronDown className="h-4 w-4" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 space-y-3">
        <p className="text-sm font-semibold">{label}</p>
        <div className="grid gap-2">
          {options.map((option) => {
            const isChecked = selected.includes(option.value);
            return (
              <label key={option.value} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    onChange(
                      checked
                        ? [...selected, option.value]
                        : selected.filter((value) => value !== option.value),
                    );
                  }}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
        <Button type="button" variant="secondary" size="sm" className="w-full" onClick={() => onChange([])}>
          Limpiar {label.toLowerCase()}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export const FiltersBar = ({
  categories,
  cities,
  status,
  selectedCategories,
  selectedCities,
  selectedStatus,
  search,
  onSearchChange,
  onCategoriesChange,
  onCitiesChange,
  onStatusChange,
  onReset,
}: FiltersBarProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <Input
            type="search"
            placeholder="Buscar por palabra clave"
            className="h-12 rounded-full bg-slate-100 pl-11"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="Buscar proyectos"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup label="Ciudad" options={cities} selected={selectedCities} onChange={onCitiesChange} />
          <ToggleGroup label="Estado" options={status} selected={selectedStatus} onChange={onStatusChange} />
          <Button type="button" variant="ghost" onClick={onReset} className="text-slate-600 hover:text-primary">
            Restablecer filtros
          </Button>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.value);
          return (
            <button
              key={category.value}
              type="button"
              onClick={() => {
                onCategoriesChange(
                  isSelected
                    ? selectedCategories.filter((value) => value !== category.value)
                    : [...selectedCategories, category.value],
                );
              }}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
