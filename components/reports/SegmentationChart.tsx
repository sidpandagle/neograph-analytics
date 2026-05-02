import React from 'react';
import { cn } from '@/lib/utils';

interface SegmentItem {
  name: string;
  share: string;
  description?: string;
  cagr?: string;
}

interface SegmentationChartProps {
  title: string;
  segments: SegmentItem[];
  className?: string;
}

export const SegmentationChart = React.forwardRef<HTMLDivElement, SegmentationChartProps>(
  ({ title, segments, className }, ref) => {
    const colors = Array.from({ length: 8 }, (_, index) => `hsl(var(--chart-${index + 1}))`);

    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        <h4 className="text-lg font-semibold text-[var(--foreground)]">{title}</h4>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
          <div className="space-y-4">
            {segments.map((segment, index) => {
              const shareValue = parseFloat(segment.share.replace('%', ''));

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="font-medium text-[var(--foreground)]">
                        {segment.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {segment.cagr && (
                        <span className="text-xs text-[var(--muted-foreground)]">
                          CAGR: {segment.cagr}
                        </span>
                      )}
                      <span className="font-semibold text-[var(--primary)]">
                        {segment.share}
                      </span>
                    </div>
                  </div>

                  <div className="relative h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${shareValue}%`,
                        backgroundColor: colors[index % colors.length],
                      }}
                    ></div>
                  </div>

                  {segment.description && (
                    <p className="text-xs text-[var(--muted-foreground)] pl-6">
                      {segment.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

SegmentationChart.displayName = 'SegmentationChart';
