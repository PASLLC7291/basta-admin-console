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
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { typeCounts, bastaSections } from '@/lib/basta-types';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Mock data for demonstration
  const stats = {
    totalTypes: typeCounts.total,
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
            BASTA Management API Overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="online" showPulse />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total API Types"
          value={stats.totalTypes}
          change="+12 from schema update"
          changeType="increase"
          icon={<BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="API Calls (24h)"
          value={stats.apiCalls}
          change="+12.5% from yesterday"
          changeType="increase"
          icon={<Activity className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Active Users"
          value={stats.activeUsers}
          change="+48 new this week"
          changeType="increase"
          icon={<Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Active Sales"
          value={stats.activeSales}
          change="8 closing today"
          changeType="neutral"
          icon={<Gavel className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
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
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Webhooks</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">98.5%</p>
                <p className="text-xs text-green-600 dark:text-green-500">delivery rate</p>
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

      {/* Type Categories Overview */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            API Type Categories
          </h2>
          <Link
            href="/admin/glossary"
            className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View full glossary
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bastaSections.map((section) => (
            <Link
              key={section.slug}
              href={`/admin/glossary?section=${section.slug}`}
              className="p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {section.name}
              </h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {section.types.length}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">types</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
