'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  TrendingUp,
  Users,
  Package,
  Gavel,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart3,
  Zap,
  Database,
  User,
  Bell,
  Search,
  CreditCard,
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { typeCounts, bastaSections } from '@/lib/basta-types';
import { clientTypeCounts, bastaClientSections, subscriptionTypes } from '@/lib/basta-client-types';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Combined stats
  const stats = {
    managementTypes: typeCounts.total,
    clientTypes: clientTypeCounts.total,
    combinedTypes: typeCounts.total + clientTypeCounts.total,
    subscriptions: subscriptionTypes.length,
    apiCalls: '45.2K',
    activeUsers: '1,234',
    activeSales: 42,
  };

  const recentActivity = [
    { id: 1, action: 'Sale Created', type: 'sale', time: '2 minutes ago', status: 'success' },
    { id: 2, action: 'Bid Placed', type: 'bid', time: '5 minutes ago', status: 'success' },
    { id: 3, action: 'Item Updated', type: 'item', time: '12 minutes ago', status: 'success' },
    { id: 4, action: 'Webhook Failed', type: 'webhook', time: '15 minutes ago', status: 'error' },
    { id: 5, action: 'User Registered', type: 'user', time: '23 minutes ago', status: 'success' },
  ];

  const quickActions = [
    { name: 'Create Sale', href: '/admin/sales', icon: Gavel },
    { name: 'Add Item', href: '/admin/items', icon: Package },
    { name: 'View Users', href: '/admin/users', icon: Users },
    { name: 'API Glossary', href: '/admin/glossary', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            BASTA API Overview - Management & Client APIs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="online" showPulse />
        </div>
      </div>

      {/* Combined API Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Management API Types"
          value={stats.managementTypes}
          change="Admin operations"
          changeType="neutral"
          icon={<Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Client API Types"
          value={stats.clientTypes}
          change="User-facing"
          changeType="neutral"
          icon={<User className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Real-Time Subscriptions"
          value={stats.subscriptions}
          change="WebSocket events"
          changeType="neutral"
          icon={<Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Combined Types"
          value={stats.combinedTypes}
          change="Total API surface"
          changeType="neutral"
          icon={<Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Health */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              API Health Status
            </h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '24h' | '7d' | '30d')}
              className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-700 rounded-lg border-0 text-zinc-700 dark:text-zinc-300"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </div>

          <div className="space-y-4">
            {/* Endpoint Health */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Queries</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">99.9%</p>
                <p className="text-xs text-green-600 dark:text-green-500">uptime</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Mutations</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">99.8%</p>
                <p className="text-xs text-green-600 dark:text-green-500">uptime</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-400">Subscriptions</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">100%</p>
                <p className="text-xs text-purple-600 dark:text-purple-500">connected</p>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Latency</span>
                </div>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">45ms</p>
                <p className="text-xs text-amber-600 dark:text-amber-500">avg response</p>
              </div>
            </div>

            {/* Response Time Chart Placeholder */}
            <div className="h-48 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Response Time Chart
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Connect to live metrics for visualization
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.name}
                    href={action.href}
                    className="flex flex-col items-center gap-2 p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {action.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Recent Activity
              </h2>
              <Link
                href="/admin/activity"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                >
                  {activity.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* API Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Management API Categories */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Management API
              </h2>
            </div>
            <Link
              href="/admin/glossary"
              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bastaSections.slice(0, 6).map((section) => (
              <Link
                key={section.slug}
                href={`/admin/glossary?section=${section.slug}`}
                className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <h3 className="font-medium text-zinc-900 dark:text-white text-sm">
                  {section.name}
                </h3>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {section.types.length}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">types</p>
              </Link>
            ))}
          </div>
        </Card>

        {/* Client API Categories */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Client API
              </h2>
            </div>
            <Link
              href="/admin/client-api"
              className="inline-flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bastaClientSections.slice(0, 6).map((section) => (
              <Link
                key={section.slug}
                href={`/admin/glossary?section=${section.slug}`}
                className="p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <h3 className="font-medium text-zinc-900 dark:text-white text-sm">
                  {section.name}
                </h3>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {section.types.length}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">types</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Client API Feature Cards */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Client API Features
          </h2>
          <Link
            href="/admin/client-api"
            className="inline-flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Explore Client API
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/admin/client-api/subscriptions"
            className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Subscriptions</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              {subscriptionTypes.length} real-time types
            </p>
          </Link>
          <Link
            href="/admin/client-api/search"
            className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Search className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Search</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Faceted discovery
            </p>
          </Link>
          <Link
            href="/admin/client-api/payments"
            className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Payments</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Stripe integration
            </p>
          </Link>
          <Link
            href="/admin/client-api/verification"
            className="p-4 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
          >
            <Users className="h-6 w-6 text-amber-600 dark:text-amber-400 mb-2" />
            <h3 className="font-semibold text-zinc-900 dark:text-white">Verification</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              KYC/Identity
            </p>
          </Link>
        </div>
      </Card>
    </div>
  );
}
