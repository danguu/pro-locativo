import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackCta } from "@/utils/analytics";

export interface CTAProps {
  title: string;
  description: string;
  primary: {
    label: string;
    href: string;
  };
  secondary?: {
    label: string;
    href: string;
  };
}

export const CTA = ({ title, description, primary, secondary }: CTAProps) => (
  <section className="container-responsive my-24">
    <div className="rounded-[32px] border border-primary/20 bg-gradient-to-br from-primary/20 to-secondary/10 p-10 md:p-14">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
        <div>
          <h2 className="text-3xl font-semibold text-balance md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          {primary.href.startsWith("http") ? (
            <Button
              asChild
              size="lg"
              className="btn-primary"
              onClick={() => trackCta(`CTA ${primary.label}`, primary.href)}
            >
              <a href={primary.href}>{primary.label}</a>
            </Button>
          ) : (
            <Button asChild size="lg" className="btn-primary">
              <Link to={primary.href}>{primary.label}</Link>
            </Button>
          )}
          {secondary && (
            <Button asChild size="lg" variant="outline" className="btn-secondary">
              {secondary.href.startsWith("http") ? (
                <a href={secondary.href}>{secondary.label}</a>
              ) : (
                <Link to={secondary.href}>{secondary.label}</Link>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default CTA;
