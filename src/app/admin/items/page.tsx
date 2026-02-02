'use client';

import { useState } from 'react';
import { Package, Plus, Image, Tag, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { ConfirmDialog } from '@/components/admin/shared/confirm-dialog';
import { getTypesBySection } from '@/lib/basta-types';

const mockItems = [
  {
    id: '1',
    title: 'Impressionist Oil Painting - Monet Style',
    lotNumber: '101',
    status: 'active',
    currentBid: 15000,
    reserve: 12000,
    images: 5,
    sale: 'Fine Art Auction'
  },
  {
    id: '2',
    title: 'Antique Diamond Necklace',
    lotNumber: '201',
    status: 'active',
    currentBid: 8500,
    reserve: 10000,
    images: 8,
    sale: 'Estate Jewelry Sale'
  },
  {
    id: '3',
    title: '1967 Ford Mustang Shelby GT500',
    lotNumber: '301',
    status: 'draft',
    currentBid: 0,
    reserve: 150000,
    images: 24,
    sale: 'Vintage Automobiles'
  },
  {
    id: '4',
    title: 'Mid-Century Modern Desk',
    lotNumber: '401',
    status: 'sold',
    currentBid: 4200,
    reserve: 3000,
    images: 6,
    sale: 'Modern Furniture'
  },
];

const statusMap: Record<string, 'active' | 'pending' | 'inactive'> = {
  active: 'active',
  draft: 'inactive',
  sold: 'pending',
  unsold: 'inactive',
  withdrawn: 'inactive',
};

export default function ItemsPage() {
  const [items] = useState(mockItems);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const itemTypes = getTypesBySection('items');

  const handleDelete = (itemId: string) => {
    setSelectedItem(itemId);
    setDeleteDialogOpen(true);
  };

  const columns = [
    {
      key: 'title',
      header: 'Item',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
            <Package className="h-6 w-6 text-zinc-400" />
          </div>
          <div>
            <p className="font-medium text-zinc-900 dark:text-white line-clamp-1">{item.title}</p>
            <p className="text-xs text-zinc-500">Lot #{item.lotNumber} - {item.sale}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <StatusIndicator
          status={statusMap[item.status]}
          label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        />
      ),
    },
    {
      key: 'currentBid',
      header: 'Current Bid',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          {item.currentBid > 0 ? `$${item.currentBid.toLocaleString()}` : '-'}
        </span>
      ),
    },
    {
      key: 'reserve',
      header: 'Reserve',
      sortable: true,
      render: (item: typeof mockItems[0]) => {
        const reserveMet = item.currentBid >= item.reserve;
        return (
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 dark:text-zinc-400">
              ${item.reserve.toLocaleString()}
            </span>
            {item.currentBid > 0 && (
              <Badge
                label={reserveMet ? 'Met' : 'Not Met'}
                variant={reserveMet ? 'success' : 'warning'}
                size="sm"
              />
            )}
          </div>
        );
      },
    },
    {
      key: 'images',
      header: 'Images',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
          <Image className="h-4 w-4" />
          <span>{item.images}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Items</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage inventory and lot items
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton
            label="Import Items"
            icon={Package}
            variant="secondary"
            onClick={() => console.log('Import items')}
          />
          <ActionButton
            label="Create Item"
            icon={Plus}
            onClick={() => console.log('Create item')}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Items"
          value={items.length}
          icon={<Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Active Lots"
          value={items.filter(i => i.status === 'active').length}
          change="32 with bids"
          changeType="neutral"
        />
        <StatCard
          label="Total Value"
          value="$177K"
          change="Current bid total"
          changeType="neutral"
        />
        <StatCard
          label="Reserves Met"
          value="2/4"
          change="50% of active"
          changeType="neutral"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'active', 'draft', 'sold', 'unsold', 'withdrawn'].map((status) => (
          <button
            key={status}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Items Table */}
      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Items</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
        <div className="p-4">
          <DataTable
            data={items}
            columns={columns}
            keyField="id"
            onRowClick={(item) => console.log('View item', item.id)}
            actions={(item) => (
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg" title="View">
                  <Eye className="h-4 w-4 text-zinc-500" />
                </button>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg" title="Edit">
                  <Edit className="h-4 w-4 text-zinc-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            )}
          />
        </div>
      </Card>

      {/* Related API Types */}
      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Related API Types ({itemTypes.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {itemTypes.slice(0, 15).map((type) => (
            <Badge key={type.name} label={type.name} variant="secondary" />
          ))}
          {itemTypes.length > 15 && (
            <Badge label={`+${itemTypes.length - 15} more`} variant="default" />
          )}
        </div>
      </Card>

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Item"
        description="Are you sure you want to delete this item? All associated bids and images will be permanently removed."
        confirmLabel="Delete Item"
        variant="danger"
        onConfirm={() => {
          console.log('Deleting item:', selectedItem);
          setDeleteDialogOpen(false);
        }}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
}
