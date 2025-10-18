import { cn } from "@/lib/utils";

interface FallbackImageProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export const FallbackImage = ({ label, className, ...props }: FallbackImageProps) => {
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-center text-sm font-medium uppercase tracking-wide text-slate-200",
        className,
      )}
      {...props}
    >
      <span className="px-4 text-balance">{label}</span>
    </div>
  );
};
