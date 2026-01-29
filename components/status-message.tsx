"use client";

import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface StatusMessageProps {
  message: string;
}

export function StatusMessage({ message }: StatusMessageProps) {
  if (!message) return null;

  const isError = message.toLowerCase().includes("error");

  return (
    <div
      className={`p-4 border-2 font-mono ${
        isError
          ? "bg-red-950/20 border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
          : "bg-green-950/20 border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          {isError ? (
            <AlertCircle className="w-5 h-5 animate-pulse" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">
            {isError ? "[ FATAL_ERROR ]" : "[ SYSTEM_LOG ]"}
          </p>
          <p className="text-sm font-bold leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
