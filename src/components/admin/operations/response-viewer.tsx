'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface ResponseViewerProps {
  response: unknown | null;
  error?: string | null;
  loading?: boolean;
  executionTime?: number;
}

export function ResponseViewer({ response, error, loading = false, executionTime }: ResponseViewerProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = () => {
    const content = error || (response ? JSON.stringify(response, null, 2) : '');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedResponse = response ? JSON.stringify(response, null, 2) : null;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-zinc-900 dark:text-white font-medium"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          Response
        </button>
        <div className="flex items-center gap-3">
          {executionTime !== undefined && (
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock className="h-3 w-3" />
              {executionTime}ms
            </div>
          )}
          {error ? (
            <div className="flex items-center gap-1 text-red-500 text-xs">
              <AlertCircle className="h-3 w-3" />
              Error
            </div>
          ) : response ? (
            <div className="flex items-center gap-1 text-green-500 text-xs">
              <CheckCircle className="h-3 w-3" />
              Success
            </div>
          ) : null}
          <button
            onClick={handleCopy}
            disabled={!response && !error}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy response"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Content */}
      {!collapsed && (
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 dark:border-zinc-700 border-t-blue-600" />
                <span className="text-sm text-zinc-500">Executing...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-700 dark:text-red-400">Error</p>
                  <pre className="mt-2 text-sm text-red-600 dark:text-red-300 font-mono whitespace-pre-wrap">
                    {error}
                  </pre>
                </div>
              </div>
            </div>
          ) : formattedResponse ? (
            <pre className="bg-zinc-900 rounded-lg p-4 text-sm text-zinc-300 font-mono overflow-x-auto max-h-96">
              {formattedResponse}
            </pre>
          ) : (
            <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
              <p>No response yet</p>
              <p className="text-sm mt-1">Execute a query or mutation to see results</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// JSON Syntax Highlighter Helper
interface JsonViewerProps {
  data: unknown;
  depth?: number;
}

export function JsonViewer({ data, depth = 0 }: JsonViewerProps) {
  const [expanded, setExpanded] = useState(depth < 2);
  const indent = '  '.repeat(depth);

  if (data === null) return <span className="text-orange-400">null</span>;
  if (data === undefined) return <span className="text-zinc-500">undefined</span>;
  if (typeof data === 'boolean') return <span className="text-purple-400">{String(data)}</span>;
  if (typeof data === 'number') return <span className="text-blue-400">{data}</span>;
  if (typeof data === 'string') return <span className="text-green-400">"{data}"</span>;

  if (Array.isArray(data)) {
    if (data.length === 0) return <span className="text-zinc-400">[]</span>;

    return (
      <span>
        <button onClick={() => setExpanded(!expanded)} className="text-zinc-400 hover:text-zinc-200">
          {expanded ? '[' : '[...]'}
        </button>
        {expanded && (
          <>
            {'\n'}
            {data.map((item, i) => (
              <span key={i}>
                {indent}  <JsonViewer data={item} depth={depth + 1} />
                {i < data.length - 1 && ','}
                {'\n'}
              </span>
            ))}
            {indent}
          </>
        )}
        {expanded && ']'}
      </span>
    );
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) return <span className="text-zinc-400">{'{}'}</span>;

    return (
      <span>
        <button onClick={() => setExpanded(!expanded)} className="text-zinc-400 hover:text-zinc-200">
          {expanded ? '{' : '{...}'}
        </button>
        {expanded && (
          <>
            {'\n'}
            {entries.map(([key, value], i) => (
              <span key={key}>
                {indent}  <span className="text-cyan-400">"{key}"</span>
                <span className="text-zinc-400">: </span>
                <JsonViewer data={value} depth={depth + 1} />
                {i < entries.length - 1 && ','}
                {'\n'}
              </span>
            ))}
            {indent}
          </>
        )}
        {expanded && '}'}
      </span>
    );
  }

  return <span>{String(data)}</span>;
}
