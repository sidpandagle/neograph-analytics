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
          {/* role="img" collapses the donut's descendants for assistive tech:
              every figure in it is repeated as text in the table beside it, so
              reading the SVG's labels as well would duplicate the data. */}
          <div
            role="img"
            aria-label={`Donut chart: ${title}. The same figures are listed in the table beside it.`}
            className="flex items-center justify-center min-w-0"
          >
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

          {/* The numeric equivalent of the donut, not a legend. A pie is
              unreadable as values: the share is the point, so it is published
              as a table that a reader, a screen reader and a crawler can all
              take exact numbers out of. min-w-0 keeps the table's min-content
              width from inflating this grid track and pushing the page into
              horizontal scroll, the mechanism behind R-22. */}
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">
                {title} — market share by segment, in percent.
              </caption>
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th scope="col" className="py-2 pr-3 text-left font-medium text-muted-foreground">
                    Segment
                  </th>
                  <th scope="col" className="py-2 text-right font-medium text-muted-foreground">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody>
                {segments.map((s, i) => (
                  <tr key={i} className="border-b border-[var(--border)] align-top last:border-0">
                    <th scope="row" className="py-2 pr-3 text-left font-normal">
                      <span className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-1 h-3 w-3 flex-shrink-0 rounded-full"
                          style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }}
                        />
                        <span className="min-w-0">
                          <span className="block font-medium text-foreground">{s.name}</span>
                          {s.description && (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {s.description}
                            </span>
                          )}
                        </span>
                      </span>
                    </th>
                    <td className="whitespace-nowrap py-2 text-right font-bold tabular-nums text-foreground">
                      {s.market_share.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-[var(--border)]">
                  <th scope="row" className="py-2 pr-3 text-left font-medium text-muted-foreground">
                    Total
                  </th>
                  <td className="whitespace-nowrap py-2 text-right font-bold tabular-nums text-foreground">
                    {total.toFixed(1)}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
