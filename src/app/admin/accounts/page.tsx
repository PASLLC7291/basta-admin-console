'use client';

import { useState } from 'react';
import { Building2, Plus, MoreHorizontal, Search, CreditCard, Settings, ExternalLink } from 'lucide-react';
import { Card } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { getTypesBySection } from '@/lib/basta-types';

// Mock data
const mockAccounts = [
  { id: '1', name: 'Acme Auctions', email: 'admin@acme.com', status: 'active', plan: 'Enterprise', createdAt: '2024-01-15' },
  { id: '2', name: 'Heritage House', email: 'info@heritage.com', status: 'active', plan: 'Professional', createdAt: '2024-02-20' },
  { id: '3', name: 'Quick Bid Co', email: 'support@quickbid.io', status: 'pending', plan: 'Starter', createdAt: '2024-03-01' },
];

export default function AccountsPage() {
  const [accounts] = useState(mockAccounts);
  const accountTypes = getTypesBySection('accounts');

  const columns = [
    {
      key: 'name',
      header: 'Account',
      sortable: true,
      render: (account: typeof mockAccounts[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-zinc-900 dark:text-white">{account.name}</p>
            <p className="text-xs text-zinc-500">{account.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (account: typeof mockAccounts[0]) => (
        <StatusIndicator status={account.status as 'active' | 'pending'} />
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      sortable: true,
      render: (account: typeof mockAccounts[0]) => (
        <Badge label={account.plan} variant="primary" />
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Accounts</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage organization accounts and billing
          </p>
        </div>
        <ActionButton
          label="Create Account"
          icon={Plus}
          onClick={() => console.log('Create account')}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{accounts.length}</p>
              <p className="text-sm text-zinc-500">Total Accounts</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">2</p>
              <p className="text-sm text-zinc-500">Payment Enabled</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{accountTypes.length}</p>
              <p className="text-sm text-zinc-500">API Types</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <ExternalLink className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">1</p>
              <p className="text-sm text-zinc-500">Shopify Connected</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Accounts Table */}
      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Accounts</h2>
        </div>
        <div className="p-4">
          <DataTable
            data={accounts}
            columns={columns}
            keyField="id"
            onRowClick={(account) => console.log('View account', account.id)}
            actions={(account) => (
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg">
                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
              </button>
            )}
          />
        </div>
      </Card>

      {/* Related API Types */}
      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types</h2>
        <div className="flex flex-wrap gap-2">
          {accountTypes.slice(0, 10).map((type) => (
            <Badge key={type.name} label={type.name} variant="secondary" />
          ))}
          {accountTypes.length > 10 && (
            <Badge label={`+${accountTypes.length - 10} more`} variant="default" />
          )}
        </div>
      </Card>
    </div>
  );
}
