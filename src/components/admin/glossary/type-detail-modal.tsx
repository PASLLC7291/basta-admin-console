'use client';

import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { X, Copy, Check, ExternalLink, Play, Code2 } from 'lucide-react';
import type { BastaType } from '@/lib/basta-types';
import { Badge, getCategoryVariant } from '../shared/badge';
import { useState } from 'react';

interface TypeDetailModalProps {
  type: BastaType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TypeDetailModal({ type, isOpen, onClose }: TypeDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !type) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(type.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate example GraphQL query/mutation based on type
  const generateExample = () => {
    if (type.category === 'Input') {
      return `mutation {
  someOperation(input: {
    # ${type.name} fields
    ${type.fields?.map(f => `${f}: ...`).join('\n    ') || '# fields here'}
  }) {
    id
    # ... other fields
  }
}`;
    }

    if (type.category === 'Object' || type.category === 'Query') {
      return `query {
  ${type.name.charAt(0).toLowerCase() + type.name.slice(1)} {
    ${type.fields?.join('\n    ') || 'id\n    # ... other fields'}
  }
}`;
    }

    if (type.category === 'Connection') {
      return `query {
  items(first: 10, after: "cursor") {
    edges {
      node {
        id
        # ... fields
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
    }

    return `# ${type.category}: ${type.name}
# ${type.description}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-zinc-400" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-white">
                    {type.name}
                  </h2>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    title="Copy type name"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-zinc-400" />
                    )}
                  </button>
                </div>
                <Badge
                  label={type.category}
                  variant={getCategoryVariant(type.category)}
                  size="md"
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                {type.description}
              </p>
            </div>

            {/* Section */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Section
              </h3>
              <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded text-sm text-zinc-700 dark:text-zinc-300 capitalize">
                {type.section}
              </span>
            </div>

            {/* Fields */}
            {type.fields && type.fields.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Fields ({type.fields.length})
                </h3>
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 space-y-2">
                  {type.fields.map((field) => (
                    <div
                      key={field}
                      className="flex items-center gap-2 font-mono text-sm"
                    >
                      <span className="text-blue-600 dark:text-blue-400">{field}</span>
                      <span className="text-zinc-400">:</span>
                      <span className="text-zinc-500">Type</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example Usage */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                Example Usage
              </h3>
              <div className="relative">
                <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-zinc-300 font-mono">
                    {generateExample()}
                  </code>
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(generateExample())}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-b-xl">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              View in API Docs
            </a>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600"
              >
                Close
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <Play className="h-4 w-4" />
                Test in Playground
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
