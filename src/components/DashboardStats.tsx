import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, Star, PieChart } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils';

export const DashboardStats: React.FC = () => {
  const { kpiStats } = useExpense();

  return (
    <section className="mb-8 space-y-6">
      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng số dư */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-emerald-800/40 shadow-xl relative overflow-hidden group hover:border-emerald-600 transition-all duration-200">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Tổng Số Dư</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className={`text-2xl font-extrabold tracking-tight ${kpiStats.totalBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCurrency(kpiStats.totalBalance)}
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span>Trạng thái:</span>
              <span className={`font-semibold ${kpiStats.totalBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {kpiStats.totalBalance >= 0 ? 'Thặng dư ngân sách' : 'Bội chi ngân sách'}
              </span>
            </p>
          </div>
        </div>

        {/* Card 2: Tổng thu nhập */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-600 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Tổng Thu Nhập</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-emerald-400">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-emerald-400 tracking-tight">
              +{formatCurrency(kpiStats.totalIncome)}
            </div>
            <p className="text-xs text-slate-400">Từ lương, học bổng &amp; giải thưởng</p>
          </div>
        </div>

        {/* Card 3: Tổng chi tiêu */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-rose-900/60 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Tổng Chi Tiêu</span>
            <div className="w-9 h-9 rounded-xl bg-rose-950/50 border border-rose-800/40 flex items-center justify-center text-rose-400">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-rose-400 tracking-tight">
              -{formatCurrency(kpiStats.totalExpense)}
            </div>
            <p className="text-xs text-slate-400">Học phí, trọ, thiết bị công nghệ &amp; ăn uống</p>
          </div>
        </div>

        {/* Card 4: Giao dịch Yêu thích (F=1) */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-900/30 shadow-xl relative overflow-hidden group hover:border-amber-500/60 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Yêu Thích (F=1)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-950/50 border border-amber-600/40 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-amber-400 tracking-tight">
              {kpiStats.favoriteCount} <span className="text-sm font-normal text-slate-400">mục đã lưu</span>
            </div>
            <p className="text-xs text-slate-400">Được đồng bộ tự động vào localStorage</p>
          </div>
        </div>
      </div>

      {/* Phân bổ tỷ trọng chi tiêu theo danh mục */}
      {kpiStats.categoryBreakdown.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Phân bổ tỷ trọng chi tiêu cá nhân theo danh mục
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Tổng chi: <strong className="text-slate-200">{formatCurrency(kpiStats.totalExpense)}</strong>
            </span>
          </div>

          {/* Thanh progress bar đa màu sắc */}
          <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden gap-0.5 mb-3">
            {kpiStats.categoryBreakdown.map((cat, idx) => (
              <div
                key={idx}
                className="h-full transition-all duration-500 hover:opacity-80"
                style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                title={`${cat.categoryName}: ${cat.percentage}% (${formatCurrency(cat.amount)})`}
              />
            ))}
          </div>

          {/* Chú giải phân bổ danh mục */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
            {kpiStats.categoryBreakdown.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-slate-300 font-medium">{cat.categoryName}</span>
                <span className="text-slate-500 font-mono">({cat.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
