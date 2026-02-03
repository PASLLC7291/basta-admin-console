'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Play,
  Copy,
  RefreshCw,
  ChevronDown,
  Package,
  Gavel,
  Tag,
  DollarSign,
  Calendar,
  BarChart3,
  X,
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { Badge } from '@/components/admin/shared/badge';
import { searchClientTypes, clientTypeCounts } from '@/lib/basta-client-types';

interface SearchResult {
  id: string;
  title: string;
  type: 'item' | 'sale';
  description: string;
  price?: string;
  status: string;
  score: number;
}

interface Facet {
  name: string;
  values: { value: string; count: number; selected: boolean }[];
}

export default function SearchPlaygroundPage() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'all' | 'items' | 'sales'>('all');
  const [showFilters, setShowFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search results
  const mockResults: SearchResult[] = [
    { id: '1', title: 'Vintage Rolex Submariner 1968', type: 'item', description: 'Rare vintage diving watch in excellent condition', price: '$12,500', status: 'Active', score: 0.95 },
    { id: '2', title: 'Modern Art Collection Sale', type: 'sale', description: 'Curated collection of contemporary artworks', status: 'Open', score: 0.88 },
    { id: '3', title: 'Antique Victorian Writing Desk', type: 'item', description: 'Mahogany desk circa 1870 with original hardware', price: '$3,200', status: 'Active', score: 0.82 },
    { id: '4', title: 'Fine Wine & Spirits Auction', type: 'sale', description: 'Premium wines and rare spirits collection', status: 'Published', score: 0.79 },
    { id: '5', title: '1967 Ferrari 275 GTB/4', type: 'item', description: 'Matching numbers, full documentation', price: '$2.8M', status: 'Active', score: 0.75 },
  ];

  // Mock facets
  const facets: Facet[] = [
    {
      name: 'Category',
      values: [
        { value: 'Watches', count: 245, selected: false },
        { value: 'Art', count: 189, selected: false },
        { value: 'Furniture', count: 156, selected: false },
        { value: 'Vehicles', count: 78, selected: false },
        { value: 'Wine', count: 92, selected: false },
      ],
    },
    {
      name: 'Price Range',
      values: [
        { value: 'Under $1,000', count: 412, selected: false },
        { value: '$1,000 - $10,000', count: 287, selected: false },
        { value: '$10,000 - $100,000', count: 145, selected: false },
        { value: 'Over $100,000', count: 56, selected: false },
      ],
    },
    {
      name: 'Status',
      values: [
        { value: 'Active', count: 534, selected: false },
        { value: 'Sold', count: 312, selected: false },
        { value: 'Passed', count: 54, selected: false },
      ],
    },
  ];

  const [selectedFacets, setSelectedFacets] = useState<Record<string, string[]>>({});

  const toggleFacet = (facetName: string, value: string) => {
    setSelectedFacets((prev) => {
      const current = prev[facetName] || [];
      if (current.includes(value)) {
        return { ...prev, [facetName]: current.filter((v) => v !== value) };
      }
      return { ...prev, [facetName]: [...current, value] };
    });
  };

  const clearFacets = () => {
    setSelectedFacets({});
  };

  const totalSelectedFacets = Object.values(selectedFacets).flat().length;

  const exampleQuery = `query SearchItems($query: String!, $filters: SearchFilters) {
  search(query: $query, type: ITEMS, filters: $filters) {
    edges {
      node {
        ... on SearchResultItem {
          item {
            id
            title
            currentBid
            status
          }
          score
          highlights
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    facets {
      name
      values {
        value
        count
      }
    }
    stats {
      totalCount
      minPrice
      maxPrice
    }
  }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Search Playground
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Test and explore the Client API faceted search capabilities
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Search Types"
          value={clientTypeCounts.bySection['search'] || 10}
          change="GraphQL types"
          changeType="neutral"
          icon={<Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Avg Latency"
          value="32ms"
          change="P95: 78ms"
          changeType="neutral"
          icon={<BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Queries Today"
          value="12.8K"
          change="+15% from yesterday"
          changeType="increase"
          icon={<RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Index Size"
          value="2.4M"
          change="Documents"
          changeType="neutral"
          icon={<Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Facets Sidebar */}
        {showFilters && (
          <Card className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Facets
              </h2>
              {totalSelectedFacets > 0 && (
                <button
                  onClick={clearFacets}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear all ({totalSelectedFacets})
                </button>
              )}
            </div>

            <div className="space-y-6">
              {facets.map((facet) => (
                <div key={facet.name}>
                  <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    {facet.name}
                  </h3>
                  <div className="space-y-2">
                    {facet.values.map((option) => {
                      const isSelected = selectedFacets[facet.name]?.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          onClick={() => toggleFacet(facet.name, option.value)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          <span>{option.value}</span>
                          <span className={`text-xs ${isSelected ? 'text-blue-600' : 'text-zinc-400'}`}>
                            {option.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Facet Stats */}
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Price Statistics
              </h3>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Min Price</span>
                  <span className="font-medium text-zinc-900 dark:text-white">$25</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Price</span>
                  <span className="font-medium text-zinc-900 dark:text-white">$2.8M</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Price</span>
                  <span className="font-medium text-zinc-900 dark:text-white">$12,450</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Search & Results */}
        <Card className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search items and sales..."
                  className="w-full pl-10 pr-4 py-3 text-base bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'all' | 'items' | 'sales')}
                className="px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
              >
                <option value="all">All</option>
                <option value="items">Items</option>
                <option value="sales">Sales</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-lg border transition-colors ${
                  showFilters
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsLoading(true)}
                className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Play className="h-4 w-4" />
                Search
              </button>
            </div>

            {/* Active Filters */}
            {totalSelectedFacets > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-zinc-500">Active filters:</span>
                {Object.entries(selectedFacets).map(([facetName, values]) =>
                  values.map((value) => (
                    <span
                      key={`${facetName}-${value}`}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm rounded-lg"
                    >
                      {value}
                      <button
                        onClick={() => toggleFacet(facetName, value)}
                        className="hover:text-blue-900 dark:hover:text-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Results <span className="text-zinc-400">({mockResults.length})</span>
              </h3>
              <div className="text-xs text-zinc-500">Sorted by relevance</div>
            </div>

            <div className="space-y-4">
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        result.type === 'item'
                          ? 'bg-blue-100 dark:bg-blue-900/30'
                          : 'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {result.type === 'item' ? (
                          <Package className={`h-5 w-5 text-blue-600 dark:text-blue-400`} />
                        ) : (
                          <Gavel className={`h-5 w-5 text-purple-600 dark:text-purple-400`} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-white">
                          {result.title}
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          {result.price && (
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {result.price}
                            </span>
                          )}
                          <Badge
                            label={result.status}
                            variant={result.status === 'Active' || result.status === 'Open' ? 'success' : 'default'}
                            size="sm"
                          />
                          <span className="text-xs text-zinc-400">
                            Score: {(result.score * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      label={result.type === 'item' ? 'Item' : 'Sale'}
                      variant={result.type === 'item' ? 'info' : 'primary'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Example Query */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Example GraphQL Query
          </h2>
          <button
            onClick={() => copyToClipboard(exampleQuery)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
        </div>
        <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm text-zinc-300 font-mono">{exampleQuery}</code>
        </pre>
      </Card>
    </div>
  );
}
