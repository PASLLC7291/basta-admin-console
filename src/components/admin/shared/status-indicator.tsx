'use client';

import { clsx } from 'clsx';

type StatusType = 'online' | 'offline' | 'warning' | 'pending' | 'active' | 'inactive';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  showPulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<StatusType, { color: string; bgColor: string; label: string }> = {
  online: {
    color: 'bg-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    label: 'Online',
  },
  offline: {
    color: 'bg-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    label: 'Offline',
  },
  warning: {
    color: 'bg-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    label: 'Warning',
  },
  pending: {
    color: 'bg-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    label: 'Pending',
  },
  active: {
    color: 'bg-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    label: 'Active',
  },
  inactive: {
    color: 'bg-zinc-400',
    bgColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
    label: 'Inactive',
  },
};

const sizeConfig = {
  sm: { dot: 'h-1.5 w-1.5', text: 'text-xs', padding: 'px-2 py-0.5' },
  md: { dot: 'h-2 w-2', text: 'text-xs', padding: 'px-2.5 py-1' },
  lg: { dot: 'h-2.5 w-2.5', text: 'text-sm', padding: 'px-3 py-1' },
};

export function StatusIndicator({
  status,
  label,
  showPulse = false,
  size = 'md',
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bgColor,
        sizes.padding,
        sizes.text
      )}
    >
      <span className="relative flex">
        <span className={clsx('rounded-full', config.color, sizes.dot)} />
        {showPulse && (status === 'online' || status === 'active') && (
          <span
            className={clsx(
              'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
              config.color
            )}
          />
        )}
      </span>
      {label || config.label}
    </span>
  );
}
