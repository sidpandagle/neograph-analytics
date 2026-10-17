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
        {/* role="img" collapses the bars for assistive tech: every figure in
            them is repeated in the table below, so reading the SVG as well
            would announce the same numbers twice. */}
        <div
          role="img"
          aria-label="Bar chart of market share and growth rate by region. The same figures are listed in the table below."
          className="min-w-0"
        >
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
        </div>

        {/* The numeric equivalent of the bars. Before this, only the top two
            regions appeared as text -- measured across the live corpus, 229 of
            509 regional rows had their share and growth rate nowhere in the
            delivered HTML at all, because Recharts draws the labels in the
            browser. A reader with JS off, a screen reader and a crawler all
            saw a two-region summary of a five-region market. min-w-0 keeps the
            table's min-content width from inflating its track (R-22). */}
        <div className="mt-6 min-w-0 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Regional market analysis — market share, growth rate and largest market by region.
            </caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className="py-2 pr-3 text-left font-medium text-muted-foreground">
                  Region
                </th>
                <th scope="col" className="py-2 pr-3 text-right font-medium text-muted-foreground">
                  Market share
                </th>
                <th scope="col" className="py-2 pr-3 text-right font-medium text-muted-foreground">
                  Growth rate
                </th>
                <th scope="col" className="py-2 text-left font-medium text-muted-foreground">
                  Largest market
                </th>
              </tr>
            </thead>
            <tbody>
              {regions.map((r, i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-0">
                  <th scope="row" className="py-2 pr-3 text-left font-medium text-foreground">
                    {r.region}
                  </th>
                  <td className="whitespace-nowrap py-2 pr-3 text-right font-bold tabular-nums text-foreground">
                    {pct(r.market_share)}
                  </td>
                  <td className="whitespace-nowrap py-2 pr-3 text-right font-bold tabular-nums text-[var(--accent)]">
                    {pct(r.growth_rate)}
                  </td>
                  <td className="py-2 text-left text-muted-foreground">
                    {r.largest_country || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
