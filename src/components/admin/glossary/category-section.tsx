'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { BastaSection, BastaType } from '@/lib/basta-types';
import { TypeCard } from './type-card';
import {
  Building2,
  Gavel,
  Package,
  TrendingUp,
  Users,
  ClipboardList,
  ShoppingCart,
  Image,
  Webhook,
  Settings,
  Radio,
  Database,
  User,
  CreditCard,
  Search,
  Tag,
  Hash,
  type LucideIcon,
} from 'lucide-react';

const sectionIcons: Record<string, LucideIcon> = {
  // Management API sections
  accounts: Building2,
  sales: Gavel,
  items: Package,
  bids: TrendingUp,
  users: Users,
  registrations: ClipboardList,
  orders: ShoppingCart,
  media: Image,
  webhooks: Webhook,
  config: Settings,
  live: Radio,
  core: Database,
  // Client API sections
  'core-query': Database,
  bidding: TrendingUp,
  user: User,
  payments: CreditCard,
  search: Search,
  metadata: Tag,
  scalars: Hash,
};

interface CategorySectionProps {
  section: BastaSection;
  onTypeClick: (type: BastaType) => void;
  defaultExpanded?: boolean;
  viewMode?: 'grid' | 'list';
}

export function CategorySection({
  section,
  onTypeClick,
  defaultExpanded = true,
  viewMode = 'grid',
}: CategorySectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const Icon = sectionIcons[section.slug] || Database;

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-zinc-800">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
            <Icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {section.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {section.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {section.types.length} types
          </span>
          {expanded ? (
            <ChevronDown className="h-5 w-5 text-zinc-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {expanded && (
        <div className="border-t border-zinc-200 dark:border-zinc-700 p-4">
          <div
            className={clsx(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-2'
            )}
          >
            {section.types.map((type) => (
              <TypeCard
                key={type.name}
                type={type}
                onClick={() => onTypeClick(type)}
                compact={viewMode === 'list'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
