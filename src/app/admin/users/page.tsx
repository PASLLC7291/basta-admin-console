'use client';

import { useState } from 'react';
import { Users, Plus, Mail, Shield, UserCheck, UserX, MoreHorizontal } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { getTypesBySection } from '@/lib/basta-types';

const mockUsers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', status: 'active', role: 'Bidder', bids: 45, registrations: 3, lastActive: '2024-03-17' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', role: 'VIP', bids: 120, registrations: 8, lastActive: '2024-03-17' },
  { id: '3', name: 'Mike Wilson', email: 'mike@example.com', status: 'pending', role: 'Bidder', bids: 0, registrations: 1, lastActive: '2024-03-15' },
  { id: '4', name: 'Emily Brown', email: 'emily@example.com', status: 'active', role: 'Admin', bids: 12, registrations: 2, lastActive: '2024-03-16' },
  { id: '5', name: 'David Lee', email: 'david@example.com', status: 'inactive', role: 'Bidder', bids: 67, registrations: 5, lastActive: '2024-02-20' },
];

const roleColors: Record<string, 'primary' | 'success' | 'warning' | 'default' | 'danger'> = {
  Admin: 'danger',
  VIP: 'success',
  Bidder: 'default',
  Dealer: 'warning',
};

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const userTypes = getTypesBySection('users');

  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-medium text-zinc-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-zinc-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user: typeof mockUsers[0]) => (
        <StatusIndicator status={user.status as 'active' | 'pending' | 'inactive'} />
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user: typeof mockUsers[0]) => (
        <Badge label={user.role} variant={roleColors[user.role] || 'default'} />
      ),
    },
    {
      key: 'bids',
      header: 'Total Bids',
      sortable: true,
      render: (user: typeof mockUsers[0]) => (
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{user.bids}</span>
      ),
    },
    {
      key: 'registrations',
      header: 'Registrations',
      sortable: true,
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      sortable: true,
      render: (user: typeof mockUsers[0]) => (
        <span className="text-zinc-500 dark:text-zinc-400">{user.lastActive}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Users</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage users and bidder accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton
            label="Invite User"
            icon={Mail}
            variant="secondary"
            onClick={() => console.log('Invite user')}
          />
          <ActionButton
            label="Create User"
            icon={Plus}
            onClick={() => console.log('Create user')}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={users.length}
          icon={<Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Active Users"
          value={users.filter(u => u.status === 'active').length}
          change="3 new this week"
          changeType="increase"
          icon={<UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Pending Approval"
          value={users.filter(u => u.status === 'pending').length}
          icon={<Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
        <StatCard
          label="Inactive"
          value={users.filter(u => u.status === 'inactive').length}
          icon={<UserX className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'active', 'pending', 'inactive'].map((status) => (
          <button
            key={status}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
        <div className="border-l border-zinc-200 dark:border-zinc-700 mx-2" />
        {['All Roles', 'Admin', 'VIP', 'Bidder', 'Dealer'].map((role) => (
          <button
            key={role}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-blue-500 transition-colors"
          >
            {role}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Users</h2>
        </div>
        <div className="p-4">
          <DataTable
            data={users}
            columns={columns}
            keyField="id"
            onRowClick={(user) => console.log('View user', user.id)}
            actions={(user) => (
              <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg">
                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
              </button>
            )}
          />
        </div>
      </Card>

      {/* Related API Types */}
      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Related API Types ({userTypes.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {userTypes.slice(0, 15).map((type) => (
            <Badge key={type.name} label={type.name} variant="secondary" />
          ))}
          {userTypes.length > 15 && (
            <Badge label={`+${userTypes.length - 15} more`} variant="default" />
          )}
        </div>
      </Card>
    </div>
  );
}
