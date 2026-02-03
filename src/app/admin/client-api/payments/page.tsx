'use client';

import { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  ArrowRight,
  DollarSign,
  ShieldCheck,
  Wallet,
  Receipt,
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { clientTypeCounts } from '@/lib/basta-client-types';

interface PaymentSession {
  id: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  amount: string;
  items: number;
  createdAt: string;
  user: string;
}

export default function PaymentsPage() {
  const [selectedTab, setSelectedTab] = useState<'sessions' | 'flow' | 'types'>('sessions');

  // Mock payment sessions
  const paymentSessions: PaymentSession[] = [
    { id: 'ps_1234', status: 'complete', amount: '$12,500', items: 3, createdAt: '5 min ago', user: 'john@example.com' },
    { id: 'ps_1235', status: 'processing', amount: '$3,200', items: 1, createdAt: '12 min ago', user: 'sarah@example.com' },
    { id: 'ps_1236', status: 'pending', amount: '$8,750', items: 2, createdAt: '23 min ago', user: 'mike@example.com' },
    { id: 'ps_1237', status: 'failed', amount: '$1,500', items: 1, createdAt: '45 min ago', user: 'anna@example.com' },
    { id: 'ps_1238', status: 'complete', amount: '$45,000', items: 5, createdAt: '1 hour ago', user: 'david@example.com' },
  ];

  const paymentTypes = [
    { name: 'PaymentSession', description: 'Active checkout/payment session', fields: ['id', 'status', 'amount', 'items', 'expiresAt'] },
    { name: 'PaymentSessionInput', description: 'Input for creating payment session', fields: ['itemIds', 'paymentMethodId', 'returnUrl'] },
    { name: 'PaymentSessionStatus', description: 'Session states: PENDING, PROCESSING, COMPLETE, FAILED', fields: [] },
    { name: 'StripePaymentProviderSession', description: 'Stripe-specific checkout session', fields: ['clientSecret', 'publishableKey', 'sessionId'] },
    { name: 'PaymentMethod', description: 'Saved payment method', fields: ['id', 'type', 'last4', 'brand', 'isDefault'] },
    { name: 'PaymentIntent', description: 'Payment intent for processing', fields: ['id', 'amount', 'status', 'clientSecret'] },
    { name: 'Invoice', description: 'Invoice for won items', fields: ['id', 'number', 'items', 'total', 'dueDate'] },
    { name: 'CheckoutResult', description: 'Result union: Success or Error', fields: [] },
  ];

  const getStatusIcon = (status: PaymentSession['status']) => {
    switch (status) {
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: PaymentSession['status']) => {
    switch (status) {
      case 'complete': return <Badge label="Complete" variant="success" size="sm" />;
      case 'processing': return <Badge label="Processing" variant="info" size="sm" />;
      case 'pending': return <Badge label="Pending" variant="warning" size="sm" />;
      case 'failed': return <Badge label="Failed" variant="danger" size="sm" />;
    }
  };

  const exampleMutation = `mutation CreatePaymentSession($input: PaymentSessionInput!) {
  createPaymentSession(input: $input) {
    id
    status
    amount
    stripeSession {
      clientSecret
      publishableKey
    }
    expiresAt
  }
}

# Variables
{
  "input": {
    "itemIds": ["item_123", "item_456"],
    "paymentMethodId": "pm_card_visa",
    "returnUrl": "https://example.com/checkout/complete"
  }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Payment Sessions
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monitor Stripe integration and payment flow for the Client API
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Stripe Connected</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Payment Types"
          value={clientTypeCounts.bySection['payments'] || 15}
          change="GraphQL types"
          changeType="neutral"
          icon={<CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Active Sessions"
          value={paymentSessions.filter(s => s.status === 'pending' || s.status === 'processing').length}
          change="In progress"
          changeType="neutral"
          icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
        <StatCard
          label="Success Rate"
          value="98.5%"
          change="+0.3% this week"
          changeType="increase"
          icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Volume (24h)"
          value="$125K"
          change="+12% from yesterday"
          changeType="increase"
          icon={<DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
        {[
          { id: 'sessions', label: 'Sessions', icon: Receipt },
          { id: 'flow', label: 'Payment Flow', icon: ArrowRight },
          { id: 'types', label: 'Types', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-green-600 text-green-600 dark:text-green-400'
                  : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {selectedTab === 'sessions' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Recent Payment Sessions
            </h2>
            <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Session ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Created</th>
                </tr>
              </thead>
              <tbody>
                {paymentSessions.map((session) => (
                  <tr key={session.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-4">
                      <code className="text-sm font-mono text-zinc-900 dark:text-white">{session.id}</code>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(session.status)}
                        {getStatusBadge(session.status)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-zinc-900 dark:text-white">{session.amount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-zinc-600 dark:text-zinc-400">{session.items}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{session.user}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-zinc-500">{session.createdAt}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'flow' && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
              Stripe Checkout Flow
            </h2>

            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">1. Create Session</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Call createPaymentSession
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 2 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">2. Stripe Elements</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Use clientSecret with Elements
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 3 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">3. Confirm Payment</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  confirmPayment via Stripe.js
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 4 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">4. Complete</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Webhook confirms payment
                </p>
              </div>
            </div>
          </Card>

          {/* Example Code */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Example: Create Payment Session
              </h2>
              <button
                onClick={() => copyToClipboard(exampleMutation)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
            <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-zinc-300 font-mono">{exampleMutation}</code>
            </pre>
          </Card>
        </div>
      )}

      {selectedTab === 'types' && (
        <Card>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Payment GraphQL Types
          </h2>

          <div className="space-y-3">
            {paymentTypes.map((type) => (
              <div
                key={type.name}
                className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-green-500 dark:hover:border-green-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-mono text-base font-semibold text-zinc-900 dark:text-white">
                      {type.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {type.description}
                    </p>
                    {type.fields.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {type.fields.map((field) => (
                          <span
                            key={field}
                            className="px-1.5 py-0.5 text-xs font-mono bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge
                    label={type.fields.length > 0 ? 'Object' : 'Enum'}
                    variant={type.fields.length > 0 ? 'object' : 'enum'}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
