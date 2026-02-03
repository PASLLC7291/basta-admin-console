'use client';

import { useState, useMemo } from 'react';
import { TypeSearch, CategorySection, TypeDetailModal, ApiSelector } from '@/components/admin/glossary';
import {
  bastaSections,
  searchTypes,
  typeCounts,
  type BastaType,
  type TypeCategory,
  type ApiSource,
} from '@/lib/basta-types';
import {
  bastaClientSections,
  searchClientTypes,
  clientTypeCounts,
  type BastaClientType,
} from '@/lib/basta-client-types';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilters, setCategoryFilters] = useState<TypeCategory[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<BastaType | BastaClientType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApi, setSelectedApi] = useState<ApiSource>('management');

  // Get the appropriate sections based on selected API
  const currentSections = selectedApi === 'management' ? bastaSections : bastaClientSections;

  // Filter sections based on search and category filters
  const filteredSections = useMemo(() => {
    if (!searchQuery && categoryFilters.length === 0) {
      return currentSections;
    }

    return currentSections.map((section) => {
      let filteredTypes = section.types;

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTypes = filteredTypes.filter(
          (type) =>
            type.name.toLowerCase().includes(query) ||
            type.description.toLowerCase().includes(query)
        );
      }

      // Apply category filter
      if (categoryFilters.length > 0) {
        filteredTypes = filteredTypes.filter((type) =>
          categoryFilters.includes(type.category as TypeCategory)
        );
      }

      return { ...section, types: filteredTypes };
    }).filter((section) => section.types.length > 0);
  }, [searchQuery, categoryFilters, currentSections]);

  // Calculate total results
  const totalResults = useMemo(() => {
    return filteredSections.reduce((acc, section) => acc + section.types.length, 0);
  }, [filteredSections]);

  const handleTypeClick = (type: BastaType | BastaClientType) => {
    setSelectedType(type);
    setModalOpen(true);
  };

  const handleApiChange = (api: ApiSource) => {
    setSelectedApi(api);
    // Clear filters when switching APIs
    setSearchQuery('');
    setCategoryFilters([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          API Type Glossary
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Complete reference of BASTA API types, inputs, enums, and subscriptions
        </p>
      </div>

      {/* API Selector */}
      <ApiSelector
        selected={selectedApi}
        onSelect={handleApiChange}
        managementCount={typeCounts.total}
        clientCount={clientTypeCounts.total}
        subscriptionCount={clientTypeCounts.subscriptions}
      />

      {/* Search and Filters */}
      <TypeSearch
        onSearchChange={setSearchQuery}
        onCategoryFilter={setCategoryFilters}
        onViewModeChange={setViewMode}
        viewMode={viewMode}
        totalResults={totalResults}
      />

      {/* Category Sections */}
      <div className="space-y-4">
        {filteredSections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">
              No types found matching your criteria
            </p>
          </div>
        ) : (
          filteredSections.map((section) => (
            <CategorySection
              key={section.slug}
              section={section as any}
              onTypeClick={handleTypeClick}
              defaultExpanded={filteredSections.length <= 3}
              viewMode={viewMode}
            />
          ))
        )}
      </div>

      {/* Type Detail Modal */}
      <TypeDetailModal
        type={selectedType as BastaType}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedType(null);
        }}
      />
    </div>
  );
}
