"use client"

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

interface RegionItem {
  name: string;
  share: string;
  cagr?: string;
}

interface RegionalAnalysisChartProps {
  regions: RegionItem[];
  className?: string;
}

export const RegionalAnalysisChart: React.FC<RegionalAnalysisChartProps> = ({
  regions,
  className,
}) => {
  // Transform data for chart
  const chartData = regions.map((region) => ({
    region: region.name,
    marketShare: parseFloat(region.share.replace('%', '')),
    cagr: region.cagr ? parseFloat(region.cagr.replace('%', '')) : 0,
  }));

  const chartConfig = {
    marketShare: {
      label: "Market Share",
      color: "hsl(var(--chart-1))",
    },
    cagr: {
      label: "CAGR",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Regional Market Analysis</CardTitle>
        <CardDescription>
          Market share and growth rate by region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 12,
              left: 12,
              bottom: 20,
            }}
            layout="vertical"
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="region"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              width={150}
            />
            <XAxis 
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => {
                    const label = name === 'marketShare' ? 'Market Share' : 'CAGR';
                    const suffix = name === 'marketShare' ? '%' : '% CAGR';
                    return (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{label}:</span>
                        <span className="font-semibold">{value}{suffix}</span>
                      </div>
                    );
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="marketShare"
              fill="var(--color-marketShare)"
              radius={[0, 4, 4, 0]}
            >
              <LabelList
                dataKey="marketShare"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
            {chartData.some(d => d.cagr > 0) && (
              <Bar
                dataKey="cagr"
                fill="var(--color-cagr)"
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="cagr"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${value}%`}
                />
              </Bar>
            )}
          </BarChart>
        </ChartContainer>

        {/* Regional insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {regions.slice(0, 2).map((region, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{region.name}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Top {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Share: </span>
                  <span className="font-bold">{region.share}</span>
                </div>
                {region.cagr && (
                  <div>
                    <span className="text-muted-foreground">CAGR: </span>
                    <span className="font-bold text-[var(--cmi-primary)]">{region.cagr}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
