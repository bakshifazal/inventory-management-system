import React from 'react';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
  loadingText?: string;
}

export function LoadingButton({ 
  isLoading, 
  text, 
  loadingText = 'Loading...', 
  className = '', 
  disabled,
  ...props 
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`relative py-3 px-4 font-semibold rounded-xl transition-all duration-200
        ${isLoading ? 'bg-opacity-70 cursor-not-allowed' : 'hover:bg-opacity-80'}
        ${className}
      `}
    >
      <span className={`${isLoading ? 'invisible' : 'visible'}`}>
        {text}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-transparent border-current rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}