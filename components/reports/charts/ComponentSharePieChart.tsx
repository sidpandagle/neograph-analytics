"use client"

import React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import {
  ChartConfig,
  ChartContainer,
} from '@/components/ui/chart'
import type { SegmentItem } from '@/lib/jsonReports'

interface ComponentSharePieChartProps {
  title: string
  segments: SegmentItem[]
  className?: string
}

export const ComponentSharePieChart: React.FC<ComponentSharePieChartProps> = ({
  title,
  segments,
  className,
}) => {
  const chartData = segments.map((s, i) => ({
    segment: s.name,
    share: s.market_share,
    fill: `var(--color-seg${i + 1})`,
    description: s.description,
  }))

  const chartConfig = segments.reduce((cfg, s, i) => {
    cfg[`seg${i + 1}`] = {
      label: s.name,
      color: `hsl(var(--chart-${i + 1}))`,
    }
    return cfg
  }, {} as ChartConfig)

  const total = segments.reduce((sum, s) => sum + s.market_share, 0)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Market share distribution across {segments.length} segments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="aspect-square max-h-[260px] w-full">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="share"
                  nameKey="segment"
                  innerRadius={55}
                  outerRadius={95}
                  strokeWidth={2}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                              className="fill-foreground text-2xl font-bold"
                            >
                              {total.toFixed(0)}%
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 20}
                              className="fill-muted-foreground text-xs"
                            >
                              Total
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

          <div className="space-y-3">
            {segments.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-foreground">{s.name}</span>
                    <span className="font-bold text-sm text-foreground ml-2">
                      {s.market_share.toFixed(1)}%
                    </span>
                  </div>
                  {s.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {s.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
