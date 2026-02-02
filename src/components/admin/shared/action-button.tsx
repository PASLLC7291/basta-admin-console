'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Loader2, type LucideIcon } from 'lucide-react';
import { ConfirmDialog } from './confirm-dialog';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ActionButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  requireConfirmation?: boolean;
  confirmTitle?: string;
  confirmDescription?: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
  secondary:
    'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 focus:ring-zinc-500 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
  ghost:
    'bg-transparent text-zinc-600 hover:bg-zinc-100 focus:ring-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
};

const iconSizes: Record<ButtonSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function ActionButton({
  label,
  onClick,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  requireConfirmation = false,
  confirmTitle,
  confirmDescription,
  className,
}: ActionButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (requireConfirmation) {
      setShowConfirm(true);
    } else {
      await executeAction();
    }
  };

  const executeAction = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    await executeAction();
  };

  const isDisabled = disabled || loading || isLoading;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-lg transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
      >
        {(loading || isLoading) ? (
          <Loader2 className={clsx('animate-spin', iconSizes[size])} />
        ) : Icon ? (
          <Icon className={iconSizes[size]} />
        ) : null}
        {label}
      </button>

      {requireConfirmation && (
        <ConfirmDialog
          isOpen={showConfirm}
          title={confirmTitle || `Confirm ${label}`}
          description={confirmDescription || `Are you sure you want to ${label.toLowerCase()}? This action may not be reversible.`}
          confirmLabel={label}
          variant={variant === 'danger' ? 'danger' : 'warning'}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          loading={isLoading}
        />
      )}
    </>
  );
}
