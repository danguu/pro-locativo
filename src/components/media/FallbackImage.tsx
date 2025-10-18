import { useState } from "react";
import { cn } from "@/lib/utils";

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel: string;
}

export const FallbackImage = ({ fallbackLabel, className, alt, ...props }: FallbackImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed || !props.src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-lg bg-muted text-center text-sm font-medium text-muted-foreground",
          className
        )}
      >
        {fallbackLabel}
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading={props.loading ?? "lazy"}
    />
  );
};

export default FallbackImage;
