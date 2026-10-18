"use client"

import React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { CountryItem } from '@/lib/jsonReports'
import { pct } from '@/lib/format'

interface CountryBarChartProps {
  countries: CountryItem[]
  className?: string
}

/**
 * Country comparison — share and growth side by side.
 *
 * Why this exists: `country_analysis` carries a numeric `market_share` and
 * `growth_rate` on 140 of the 182 published rows (measured with
 * `scripts/column-population.mjs`), and until now those figures appeared only
 * as rows in `CountryTable`. The table answers "what is the United States'
 * share"; it does not show that the fastest-growing country is rarely the
 * largest one, which is the point of carrying both columns.
 *
 * No table of its own. `CountryTable` renders directly below this chart from
 * the same array, server-side, so a second copy would duplicate every figure
 * in the delivered HTML. That is also why the SVG is `role="img"`: the numbers
 * are announced once, from the table.
 *
 * Axis sizing is deliberate rather than generous. Measured across the live
 * corpus, country arrays reach index 3 on 85 rows and index 5 on exactly 1,
 * so at most six bars pairs are ever drawn and nothing is truncated.
 */
export const CountryBarChart: React.FC<CountryBarChartProps> = ({
  countries,
  className,
}) => {
  const chartData = countries.map((c) => ({
    country: c.country,
    marketShare: c.market_share,
    growthRate: c.growth_rate,
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

  if (!chartData.length) return null

  return (
    <div
      role="img"
      aria-label="Grouped bar chart of market share and growth rate by country. The same figures are listed in the Country-Level Analysis table below."
      className={`min-w-0 ${className ?? ''}`}
    >
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 16, right: 48, left: 8, bottom: 8 }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="country"
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
  )
}
