'use client';

import { Card, CardContent } from '@/components/ui';

interface OrderSummaryProps {
  reportTitle: string;
  reportSlug: string;
  price: number;
  discountedPrice: number;
  currency?: string;
}

export function OrderSummary({
  reportTitle,
  price,
  discountedPrice,
  currency = 'USD',
}: OrderSummaryProps) {
  const displayPrice = discountedPrice > 0 ? discountedPrice : price;
  const hasDiscount = discountedPrice > 0 && discountedPrice < price;

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Order Summary</h2>

        <div className="border-b border-[var(--border)] pb-4">
          <p className="text-sm text-[var(--muted-foreground)] mb-1">Report</p>
          <p className="font-medium text-[var(--foreground)] leading-snug">{reportTitle}</p>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">Single User License · PDF &amp; Excel</p>
        </div>

        <div className="space-y-2">
          {hasDiscount && (
            <div className="flex justify-between text-sm">
              <span className="text-[var(--muted-foreground)]">Original price</span>
              <span className="line-through text-[var(--muted-foreground)]">
                {currency} {price.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span className="text-[var(--foreground)]">Total</span>
            <span className="text-[var(--foreground)]">
              {currency} {displayPrice.toFixed(2)}
            </span>
          </div>
          {hasDiscount && (
            <p className="text-xs text-[var(--cmi-primary)] font-medium">
              You save {currency} {(price - discountedPrice).toFixed(2)}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] space-y-1">
          <p>✓ Report delivered via email within 2–3 business days</p>
          <p>✓ PDF &amp; Excel formats included</p>
          <p>✓ Analyst support included</p>
        </div>
      </CardContent>
    </Card>
  );
}
