import React from 'react';
import Link from 'next/link';

interface CTAPanelProps {
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
}

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CTAPanel = React.forwardRef<HTMLDivElement, CTAPanelProps>(
  ({ price, discounted_price, reportTitle, reportSlug }, ref) => {
    const displayPrice = discounted_price || price;
    const hasDiscount = Boolean(discounted_price);

    return (
      <div ref={ref} className="rounded-2xl overflow-hidden theme-card theme-shadow border">
        {/* Radial Twilight pricing header */}
        <div
          className="px-5 pt-6 pb-5 text-center relative overflow-hidden"
          style={{ background: 'rgb(17, 26, 74)' }}
        >

          <p className="text-xs uppercase tracking-widest mb-3 relative" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>
            Single User License
          </p>

          <div className="relative mb-1">
            {hasDiscount && (
              <p className="text-sm line-through mb-1" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>
                {price}
              </p>
            )}
            <p className="text-4xl font-bold" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
              {displayPrice}
            </p>
          </div>

          {hasDiscount && (
            <span
              className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mt-2"
              style={{ background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.35)' }}
            >
              20% off
            </span>
          )}

          <p className="text-xs mt-3 relative" style={{ color: 'rgba(255, 255, 255, 0.48)' }}>
            Save more with multi-user license
          </p>
        </div>

        {/* CTAs + included */}
        <div className="p-5 space-y-3" style={{ background: 'var(--card)' }}>
          <Link href={reportSlug ? `/checkout/${reportSlug}` : '/contact'} className="block">
            <button
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-[var(--accent-foreground)] transition-all duration-200 bg-[var(--accent)] hover:opacity-90"
              style={{ boxShadow: '0 4px 14px hsl(var(--accent-hsl) / 0.30)' }}
            >
              Buy Report Now
            </button>
          </Link>

          <Link href={`/request-sample${reportTitle ? `?report=${encodeURIComponent(reportTitle)}` : ''}`} className="block">
            <button
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-85"
              style={{ background: 'var(--muted)', color: 'var(--primary)', border: '1px solid var(--border)' }}
            >
              Request Free Sample
            </button>
          </Link>

          {/* Included features */}
          <div className="pt-3 mt-1" style={{ borderTop: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted-foreground)' }}>
              What&apos;s Included
            </p>
            <ul className="space-y-2.5">
              {['PDF & Excel Formats', 'Free Report Updates', 'Analyst Support (60 days)', 'Data Customization (20%)'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-[var(--foreground)]">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div
            className="flex justify-center gap-4 pt-3 mt-1"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {['Secure Checkout', 'Instant Access'].map((badge) => (
              <span key={badge} className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
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
