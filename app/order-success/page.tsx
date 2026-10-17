import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Order Confirmed — NeoGraphAnalytics',
  description: 'Your order has been confirmed. Your report will be delivered within 2–3 business days.',
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6 py-16">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[var(--status-info-chip)] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[var(--status-info-icon)]"
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
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3">
            Payment Confirmed!
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Thank you for your purchase. A confirmation email has been sent to you.
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 text-left space-y-3">
          <h2 className="font-semibold text-[var(--foreground)]">What happens next?</h2>
          <ol className="space-y-2 text-sm text-[var(--muted-foreground)] list-decimal list-inside">
            <li>Our team will process your order and prepare your report.</li>
            <li>Your report will be emailed to you within <strong className="text-[var(--foreground)]">2–3 business days</strong>.</li>
            <li>If you have any questions, reply to the confirmation email or contact our support team.</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/reports">
            <Button variant="outline" size="lg">
              Browse More Reports
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
