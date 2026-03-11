'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { CountrySelect } from '@/components/ui/country-select';
import { getDefaultCountry, type Country } from '@/lib/data/countries';
import { PayPalButton } from './PayPalButton';
import { createOrder, captureOrder } from '@/lib/api/orders';

type Step = 'details' | 'payment' | 'processing';

interface CheckoutFormProps {
  reportSlug: string;
  reportTitle: string;
}

interface CustomerDetails {
  customer_name: string;
  customer_email: string;
  customer_company: string;
  customer_phone: string;
  customer_country: string;
}

const getInitialDetails = (): CustomerDetails => {
  const defaultCountry = getDefaultCountry();
  return {
    customer_name: '',
    customer_email: '',
    customer_company: '',
    customer_phone: '',
    customer_country: defaultCountry.name,
  };
};

export function CheckoutForm({ reportSlug, reportTitle }: CheckoutFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [details, setDetails] = useState<CustomerDetails>(getInitialDetails);
  const [countryCode, setCountryCode] = useState<string>(getDefaultCountry().code);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [paypalOrderId, setPaypalOrderId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await createOrder({
        ...details,
        report_slug: reportSlug,
      });

      setOrderId(result.order_id);
      setPaypalOrderId(result.paypal_order_id);
      setStep('payment');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalApprove = async (_paypalOrderId: string) => {
    if (!orderId) return;
    setStep('processing');
    setError('');

    try {
      await captureOrder(orderId);
      router.push('/order-success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment capture failed. Please contact support.');
      setStep('payment');
    }
  };

  const handlePayPalError = (err: unknown) => {
    console.error('PayPal error:', err);
    setError('Payment failed. Please try again or use a different payment method.');
    setStep('payment');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCountryChange = (country: Country) => {
    setCountryCode(country.code);
    setDetails(prev => ({ ...prev, customer_country: country.name }));
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="animate-spin h-10 w-10 border-4 border-[var(--primary)] border-t-transparent rounded-full" />
        <p className="text-[var(--foreground)] font-medium">Processing your payment...</p>
        <p className="text-sm text-[var(--muted-foreground)]">Please do not close this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-3 text-sm">
        <span className={`font-semibold ${step === 'details' ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}>
          1. Your Details
        </span>
        <span className="text-[var(--muted-foreground)]">→</span>
        <span className={`font-semibold ${step === 'payment' ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}`}>
          2. Payment
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customer_name"
              value={details.customer_name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="customer_email"
              value={details.customer_email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Your report will be sent to this address.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Company / Organization
            </label>
            <input
              type="text"
              name="customer_company"
              value={details.customer_company}
              onChange={handleChange}
              placeholder="Acme Corp"
              className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Country
              </label>
              <CountrySelect
                value={countryCode}
                onChange={handleCountryChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="customer_phone"
                value={details.customer_phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Please wait...' : 'Continue to Payment'}
            </Button>
          </div>

          <p className="text-xs text-center text-[var(--muted-foreground)]">
            By proceeding you agree to our Terms of Service. Payment is processed securely by PayPal.
          </p>
        </form>
      )}

      {step === 'payment' && (
        <div className="space-y-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-md p-4 text-sm">
            <p className="font-medium text-[var(--foreground)] mb-1">Delivering to</p>
            <p className="text-[var(--muted-foreground)]">{details.customer_name} · {details.customer_email}</p>
            <button
              type="button"
              onClick={() => setStep('details')}
              className="text-[var(--primary)] text-xs mt-1 hover:underline"
            >
              Edit details
            </button>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--foreground)] mb-3">
              Select payment method
            </p>
            <PayPalButton
              paypalOrderId={paypalOrderId}
              onApprove={handlePayPalApprove}
              onError={handlePayPalError}
            />
          </div>

          <p className="text-xs text-center text-[var(--muted-foreground)]">
            You can pay with PayPal or a credit/debit card — no PayPal account required.
          </p>
        </div>
      )}
    </div>
  );
}
