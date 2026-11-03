import React, { useState, useMemo } from 'react';
import { Search, Star, RefreshCw, ArrowUpDown, Tag } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { debounce } from '../utils';
import { FilterType, SortOption } from '../types';

export const FilterBar: React.FC = () => {
  const { state, dispatch, triggerSkeletonReload } = useExpense();
  const [localSearch, setLocalSearch] = useState(state.filters.searchQuery);

  // Tạo hàm debounce cho tìm kiếm (300ms) sử dụng chính hàm debounce từ src/utils.ts
  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: val });
      }, 300),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    debouncedSetSearch(val);
  };

  const handleTypeChange = (type: FilterType) => {
    dispatch({ type: 'SET_TYPE_FILTER', payload: type });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_SORT_BY', payload: e.target.value as SortOption });
  };

  const handleToggleFavorites = () => {
    dispatch({ type: 'SET_ONLY_FAVORITES', payload: !state.filters.onlyFavorites });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6 space-y-4">
      {/* Hàng 1: Ô tìm kiếm + Nút Yêu thích + Nút Skeleton Reload */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input có debounce 300ms */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={handleSearchChange}
            placeholder="Tìm theo tiêu đề, ghi chú, đơn vị, mã hóa đơn (debounce 300ms)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch('');
                dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
              aria-label="Xóa nội dung tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Nút lọc mục Yêu thích (F=1) & Nút kiểm tra Skeleton (F=1) */}
        <div className="flex items-center gap-2">
          {/* Tab / Nút Yêu thích (F=1) */}
          <button
            type="button"
            onClick={handleToggleFavorites}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              state.filters.onlyFavorites
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-md shadow-amber-900/20'
                : 'bg-slate-950 text-slate-300 border-slate-700 hover:border-amber-500/50 hover:text-amber-300'
            }`}
            aria-pressed={state.filters.onlyFavorites}
            aria-label="Chỉ hiển thị các khoản chi tiêu yêu thích"
          >
            <Star className={`w-4 h-4 ${state.filters.onlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            <span>Yêu thích ({state.favorites.length})</span>
          </button>

          {/* Nút Làm mới dữ liệu (Xem Skeleton) cho giảng viên kiểm tra (F=1) */}
          <button
            type="button"
            onClick={triggerSkeletonReload}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/80 hover:border-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            title="Kích hoạt hiệu ứng Skeleton Loading để giảng viên kiểm tra"
            aria-label="Làm mới dữ liệu xem hiệu ứng Skeleton"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${state.isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Xem Skeleton (F=1)</span>
          </button>
        </div>
      </div>

      {/* Hàng 2: Bộ lọc Loại giao dịch + Danh mục + Sắp xếp */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
        {/* Type Filter Buttons */}
        <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => handleTypeChange('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              state.filters.type === 'all'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              state.filters.type === 'income'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Thu nhập (+)
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              state.filters.type === 'expense'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Chi tiêu (-)
          </button>
        </div>

        {/* Category & Sort Dropdowns */}
        <div className="flex items-center gap-2.5">
          {/* Lọc danh mục */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={state.filters.category}
              onChange={handleCategoryChange}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              aria-label="Lọc theo danh mục"
            >
              <option value="all" className="bg-slate-900 text-white">Tất cả danh mục</option>
              <option value="education" className="bg-slate-900 text-white">Học tập</option>
              <option value="living" className="bg-slate-900 text-white">Nhà ở &amp; Sinh hoạt</option>
              <option value="food" className="bg-slate-900 text-white">Ăn uống</option>
              <option value="transport" className="bg-slate-900 text-white">Di chuyển</option>
              <option value="tech" className="bg-slate-900 text-white">Công nghệ &amp; Thiết bị</option>
              <option value="entertainment" className="bg-slate-900 text-white">Giải trí &amp; Thể thao</option>
              <option value="health" className="bg-slate-900 text-white">Sức khỏe</option>
              <option value="income" className="bg-slate-900 text-white">Thu nhập &amp; Lương</option>
            </select>
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={state.filters.sortBy}
              onChange={handleSortChange}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              aria-label="Sắp xếp kết quả"
            >
              <option value="date-desc" className="bg-slate-900 text-white">Mới nhất trước</option>
              <option value="date-asc" className="bg-slate-900 text-white">Cũ nhất trước</option>
              <option value="amount-desc" className="bg-slate-900 text-white">Số tiền cao nhất</option>
              <option value="amount-asc" className="bg-slate-900 text-white">Số tiền thấp nhất</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
