'use client';

import { useState } from 'react';
import { Image, Upload, Trash2, Grid, List, FolderOpen } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { Badge } from '@/components/admin/shared/badge';
import { getTypesBySection } from '@/lib/basta-types';

const mockImages = [
  { id: '1', name: 'painting-001.jpg', size: '2.4 MB', type: 'JPEG', dimensions: '3000x2000', item: 'Impressionist Oil Painting', uploadedAt: '2024-03-17' },
  { id: '2', name: 'necklace-main.png', size: '1.8 MB', type: 'PNG', dimensions: '2400x2400', item: 'Antique Diamond Necklace', uploadedAt: '2024-03-16' },
  { id: '3', name: 'mustang-front.jpg', size: '4.2 MB', type: 'JPEG', dimensions: '4000x3000', item: '1967 Ford Mustang', uploadedAt: '2024-03-15' },
  { id: '4', name: 'desk-angle.webp', size: '890 KB', type: 'WEBP', dimensions: '1920x1080', item: 'Mid-Century Modern Desk', uploadedAt: '2024-03-14' },
];

export default function MediaPage() {
  const [images] = useState(mockImages);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const mediaTypes = getTypesBySection('media');

  const totalSize = '9.3 MB';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Media</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage images and file uploads</p>
        </div>
        <ActionButton label="Upload Images" icon={Upload} onClick={() => console.log('Upload')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Images" value={images.length} icon={<Image className="h-6 w-6 text-blue-600 dark:text-blue-400" />} />
        <StatCard label="Storage Used" value={totalSize} icon={<FolderOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />} />
        <StatCard label="JPEG" value={images.filter(i => i.type === 'JPEG').length} />
        <StatCard label="PNG/WEBP" value={images.filter(i => ['PNG', 'WEBP'].includes(i.type)).length} />
      </div>

      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Images</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-zinc-100 dark:bg-zinc-700' : ''}`}>
              <Grid className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-zinc-100 dark:bg-zinc-700' : ''}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative aspect-square bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image className="h-12 w-12 text-zinc-400" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">{image.name}</p>
                    <p className="text-xs text-zinc-300">{image.size}</p>
                  </div>
                  <button className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {images.map((image) => (
                <div key={image.id} className="flex items-center gap-4 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                  <div className="h-12 w-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                    <Image className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white truncate">{image.name}</p>
                    <p className="text-xs text-zinc-500">{image.item}</p>
                  </div>
                  <Badge label={image.type} variant="secondary" size="sm" />
                  <span className="text-sm text-zinc-500">{image.size}</span>
                  <span className="text-sm text-zinc-500">{image.dimensions}</span>
                  <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types ({mediaTypes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {mediaTypes.map((type) => <Badge key={type.name} label={type.name} variant="secondary" />)}
        </div>
      </Card>
    </div>
  );
}
