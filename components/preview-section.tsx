'use client'

import React from 'react'
import { ContributionGraph } from './contribution-graph'

interface PreviewSectionProps {
  previewData: { [key: string]: number } | null
  year: string
}

export function PreviewSection({ previewData, year }: PreviewSectionProps) {
  if (!previewData) return null

  return (
    <div className="w-full">
      <ContributionGraph dateCounts={previewData} year={year} />
    </div>
  )
}