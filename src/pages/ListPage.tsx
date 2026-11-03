import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { DashboardStats } from '../components/DashboardStats';
import { FilterBar } from '../components/FilterBar';
import { ExpenseCard } from '../components/ExpenseCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { PlusCircle, SearchX } from 'lucide-react';

export const ListPage: React.FC = () => {
  const { state, filteredItems, dispatch, openAddModal } = useExpense();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 4 Thẻ KPI + Thanh tỷ trọng danh mục */}
      <DashboardStats />

      {/* Thanh công cụ tìm kiếm debounce + lọc thu chi/danh mục + lọc Yêu thích (F=1) */}
      <FilterBar />

      {/* Tiêu đề danh sách & Tổng số kết quả */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white tracking-tight">Danh Sách Giao Dịch</h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
            {state.isLoading ? 'Đang tải...' : `${filteredItems.length} mục`}
          </span>
        </div>

        {state.filters.onlyFavorites && (
          <span className="text-xs font-medium text-amber-400 flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-800/40">
            ★ Đang lọc tab Yêu thích (F=1)
          </span>
        )}
      </div>

      {/* Grid danh sách giao dịch - ĐÁP ỨNG CHÍNH XÁC 3 BREAKPOINTS THEO ĐỀ BÀI:
          < 640px: 1 cột (grid-cols-1)
          640 - 1024px: 2 cột (sm:grid-cols-2)
          > 1024px: 3 đến 4 cột (lg:grid-cols-3 xl:grid-cols-4)
      */}
      {state.isLoading ? (
        // Hiển thị khung xương nhấp nháy Skeleton Loading (F=1)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        // Danh sách thẻ giao dịch thực tế
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ExpenseCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        // Trạng thái trống (Empty State)
        <div className="text-center py-16 px-4 bg-slate-900/40 border border-slate-800 rounded-3xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-500 mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Không tìm thấy khoản thu chi nào</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
            Không có giao dịch nào khớp với bộ lọc hoặc từ khóa tìm kiếm hiện tại của bạn.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                dispatch({ type: 'SET_TYPE_FILTER', payload: 'all' });
                dispatch({ type: 'SET_CATEGORY_FILTER', payload: 'all' });
                dispatch({ type: 'SET_ONLY_FAVORITES', payload: false });
              }}
              className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              Đặt lại bộ lọc
            </button>
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Thêm giao dịch mới</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
