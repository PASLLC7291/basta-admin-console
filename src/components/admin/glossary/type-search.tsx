'use client';

import { useState, useMemo } from 'react';
import { Search, X, Filter, LayoutGrid, List } from 'lucide-react';
import { clsx } from 'clsx';
import type { TypeCategory } from '@/lib/basta-types';

interface TypeSearchProps {
  onSearchChange: (query: string) => void;
  onCategoryFilter: (categories: TypeCategory[]) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
  totalResults: number;
}

const allCategories: TypeCategory[] = [
  'Query',
  'Mutation',
  'Object',
  'Input',
  'Enum',
  'Union',
  'Connection',
  'Edge',
  'Interface',
  'Scalar',
  'Subscription',
];

export function TypeSearch({
  onSearchChange,
  onCategoryFilter,
  onViewModeChange,
  viewMode,
  totalResults,
}: TypeSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<TypeCategory[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearchChange(value);
  };

  const toggleCategory = (category: TypeCategory) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onCategoryFilter(newCategories);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onCategoryFilter([]);
    setQuery('');
    onSearchChange('');
  };

  return (
    <div className="space-y-4">
      {/* Search and View Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search types by name or description..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded"
            >
              <X className="h-4 w-4 text-zinc-400" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors',
            showFilters || selectedCategories.length > 0
              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400'
              : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700'
          )}
        >
          <Filter className="h-4 w-4" />
          Filter
          {selectedCategories.length > 0 && (
            <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
              {selectedCategories.length}
            </span>
          )}
        </button>

        <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={clsx(
              'p-2.5 transition-colors',
              viewMode === 'grid'
                ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={clsx(
              'p-2.5 transition-colors',
              viewMode === 'list'
                ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Filter by Category
            </h4>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={clsx(
                  'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors',
                  selectedCategories.includes(category)
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {totalResults} types found
        {(query || selectedCategories.length > 0) && (
          <button
            onClick={clearFilters}
            className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
