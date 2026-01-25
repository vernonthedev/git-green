'use client'

import React from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface StatusMessageProps {
  message: string
}

export function StatusMessage({ message }: StatusMessageProps) {
  if (!message) return null

  const isError = message.toLowerCase().includes('error')

  return (
    <div className={`relative overflow-hidden rounded-xl px-5 py-4 border backdrop-blur-sm transition-all duration-300 ${
      isError
        ? 'bg-destructive/12 border-destructive/25 text-destructive'
        : 'bg-primary/12 border-primary/25 text-primary'
    }`}>
      <div className={`absolute inset-0 ${isError ? 'bg-gradient-to-r from-destructive/5 to-transparent' : 'bg-gradient-to-r from-primary/5 to-transparent'} pointer-events-none`} />

      <div className="relative flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {isError ? (
            <AlertCircle className="w-5 h-5" strokeWidth={2} />
          ) : (
            <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
          )}
        </div>
        <p className="text-sm font-medium leading-relaxed flex-1">{message}</p>
      </div>
    </div>
  )
}