'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { ActionButton } from '@/components/admin/shared/action-button';
import { ConfirmDialog } from '@/components/admin/shared/confirm-dialog';
import { getTypesBySection } from '@/lib/basta-types';

const mockBids = [
  { id: '1', item: 'Impressionist Oil Painting', amount: 15000, bidder: 'user_123', type: 'MAX', status: 'winning', timestamp: '2024-03-17 14:32:15', origin: 'ONLINE' },
  { id: '2', item: 'Antique Diamond Necklace', amount: 8500, bidder: 'user_456', type: 'REGULAR', status: 'winning', timestamp: '2024-03-17 14:28:00', origin: 'PADDLE' },
  { id: '3', item: 'Impressionist Oil Painting', amount: 14500, bidder: 'user_789', type: 'REGULAR', status: 'outbid', timestamp: '2024-03-17 14:25:30', origin: 'ONLINE' },
  { id: '4', item: 'Mid-Century Modern Desk', amount: 4200, bidder: 'user_012', type: 'ABSENTEE', status: 'winning', timestamp: '2024-03-17 12:00:00', origin: 'PHONE' },
  { id: '5', item: 'Antique Diamond Necklace', amount: 8000, bidder: 'user_345', type: 'REGULAR', status: 'cancelled', timestamp: '2024-03-17 13:45:00', origin: 'ONLINE' },
];

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  winning: 'success',
  outbid: 'warning',
  cancelled: 'danger',
  active: 'default',
};

export default function BidsPage() {
  const [bids] = useState(mockBids);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<string | null>(null);
  const bidTypes = getTypesBySection('bids');

  const totalValue = bids.filter(b => b.status === 'winning').reduce((acc, b) => acc + b.amount, 0);

  const columns = [
    {
      key: 'item',
      header: 'Item',
      sortable: true,
      render: (bid: typeof mockBids[0]) => (
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">{bid.item}</p>
          <p className="text-xs text-zinc-500">Bid #{bid.id}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: (bid: typeof mockBids[0]) => (
        <span className="font-semibold text-zinc-900 dark:text-white">
          ${bid.amount.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'bidder',
      header: 'Bidder',
      sortable: true,
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      render: (bid: typeof mockBids[0]) => (
        <Badge label={bid.type} variant="secondary" size="sm" />
      ),
    },
    {
      key: 'origin',
      header: 'Origin',
      sortable: true,
      render: (bid: typeof mockBids[0]) => (
        <Badge label={bid.origin} variant="default" size="sm" />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (bid: typeof mockBids[0]) => (
        <Badge
          label={bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
          variant={statusColors[bid.status] || 'default'}
          size="sm"
        />
      ),
    },
    {
      key: 'timestamp',
      header: 'Time',
      sortable: true,
      render: (bid: typeof mockBids[0]) => (
        <span className="text-sm text-zinc-500">{bid.timestamp}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Bids</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monitor and manage bidding activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton
            label="Place Bid on Behalf"
            icon={TrendingUp}
            onClick={() => console.log('Place bid')}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Bids"
          value={bids.length}
          icon={<TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Winning Value"
          value={`$${totalValue.toLocaleString()}`}
          change="+$2,500 last hour"
          changeType="increase"
          icon={<DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Unique Bidders"
          value="4"
          icon={<Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Avg Response Time"
          value="1.2s"
          change="Below target"
          changeType="increase"
          icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Bid Origin Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Online Bids</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {bids.filter(b => b.origin === 'ONLINE').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Paddle Bids</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {bids.filter(b => b.origin === 'PADDLE').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Phone/Absentee</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {bids.filter(b => ['PHONE', 'ABSENTEE'].includes(b.origin)).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bids Table */}
      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Recent Bids</h2>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>
        <div className="p-4">
          <DataTable
            data={bids}
            columns={columns}
            keyField="id"
            actions={(bid) => (
              <div className="flex items-center gap-1">
                {bid.status === 'winning' && (
                  <ActionButton
                    label="Cancel"
                    variant="danger"
                    size="sm"
                    icon={XCircle}
                    requireConfirmation
                    confirmTitle="Cancel Bid"
                    confirmDescription="Are you sure you want to cancel this winning bid? The next highest bid will become the winner."
                    onClick={() => console.log('Cancel bid', bid.id)}
                  />
                )}
              </div>
            )}
          />
        </div>
      </Card>

      {/* Related API Types */}
      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Related API Types ({bidTypes.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {bidTypes.slice(0, 15).map((type) => (
            <Badge key={type.name} label={type.name} variant="secondary" />
          ))}
          {bidTypes.length > 15 && (
            <Badge label={`+${bidTypes.length - 15} more`} variant="default" />
          )}
        </div>
      </Card>
    </div>
  );
}
