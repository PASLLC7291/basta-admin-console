'use client';

import { useState, useMemo } from 'react';
import { TypeSearch, CategorySection, TypeDetailModal } from '@/components/admin/glossary';
import { bastaSections, searchTypes, type BastaType, type TypeCategory } from '@/lib/basta-types';

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilters, setCategoryFilters] = useState<TypeCategory[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<BastaType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter sections based on search and category filters
  const filteredSections = useMemo(() => {
    if (!searchQuery && categoryFilters.length === 0) {
      return bastaSections;
    }

    return bastaSections.map((section) => {
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
          categoryFilters.includes(type.category)
        );
      }

      return { ...section, types: filteredTypes };
    }).filter((section) => section.types.length > 0);
  }, [searchQuery, categoryFilters]);

  // Calculate total results
  const totalResults = useMemo(() => {
    return filteredSections.reduce((acc, section) => acc + section.types.length, 0);
  }, [filteredSections]);

  const handleTypeClick = (type: BastaType) => {
    setSelectedType(type);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          API Type Glossary
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Complete reference of all BASTA Management API types, inputs, and enums
        </p>
      </div>

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
              section={section}
              onTypeClick={handleTypeClick}
              defaultExpanded={filteredSections.length <= 3}
              viewMode={viewMode}
            />
          ))
        )}
      </div>

      {/* Type Detail Modal */}
      <TypeDetailModal
        type={selectedType}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedType(null);
        }}
      />
    </div>
  );
}
