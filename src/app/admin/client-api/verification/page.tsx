'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Copy,
  ExternalLink,
  User,
  FileText,
  Camera,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { Card, StatCard } from '@/components/admin/shared/card';
import { Badge } from '@/components/admin/shared/badge';

interface VerificationRequest {
  id: string;
  user: string;
  email: string;
  status: 'pending' | 'processing' | 'verified' | 'failed' | 'expired';
  documentType: string;
  requestedAt: string;
  expiresAt?: string;
}

export default function VerificationPage() {
  const [selectedTab, setSelectedTab] = useState<'requests' | 'flow' | 'types'>('requests');

  // Mock verification requests
  const verificationRequests: VerificationRequest[] = [
    { id: 'ver_001', user: 'John Smith', email: 'john@example.com', status: 'verified', documentType: 'Passport', requestedAt: '2 hours ago' },
    { id: 'ver_002', user: 'Sarah Johnson', email: 'sarah@example.com', status: 'processing', documentType: 'Driver License', requestedAt: '30 min ago' },
    { id: 'ver_003', user: 'Mike Brown', email: 'mike@example.com', status: 'pending', documentType: 'ID Card', requestedAt: '15 min ago', expiresAt: '23h 45m' },
    { id: 'ver_004', user: 'Anna Wilson', email: 'anna@example.com', status: 'failed', documentType: 'Passport', requestedAt: '1 day ago' },
    { id: 'ver_005', user: 'David Lee', email: 'david@example.com', status: 'expired', documentType: 'Driver License', requestedAt: '3 days ago' },
  ];

  const verificationTypes = [
    {
      name: 'BidderVerificationInput',
      category: 'Input',
      description: 'Input for requesting bidder identity verification',
      fields: ['userId', 'documentType', 'returnUrl', 'locale']
    },
    {
      name: 'BidderVerificationLink',
      category: 'Object',
      description: 'Verification URL response for KYC process',
      fields: ['url', 'expiresAt', 'status', 'sessionId']
    },
  ];

  const getStatusIcon = (status: VerificationRequest['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'expired': return <AlertTriangle className="h-4 w-4 text-zinc-400" />;
    }
  };

  const getStatusBadge = (status: VerificationRequest['status']) => {
    switch (status) {
      case 'verified': return <Badge label="Verified" variant="success" size="sm" />;
      case 'processing': return <Badge label="Processing" variant="info" size="sm" />;
      case 'pending': return <Badge label="Pending" variant="warning" size="sm" />;
      case 'failed': return <Badge label="Failed" variant="danger" size="sm" />;
      case 'expired': return <Badge label="Expired" variant="secondary" size="sm" />;
    }
  };

  const exampleMutation = `mutation RequestVerification($input: BidderVerificationInput!) {
  requestBidderVerification(input: $input) {
    url
    expiresAt
    status
    sessionId
  }
}

# Variables
{
  "input": {
    "userId": "user_123",
    "documentType": "PASSPORT",
    "returnUrl": "https://example.com/verification/complete",
    "locale": "en"
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
            Bidder Verification
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            KYC/Identity verification status for registered bidders
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">Provider Connected</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Verification Types"
          value={2}
          change="GraphQL types"
          changeType="neutral"
          icon={<ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
        <StatCard
          label="Pending Requests"
          value={verificationRequests.filter(r => r.status === 'pending' || r.status === 'processing').length}
          change="Awaiting verification"
          changeType="neutral"
          icon={<Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
        />
        <StatCard
          label="Success Rate"
          value="94.2%"
          change="+1.2% this month"
          changeType="increase"
          icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
        />
        <StatCard
          label="Avg Time"
          value="4.5 min"
          change="To complete"
          changeType="neutral"
          icon={<RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
        {[
          { id: 'requests', label: 'Requests', icon: User },
          { id: 'flow', label: 'Verification Flow', icon: ArrowRight },
          { id: 'types', label: 'Types', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400'
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
      {selectedTab === 'requests' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Recent Verification Requests
            </h2>
            <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Request ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Document</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Requested</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Expires</th>
                </tr>
              </thead>
              <tbody>
                {verificationRequests.map((request) => (
                  <tr key={request.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-4">
                      <code className="text-sm font-mono text-zinc-900 dark:text-white">{request.id}</code>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{request.user}</p>
                        <p className="text-xs text-zinc-500">{request.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{request.documentType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        {getStatusBadge(request.status)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-zinc-500">{request.requestedAt}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-zinc-500">{request.expiresAt || '-'}</span>
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
              KYC Verification Flow
            </h2>

            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">1. Request Link</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Call requestBidderVerification
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 2 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">2. Redirect User</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  User visits verification URL
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 3 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">3. Document Upload</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Upload ID document
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 4 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                  <Camera className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">4. Selfie Check</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Liveness verification
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-zinc-300 dark:text-zinc-600" />

              {/* Step 5 */}
              <div className="flex-1 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">5. Verified</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Webhook callback
                </p>
              </div>
            </div>
          </Card>

          {/* Supported Documents */}
          <Card>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Supported Document Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                <h3 className="font-semibold text-zinc-900 dark:text-white">Passport</h3>
                <p className="text-sm text-zinc-500 mt-1">International travel document</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
                <h3 className="font-semibold text-zinc-900 dark:text-white">Driver License</h3>
                <p className="text-sm text-zinc-500 mt-1">Government-issued license</p>
              </div>
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
                <h3 className="font-semibold text-zinc-900 dark:text-white">National ID</h3>
                <p className="text-sm text-zinc-500 mt-1">Government-issued ID card</p>
              </div>
            </div>
          </Card>

          {/* Example Code */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Example: Request Verification
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
            Verification GraphQL Types
          </h2>

          <div className="space-y-4">
            {verificationTypes.map((type) => (
              <div
                key={type.name}
                className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
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
                      <div className="mt-3 flex flex-wrap gap-2">
                        {type.fields.map((field) => (
                          <span
                            key={field}
                            className="px-2 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge
                    label={type.category}
                    variant={type.category === 'Input' ? 'input' : 'object'}
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
