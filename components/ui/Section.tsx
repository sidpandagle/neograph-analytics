import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Constrain the inner content to a narrower measure. */
  container?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Panel fill. Blue and white alternate; ink is reserved for the
   * footer and the occasional closing statement.
   */
  background?: 'default' | 'muted' | 'card' | 'blue' | 'ink' | 'sky' | 'bare';
}

/**
 * A page section is a rounded panel floating on the desk.
 * Spacing between panels comes from the `.desk` flex gap in the
 * root layout, so sections carry padding but no vertical margin.
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      container = false,
      padding = 'lg',
      background = 'card',
      children,
      ...props
    },
    ref
  ) => {
    const backgrounds = {
      default: 'bg-white text-[var(--cmi-ink)]',
      card: 'bg-white text-[var(--cmi-ink)]',
      muted: 'bg-[var(--cmi-surface)] text-[var(--cmi-ink)]',
      blue: 'bg-[var(--cmi-primary)] text-white',
      ink: 'bg-[var(--cmi-ink)] text-white',
      sky: 'bg-[var(--cmi-sky)] text-[var(--cmi-ink)]',
      bare: 'bg-transparent',
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-6 md:p-7',
      md: 'p-7 md:p-9',
      lg: 'p-7 md:p-11',
      xl: 'p-8 md:p-14',
    };

    return (
      <section
        ref={ref}
        className={cn(
          background === 'bare' ? '' : 'rounded-panel',
          backgrounds[background],
          background === 'bare' ? '' : paddings[padding],
          className
        )}
        {...props}
      >
        {container ? (
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Inner measure constraint. Unlike the old full-bleed container this
 * adds no horizontal padding — the surrounding panel already has it.
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-desk',
      xl: 'max-w-desk',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full', sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 3,
      gap = 'md',
      responsive = true,
      children,
      ...props
    },
    ref
  ) => {
    const columns = {
      1: 'grid-cols-1',
      2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
      3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
      4: responsive ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
      6: responsive ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6',
      12: responsive ? 'grid-cols-4 md:grid-cols-6 lg:grid-cols-12' : 'grid-cols-12',
    };

    /* The CMI scale: 12 · 18 · 26 · 44 */
    const gaps = {
      sm: 'gap-3',
      md: 'gap-[18px]',
      lg: 'gap-6.5',
      xl: 'gap-11',
    };

    return (
      <div
        ref={ref}
        className={cn('grid', columns[cols], gaps[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Section, Container, Grid };
