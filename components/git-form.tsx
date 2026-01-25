'use client'

import React from "react"
import { Eye, Send, Loader2 } from 'lucide-react'
import { FormData, CommitMode } from '../lib/types/index'

interface GitFormProps {
  formData: FormData
  onFormChange: (data: FormData) => void
  onPreview: () => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  isPreviewLoading: boolean
}

export function GitForm({
  formData,
  onFormChange,
  onPreview,
  onSubmit,
  isLoading,
  isPreviewLoading
}: GitFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Year */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2.5">
          Year
        </label>
        <input
          type="number"
          value={formData.year}
          onChange={(e) => onFormChange({ ...formData, year: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
          required
        />
      </div>

      {/* Commit Mode */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2.5">
          Mode
        </label>
        <select
          value={formData.commitMode}
          onChange={(e) => onFormChange({ ...formData, commitMode: e.target.value as CommitMode })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
        >
          <option value="random">Random</option>
          <option value="specific">Specific</option>
          <option value="complete">Complete</option>
          <option value="pattern">Pattern</option>
        </select>
      </div>

      {/* Commit Count */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2.5">
          Commits
        </label>
        <input
          type="number"
          value={formData.commitCount}
          onChange={(e) => onFormChange({ ...formData, commitCount: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
          required
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2.5">
          Start
        </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => onFormChange({ ...formData, startDate: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2.5">
          End
        </label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => onFormChange({ ...formData, endDate: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4 space-y-3">
        <button
          type="button"
          onClick={onPreview}
          disabled={isPreviewLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 border border-primary/40 bg-primary/8 text-foreground hover:bg-primary/15 hover:border-primary/60 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/10 active:scale-95"
        >
          {isPreviewLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          )}
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-primary-foreground bg-primary hover:bg-primary-dark transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30 active:scale-95"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Generate
            </>
          )}
        </button>
      </div>
    </form>
  )
}