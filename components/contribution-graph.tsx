"use client";

import React from "react";
import moment from "moment";

interface ContributionGraphProps {
  dateCounts: { [key: string]: number };
  year: string;
}

export function ContributionGraph({
  dateCounts,
  year,
}: ContributionGraphProps) {
  const startOfYear = moment(`${year}-01-01`);
  const endOfYear = moment(`${year}-12-31`);
  const days: { date: string; count: number }[] = [];

  for (
    let date = startOfYear.clone();
    date.isSameOrBefore(endOfYear);
    date.add(1, "days")
  ) {
    const dateStr = date.format("YYYY-MM-DD");
    const count = dateCounts[dateStr] || 0;
    days.push({ date: dateStr, count });
  }

  const getColor = (count: number) => {
    if (count === 0)
      return "bg-green-950/20 shadow-inner border border-green-900/30";
    if (count === 1)
      return "bg-green-900 shadow-[0_0_5px_rgba(34,197,94,0.1)] border border-green-800";
    if (count <= 3)
      return "bg-green-700 shadow-[0_0_8px_rgba(34,197,94,0.2)] border border-green-600";
    if (count <= 6)
      return "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.3)] border border-green-400";
    return "bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)] border border-green-300";
  };

  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  // Align to weeks
  days.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const maxCommits = Math.max(...Object.values(dateCounts), 1);

  return (
    <div className="flex flex-col gap-8 font-mono">
      {/* Legend */}
      <div className="flex items-center justify-between border-b border-green-900/50 pb-4">
        <div className="text-xs font-bold text-green-500 uppercase tracking-[0.2em]">
          &gt; DATA_VISUALIZATION // {year}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-green-900 uppercase font-black">
            MIN
          </span>
          <div className="flex gap-1">
            {[0, 1, 3, 6, 10].map((level) => (
              <div key={level} className={`w-3 h-3 ${getColor(level)}`} />
            ))}
          </div>
          <span className="text-[10px] text-green-400 uppercase font-black">
            MAX
          </span>
        </div>
      </div>

      {/* Graph Area */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
        <div className="flex gap-1 min-w-max p-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-[11px] h-[11px] transition-all duration-300 cursor-crosshair ${getColor(day.count)} hover:scale-125 hover:z-10`}
                  title={`${day.date}: ${day.count} commits`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Terminal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-green-900 bg-black/50">
        <div className="p-4 border-r-2 border-green-900/50">
          <p className="text-[10px] text-green-700 uppercase font-bold mb-2">
            Total commits
          </p>
          <p className="text-2xl font-black text-green-400 leading-none">
            {Object.values(dateCounts)
              .reduce((a, b) => a + b, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="p-4 border-r-2 border-green-900/50">
          <p className="text-[10px] text-green-700 uppercase font-bold mb-2">
            Density index
          </p>
          <p className="text-2xl font-black text-green-400 leading-none">
            {(
              Object.values(dateCounts).reduce((a, b) => a + b, 0) /
              Object.keys(dateCounts).length
            ).toFixed(2)}
          </p>
        </div>
        <div className="p-4">
          <p className="text-[10px] text-green-700 uppercase font-bold mb-2">
            Peak amplitude
          </p>
          <p className="text-2xl font-black text-green-400 leading-none">
            {maxCommits}
          </p>
        </div>
      </div>
    </div>
  );
}
