import React from 'react';
import Link from 'next/link';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
}

const CheckIcon = () => (
  <svg className="h-4 w-4 flex-shrink-0 text-[var(--cmi-primary)]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Sticky purchase panel — a blue price header over a white body. */
export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ price, discounted_price, reportTitle, reportSlug }, ref) => {
    const displayPrice = discounted_price || price;
    const hasDiscount = Boolean(discounted_price);

    return (
      <div
        ref={ref}
        className="overflow-hidden rounded-card border border-[var(--cmi-line)] bg-white"
      >
        <div className="bg-[var(--cmi-primary)] px-5 pb-5 pt-6 text-center">
          <p className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--cmi-on-blue-dim)]">
            Single user licence
          </p>

          <div className="mb-1">
            {hasDiscount && (
              <p className="mb-1 text-sm text-[var(--cmi-on-blue)] line-through">{price}</p>
            )}
            <p className="num text-[38px] leading-none text-white">{displayPrice}</p>
          </div>

          {hasDiscount && (
            <span className="mt-3 inline-block rounded-pill bg-[var(--cmi-primary-raised)] px-3 py-1 text-xs font-semibold text-white">
              20% off
            </span>
          )}

          <p className="mt-3 text-xs text-[var(--cmi-on-blue-dim)]">
            Save more with a multi-user licence
          </p>
        </div>

        <div className="space-y-3 p-5">
          <Link
            href={reportSlug ? `/checkout/${reportSlug}` : '/contact'}
            className="block w-full rounded-pill bg-[var(--cmi-primary)] px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--cmi-primary-pressed)] hover:text-white"
          >
            Buy report now
          </Link>

          <Link
            href={`/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}` : ''}`}
            className="block w-full rounded-pill border border-[var(--cmi-line)] px-4 py-3 text-center text-sm font-semibold text-[var(--cmi-ink)] transition-colors duration-150 hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-ink)]"
          >
            Request free sample
          </Link>

          <div className="mt-1 border-t border-[var(--cmi-line)] pt-4">
            <p className="eyebrow-muted mb-3">What&apos;s included</p>
            <ul className="space-y-2.5">
              {['PDF & Excel formats', 'Free report updates', 'Analyst support (60 days)', 'Data customization (20%)'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-[var(--cmi-ink)]">
                    <CheckIcon />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mt-1 flex justify-center gap-4 border-t border-[var(--cmi-line)] pt-4">
            {['Secure checkout', 'Instant access'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-xs text-[var(--cmi-meta)]">
                <span className="h-1.5 w-1.5 rounded-pill bg-[var(--cmi-primary)]" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

CTAPanel.displayName = 'CTAPanel';
