import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Calendar, ArrowUpRight, ArrowDownRight, Tag, ShieldCheck, CreditCard, Mail } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils';
import { TransactionBanner } from './TransactionBanner';
import { TransactionProofIllustration } from './TransactionProofIllustration';

export const ExpenseModal: React.FC = () => {
  const { state, closeDetailModal, toggleFavorite } = useExpense();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const item = state.selectedItemForModal;
  const isFavorite = item ? state.favorites.includes(item.id) : false;

  // BẪY TIÊU ĐIỂM (FOCUS TRAP) & ĐÓNG BẰNG PHÍM ESC (BẮT BUỘC THEO ĐỀ BÀI F=1)
  useEffect(() => {
    if (!item) return;

    // 1. Lưu lại phần tử đang có tiêu điểm trước khi mở modal để hoàn trả khi đóng
    previousActiveElement.current = document.activeElement as HTMLElement;

    // 2. Khóa cuộn trang nền khi modal hiển thị
    document.body.style.overflow = 'hidden';

    // 3. Đưa tiêu điểm vào phần tử tương tác đầu tiên bên trong modal
    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusFirstElement = () => {
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };

    // Timeout ngắn để đảm bảo modal đã render hoàn tất trong DOM
    const timer = setTimeout(focusFirstElement, 50);

    // 4. Bắt sự kiện bàn phím: ESC để đóng, TAB để bẫy tiêu điểm xoay vòng
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDetailModal();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
        if (focusableElements.length === 0) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Khi nhấn Shift + Tab tại phần tử đầu tiên -> chuyển focus về phần tử cuối
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          // Khi nhấn Tab tại phần tử cuối cùng -> chuyển focus về phần tử đầu
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Dọn dẹp sự kiện và hoàn trả tiêu điểm khi unmount hoặc đóng modal
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [item, closeDetailModal]);

  if (!item) return null;

  const isIncome = item.type === 'income';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeDetailModal}
      role="presentation"
    >
      {/* Modal Dialog Container - Bắt buộc Focus Trap bên trong */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-expense-title"
        onClick={(e) => e.stopPropagation()} // Ngăn chặn nổi bọt sự kiện để không đóng khi click trong modal
        className="w-full max-w-lg bg-slate-900 border border-emerald-700/60 rounded-3xl shadow-2xl shadow-emerald-950/50 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Chi Tiết Nhanh (Focus Trap Active)
            </span>
          </div>

          <button
            type="button"
            onClick={closeDetailModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Đóng cửa sổ modal chi tiết"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Ảnh chụp thực tế của giao dịch sinh viên */}
          {item.imageUrl && (
            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg bg-slate-950">
              <img
                src={item.imageUrl}
                alt={`Hình ảnh chụp thực tế cho ${item.title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-xs text-white font-medium shadow-md">
                📷 {item.merchantOrPayer}
              </span>
            </div>
          )}

          {/* Banner Nhận diện giao dịch sinh viên UTC2 chuẩn xác 100% */}
          <TransactionBanner item={item} size="lg" />

          {/* Header Khoản tiền & Tiêu đề */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                {item.categoryName}
              </span>
              <span className="text-xs text-slate-500 font-mono">Mã: #{item.invoiceNumber}</span>
            </div>

            <h2 id="modal-expense-title" className="text-xl font-extrabold text-white mb-2">
              {item.title}
            </h2>

            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  isIncome ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                }`}
              >
                {isIncome ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
              <span className={`text-2xl font-black ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
              </span>
            </div>
          </div>

          {/* Mô tả chi tiết */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-400 mb-1 text-[11px] uppercase tracking-wider">Mô tả giao dịch:</p>
            {item.description}
          </div>

          {/* Thông tin chi tiết dạng Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span className="text-slate-500 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Ngày ghi nhận:
              </span>
              <span className="font-semibold text-slate-200">{item.date}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span className="text-slate-500 flex items-center gap-1 mb-1">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Phương thức:
              </span>
              <span className="font-semibold text-slate-200">{item.paymentMethod}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span className="text-slate-500 flex items-center gap-1 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Đối tác / Nơi chi:
              </span>
              <span className="font-semibold text-slate-200 truncate block">{item.merchantOrPayer}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span className="text-slate-500 flex items-center gap-1 mb-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email liên hệ:
              </span>
              <span className="font-semibold text-emerald-400 truncate block">{item.contactEmail}</span>
            </div>
          </div>

          {/* Phiếu Hóa Đơn Minh Họa Thực Tế */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Biên lai chứng từ bán lẻ thực tế:
            </span>
            <TransactionProofIllustration item={item} />
          </div>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Ghi chú hướng dẫn sử dụng phím tắt Focus Trap cho GV */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-[11px] text-emerald-300">
            <strong>Bẫy tiêu điểm (Focus Trap):</strong> Bấm phím <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-600 font-mono text-white">ESC</kbd> để đóng modal. Bấm phím <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-600 font-mono text-white">Tab</kbd> hoặc <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-emerald-600 font-mono text-white">Shift+Tab</kbd> để luân chuyển tiêu điểm chỉ bên trong hộp thoại này.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          {/* Nút Yêu thích trong Modal */}
          <button
            type="button"
            onClick={() => toggleFavorite(item.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              isFavorite
                ? 'bg-amber-950/60 border-amber-600/70 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-amber-400'
            }`}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Bỏ mục này khỏi danh sách yêu thích' : 'Thêm mục này vào danh sách yêu thích'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFavorite ? 'Đã yêu thích' : 'Yêu thích'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeDetailModal}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Đóng (ESC)
            </button>

            {/* Link điều hướng sang trang chi tiết đầy đủ (TUYỆT ĐỐI KHÔNG dùng <a href>) */}
            <Link
              to={`/item/${item.id}`}
              onClick={closeDetailModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <span>Xem trang đầy đủ</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
