/**
 * Utility functions for chart components
 */

/**
 * Parse currency value from string (e.g., "$87.4 bn" -> 87.4)
 */
export function parseCurrencyValue(value: string): number {
  return parseFloat(value.replace(/[^0-9.]/g, ''));
}

/**
 * Extract currency unit from string (e.g., "$87.4 bn" -> "bn")
 */
export function extractCurrencyUnit(value: string): string {
  const match = value.match(/[^0-9.]+$/);
  return match ? match[0].trim() : 'bn';
}

/**
 * Format number as currency with unit (e.g., 87.4 -> "$87.4bn")
 */
export function formatCurrency(value: number, unit: string = 'bn'): string {
  return `$${value.toFixed(1)}${unit}`;
}

/**
 * Parse percentage value from string (e.g., "16.8%" -> 16.8)
 */
export function parsePercentage(value: string): number {
  return parseFloat(value.replace('%', ''));
}

/**
 * Format number as percentage (e.g., 16.8 -> "16.8%")
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Generate color palette for charts based on count
 */
export function generateChartColors(count: number): string[] {
  const baseColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
    'hsl(var(--chart-7))',
    'hsl(var(--chart-8))',
  ];
  
  // Repeat colors if count exceeds base colors
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  
  return colors;
}

/**
 * Calculate compound annual growth rate (CAGR)
 */
export function calculateCAGR(
  startValue: number,
  endValue: number,
  years: number
): number {
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
}

/**
 * Generate market growth projection data points
 */
export function generateMarketProjection(
  startValue: number,
  endValue: number,
  startYear: number,
  endYear: number
): Array<{ year: number; value: number }> {
  const years = endYear - startYear + 1;
  const data: Array<{ year: number; value: number }> = [];
  
  for (let i = 0; i < years; i++) {
    const year = startYear + i;
    const value = startValue * Math.pow(endValue / startValue, i / (years - 1));
    data.push({ year, value: parseFloat(value.toFixed(2)) });
  }
  
  return data;
}

/**
 * Sort segments by share percentage (descending)
 */
export function sortByShare<T extends { share: string }>(segments: T[]): T[] {
  return [...segments].sort((a, b) => {
    const shareA = parsePercentage(a.share);
    const shareB = parsePercentage(b.share);
    return shareB - shareA;
  });
}

/**
 * Get top N segments by share
 */
export function getTopSegments<T extends { share: string }>(
  segments: T[],
  count: number
): T[] {
  return sortByShare(segments).slice(0, count);
}

/**
 * Group smaller segments into "Others" category
 */
export function groupOthers<T extends { name: string; share: string }>(
  segments: T[],
  threshold: number = 5
): Array<T | { name: string; share: string }> {
  const sorted = sortByShare(segments);
  const major = sorted.filter(s => parsePercentage(s.share) >= threshold);
  const minor = sorted.filter(s => parsePercentage(s.share) < threshold);
  
  if (minor.length === 0) {
    return major;
  }
  
  const othersShare = minor.reduce((sum, s) => sum + parsePercentage(s.share), 0);
  
  return [
    ...major,
    {
      name: 'Others',
      share: formatPercentage(othersShare),
    }
  ];
}

/**
 * Calculate total from percentage strings
 */
export function sumPercentages(percentages: string[]): number {
  return percentages.reduce((sum, p) => sum + parsePercentage(p), 0);
}

/**
 * Validate percentage total (should equal 100%)
 */
export function validatePercentageTotal(
  percentages: string[],
  tolerance: number = 0.1
): boolean {
  const total = sumPercentages(percentages);
  return Math.abs(total - 100) <= tolerance;
}
