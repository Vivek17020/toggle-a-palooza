import * as React from "react";

// Simple chart wrapper for recharts
export const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
));
Chart.displayName = "Chart";

export const ChartContainer = Chart;
export const ChartTooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;