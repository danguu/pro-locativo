import { useMemo } from "react";
import type { Testimonial as TestimonialType } from "@/types/content";

export interface TestimonialProps {
  testimonial: TestimonialType;
}

export const Testimonial = ({ testimonial }: TestimonialProps) => {
  const quoteId = useMemo(
    () => `${testimonial.id.replace(/[^a-z0-9-]+/gi, "-")}-quote`,
    [testimonial.id]
  );

  return (
    <figure className="card-surface h-full" aria-labelledby={quoteId}>
      <span className="text-5xl text-primary" aria-hidden="true">
        “
      </span>
      <blockquote id={quoteId} className="mt-4 text-lg text-foreground">
        “{testimonial.content}”
      </blockquote>
      <figcaption className="mt-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">{testimonial.name}</p>
        <p>
          {testimonial.role} · {testimonial.company}
        </p>
      </figcaption>
    </figure>
  );
};

export default Testimonial;
