import React from 'react';
import { cn } from '@/lib/utils';

interface MarketSizeChartProps {
  marketSize2024: string;
  marketSize2032: string;
  cagr: string;
  className?: string;
}

export const MarketSizeChart = React.forwardRef<HTMLDivElement, MarketSizeChartProps>(
  ({ marketSize2024, marketSize2032, cagr, className }, ref) => {
    const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];

    const start = parseFloat(marketSize2024.replace(/[^0-9.]/g, ''));
    const end = parseFloat(marketSize2032.replace(/[^0-9.]/g, ''));

    const values = years.map((_, index) => {
      const value = start * Math.pow(end / start, index / (years.length - 1));
      return value;
    });

    const maxValue = Math.max(...values);

    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Market Size 2024
            </p>
            <p className="text-3xl font-bold text-foreground">
              {marketSize2024}
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Market Size 2032
            </p>
            <p className="text-3xl font-bold text-primary">
              {marketSize2032}
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              CAGR (2025-2032)
            </p>
            <p className="text-3xl font-bold text-[var(--accent)]">
              {cagr}
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h4 className="text-lg font-semibold mb-6 text-foreground">
            Market Size Forecast (USD Billion)
          </h4>

          <div className="relative h-80">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {values.map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full">
                      <div
                        className="w-full rounded-t transition-all duration-300"
                        style={{ height: `${height}%`, background: 'hsl(var(--chart-1))' }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {years[index]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ background: 'hsl(var(--chart-1))' }}></div>
              <span>Revenue (USD Billion)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MarketSizeChart.displayName = 'MarketSizeChart';
