'use client';

import { useState } from 'react';
import { Play, Copy, Check, RotateCcw, Code2 } from 'lucide-react';
import { clsx } from 'clsx';

interface QueryBuilderProps {
  operationType?: 'query' | 'mutation';
  initialQuery?: string;
  onExecute?: (query: string, variables: Record<string, unknown>) => void;
}

export function QueryBuilder({ operationType = 'query', initialQuery = '', onExecute }: QueryBuilderProps) {
  const [query, setQuery] = useState(initialQuery || getDefaultQuery(operationType));
  const [variables, setVariables] = useState('{}');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setQuery(getDefaultQuery(operationType));
    setVariables('{}');
  };

  const handleExecute = () => {
    try {
      const parsedVariables = JSON.parse(variables);
      onExecute?.(query, parsedVariables);
    } catch {
      console.error('Invalid JSON in variables');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-zinc-400" />
          <span className="font-medium text-zinc-900 dark:text-white capitalize">{operationType} Builder</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            title="Copy"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleExecute}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Play className="h-4 w-4" />
            Execute
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 dark:divide-zinc-700">
        {/* Query Editor */}
        <div className="p-4">
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
            {operationType === 'query' ? 'Query' : 'Mutation'}
          </label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-64 px-4 py-3 bg-zinc-900 text-zinc-100 font-mono text-sm rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder={`Enter your GraphQL ${operationType}...`}
            spellCheck={false}
          />
        </div>

        {/* Variables Editor */}
        <div className="p-4">
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
            Variables (JSON)
          </label>
          <textarea
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
            className="w-full h-64 px-4 py-3 bg-zinc-900 text-zinc-100 font-mono text-sm rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder='{"key": "value"}'
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

function getDefaultQuery(type: 'query' | 'mutation'): string {
  if (type === 'query') {
    return `query GetSales {
  sales(first: 10) {
    edges {
      node {
        id
        title
        status
        dates {
          openDate
          closeDate
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
  }

  return `mutation CreateSale($input: CreateSaleInput!) {
  createSale(input: $input) {
    sale {
      id
      title
      status
    }
  }
}`;
}
