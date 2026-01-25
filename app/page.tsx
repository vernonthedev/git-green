'use client'

import React from "react"
import { useState } from 'react'
import { GitForm } from '../components/git-form'
import { PreviewSection } from '../components/preview-section'
import { StatusMessage } from '../components/status-message'
import { FormData, CommitMode } from '../lib/types/index'

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    year: (new Date().getFullYear() - 1).toString(),
    commitMode: 'random',
    commitCount: '100',
    startDate: '',
    endDate: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [previewData, setPreviewData] = useState<{ [key: string]: number } | null>(null)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)

  const handlePreview = async () => {
    setIsPreviewLoading(true)
    setPreviewData(null)

    try {
      const response = await fetch('/api/preview-commits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok) {
        setPreviewData(result.dateCounts)
        setMessage('')
      } else {
        setMessage(`Preview Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('Failed to generate preview')
    } finally {
      setIsPreviewLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/generate-commits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok) {
        setMessage('Commits generated successfully!')
        setPreviewData(null)
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('Failed to generate commits')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative z-10">
        <div className="w-full max-w-7xl mx-auto px-6 py-6 md:py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                Git Green
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                Generate realistic GitHub contribution patterns. Craft your coding story with custom commit distributions across any timeframe.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Left Column - Form */}
              <div className="lg:col-span-2">
                <div className="sticky top-8 bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3 shadow-lg hover:border-gray-600 transition-colors duration-300">
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-1">
                      Configure
                    </h2>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                      Parameters
                    </p>
                  </div>

                  <GitForm
                    formData={formData}
                    onFormChange={setFormData}
                    onPreview={handlePreview}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    isPreviewLoading={isPreviewLoading}
                  />
                </div>
              </div>

              {/* Right Column - Preview & Status */}
              <div className="lg:col-span-3 space-y-3">
                {/* Preview Card */}
                {previewData && (
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-lg hover:border-gray-600 transition-colors duration-300">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
                      Preview
                    </h3>
                    <PreviewSection previewData={previewData} year={formData.year} />
                  </div>
                )}

                {/* Info Cards */}
                {!previewData && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3 shadow-md hover:border-gray-600 transition-colors duration-300">
                      <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-wide mb-3">Year</h3>
                      <p className="text-3xl font-bold text-green-400">{formData.year}</p>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3 shadow-md hover:border-gray-600 transition-colors duration-300">
                      <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-wide mb-3">Commits</h3>
                      <p className="text-3xl font-bold text-green-400">{formData.commitCount}</p>
                    </div>
                  </div>
                )}

                {/* Status Message */}
                {message && <StatusMessage message={message} />}

                {/* Help Text */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-3 text-center shadow-sm hover:border-gray-600 transition-colors duration-300">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Preview your graph before generating to ensure the pattern matches your expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }