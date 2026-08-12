import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'rectangular',
      width,
      height,
      animation = 'pulse',
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-[var(--cmi-surface)] animate-pulse';

    const variants = {
      text: 'h-4 w-full rounded-pill',
      circular: 'rounded-full',
      rectangular: 'rounded-tile',
    };

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-[shimmer_2s_ease-in-out_infinite]',
      none: '',
    };

    const customStyle = {
      ...style,
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], animations[animation], className)}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
}

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, lastLineWidth = '70%', ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            style={
              index === lines - 1 ? { width: lastLineWidth } : undefined
            }
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  hasImage?: boolean;
  hasAvatar?: boolean;
}

const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, hasImage = true, hasAvatar = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border border-[var(--cmi-line)] rounded-card p-6.5 space-y-4',
          className
        )}
        {...props}
      >
        {hasImage && <Skeleton className="w-full h-48" />}
        <div className="space-y-3">
          {hasAvatar && (
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          )}
          <Skeleton className="h-6 w-3/4" />
          <SkeletonText lines={2} lastLineWidth="60%" />
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

export { Skeleton, SkeletonText, SkeletonCard };
