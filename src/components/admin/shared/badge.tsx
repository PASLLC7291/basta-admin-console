'use client';

import { clsx } from 'clsx';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'query'
  | 'mutation'
  | 'object'
  | 'input'
  | 'enum'
  | 'union'
  | 'connection'
  | 'edge'
  | 'interface'
  | 'scalar';

type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
  primary: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  secondary: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  info: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400',
  // GraphQL type categories
  query: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
  mutation: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  object: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  input: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  enum: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
  union: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
  connection: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400',
  edge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
  interface: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
  scalar: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

export function Badge({ label, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-md',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
    </span>
  );
}

// Helper to map category to variant
export function getCategoryVariant(category: string): BadgeVariant {
  const categoryMap: Record<string, BadgeVariant> = {
    Query: 'query',
    Mutation: 'mutation',
    Object: 'object',
    Input: 'input',
    Enum: 'enum',
    Union: 'union',
    Connection: 'connection',
    Edge: 'edge',
    Interface: 'interface',
    Scalar: 'scalar',
  };
  return categoryMap[category] || 'default';
}
