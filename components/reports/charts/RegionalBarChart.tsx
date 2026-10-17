"use client"

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from 'recharts'
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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { RegionItem } from '@/lib/jsonReports'
import { pct } from '@/lib/format'

interface RegionalBarChartProps {
  regions: RegionItem[]
  className?: string
}

export const RegionalBarChart: React.FC<RegionalBarChartProps> = ({
  regions,
  className,
}) => {
  const chartData = regions.map((r) => ({
    region: r.region,
    marketShare: r.market_share,
    growthRate: r.growth_rate,
  }))

  const chartConfig = {
    marketShare: {
      label: 'Market Share %',
      color: 'hsl(var(--chart-1))',
    },
    growthRate: {
      label: 'Growth Rate %',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig

  const topTwo = regions.slice(0, 2)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Regional Market Analysis</CardTitle>
        <CardDescription>Market share and growth rate by region</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[340px] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 16, right: 48, left: 8, bottom: 8 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="region"
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={120}
              tick={{ fontSize: 12 }}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="marketShare" fill="var(--color-marketShare)" radius={[0, 4, 4, 0]}>
              <LabelList
                dataKey="marketShare"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={11}
                formatter={(v: number) => pct(v)}
              />
            </Bar>
            <Bar dataKey="growthRate" fill="var(--color-growthRate)" radius={[0, 4, 4, 0]}>
              <LabelList
                dataKey="growthRate"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={11}
                formatter={(v: number) => pct(v)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topTwo.map((r, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center justify-between mb-1">
                {/* h3, not h4: this card sits directly inside the section whose
                    heading is an h2 ("Market Forecast & Data") and ChartFigure
                    contributes only a figcaption, so an h4 here skipped a level on
                    every report page that has a regional breakdown. Classes are
                    unchanged -- the size came from text-sm, not from the tag. */}
                <h3 className="font-semibold text-sm">{r.region}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  #{i + 1}
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  Share: <span className="font-bold text-foreground">{pct(r.market_share)}</span>
                </span>
                <span className="text-muted-foreground">
                  CAGR: <span className="font-bold text-[var(--accent)]">{pct(r.growth_rate)}</span>
                </span>
              </div>
              {r.largest_country && (
                <p className="text-xs text-muted-foreground mt-1">
                  Largest market: {r.largest_country}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
