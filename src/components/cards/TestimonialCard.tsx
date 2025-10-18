import type { Testimonial } from "@/assets/content";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

export const TestimonialCard = ({ testimonial, isActive = false }: TestimonialCardProps) => {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition",
        isActive ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100",
      )}
    >
      <Quote className="h-8 w-8 text-primary" aria-hidden />
      <blockquote className="mt-6 flex-1 text-base text-slate-700">“{testimonial.content}”</blockquote>
      <footer className="mt-8 text-sm">
        <div className="font-semibold text-slate-900">{testimonial.name}</div>
        <div className="text-slate-500">{testimonial.role}</div>
        <div className="text-slate-400">{testimonial.company}</div>
      </footer>
    </article>
  );
};
