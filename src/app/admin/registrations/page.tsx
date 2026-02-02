'use client';

import { useState } from 'react';
import { ClipboardList, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { getTypesBySection } from '@/lib/basta-types';

const mockRegistrations = [
  { id: '1', user: 'John Smith', sale: 'Fine Art Auction', status: 'approved', type: 'STANDARD', paddle: '101', date: '2024-03-15' },
  { id: '2', user: 'Sarah Johnson', sale: 'Estate Jewelry', status: 'approved', type: 'VIP', paddle: '001', date: '2024-03-14' },
  { id: '3', user: 'Mike Wilson', sale: 'Fine Art Auction', status: 'pending', type: 'STANDARD', paddle: '-', date: '2024-03-16' },
  { id: '4', user: 'Emily Brown', sale: 'Vintage Automobiles', status: 'rejected', type: 'DEALER', paddle: '-', date: '2024-03-13' },
];

const statusMap: Record<string, 'active' | 'pending' | 'inactive'> = {
  approved: 'active',
  pending: 'pending',
  rejected: 'inactive',
};

export default function RegistrationsPage() {
  const [registrations] = useState(mockRegistrations);
  const registrationTypes = getTypesBySection('registrations');

  const columns = [
    {
      key: 'user',
      header: 'User',
      sortable: true,
      render: (reg: typeof mockRegistrations[0]) => (
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">{reg.user}</p>
          <p className="text-xs text-zinc-500">Registration #{reg.id}</p>
        </div>
      ),
    },
    { key: 'sale', header: 'Sale', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (reg: typeof mockRegistrations[0]) => (
        <StatusIndicator status={statusMap[reg.status]} label={reg.status.charAt(0).toUpperCase() + reg.status.slice(1)} />
      ),
    },
    {
      key: 'type',
      header: 'Type',
      sortable: true,
      render: (reg: typeof mockRegistrations[0]) => (
        <Badge label={reg.type} variant="secondary" size="sm" />
      ),
    },
    { key: 'paddle', header: 'Paddle #', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Registrations</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage sale and item registrations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={registrations.length} icon={<ClipboardList className="h-6 w-6 text-blue-600 dark:text-blue-400" />} />
        <StatCard label="Approved" value={registrations.filter(r => r.status === 'approved').length} icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />} />
        <StatCard label="Pending" value={registrations.filter(r => r.status === 'pending').length} icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />} />
        <StatCard label="Rejected" value={registrations.filter(r => r.status === 'rejected').length} icon={<XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />} />
      </div>

      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Registrations</h2>
        </div>
        <div className="p-4">
          <DataTable
            data={registrations}
            columns={columns}
            keyField="id"
            actions={(reg) => reg.status === 'pending' && (
              <div className="flex items-center gap-2">
                <ActionButton label="Approve" variant="primary" size="sm" icon={CheckCircle} onClick={() => console.log('Approve', reg.id)} />
                <ActionButton label="Reject" variant="danger" size="sm" icon={XCircle} requireConfirmation confirmTitle="Reject Registration" confirmDescription="Are you sure you want to reject this registration?" onClick={() => console.log('Reject', reg.id)} />
              </div>
            )}
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types ({registrationTypes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {registrationTypes.map((type) => <Badge key={type.name} label={type.name} variant="secondary" />)}
        </div>
      </Card>
    </div>
  );
}
