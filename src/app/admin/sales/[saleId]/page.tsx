'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2, Play, Pause, Eye, Package, Users, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { DataTable } from '@/components/admin/shared/data-table';

// Mock data
const getMockSale = (id: string) => ({
  id,
  title: 'Fine Art Auction - Spring Collection',
  description: 'A curated selection of impressionist and modern art from private collections.',
  status: 'open',
  type: 'TIMED',
  dates: {
    openDate: '2024-03-15T10:00:00Z',
    closeDate: '2024-03-22T18:00:00Z',
    publishDate: '2024-03-10T00:00:00Z',
  },
  settings: {
    closingMethod: 'SOFT_CLOSE',
    extensionTime: 120,
    buyerPremium: 25,
  },
  stats: {
    totalItems: 45,
    itemsWithBids: 32,
    totalBids: 234,
    uniqueBidders: 78,
    totalValue: 187500,
    highestBid: 15000,
  },
});

const mockItems = [
  { id: '1', lotNumber: '101', title: 'Impressionist Oil Painting', currentBid: 15000, bids: 23, status: 'active' },
  { id: '2', lotNumber: '102', title: 'Bronze Sculpture', currentBid: 8500, bids: 12, status: 'active' },
  { id: '3', lotNumber: '103', title: 'Watercolor Landscape', currentBid: 3200, bids: 8, status: 'active' },
  { id: '4', lotNumber: '104', title: 'Abstract Print', currentBid: 1500, bids: 5, status: 'reserve_not_met' },
];

interface PageProps {
  params: Promise<{ saleId: string }>;
}

export default function SaleDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const sale = getMockSale(resolvedParams.saleId);

  const statusMap: Record<string, 'active' | 'pending' | 'inactive' | 'warning'> = {
    open: 'active',
    published: 'pending',
    draft: 'inactive',
    closing: 'warning',
    closed: 'inactive',
  };

  const itemColumns = [
    {
      key: 'lotNumber',
      header: 'Lot #',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <span className="font-mono font-medium text-zinc-900 dark:text-white">{item.lotNumber}</span>
      ),
    },
    {
      key: 'title',
      header: 'Item',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <span className="text-zinc-900 dark:text-white">{item.title}</span>
      ),
    },
    {
      key: 'currentBid',
      header: 'Current Bid',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <span className="font-semibold text-zinc-900 dark:text-white">
          ${item.currentBid.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'bids',
      header: 'Bids',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item: typeof mockItems[0]) => (
        <Badge
          label={item.status === 'reserve_not_met' ? 'Reserve Not Met' : 'Active'}
          variant={item.status === 'active' ? 'success' : 'warning'}
          size="sm"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/sales"
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-zinc-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {sale.title}
              </h1>
              <StatusIndicator
                status={statusMap[sale.status]}
                label={sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
              />
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Sale ID: {sale.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {sale.status === 'open' ? (
            <ActionButton
              label="Pause Sale"
              icon={Pause}
              variant="secondary"
              requireConfirmation
              confirmTitle="Pause Sale"
              confirmDescription="This will temporarily stop all bidding activity. Are you sure?"
              onClick={() => console.log('Pause sale')}
            />
          ) : (
            <ActionButton
              label="Resume Sale"
              icon={Play}
              variant="primary"
              onClick={() => console.log('Resume sale')}
            />
          )}
          <ActionButton
            label="Edit"
            icon={Edit}
            variant="secondary"
            onClick={() => console.log('Edit sale')}
          />
          <ActionButton
            label="Delete"
            icon={Trash2}
            variant="danger"
            requireConfirmation
            confirmTitle="Delete Sale"
            confirmDescription="This will permanently delete this sale and all associated data. This action cannot be undone."
            onClick={() => console.log('Delete sale')}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard
          label="Total Items"
          value={sale.stats.totalItems}
          icon={<Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Items with Bids"
          value={sale.stats.itemsWithBids}
          change={`${Math.round((sale.stats.itemsWithBids / sale.stats.totalItems) * 100)}%`}
          changeType="neutral"
        />
        <StatCard
          label="Total Bids"
          value={sale.stats.totalBids}
          icon={<TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Unique Bidders"
          value={sale.stats.uniqueBidders}
          icon={<Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Total Value"
          value={`$${sale.stats.totalValue.toLocaleString()}`}
        />
        <StatCard
          label="Highest Bid"
          value={`$${sale.stats.highestBid.toLocaleString()}`}
        />
      </div>

      {/* Sale Details & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Description */}
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Description
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {sale.description}
          </p>
        </Card>

        {/* Sale Settings */}
        <Card>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Settings
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-500">Type</span>
              <Badge label={sale.type} variant="primary" />
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Closing Method</span>
              <span className="text-zinc-900 dark:text-white">{sale.settings.closingMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Extension Time</span>
              <span className="text-zinc-900 dark:text-white">{sale.settings.extensionTime}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Buyer Premium</span>
              <span className="text-zinc-900 dark:text-white">{sale.settings.buyerPremium}%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Dates */}
      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
              <Calendar className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Published</p>
              <p className="font-medium text-zinc-900 dark:text-white">
                {new Date(sale.dates.publishDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Play className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Opens</p>
              <p className="font-medium text-zinc-900 dark:text-white">
                {new Date(sale.dates.openDate).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Closes</p>
              <p className="font-medium text-zinc-900 dark:text-white">
                {new Date(sale.dates.closeDate).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Items Table */}
      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Items ({sale.stats.totalItems})
          </h2>
          <ActionButton
            label="Add Item"
            icon={Package}
            size="sm"
            onClick={() => console.log('Add item')}
          />
        </div>
        <div className="p-4">
          <DataTable
            data={mockItems}
            columns={itemColumns}
            keyField="id"
            onRowClick={(item) => console.log('View item', item.id)}
            actions={(item) => (
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg">
                <Eye className="h-4 w-4 text-zinc-500" />
              </button>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
