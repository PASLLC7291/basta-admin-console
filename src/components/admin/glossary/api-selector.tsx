'use client';

import { clsx } from 'clsx';
import { Database, User, Bell } from 'lucide-react';
import type { ApiSource } from '@/lib/basta-types';

interface ApiSelectorProps {
  selected: ApiSource;
  onSelect: (api: ApiSource) => void;
  managementCount: number;
  clientCount: number;
  subscriptionCount?: number;
}

export function ApiSelector({
  selected,
  onSelect,
  managementCount,
  clientCount,
  subscriptionCount = 0,
}: ApiSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <button
          onClick={() => onSelect('management')}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all',
            selected === 'management'
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          )}
        >
          <Database className="h-4 w-4" />
          <span>Management API</span>
          <span className={clsx(
            'px-2 py-0.5 text-xs rounded-full',
            selected === 'management'
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
          )}>
            {managementCount}
          </span>
        </button>

        <button
          onClick={() => onSelect('client')}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all',
            selected === 'client'
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          )}
        >
          <User className="h-4 w-4" />
          <span>Client API</span>
          <span className={clsx(
            'px-2 py-0.5 text-xs rounded-full',
            selected === 'client'
              ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
          )}>
            {clientCount}
          </span>
        </button>
      </div>

      {/* Client API info banner */}
      {selected === 'client' && subscriptionCount > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
              Real-time Subscriptions Available
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-400">
              The Client API includes {subscriptionCount} subscription types for real-time updates
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Subscription badge component for type cards
interface SubscriptionBadgeProps {
  size?: 'sm' | 'md';
}

export function SubscriptionBadge({ size = 'md' }: SubscriptionBadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1 font-medium rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400',
      size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-0.5 text-xs'
    )}>
      <Bell className={clsx(size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
      Subscription
    </span>
  );
}
