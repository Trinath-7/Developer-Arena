import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled,
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm focus:ring-primary-500',
    secondary: 'bg-white text-secondary-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300',
    outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-secondary-600 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={loading || disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : children}
    </button>
  );
};

export default Button;
