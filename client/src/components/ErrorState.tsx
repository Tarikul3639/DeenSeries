"use client";

import React from "react";
import { AlertCircle, RefreshCw, Terminal } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  rawError?: any;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again later",
  onRetry,
  rawError,
}: ErrorStateProps) {
  // Handle RTK Query, Axios, or generic error objects
  const errorMessage =
    rawError?.data?.message ||
    rawError?.message ||
    rawError?.error ||
    message;

  return (
    <div className="w-full min-h-100 flex justify-center items-center px-4 py-18 transition-all duration-300">
      <div className="w-full max-w-md text-center bg-rose-50/40 border border-rose-100 rounded-3xl p-8 transition-all duration-300">
        
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mb-5">
          <AlertCircle className="text-rose-500" size={28} />
        </div>

        {/* Title */}
        <h2 className="text-slate-800 font-bold text-lg tracking-tight mb-2 px-4">
          {title}
        </h2>

        {/* Error message */}
        <p className="text-sm text-slate-500 max-w-75 mx-auto leading-relaxed mb-6">
          {errorMessage}
        </p>

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-medium text-sm hover:bg-rose-600 active:scale-[0.98] transition-all duration-200 shadow-sm shadow-rose-500/10 cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
        )}

        {/* Show debug info only in development */}
        {process.env.NODE_ENV === "development" && rawError && (
          <div className="mt-8 border border-rose-100/60 bg-rose-50/20 rounded-2xl p-4 text-left">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[10px] uppercase tracking-wider mb-2">
              <Terminal size={12} />
              <span>Debug Console (Dev Only)</span>
            </div>

            <pre className="text-[11px] font-mono text-slate-600 overflow-auto max-h-37.5 max-w-full p-3 bg-white rounded-xl border border-slate-100 scrollbar-thin">
              {JSON.stringify(rawError, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}