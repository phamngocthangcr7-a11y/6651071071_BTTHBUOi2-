import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-between bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-lg animate-pulse"
      aria-hidden="true"
    >
      <div>
        {/* Top Header: Badge + Amount Placeholder */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-20 bg-slate-800 rounded-md"></div>
            <div className="h-4 w-16 bg-slate-800/60 rounded"></div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-800"></div>
        </div>

        {/* Số tiền Placeholder */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-slate-800"></div>
          <div className="h-7 w-36 bg-slate-800 rounded-lg"></div>
        </div>

        {/* Tiêu đề Placeholder */}
        <div className="h-5 w-4/5 bg-slate-800 rounded mb-2.5"></div>

        {/* Mô tả 2 dòng Placeholder */}
        <div className="space-y-1.5 mb-4">
          <div className="h-3 w-full bg-slate-800/70 rounded"></div>
          <div className="h-3 w-3/4 bg-slate-800/70 rounded"></div>
        </div>

        {/* Metadata Placeholder */}
        <div className="space-y-2 py-3 border-b border-slate-800/60">
          <div className="h-3.5 w-28 bg-slate-800/50 rounded"></div>
          <div className="h-3.5 w-40 bg-slate-800/50 rounded"></div>
        </div>
      </div>

      {/* Card Action Buttons Placeholder */}
      <div className="pt-3.5 flex items-center justify-between gap-2">
        <div className="h-8 w-24 bg-slate-800 rounded-lg"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-slate-800 rounded-lg"></div>
          <div className="h-8 w-8 bg-slate-800 rounded-lg"></div>
          <div className="h-8 w-20 bg-emerald-950/60 border border-emerald-900/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
