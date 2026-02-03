'use client';

import { clsx } from 'clsx';
import { ChevronRight, Code2, Braces, Type, List, GitBranch, Bell } from 'lucide-react';
import type { BastaType, TypeCategory } from '@/lib/basta-types';
import { Badge, getCategoryVariant } from '../shared/badge';

interface TypeCardProps {
  type: BastaType;
  onClick?: () => void;
  compact?: boolean;
}

const categoryIcons: Record<TypeCategory, typeof Code2> = {
  Query: Code2,
  Mutation: Code2,
  Object: Braces,
  Input: Braces,
  Enum: List,
  Union: GitBranch,
  Connection: List,
  Edge: ChevronRight,
  Interface: Type,
  Scalar: Type,
  Subscription: Bell,
};

export function TypeCard({ type, onClick, compact = false }: TypeCardProps) {
  const Icon = categoryIcons[type.category] || Code2;

  const isSubscription = type.isSubscription || type.category === 'Subscription';

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={clsx(
          'w-full flex items-center justify-between p-3 bg-white dark:bg-zinc-800 rounded-lg border transition-colors text-left',
          isSubscription
            ? 'border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500'
            : 'border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Icon className={clsx('h-4 w-4 flex-shrink-0', isSubscription ? 'text-purple-500' : 'text-zinc-400')} />
          <span className="font-mono text-sm text-zinc-900 dark:text-white truncate">
            {type.name}
          </span>
          {isSubscription && (
            <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400">
              Live
            </span>
          )}
        </div>
        <Badge label={type.category} variant={getCategoryVariant(type.category)} size="sm" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full p-4 bg-white dark:bg-zinc-800 rounded-xl border hover:shadow-md transition-all text-left group',
        isSubscription
          ? 'border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500'
          : 'border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={clsx('h-5 w-5', isSubscription ? 'text-purple-500' : 'text-zinc-400')} />
            <h4 className="font-mono text-base font-semibold text-zinc-900 dark:text-white truncate">
              {type.name}
            </h4>
            {isSubscription && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 flex items-center gap-1">
                <Bell className="h-3 w-3" />
                Real-time
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {type.description}
          </p>
          {type.fields && type.fields.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {type.fields.slice(0, 5).map((field) => (
                <span
                  key={field}
                  className="px-1.5 py-0.5 text-xs font-mono bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded"
                >
                  {field}
                </span>
              ))}
              {type.fields.length > 5 && (
                <span className="px-1.5 py-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                  +{type.fields.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>
        <Badge label={type.category} variant={getCategoryVariant(type.category)} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
        <span>Section: {type.section}</span>
        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}
