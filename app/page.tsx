'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import { FormData, CommitMode } from '../lib/types/index'

function ContributionGraph({ dateCounts, year }: { dateCounts: { [key: string]: number }, year: string }) {
  const startOfYear = moment(`${year}-01-01`)
  const endOfYear = moment(`${year}-12-31`)
  const days = []

  for (let date = startOfYear.clone(); date.isSameOrBefore(endOfYear); date.add(1, 'days')) {
    const dateStr = date.format('YYYY-MM-DD')
    const count = dateCounts[dateStr] || 0
    days.push({ date: dateStr, count })
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800'
    if (count === 1) return 'bg-green-900'
    if (count <= 3) return 'bg-green-700'
    if (count <= 6) return 'bg-green-500'
    return 'bg-green-300'
  }

  // Group by weeks
  const weeks = []
  let currentWeek = []
  days.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  return (
    <div className="flex space-x-0.5 overflow-x-auto max-w-full">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col space-y-0.5">
          {week.map((day) => (
            <div
              key={day.date}
              className={`w-3 h-3 rounded-sm ${getColor(day.count)} hover:scale-125 transition-transform`}
              title={`${day.date}: ${day.count} commits`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

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
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700 max-w-4xl mx-auto"
        >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-5xl font-bold text-center text-green-400 mb-4 drop-shadow-lg"
        >
          🌱 Git Green
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-300 mb-8 text-lg"
        >
          Create beautiful GitHub contribution graphs
        </motion.p>

        {previewData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold text-center text-gray-300 mb-6">Contribution Graph Preview</h3>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 shadow-lg flex justify-center">
              <ContributionGraph dateCounts={previewData} year={formData.year} />
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Commit Mode
            </label>
            <select
              value={formData.commitMode}
              onChange={(e) => setFormData({ ...formData, commitMode: e.target.value as CommitMode })}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="random">Random</option>
              <option value="specific">Specific</option>
              <option value="complete">Complete</option>
              <option value="pattern">Pattern</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Commit Count
            </label>
            <input
              type="number"
              value={formData.commitCount}
              onChange={(e) => setFormData({ ...formData, commitCount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Start Date (optional)
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-1">
              End Date (optional)
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </motion.div>

          <div className="flex space-x-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              type="button"
              onClick={handlePreview}
              disabled={isPreviewLoading}
              className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors font-semibold"
            >
              {isPreviewLoading ? 'Loading Preview...' : 'Preview Graph'}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-colors font-semibold"
            >
              {isLoading ? 'Generating...' : 'Generate Commits'}
            </motion.button>
          </div>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-gray-300"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
      </div>
    </div>
  )
}