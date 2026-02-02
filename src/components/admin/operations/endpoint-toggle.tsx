'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Power, AlertTriangle, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { ConfirmDialog } from '../shared/confirm-dialog';

interface Endpoint {
  name: string;
  type: 'query' | 'mutation' | 'subscription';
  enabled: boolean;
  status: 'healthy' | 'degraded' | 'down';
  latency?: number;
  lastCalled?: string;
  callCount?: number;
}

interface EndpointToggleProps {
  endpoint: Endpoint;
  onToggle: (name: string, enabled: boolean) => void;
  showDetails?: boolean;
}

export function EndpointToggle({ endpoint, onToggle, showDetails = true }: EndpointToggleProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    if (endpoint.enabled) {
      // Disabling requires confirmation
      setShowConfirm(true);
    } else {
      // Enabling is immediate
      onToggle(endpoint.name, true);
    }
  };

  const confirmDisable = () => {
    onToggle(endpoint.name, false);
    setShowConfirm(false);
  };

  const statusColors = {
    healthy: 'text-green-500',
    degraded: 'text-amber-500',
    down: 'text-red-500',
  };

  const statusIcons = {
    healthy: CheckCircle,
    degraded: AlertTriangle,
    down: XCircle,
  };

  const StatusIcon = statusIcons[endpoint.status];

  return (
    <>
      <div
        className={clsx(
          'p-4 rounded-lg border transition-colors',
          endpoint.enabled
            ? 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-60'
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Toggle Switch */}
            <button
              onClick={handleToggle}
              className={clsx(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
                endpoint.enabled ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-600'
              )}
            >
              <span
                className={clsx(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  endpoint.enabled ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>

            {/* Endpoint Info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-white">
                  {endpoint.name}
                </span>
                <span
                  className={clsx(
                    'px-2 py-0.5 text-xs font-medium rounded',
                    endpoint.type === 'query' && 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
                    endpoint.type === 'mutation' && 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
                    endpoint.type === 'subscription' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  )}
                >
                  {endpoint.type}
                </span>
              </div>
              {showDetails && (
                <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <StatusIcon className={clsx('h-3 w-3', statusColors[endpoint.status])} />
                    {endpoint.status}
                  </span>
                  {endpoint.latency !== undefined && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {endpoint.latency}ms
                    </span>
                  )}
                  {endpoint.callCount !== undefined && (
                    <span>{endpoint.callCount.toLocaleString()} calls</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
              title="View in Playground"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Disable Endpoint"
        description={`Are you sure you want to disable the "${endpoint.name}" endpoint? This will reject all incoming requests to this endpoint until re-enabled.`}
        confirmLabel="Disable"
        variant="warning"
        onConfirm={confirmDisable}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

// Endpoint List Component
interface EndpointListProps {
  endpoints: Endpoint[];
  onToggle: (name: string, enabled: boolean) => void;
}

export function EndpointList({ endpoints, onToggle }: EndpointListProps) {
  const [filter, setFilter] = useState<'all' | 'query' | 'mutation'>('all');

  const filteredEndpoints = endpoints.filter(
    (ep) => filter === 'all' || ep.type === filter
  );

  const enabledCount = endpoints.filter((ep) => ep.enabled).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Endpoints
          </h3>
          <span className="text-sm text-zinc-500">
            {enabledCount}/{endpoints.length} enabled
          </span>
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'query', 'mutation'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={clsx(
                'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                filter === type
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Endpoint List */}
      <div className="space-y-2">
        {filteredEndpoints.map((endpoint) => (
          <EndpointToggle
            key={endpoint.name}
            endpoint={endpoint}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
