'use client';

import { useState } from 'react';
import {
  Bell,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  Zap,
  Activity,
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { Badge } from '@/components/admin/shared/badge';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { subscriptionTypes } from '@/lib/basta-client-types';

interface SubscriptionConnection {
  id: string;
  type: string;
  status: 'active' | 'idle' | 'error';
  connectedAt: string;
  lastMessage: string;
  messageCount: number;
}

export default function SubscriptionsPage() {
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  // Mock active connections
  const activeConnections: SubscriptionConnection[] = [
    { id: 'conn-1', type: 'ItemChanged', status: 'active', connectedAt: '2 min ago', lastMessage: '5 sec ago', messageCount: 234 },
    { id: 'conn-2', type: 'SaleChanged', status: 'active', connectedAt: '15 min ago', lastMessage: '1 min ago', messageCount: 45 },
    { id: 'conn-3', type: 'UserAccountSubscription', status: 'idle', connectedAt: '1 hour ago', lastMessage: '30 min ago', messageCount: 12 },
  ];

  const subscriptionDetails = [
    {
      name: 'ItemChanged',
      description: 'Real-time updates when an item changes during an active sale. Receives bid updates, status changes, and fair warnings.',
      fields: ['id', 'currentBid', 'bidCount', 'status', 'leadingBidderId', 'closingTime'],
      example: `subscription ItemChanges($saleId: ID!) {
  itemChanged(saleId: $saleId) {
    id
    currentBid
    bidCount
    status
    leadingBidderId
    closingTime
  }
}`,
      useCase: 'Live auction pages, bid tracking, countdown timers',
    },
    {
      name: 'SaleChanged',
      description: 'Real-time updates for sale status and configuration changes. Monitors sale lifecycle events.',
      fields: ['id', 'status', 'closingTime', 'activeItems', 'participantCount'],
      example: `subscription SaleChanges($saleId: ID!) {
  saleChanged(saleId: $saleId) {
    id
    status
    closingTime
    activeItems
  }
}`,
      useCase: 'Sale overview pages, status indicators, notifications',
    },
    {
      name: 'UserAccountSubscription',
      description: 'Real-time updates for the authenticated user\'s account. Tracks balance changes, notifications, and registrations.',
      fields: ['id', 'balance', 'notifications', 'registrations', 'activeBids'],
      example: `subscription UserChanges {
  userAccountSubscription {
    id
    balance
    notifications {
      id
      type
      message
    }
  }
}`,
      useCase: 'User dashboard, notification badges, bid status',
    },
    {
      name: 'BiddingActivity',
      description: 'Real-time feed of bidding activity across a sale. Shows all bid placements and updates.',
      fields: ['itemId', 'bid', 'bidCount', 'leading', 'timestamp'],
      example: `subscription BidActivity($saleId: ID!) {
  biddingActivity(saleId: $saleId) {
    itemId
    bid {
      amount
      bidder { id }
    }
    bidCount
  }
}`,
      useCase: 'Activity feeds, live auction displays, bid history',
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Real-Time Subscriptions
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Monitor and test GraphQL subscription types for real-time updates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="online" showPulse />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">WebSocket Connected</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Subscription Types"
          value={subscriptionTypes.length}
          change="Available"
          changeType="neutral"
          icon={<Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Active Connections"
          value={activeConnections.filter(c => c.status === 'active').length}
          change="Connected"
          changeType="neutral"
          icon={<Zap className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Messages (24h)"
          value="12.4K"
          change="+8% from yesterday"
          changeType="increase"
          icon={<Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Avg Latency"
          value="45ms"
          change="WebSocket"
          changeType="neutral"
          icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Types */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Subscription Types
            </h2>
            <button
              onClick={() => setTestMode(!testMode)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                testMode
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {testMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {testMode ? 'Stop Testing' : 'Test Mode'}
            </button>
          </div>

          <div className="space-y-4">
            {subscriptionDetails.map((sub) => (
              <div
                key={sub.name}
                className={`border rounded-xl overflow-hidden transition-all ${
                  selectedSubscription === sub.name
                    ? 'border-purple-500 dark:border-purple-400'
                    : 'border-zinc-200 dark:border-zinc-700'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => setSelectedSubscription(selectedSubscription === sub.name ? null : sub.name)}
                  className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-zinc-900 dark:text-white font-mono">
                        {sub.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {sub.fields.length} fields
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge label="Subscription" variant="subscription" />
                    {testMode && (
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 dark:text-green-400">Live</span>
                      </div>
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {selectedSubscription === sub.name && (
                  <div className="border-t border-zinc-200 dark:border-zinc-700 p-4 space-y-4 bg-zinc-50 dark:bg-zinc-800/30">
                    {/* Description */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Description</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{sub.description}</p>
                    </div>

                    {/* Use Case */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Use Cases</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{sub.useCase}</p>
                    </div>

                    {/* Fields */}
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Fields</h4>
                      <div className="flex flex-wrap gap-2">
                        {sub.fields.map((field) => (
                          <span
                            key={field}
                            className="px-2 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Example Code */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Example</h4>
                        <button
                          onClick={() => copyToClipboard(sub.example)}
                          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </button>
                      </div>
                      <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm text-zinc-300 font-mono">{sub.example}</code>
                      </pre>
                    </div>

                    {/* Test Button */}
                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
                        <Play className="h-4 w-4" />
                        Test Subscription
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600">
                        <ExternalLink className="h-4 w-4" />
                        Docs
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Active Connections */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Active Connections
            </h2>
            <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {activeConnections.map((conn) => (
              <div
                key={conn.id}
                className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                    {conn.type}
                  </span>
                  <StatusIndicator
                    status={conn.status === 'active' ? 'online' : conn.status === 'idle' ? 'inactive' : 'offline'}
                    showPulse={conn.status === 'active'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <div>
                    <span className="text-zinc-400">Connected:</span>
                    <span className="ml-1">{conn.connectedAt}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Last msg:</span>
                    <span className="ml-1">{conn.lastMessage}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Activity className="h-3 w-3 text-purple-500" />
                  <span className="text-zinc-600 dark:text-zinc-400">{conn.messageCount} messages</span>
                </div>
              </div>
            ))}

            {activeConnections.length === 0 && (
              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active connections</p>
              </div>
            )}
          </div>

          {/* Connection Info */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">WebSocket Endpoint</h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate">
                wss://api.basta.ai/graphql
              </code>
              <button
                onClick={() => copyToClipboard('wss://api.basta.ai/graphql')}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
