'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gavel, Plus, MoreHorizontal, Calendar, Users, Package, Eye, Edit, Trash2, Play, Pause } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { ConfirmDialog } from '@/components/admin/shared/confirm-dialog';
import { getTypesBySection } from '@/lib/basta-types';

// Mock data
const mockSales = [
  {
    id: '1',
    title: 'Fine Art Auction - Spring Collection',
    status: 'open',
    type: 'TIMED',
    items: 45,
    bids: 234,
    openDate: '2024-03-15',
    closeDate: '2024-03-22'
  },
  {
    id: '2',
    title: 'Estate Jewelry Sale',
    status: 'published',
    type: 'LIVE',
    items: 120,
    bids: 0,
    openDate: '2024-03-25',
    closeDate: '2024-03-25'
  },
  {
    id: '3',
    title: 'Vintage Automobiles',
    status: 'draft',
    type: 'HYBRID',
    items: 15,
    bids: 0,
    openDate: '',
    closeDate: ''
  },
  {
    id: '4',
    title: 'Modern Furniture Collection',
    status: 'closing',
    type: 'TIMED',
    items: 78,
    bids: 567,
    openDate: '2024-03-10',
    closeDate: '2024-03-17'
  },
  {
    id: '5',
    title: 'Wine & Spirits Auction',
    status: 'closed',
    type: 'TIMED',
    items: 200,
    bids: 1234,
    openDate: '2024-03-01',
    closeDate: '2024-03-08'
  },
];

const statusMap: Record<string, 'active' | 'pending' | 'inactive' | 'warning'> = {
  open: 'active',
  published: 'pending',
  draft: 'inactive',
  closing: 'warning',
  closed: 'inactive',
};

export default function SalesPage() {
  const [sales] = useState(mockSales);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<string | null>(null);
  const saleTypes = getTypesBySection('sales');

  const handleDelete = (saleId: string) => {
    setSelectedSale(saleId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting sale:', selectedSale);
    setDeleteDialogOpen(false);
    setSelectedSale(null);
  };

  const columns = [
    {
      key: 'title',
      header: 'Sale',
      sortable: true,
      render: (sale: typeof mockSales[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Gavel className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <Link href={`/admin/sales/${sale.id}`} className="font-medium text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              {sale.title}
            </Link>
            <p className="text-xs text-zinc-500">{sale.type} Auction</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (sale: typeof mockSales[0]) => (
        <StatusIndicator
          status={statusMap[sale.status]}
          label={sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
        />
      ),
    },
    {
      key: 'items',
      header: 'Items',
      sortable: true,
      render: (sale: typeof mockSales[0]) => (
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{sale.items}</span>
      ),
    },
    {
      key: 'bids',
      header: 'Bids',
      sortable: true,
      render: (sale: typeof mockSales[0]) => (
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{sale.bids}</span>
      ),
    },
    {
      key: 'closeDate',
      header: 'Close Date',
      sortable: true,
      render: (sale: typeof mockSales[0]) => (
        <span className="text-zinc-600 dark:text-zinc-400">
          {sale.closeDate || 'Not set'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Sales</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage auctions and sales events
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton
            label="Create Sale"
            icon={Plus}
            onClick={() => console.log('Create sale')}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Sales"
          value={sales.length}
          icon={<Gavel className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
        <StatCard
          label="Active Auctions"
          value={sales.filter(s => s.status === 'open').length}
          change="2 opening tomorrow"
          changeType="neutral"
          icon={<Play className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Total Items"
          value={sales.reduce((acc, s) => acc + s.items, 0)}
          icon={<Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Total Bids"
          value={sales.reduce((acc, s) => acc + s.bids, 0).toLocaleString()}
          change="+12% this week"
          changeType="increase"
          icon={<Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'draft', 'published', 'open', 'closing', 'closed'].map((status) => (
          <button
            key={status}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Sales Table */}
      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Sales</h2>
        </div>
        <div className="p-4">
          <DataTable
            data={sales}
            columns={columns}
            keyField="id"
            onRowClick={(sale) => console.log('View sale', sale.id)}
            actions={(sale) => (
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/sales/${sale.id}`}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
                  title="View"
                >
                  <Eye className="h-4 w-4 text-zinc-500" />
                </Link>
                <button
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
                  title="Edit"
                >
                  <Edit className="h-4 w-4 text-zinc-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(sale.id);
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
          Related API Types ({saleTypes.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {saleTypes.slice(0, 15).map((type) => (
            <Badge key={type.name} label={type.name} variant="secondary" />
          ))}
          {saleTypes.length > 15 && (
            <Badge label={`+${saleTypes.length - 15} more`} variant="default" />
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Sale"
        description="Are you sure you want to delete this sale? All associated items, bids, and registrations will be permanently removed. This action cannot be undone."
        confirmLabel="Delete Sale"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  );
}
