import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  name: string;
  role: string;
  company: string;
}

export const TestimonialCard = ({ content, name, role, company }: TestimonialCardProps) => (
  <Card className="h-full border-border/60">
    <CardContent className="flex h-full flex-col gap-6 p-6">
      <Quote className="h-8 w-8 text-primary/40" aria-hidden="true" />
      <blockquote className="text-lg leading-relaxed text-foreground">“{content}”</blockquote>
      <div className="mt-auto space-y-1 text-sm">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-muted-foreground">{role}</p>
        <p className="text-primary">{company}</p>
      </div>
    </CardContent>
  </Card>
);

export default TestimonialCard;
