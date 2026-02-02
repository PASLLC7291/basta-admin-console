'use client';

import { useState } from 'react';
import { Settings, DollarSign, Percent, Hash, Globe, Bell, Shield, Save } from 'lucide-react';
import { Card } from '@/components/admin/shared/card';
import { ActionButton } from '@/components/admin/shared/action-button';
import { Badge } from '@/components/admin/shared/badge';
import { getTypesBySection } from '@/lib/basta-types';

const mockIncrements = [
  { from: 0, to: 100, increment: 5 },
  { from: 100, to: 500, increment: 10 },
  { from: 500, to: 1000, increment: 25 },
  { from: 1000, to: 5000, increment: 50 },
  { from: 5000, to: 10000, increment: 100 },
  { from: 10000, to: null, increment: 250 },
];

const mockFees = [
  { name: 'Buyer Premium', type: 'PERCENTAGE', value: 25, description: 'Applied to all winning bids' },
  { name: 'Seller Commission', type: 'PERCENTAGE', value: 10, description: 'Deducted from hammer price' },
  { name: 'Processing Fee', type: 'FLAT', value: 2.99, description: 'Per transaction' },
];

export default function ConfigPage() {
  const configTypes = getTypesBySection('config');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Configuration</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage system settings and fee rules</p>
        </div>
        <ActionButton label="Save Changes" icon={Save} onClick={() => console.log('Save')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bid Increment Table */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Bid Increment Table</h2>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
          </div>
          <div className="space-y-2">
            {mockIncrements.map((inc, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  ${inc.from.toLocaleString()} - {inc.to ? `$${inc.to.toLocaleString()}` : 'Above'}
                </span>
                <Badge label={`+$${inc.increment}`} variant="primary" size="sm" />
              </div>
            ))}
          </div>
        </Card>

        {/* Fee Configuration */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-green-600 dark:text-green-400" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Fee Configuration</h2>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Add Fee</button>
          </div>
          <div className="space-y-3">
            {mockFees.map((fee, idx) => (
              <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-zinc-900 dark:text-white">{fee.name}</span>
                  <Badge
                    label={fee.type === 'PERCENTAGE' ? `${fee.value}%` : `$${fee.value}`}
                    variant={fee.type === 'PERCENTAGE' ? 'success' : 'warning'}
                  />
                </div>
                <p className="text-xs text-zinc-500">{fee.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Account Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Timezone</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>America/New_York (EST)</option>
                <option>America/Los_Angeles (PST)</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Currency</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Locale</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white">
                <option>en-US</option>
                <option>en-GB</option>
                <option>de-DE</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Email notifications', checked: true },
              { label: 'SMS alerts', checked: false },
              { label: 'Push notifications', checked: true },
              { label: 'Webhook delivery reports', checked: true },
            ].map((setting, idx) => (
              <label key={idx} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg cursor-pointer">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{setting.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={setting.checked}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Related API Types ({configTypes.length})</h2>
        <div className="flex flex-wrap gap-2">
          {configTypes.map((type) => <Badge key={type.name} label={type.name} variant="secondary" />)}
        </div>
      </Card>
    </div>
  );
}
