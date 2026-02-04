"use client";

import React from "react";
import { Eye, Send, Loader2 } from "lucide-react";
import { FormData, CommitMode } from "../src/types/index";
import { Button } from "@/components/ui/button";

interface GitFormProps {
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onPreview: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isPreviewLoading: boolean;
}

export function GitForm({
  formData,
  onFormChange,
  onPreview,
  onSubmit,
  isLoading,
  isPreviewLoading,
}: GitFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 font-mono">
      {/* Year */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-green-600 uppercase tracking-widest">
          &gt; parameter_year
        </label>
        <input
          type="number"
          value={formData.year}
          onChange={(e) => onFormChange({ ...formData, year: e.target.value })}
          className="w-full px-4 py-2 bg-black border-2 border-green-900 focus:border-green-400 text-green-400 font-mono text-sm placeholder-green-900 focus:outline-none transition-colors"
          required
        />
      </div>

      {/* Commit Mode */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-green-600 uppercase tracking-widest">
          &gt; operation_mode
        </label>
        <select
          value={formData.commitMode}
          onChange={(e) =>
            onFormChange({
              ...formData,
              commitMode: e.target.value as CommitMode,
            })
          }
          className="w-full px-4 py-2 bg-black border-2 border-green-900 focus:border-green-400 text-green-400 font-mono text-sm focus:outline-none cursor-pointer transition-colors"
        >
          <option value="random">RANDOM_WALK</option>
          <option value="specific">SPECIFIC_DENSITY</option>
          <option value="complete">STEADY_STATE</option>
          <option value="pattern">PATTERN_BURST</option>
        </select>
      </div>

      {/* Commit Count */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-green-600 uppercase tracking-widest">
          &gt; commit_frequency
        </label>
        <input
          type="number"
          value={formData.commitCount}
          onChange={(e) =>
            onFormChange({ ...formData, commitCount: e.target.value })
          }
          className="w-full px-4 py-2 bg-black border-2 border-green-900 focus:border-green-400 text-green-400 font-mono text-sm placeholder-green-900 focus:outline-none transition-colors"
          required
        />
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-green-600 uppercase tracking-widest">
          &gt; temporal_start
        </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            onFormChange({ ...formData, startDate: e.target.value })
          }
          className="w-full px-4 py-2 bg-black border-2 border-green-900 focus:border-green-400 text-green-400 font-mono text-sm focus:outline-none transition-colors"
        />
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-green-600 uppercase tracking-widest">
          &gt; temporal_end
        </label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            onFormChange({ ...formData, endDate: e.target.value })
          }
          className="w-full px-4 py-2 bg-black border-2 border-green-900 focus:border-green-400 text-green-400 font-mono text-sm focus:outline-none transition-colors"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4 space-y-4">
        <Button
          type="button"
          onClick={onPreview}
          disabled={isPreviewLoading}
          variant="outline"
          className="w-full bg-black border-2 border-green-600 text-green-400 hover:bg-green-900/30 hover:border-green-400 font-mono font-bold py-6 disabled:opacity-30 disabled:border-green-900"
        >
          {isPreviewLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              RUNNING_PREVIEW...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              EXEC_PREVIEW.SH
            </>
          )}
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-500 text-black font-mono font-bold py-6 border-2 border-green-400 transition-all duration-200 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] active:scale-[0.98] disabled:opacity-30"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              GENERATING...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              GENERATE_COMMITS.BAT
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
