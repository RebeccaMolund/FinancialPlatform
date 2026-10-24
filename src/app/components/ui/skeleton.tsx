import { cn } from "./utils";

/**
 * Shows a placeholder while content is loading.
 * Use it when the expected content shape is known; do not use it as a
 * persistent empty-state message.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
