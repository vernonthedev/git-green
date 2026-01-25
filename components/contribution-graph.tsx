'use client'

import React from 'react'
import moment from 'moment'

interface ContributionGraphProps {
  dateCounts: { [key: string]: number }
  year: string
}

export function ContributionGraph({ dateCounts, year }: ContributionGraphProps) {
  const startOfYear = moment(`${year}-01-01`)
  const endOfYear = moment(`${year}-12-31`)
  const days: { date: string; count: number }[] = []

  for (let date = startOfYear.clone(); date.isSameOrBefore(endOfYear); date.add(1, 'days')) {
    const dateStr = date.format('YYYY-MM-DD')
    const count = dateCounts[dateStr] || 0
    days.push({ date: dateStr, count })
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-neutral-700/40 hover:bg-neutral-600/50'
    if (count === 1) return 'bg-primary/35'
    if (count <= 3) return 'bg-primary/55'
    if (count <= 6) return 'bg-primary/75'
    return 'bg-primary hover:shadow-lg hover:shadow-primary/40'
  }

  const weeks: { date: string; count: number }[][] = []
  let currentWeek: { date: string; count: number }[] = []
  days.forEach((day, index) => {
    currentWeek.push(day)
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  const displayWeeks = weeks;

  const maxCommits = Math.max(...Object.values(dateCounts), 1)

  return (
    <div className="flex flex-col gap-6">
      {/* Legend */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-foreground/70 uppercase tracking-wide">
          {year} Contributions
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/50">Less</span>
          <div className="flex gap-px">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-sm ${
                  level === 0
                    ? 'bg-neutral-700/40'
                    : level === 1
                      ? 'bg-primary/35'
                      : level === 2
                        ? 'bg-primary/55'
                        : level === 3
                          ? 'bg-primary/75'
                          : 'bg-primary'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-foreground/50">More</span>
        </div>
      </div>

      {/* Graph */}
      <div className="flex flex-nowrap gap-px pb-2">
        {displayWeeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="flex flex-col gap-px"
          >
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-md transition-all duration-200 cursor-pointer ${getColor(day.count)} hover:scale-110`}
                title={`${day.date}: ${day.count} commits`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-neutral-200/5">
        <div className="text-center">
          <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-1">Total</p>
          <p className="text-lg font-semibold text-primary">{Object.values(dateCounts).reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-1">Average</p>
          <p className="text-lg font-semibold text-primary">{(Object.values(dateCounts).reduce((a, b) => a + b, 0) / Object.keys(dateCounts).length).toFixed(1)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-1">Peak</p>
          <p className="text-lg font-semibold text-primary">{maxCommits}</p>
        </div>
      </div>
    </div>
  )
}