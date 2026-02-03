'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Bell,
  Search,
  CreditCard,
  ShieldCheck,
  Activity,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  TrendingUp,
  Package,
  Gavel,
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { StatusIndicator } from '@/components/admin/shared/status-indicator';
import { clientTypeCounts, bastaClientSections, subscriptionTypes } from '@/lib/basta-client-types';

export default function ClientApiDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Client API specific stats
  const stats = {
    totalTypes: clientTypeCounts.total,
    subscriptions: clientTypeCounts.subscriptions,
    searchQueries: '12.8K',
    paymentSessions: 234,
  };

  const quickLinks = [
    { name: 'Subscriptions', href: '/admin/client-api/subscriptions', icon: Bell, count: subscriptionTypes.length, color: 'purple' },
    { name: 'Search', href: '/admin/client-api/search', icon: Search, count: clientTypeCounts.bySection['search'] || 0, color: 'blue' },
    { name: 'Payments', href: '/admin/client-api/payments', icon: CreditCard, count: clientTypeCounts.bySection['payments'] || 0, color: 'green' },
    { name: 'Verification', href: '/admin/client-api/verification', icon: ShieldCheck, count: 2, color: 'amber' },
  ];

  const subscriptionInfo = [
    { name: 'ItemChanged', description: 'Real-time item bid/status updates', active: true },
    { name: 'SaleChanged', description: 'Real-time sale status updates', active: true },
    { name: 'UserAccountSubscription', description: 'User account changes', active: true },
    { name: 'BiddingActivity', description: 'Live bidding activity feed', active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Client API Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            User-facing API with real-time subscriptions, payments, and search
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusIndicator status="online" showPulse />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">API Healthy</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Client API Types"
          value={stats.totalTypes}
          change="112 types total"
          changeType="neutral"
          icon={<User className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Subscriptions"
          value={stats.subscriptions}
          change="Real-time updates"
          changeType="neutral"
          icon={<Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
        />
        <StatCard
          label="Search Queries (24h)"
          value={stats.searchQueries}
          change="+15.2% from yesterday"
          changeType="increase"
          icon={<Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
        <StatCard
          label="Payment Sessions"
          value={stats.paymentSessions}
          change="Active sessions"
          changeType="neutral"
          icon={<CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client API Health */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Client API Health
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
            {/* Service Health */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Queries</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">99.9%</p>
                <p className="text-xs text-green-600 dark:text-green-500">uptime</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-400">Subscriptions</span>
                </div>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">4</p>
                <p className="text-xs text-purple-600 dark:text-purple-500">active types</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Search</span>
                </div>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">32ms</p>
                <p className="text-xs text-blue-600 dark:text-blue-500">avg latency</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Payments</span>
                </div>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">100%</p>
                <p className="text-xs text-green-600 dark:text-green-500">success rate</p>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Real-Time Subscriptions
                </h3>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {subscriptionInfo.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{sub.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{sub.description}</p>
                      </div>
                    </div>
                    <StatusIndicator status={sub.active ? 'online' : 'offline'} showPulse={sub.active} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Client API Sections
            </h2>
            <div className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${link.color}-100 dark:bg-${link.color}-900/30`}>
                        <Icon className={`h-5 w-5 text-${link.color}-600 dark:text-${link.color}-400`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{link.name}</p>
                        <p className="text-xs text-zinc-500">{link.count} types</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                  </Link>
                );
              })}
            </div>
          </Card>

          {/* Type Categories */}
          <Card>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Type Distribution
            </h2>
            <div className="space-y-3">
              {bastaClientSections.slice(0, 5).map((section) => (
                <div key={section.slug} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{section.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${(section.types.length / clientTypeCounts.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-zinc-900 dark:text-white w-8">
                      {section.types.length}
                    </span>
                  </div>
                </div>
              ))}
              <Link
                href="/admin/glossary"
                className="inline-flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400 hover:underline mt-2"
              >
                View all in glossary
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Feature Highlights */}
      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Client API Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <Bell className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Real-Time Subscriptions</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              WebSocket-based subscriptions for live bid updates, sale changes, and user notifications.
            </p>
          </div>
          <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <Search className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Faceted Search</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Powerful search with facets, filters, and aggregations for item and sale discovery.
            </p>
          </div>
          <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
            <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Stripe Payments</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Integrated Stripe checkout with payment sessions, saved cards, and secure processing.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
