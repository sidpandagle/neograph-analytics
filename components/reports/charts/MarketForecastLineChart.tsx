"use client"

import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'
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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { MarketForecastPoint } from '@/lib/jsonReports'

interface MarketForecastLineChartProps {
  data: MarketForecastPoint[]
  baseYear: number
  forecastPeriod: string
  currentValue: number
  forecastValue: number
  cagr: number
  unit?: string
  currency?: string
  className?: string
}

export const MarketForecastLineChart: React.FC<MarketForecastLineChartProps> = ({
  data,
  baseYear,
  forecastPeriod,
  currentValue,
  forecastValue,
  cagr,
  unit = 'Billion',
  currency = 'USD',
  className,
}) => {
  const unitShort = unit === 'Billion' ? 'B' : unit === 'Million' ? 'M' : unit
  const currencySymbol = currency === 'USD' ? '$' : currency

  /* 141 of the 182 live rows store the series as the forecast period alone --
     base_year 2023, points 2024-2032 -- and keep the base year's value in
     market_size.current_value, which is what `currentValue` already resolves
     to. The other 41 carry the base year as the first point, and in all 41 of
     those its value equals current_value exactly, so the two conventions
     describe the same series and only one of them writes the first point
     down. Prepending it where it is missing makes every report's series start
     where its own metric tile says the market was measured -- and it is why
     the `ReferenceLine` at `baseYear` below drew nothing at all on those 141
     pages: it was anchored to a year the axis did not contain. Nothing is
     invented here; the number is already printed in the tile above. */
  const series =
    data.some((d) => d.year === baseYear) || !data.length || baseYear > data[0].year
      ? data
      : [{ year: baseYear, value: currentValue }, ...data]

  const chartData = series.map((d) => ({
    year: d.year.toString(),
    value: d.value,
  }))

  const chartConfig = {
    value: {
      label: `Market Size (${currencySymbol} ${unit})`,
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Market Growth Forecast</CardTitle>
        <CardDescription>
          {forecastPeriod} · CAGR {cagr}%
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Base Year ({baseYear})</p>
            <p className="text-xl font-bold text-foreground">
              {currencySymbol}{currentValue.toFixed(1)}{unitShort}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">
              Forecast ({forecastPeriod.split('-')[1]})
            </p>
            <p className="text-xl font-bold text-[var(--primary)]">
              {currencySymbol}{forecastValue.toFixed(1)}{unitShort}
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">CAGR ({forecastPeriod})</p>
            {/* --chart-2 is a series fill, picked to sit next to other fills, not to be
                read as text: on bg-muted it measures 2.66:1. The CAGR is a headline
                figure, so it uses the text accent, which is contrast-managed in both
                themes. */}
            <p className="text-xl font-bold text-[var(--cmi-primary)]">{cagr}%</p>
          </div>
        </div>

        {/* role="img": the series is published as a table below, so the SVG's
            own axis and tooltip labels would be a second reading of the same
            numbers. */}
        <div
          role="img"
          aria-label={`Area chart of market size by year, ${forecastPeriod}. The same figures are listed in the table below.`}
          className="min-w-0"
        >
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 12, left: 8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => `${currencySymbol}${v}${unitShort}`}
            />
            <ReferenceLine
              x={baseYear.toString()}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{ value: 'Base', position: 'top', fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-semibold">
                      {currencySymbol}{Number(value).toFixed(2)} {unit}
                    </span>
                  )}
                />
              }
            />
            <defs>
              <linearGradient id="fillForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillForecast)"
              fillOpacity={0.4}
              stroke="var(--color-value)"
              strokeWidth={2.5}
              dot={{ r: 3, fill: 'var(--color-value)', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ChartContainer>
        </div>

        {/* The forecast series as numbers. Recharts draws the line in the
            browser, so before this the whole series existed nowhere in the
            delivered HTML: measured across the live corpus, 1,556 forecast
            points on 182 rows, 7 to 9 per report, none of them readable
            without JavaScript. The three tiles above carry the base year, the
            end year and the CAGR -- the path between them was the gap. */}
        <div className="mt-6 min-w-0 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Market size by year, {forecastPeriod}, in {currency} {unit}.
            </caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className="py-2 pr-3 text-left font-medium text-muted-foreground">
                  Year
                </th>
                <th scope="col" className="py-2 text-right font-medium text-muted-foreground">
                  Market size ({currencySymbol} {unit})
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((d) => (
                <tr key={d.year} className="border-b border-[var(--border)] last:border-0">
                  <th scope="row" className="py-2 pr-3 text-left font-normal tabular-nums text-foreground">
                    {d.year}
                    {d.year === baseYear && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Base year
                      </span>
                    )}
                  </th>
                  <td className="whitespace-nowrap py-2 text-right font-bold tabular-nums text-foreground">
                    {currencySymbol}{d.value.toFixed(2)}{unitShort}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
