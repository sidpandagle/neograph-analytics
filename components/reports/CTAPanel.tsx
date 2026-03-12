import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
}

export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ price, discounted_price, reportTitle, reportSlug, reportId }, ref) => {
    return (
      <Card ref={ref}>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-[var(--muted-foreground)] mb-2">
              Single User License
            </p>
            <div className="mb-2">
              {discounted_price &&
                <p className="text-lg text-[var(--muted-foreground)] line-through">
                  {price}/-
                </p>}
              <p className="text-4xl font-bold text-[var(--foreground)]">
                {discounted_price ? discounted_price : price}/-
              </p>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-2">
              Save 20% with multi-user license
            </p>
          </div>

          <div className="space-y-3">
            <Link href={reportId ? `/checkout/${reportId}` : reportSlug ? `/checkout/${reportSlug}` : '/contact'}>
              <Button className="w-full" size="lg">
                Buy Now
              </Button>
            </Link>
            <Link href={reportId ? `/request-sample?reportId=${reportId}` : `/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}${reportSlug ? `&slug=${encodeURIComponent(reportSlug)}` : ''}` : ''}`}>
              <Button
                variant="outline"
                className="w-full mt-4 bg-[#E3F2FD] text-[#1565C0] hover:bg-[#BBDEFB] hover:text-[#0D47A1] border-[#90CAF9] hover:border-[#64B5F6] focus:ring-[#2196F3]"
                size="lg"
              >
                Request Sample
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <h4 className="text-sm font-semibold mb-3">What&apos;s Included</h4>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>PDF & Excel Formats</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Free Report Updates</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Analyst Support</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Data Customization</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
