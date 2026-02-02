'use client';

import { useState } from 'react';
import { Play, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { BastaType } from '@/lib/basta-types';

interface MutationFormProps {
  type: BastaType;
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
}

interface FieldConfig {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

export function MutationForm({ type, onSubmit }: MutationFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  // Generate fields from type definition
  const fields: FieldConfig[] = type.fields?.map(field => ({
    name: field,
    type: 'String',
    required: false,
    description: `Enter ${field}`,
  })) || [];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      await onSubmit?.(formData);
      setResult({ success: true, message: 'Operation completed successfully' });
    } catch (error) {
      setResult({ success: false, message: error instanceof Error ? error.message : 'Operation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
        <h3 className="font-medium text-zinc-900 dark:text-white">{type.name}</h3>
        <p className="text-sm text-zinc-500">{type.description}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {fields.length > 0 ? (
          fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                {field.name}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type="text"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                placeholder={field.description}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
            No input fields defined for this type
          </p>
        )}

        {/* Result Message */}
        {result && (
          <div
            className={clsx(
              'flex items-center gap-2 p-3 rounded-lg text-sm',
              result.success
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            )}
          >
            {result.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {result.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || fields.length === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Execute {type.category === 'Input' ? 'Mutation' : 'Query'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
