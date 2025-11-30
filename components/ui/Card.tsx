import { HTMLAttributes, forwardRef } from 'react';
import { cn } from './Button';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'naomy' | 'papa';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme = 'naomy', ...props }, ref) => {
    const themeStyles = theme === 'naomy'
      ? 'bg-white/80 border-naomy-accent shadow-naomy-primary/10'
      : 'bg-slate-900/80 border-papa-secondary/30 shadow-papa-primary/20 text-white';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border-2 backdrop-blur-sm shadow-xl p-6',
          themeStyles,
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
