import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

export const FAQItem = ({ question, answer, value }: FAQItemProps) => (
  <AccordionItem value={value} className="rounded-lg border border-border/40 bg-background/40">
    <AccordionTrigger className="px-4 text-left text-base font-medium">
      {question}
    </AccordionTrigger>
    <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
      {answer}
    </AccordionContent>
  </AccordionItem>
);

export default FAQItem;
