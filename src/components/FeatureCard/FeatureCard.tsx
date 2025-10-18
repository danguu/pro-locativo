import { ReactNode, useMemo } from "react";

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export const FeatureCard = ({ icon, title, description, badge }: FeatureCardProps) => {
  const headingId = useMemo(
    () => `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`,
    [title]
  );

  return (
    <article className="card-surface h-full" aria-labelledby={headingId}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          {icon}
        </div>
        {badge && <span className="pill bg-primary/15 text-primary">{badge}</span>}
      </div>
      <h3 id={headingId} className="mt-6 text-xl font-semibold">
        {title}
      </h3>
      <p className="mt-4 text-sm text-muted-foreground">{description}</p>
    </article>
  );
};

export default FeatureCard;
