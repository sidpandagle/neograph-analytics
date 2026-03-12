import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getReportBySlug, isApiError } from '@/lib/api';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Breadcrumb } from '@/components/ui';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reportId: string }>;
}): Promise<Metadata> {
  const { reportId } = await params;
  const response = await getReportBySlug(reportId);

  if (isApiError(response)) {
    return { title: 'Checkout' };
  }

  return {
    title: `Checkout — ${response.data.title}`,
    robots: { index: false, follow: false },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;

  const response = await getReportBySlug(reportId);
  if (isApiError(response)) {
    notFound();
  }

  const report = response.data;

  const parsePriceString = (val: string | number | undefined | null): number => {
    if (typeof val === 'number') return val;
    const cleaned = String(val || '0').replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const price = parsePriceString(report.price);
  const discountedPrice = parsePriceString(report.discounted_price);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Reports', href: '/industry' },
    { label: report.title, href: `/reports/${report.slug}` },
    { label: 'Checkout' },
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 md:px-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-3 bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Your Information</h2>
            <CheckoutForm
              reportSlug={report.slug}
              reportTitle={report.title}
            />
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-2 space-y-4">
            <OrderSummary
              reportTitle={report.title}
              reportSlug={report.slug}
              price={price}
              discountedPrice={discountedPrice}
              currency="USD"
            />

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 text-xs text-[var(--muted-foreground)] space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Payments secured by PayPal</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>No PayPal account required — pay with card</span>
              </div>
            </div>

            <p className="text-xs text-[var(--muted-foreground)]">
              Questions? <Link href="/contact" className="text-[var(--primary)] hover:underline">Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
