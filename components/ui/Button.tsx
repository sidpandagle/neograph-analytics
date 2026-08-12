import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary`   — the blue pill; carries every important action.
   * `secondary` — white pill, hairline border, borders blue on hover.
   * `ghost`     — bare blue label, for "Read more →" style links.
   * `onBlue`    — white pill for use inside blue/ink panels.
   * `outlineOnBlue` — hairline pill for use inside blue panels.
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'onBlue' | 'outlineOnBlue';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-pill font-semibold whitespace-nowrap ' +
      'transition-[background-color,border-color,color,transform] duration-150 ease-out ' +
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cmi-primary)] ' +
      'active:translate-y-px disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none';

    const variants = {
      primary:
        'bg-[var(--cmi-primary)] text-white hover:bg-[var(--cmi-primary-pressed)]',
      secondary:
        'bg-white text-[var(--cmi-ink)] border border-[var(--cmi-line)] hover:border-[var(--cmi-primary)]',
      outline:
        'bg-transparent text-[var(--cmi-ink)] border border-[var(--cmi-line)] hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-primary)]',
      ghost:
        'bg-transparent text-[var(--cmi-primary)] hover:text-[var(--cmi-primary-pressed)] px-1.5',
      danger:
        'bg-[var(--destructive)] text-white hover:brightness-95',
      onBlue:
        'bg-white text-[var(--cmi-ink)] hover:bg-[var(--cmi-chip-blue)]',
      outlineOnBlue:
        'bg-transparent text-white border border-[var(--cmi-primary-line)] hover:border-white',
    };

    const sizes = {
      sm: 'px-4 py-2 text-[13.5px] gap-1.5',
      md: 'px-6 py-3.5 text-[15px] gap-2',
      lg: 'px-[26px] py-[15px] text-[15px] gap-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          variant === 'ghost' ? 'py-2' : sizes[size],
          variant === 'ghost' && size === 'sm' && 'text-[13.5px]',
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
