'use client';

import { useState } from 'react';
import { Webhook, Plus, Key, Activity, CheckCircle, XCircle, Clock, Play, Pause, Trash2 } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { getTypesBySection } from '@/lib/basta-types';

const mockWebhooks = [
  { id: '1', name: 'Inventory Sync', url: 'https://api.example.com/webhooks/inventory', events: ['ITEM_CREATED', 'ITEM_UPDATED'], status: 'active', lastTriggered: '2024-03-17 14:32', successRate: '99.8%' },
  { id: '2', name: 'Bid Notifications', url: 'https://notify.example.com/bids', events: ['BID_PLACED', 'BID_OUTBID'], status: 'active', lastTriggered: '2024-03-17 14:28', successRate: '100%' },
  { id: '3', name: 'Sale Events', url: 'https://crm.example.com/sales', events: ['SALE_OPENED', 'SALE_CLOSED'], status: 'paused', lastTriggered: '2024-03-15 10:00', successRate: '95.2%' },
  { id: '4', name: 'Payment Processor', url: 'https://payments.example.com/hook', events: ['ORDER_PAID'], status: 'failed', lastTriggered: '2024-03-17 12:15', successRate: '78.5%' },
];

const mockApiKeys = [
  { id: '1', name: 'Production API', prefix: 'sk_live_****', role: 'ADMIN', created: '2024-01-15', lastUsed: '2024-03-17' },
  { id: '2', name: 'Integration Key', prefix: 'sk_live_****', role: 'WRITE', created: '2024-02-20', lastUsed: '2024-03-16' },
  { id: '3', name: 'Read-Only Access', prefix: 'sk_live_****', role: 'READ', created: '2024-03-01', lastUsed: '2024-03-10' },
];

const statusMap: Record<string, 'active' | 'pending' | 'inactive' | 'warning'> = {
  active: 'active',
  paused: 'warning',
  failed: 'inactive',
};

export default function WebhooksPage() {
  const [webhooks] = useState(mockWebhooks);
  const [apiKeys] = useState(mockApiKeys);
  const webhookTypes = getTypesBySection('webhooks');

  const webhookColumns = [
    {
      key: 'name',
      header: 'Webhook',
      sortable: true,
      render: (hook: typeof mockWebhooks[0]) => (
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">{hook.name}</p>
          <p className="text-xs text-zinc-500 truncate max-w-xs">{hook.url}</p>
        </div>
      ),
    },
    {
      key: 'events',
      header: 'Events',
      render: (hook: typeof mockWebhooks[0]) => (
        <div className="flex flex-wrap gap-1">
          {hook.events.slice(0, 2).map(e => <Badge key={e} label={e} variant="secondary" size="sm" />)}
          {hook.events.length > 2 && <Badge label={`+${hook.events.length - 2}`} variant="default" size="sm" />}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (hook: typeof mockWebhooks[0]) => <StatusIndicator status={statusMap[hook.status]} label={hook.status.charAt(0).toUpperCase() + hook.status.slice(1)} />,
    },
    { key: 'successRate', header: 'Success Rate', sortable: true },
    { key: 'lastTriggered', header: 'Last Triggered', sortable: true },
  ];

  const apiKeyColumns = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (key: typeof mockApiKeys[0]) => (
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-zinc-400" />
          <span className="font-medium text-zinc-900 dark:text-white">{key.name}</span>
        </div>
      ),
    },
    {
      key: 'prefix',
      header: 'Key',
      render: (key: typeof mockApiKeys[0]) => <code className="text-sm bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded">{key.prefix}</code>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (key: typeof mockApiKeys[0]) => <Badge label={key.role} variant={key.role === 'ADMIN' ? 'danger' : key.role === 'WRITE' ? 'warning' : 'default'} size="sm" />,
    },
    { key: 'created', header: 'Created', sortable: true },
    { key: 'lastUsed', header: 'Last Used', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Webhooks & API</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage webhooks and API keys</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Webhooks" value={webhooks.length} icon={<Webhook className="h-6 w-6 text-blue-600 dark:text-blue-400" />} />
        <StatCard label="API Keys" value={apiKeys.length} icon={<Key className="h-6 w-6 text-purple-600 dark:text-purple-400" />} />
        <StatCard label="Events Today" value="1,234" icon={<Activity className="h-6 w-6 text-green-600 dark:text-green-400" />} />
        <StatCard label="Failed Deliveries" value="3" change="Last 24h" changeType="neutral" icon={<XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />} />
      </div>

      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Webhook Subscriptions</h2>
          <ActionButton label="Add Webhook" icon={Plus} size="sm" onClick={() => console.log('Add webhook')} />
        </div>
        <div className="p-4">
          <DataTable
            data={webhooks}
            columns={webhookColumns}
            keyField="id"
            actions={(hook) => (
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg" title={hook.status === 'active' ? 'Pause' : 'Resume'}>
                  {hook.status === 'active' ? <Pause className="h-4 w-4 text-zinc-500" /> : <Play className="h-4 w-4 text-zinc-500" />}
                </button>
                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            )}
          />
        </div>
      </Card>

      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">API Keys</h2>
          <ActionButton label="Create Key" icon={Plus} size="sm" onClick={() => console.log('Create key')} />
        </div>
        <div className="p-4">
          <DataTable
            data={apiKeys}
            columns={apiKeyColumns}
            keyField="id"
            actions={(key) => (
              <ActionButton label="Revoke" variant="danger" size="sm" requireConfirmation confirmTitle="Revoke API Key" confirmDescription="This will immediately invalidate the key. Any applications using it will lose access." onClick={() => console.log('Revoke', key.id)} />
            )}
          />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types ({webhookTypes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {webhookTypes.slice(0, 15).map((type) => <Badge key={type.name} label={type.name} variant="secondary" />)}
          {webhookTypes.length > 15 && <Badge label={`+${webhookTypes.length - 15} more`} variant="default" />}
        </div>
      </Card>
    </div>
  );
}
