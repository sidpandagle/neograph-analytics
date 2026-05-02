"use client"

import React from 'react';
import { Label, Pie, PieChart } from "recharts"
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

interface SegmentItem {
  name: string;
  share: string;
  description?: string;
}

interface MarketSharePieChartProps {
  title: string;
  segments: SegmentItem[];
  className?: string;
}

export const MarketSharePieChart: React.FC<MarketSharePieChartProps> = ({
  title,
  segments,
  className,
}) => {
  // Transform data for chart
  const chartData = segments.map((segment, index) => ({
    segment: segment.name,
    share: parseFloat(segment.share.replace('%', '')),
    fill: `var(--color-segment${index + 1})`,
  }));

  // Generate chart config dynamically
  const chartConfig = segments.reduce((config, segment, index) => {
    config[`segment${index + 1}`] = {
      label: segment.name,
      color: `hsl(var(--chart-${(index % 8) + 1}))`,
    };
    return config;
  }, {} as ChartConfig);

  // Calculate total for center label
  const totalShare = chartData.reduce((sum, item) => sum + item.share, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Market share distribution across {segments.length} segments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Chart Section */}
          <div className="flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="aspect-square max-h-[300px] w-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent 
                      hideLabel
                      formatter={(value, name, props) => {
                        const segment = segments.find(s => s.name === props.payload.segment);
                        return (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{props.payload.segment}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {value}% market share
                            </div>
                            {segment?.description && (
                              <div className="text-xs text-muted-foreground max-w-[200px] mt-1">
                                {segment.description}
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="share"
                  nameKey="segment"
                  innerRadius={60}
                  outerRadius={100}
                  strokeWidth={2}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalShare.toFixed(0)}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-sm"
                            >
                              Total Share
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Detailed breakdown */}
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <div 
                key={index}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `hsl(var(--chart-${(index % 8) + 1}))` }}
                  />
                  <span className="font-medium text-sm text-foreground">{segment.name}</span>
                </div>
                <span className="font-bold text-sm text-foreground">{segment.share}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
