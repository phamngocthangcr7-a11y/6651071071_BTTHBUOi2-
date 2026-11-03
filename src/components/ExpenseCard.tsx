import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, Calendar, ArrowUpRight, ArrowDownRight, Edit2, Trash2 } from 'lucide-react';
import { ExpenseItem } from '../types';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, truncateText } from '../utils';
import { TransactionBanner } from './TransactionBanner';

interface ExpenseCardProps {
  item: ExpenseItem;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ item }) => {
  const { state, toggleFavorite, openDetailModal, openEditModal, deleteExpense } = useExpense();
  const isFavorite = state.favorites.includes(item.id);
  const isIncome = item.type === 'income';

  // Biểu tượng & màu badge danh mục
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'education':
        return { label: 'Học tập', bg: 'bg-emerald-950/90 text-emerald-300 border-emerald-600/70' };
      case 'living':
        return { label: 'Nhà ở & Tiện ích', bg: 'bg-blue-950/90 text-blue-300 border-blue-600/70' };
      case 'food':
        return { label: 'Ăn uống', bg: 'bg-amber-950/90 text-amber-300 border-amber-600/70' };
      case 'transport':
        return { label: 'Di chuyển', bg: 'bg-purple-950/90 text-purple-300 border-purple-600/70' };
      case 'tech':
        return { label: 'Công nghệ & Thiết bị', bg: 'bg-cyan-950/90 text-cyan-300 border-cyan-600/70' };
      case 'entertainment':
        return { label: 'Giải trí & Thể thao', bg: 'bg-pink-950/90 text-pink-300 border-pink-600/70' };
      case 'health':
        return { label: 'Sức khỏe', bg: 'bg-red-950/90 text-red-300 border-red-600/70' };
      case 'income':
        return { label: 'Thu nhập & Lương', bg: 'bg-emerald-950/90 text-emerald-300 border-emerald-600/70' };
      default:
        return { label: item.categoryName, bg: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const badge = getCategoryBadge(item.category);

  return (
    <article className="flex flex-col justify-between bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-600/80 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-2xl hover:shadow-emerald-950/50 transition-all duration-200 group">
      <div>
        {/* Header trên thẻ: Badge danh mục & Nút Yêu thích (F=1) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${badge.bg}`}
          >
            {badge.label}
          </span>

          {/* Nút Yêu thích (F=1) - Bắt buộc có aria-label và aria-pressed */}
          <button
            type="button"
            onClick={() => toggleFavorite(item.id)}
            className={`p-1.5 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              isFavorite
                ? 'bg-amber-950/90 border-amber-500 text-amber-400 shadow-sm'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-400'
            }`}
            aria-label={isFavorite ? `Bỏ yêu thích giao dịch ${item.title}` : `Thêm giao dịch ${item.title} vào yêu thích`}
            aria-pressed={isFavorite}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Voucher Đồ Họa Số Hóa Nhận Diện Thương Hiệu 100% Chân Thực Sinh Viên UTC2 */}
        <div className="mb-3.5">
          <TransactionBanner item={item} />
        </div>

        {/* Số tiền giao dịch nổi bật */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isIncome ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
              }`}
            >
              {isIncome ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            </div>
            <span
              className={`text-xl font-bold tracking-tight ${
                isIncome ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
            </span>
          </div>
        </div>

        {/* Tiêu đề khoản thu chi */}
        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 line-clamp-1">
          {item.title}
        </h3>

        {/* Mô tả cắt ngắn bằng hàm truncateText từ utils.ts */}
        <p className="text-xs text-slate-400 mb-3.5 line-clamp-2 leading-relaxed">
          {truncateText(item.description, 75)}
        </p>

        {/* Metadata: Ngày giao dịch + Nơi thực hiện */}
        <div className="space-y-1.5 text-xs text-slate-400 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Ngày: <strong className="text-slate-300">{item.date}</strong></span>
          </div>
          <div className="truncate">
            <span className="text-slate-500">Đối tác: </span>
            <span className="text-slate-300 font-medium">{item.merchantOrPayer}</span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Footer of Card) */}
      <div className="pt-3.5 flex items-center justify-between gap-2">
        {/* Nút Xem nhanh Modal (F=1) */}
        <button
          type="button"
          onClick={() => openDetailModal(item)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label={`Xem nhanh chi tiết modal cho giao dịch ${item.title}`}
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Xem nhanh</span>
        </button>

        {/* Nhóm nút Sửa & Xóa & Link chi tiết */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => openEditModal(item)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={`Chỉnh sửa giao dịch ${item.title}`}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => deleteExpense(item.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label={`Xóa giao dịch ${item.title}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Điều hướng nội bộ bằng <Link> (TUYỆT ĐỐI KHÔNG dùng <a href>) */}
          <Link
            to={`/item/${item.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label={`Xem trang chi tiết hóa đơn giao dịch ${item.title}`}
          >
            <span>Chi tiết</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
