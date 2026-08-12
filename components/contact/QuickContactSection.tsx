import { CONTACT_INFO } from '@/lib/contact';

export default function QuickContactSection() {
  return (
    <div className="bg-[var(--cmi-surface)] rounded-soft p-4 space-y-3">
      <h2 className="text-xl font-bold text-[var(--foreground)]">
        Quick Contact
      </h2>

      <div className="space-y-2">
        {/* USA Phone */}
        <a
          href={`tel:${CONTACT_INFO.offices.usa.phone}`}
          className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-[var(--muted-foreground)]">USA Office</p>
            <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {CONTACT_INFO.offices.usa.phoneFormatted}
            </p>
          </div>
        </a>

        {/* India Phone */}
        <a
          href={`tel:${CONTACT_INFO.offices.india.phone}`}
          className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-xs text-[var(--muted-foreground)]">India Office</p>
            <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {CONTACT_INFO.offices.india.phoneFormatted}
            </p>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--muted-foreground)]">Email Us</p>
            <p className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
              {CONTACT_INFO.email}
            </p>
          </div>
        </a>
      </div>

      <div className="pt-3 border-t border-[var(--border-light)]">
        <div className="flex items-center gap-2 text-xs text-[var(--primary-dark)]">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">24×7 Sales & Support Available</span>
        </div>
      </div>
    </div>
  );
}
