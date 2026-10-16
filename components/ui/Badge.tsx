import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Chips are always fully rounded. `primary` is the blue-tinted chip
   * reserved for the figure that matters most (CAGR, growth).
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'onBlue' | 'ink';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-1.5 rounded-pill font-semibold whitespace-nowrap transition-colors duration-150';

    const variants = {
      default:
        'bg-[var(--cmi-surface)] text-[var(--cmi-ink)]',
      primary:
        'bg-[var(--cmi-chip-blue)] text-[var(--cmi-primary)] font-bold',
      success:
        'bg-[var(--content-success-bg)] text-[var(--content-success-text)]',
      warning:
        'bg-[var(--content-warning-bg)] text-[var(--content-warning-text)]',
      danger:
        'bg-[var(--content-danger-bg)] text-[var(--content-danger-text)]',
      outline:
        'border border-[var(--cmi-line)] text-[var(--cmi-body)] hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-primary)]',
      onBlue:
        'bg-[var(--cmi-primary-raised)] text-[var(--primary-foreground)]',
      ink:
        'bg-[var(--cmi-ink-surface)] text-[var(--cmi-on-blue)]',
    };

    const sizes = {
      sm: 'px-2.5 py-1 text-[11px]',
      md: 'px-3 py-1.5 text-[12px]',
      lg: 'px-4 py-2 text-[13px]',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
