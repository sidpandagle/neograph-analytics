import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';

interface CustomizeReportCardProps {
  reportTitle?: string;
  reportSlug?: string;
  reportId?: number;
  className?: string;
}

export const CustomizeReportCard = React.forwardRef<HTMLDivElement, CustomizeReportCardProps>(
  ({ reportTitle, reportSlug, reportId, className }, ref) => {
    return (
      <Card ref={ref} className={className}>
        <CardContent className="space-y-4" style={{ border: 'none' }}>
          <h3 className="text-lg font-bold">
            Need a Tailored Report?
          </h3>

          <p className="text-sm">
            Customize this report to your needs — add regions, segments, or data points, with 20% free customization.
          </p>

          <Link href={reportId ? `/request-customization?reportId=${reportId}` : `/request-customization${reportTitle ? `?report=${encodeURIComponent(reportTitle)}${reportSlug ? `&slug=${encodeURIComponent(reportSlug)}` : ''}` : ''}`}>
            <Button
              variant="outline"
              className="w-full mt-4 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200 hover:border-green-300 focus:ring-green-300"
              size="lg"
            >
              Customize This Report
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
);

CustomizeReportCard.displayName = 'CustomizeReportCard';
