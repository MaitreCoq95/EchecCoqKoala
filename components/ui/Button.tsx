import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'naomy' | 'papa';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', theme = 'naomy', ...props }, ref) => {
    const variants = {
      primary: theme === 'naomy' 
        ? 'bg-naomy-primary text-white hover:bg-naomy-primary/90 shadow-lg shadow-naomy-primary/20'
        : 'bg-papa-primary text-white hover:bg-papa-primary/90 shadow-lg shadow-papa-primary/20',
      secondary: theme === 'naomy'
        ? 'bg-naomy-secondary text-naomy-primary hover:bg-naomy-secondary/80'
        : 'bg-papa-secondary text-white hover:bg-papa-secondary/80',
      outline: 'border-2 bg-transparent hover:bg-slate-100',
      ghost: 'bg-transparent hover:bg-slate-100',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg font-bold',
      xl: 'px-8 py-4 text-xl font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
