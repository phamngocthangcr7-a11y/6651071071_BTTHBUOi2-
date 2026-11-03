import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-between bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg animate-pulse"
      aria-hidden="true"
    >
      <div>
        {/* Banner Hình ảnh Skeleton (khớp 100% kích thước ảnh ExpenseCard để CLS = 0) */}
        <div className="relative h-40 w-full rounded-xl mb-3.5 bg-slate-800/80 overflow-hidden">
          <div className="absolute top-2.5 left-2.5 h-5 w-20 bg-slate-700/80 rounded-md"></div>
          <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-slate-700/80 rounded-lg"></div>
          <div className="absolute bottom-2 left-2.5 h-4 w-24 bg-slate-700/80 rounded"></div>
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
