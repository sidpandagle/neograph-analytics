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

  const chartData = data.map((d) => ({
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
            <p className="text-xl font-bold text-[hsl(var(--chart-2))]">{cagr}%</p>
          </div>
        </div>

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
      </CardContent>
    </Card>
  )
}
