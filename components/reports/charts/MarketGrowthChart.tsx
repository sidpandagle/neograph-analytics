"use client"

import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface MarketGrowthChartProps {
  marketSize2024: string;
  marketSize2032: string;
  cagr: string;
  className?: string;
}

export const MarketGrowthChart: React.FC<MarketGrowthChartProps> = ({
  marketSize2024,
  marketSize2032,
  cagr,
  className,
}) => {
  // Parse values
  const start = parseFloat(marketSize2024.replace(/[^0-9.]/g, ''));
  const end = parseFloat(marketSize2032.replace(/[^0-9.]/g, ''));
  const currency = marketSize2024.match(/[^0-9.]+$/)?.[0] || 'bn';
  
  // Generate data for years 2024-2032
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];
  const chartData = years.map((year, index) => {
    const value = start * Math.pow(end / start, index / (years.length - 1));
    return {
      year: year.toString(),
      marketSize: parseFloat(value.toFixed(2)),
      displayValue: `$${value.toFixed(1)}${currency}`,
    };
  });

  const chartConfig = {
    marketSize: {
      label: "Market Size",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Market Growth Forecast</CardTitle>
        <CardDescription>
          Projected market size from 2024 to 2032 with CAGR of {cagr}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              Base Year (2024)
            </p>
            <p className="text-2xl font-bold text-foreground">
              {marketSize2024}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              Forecast (2032)
            </p>
            <p className="text-2xl font-bold text-primary">
              {marketSize2032}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">
              CAGR (2025-2032)
            </p>
            <p className="text-2xl font-bold text-[var(--accent)]">
              {cagr}
            </p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 12,
              left: 12,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}${currency}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value) => (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{`$${Number(value).toFixed(1)}${currency}`}</span>
                    </div>
                  </>
                )}
              />}
            />
            <defs>
              <linearGradient id="fillMarketSize" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-marketSize)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-marketSize)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="marketSize"
              type="monotone"
              fill="url(#fillMarketSize)"
              fillOpacity={0.4}
              stroke="var(--color-marketSize)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
