'use client';

import { useState } from 'react';
import { ShoppingCart, DollarSign, CreditCard, FileText, Clock, CheckCircle } from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { DataTable } from '@/components/admin/shared/data-table';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { ActionButton } from '@/components/admin/shared/action-button';
import { getTypesBySection } from '@/lib/basta-types';

const mockOrders = [
  { id: 'ORD-001', user: 'John Smith', items: 3, total: 18500, status: 'paid', payment: 'card', date: '2024-03-17' },
  { id: 'ORD-002', user: 'Sarah Johnson', items: 1, total: 8500, status: 'pending', payment: 'bank', date: '2024-03-17' },
  { id: 'ORD-003', user: 'Mike Wilson', items: 5, total: 32000, status: 'shipped', payment: 'card', date: '2024-03-15' },
  { id: 'ORD-004', user: 'Emily Brown', items: 2, total: 4200, status: 'completed', payment: 'wire', date: '2024-03-14' },
];

const statusMap: Record<string, 'active' | 'pending' | 'inactive' | 'warning'> = {
  pending: 'pending',
  paid: 'active',
  shipped: 'warning',
  completed: 'active',
};

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const orderTypes = getTypesBySection('orders');
  const totalValue = orders.reduce((acc, o) => acc + o.total, 0);

  const columns = [
    {
      key: 'id',
      header: 'Order',
      sortable: true,
      render: (order: typeof mockOrders[0]) => (
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">{order.id}</p>
          <p className="text-xs text-zinc-500">{order.user}</p>
        </div>
      ),
    },
    { key: 'items', header: 'Items', sortable: true },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (order: typeof mockOrders[0]) => (
        <span className="font-semibold text-zinc-900 dark:text-white">${order.total.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (order: typeof mockOrders[0]) => (
        <StatusIndicator status={statusMap[order.status]} label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} />
      ),
    },
    {
      key: 'payment',
      header: 'Payment',
      sortable: true,
      render: (order: typeof mockOrders[0]) => <Badge label={order.payment.toUpperCase()} variant="secondary" size="sm" />,
    },
    { key: 'date', header: 'Date', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Orders</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage orders and payments</p>
        </div>
        <ActionButton label="Create Invoice" icon={FileText} onClick={() => console.log('Create invoice')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={orders.length} icon={<ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />} />
        <StatCard label="Total Value" value={`$${totalValue.toLocaleString()}`} icon={<DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />} />
        <StatCard label="Pending Payment" value={orders.filter(o => o.status === 'pending').length} icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />} />
        <StatCard label="Completed" value={orders.filter(o => o.status === 'completed').length} icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />} />
      </div>

      <Card padding="none">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">All Orders</h2>
        </div>
        <div className="p-4">
          <DataTable data={orders} columns={columns} keyField="id" onRowClick={(order) => console.log('View order', order.id)} />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types ({orderTypes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {orderTypes.slice(0, 15).map((type) => <Badge key={type.name} label={type.name} variant="secondary" />)}
          {orderTypes.length > 15 && <Badge label={`+${orderTypes.length - 15} more`} variant="default" />}
        </div>
      </Card>
    </div>
  );
}
