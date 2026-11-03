import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Edit2,
  Trash2,
  Calendar,
  CreditCard,
  Building,
  Mail,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils';
import receiptSvg from '../assets/receipt-placeholder.svg';
import { TransactionBanner } from '../components/TransactionBanner';
import { TransactionProofIllustration } from '../components/TransactionProofIllustration';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, toggleFavorite, openEditModal, deleteExpense } = useExpense();

  const item = useMemo(() => {
    return state.items.find((it) => it.id === id);
  }, [state.items, id]);

  const isFavorite = item ? state.favorites.includes(item.id) : false;

  // Các giao dịch liên quan cùng danh mục
  const relatedItems = useMemo(() => {
    if (!item) return [];
    return state.items
      .filter((it) => it.category === item.category && it.id !== item.id)
      .slice(0, 3);
  }, [state.items, item]);

  const handleDelete = () => {
    if (item) {
      deleteExpense(item.id);
      navigate('/');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết chi tiết giao dịch vào bộ nhớ tạm!');
    }
  };

  // Trường hợp không tìm thấy giao dịch (404 Not Found)
  if (!item) {
    return (
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-950/50 border border-rose-800 flex items-center justify-center text-rose-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Không tìm thấy giao dịch</h1>
        <p className="text-xs text-slate-400 mb-6">
          Khoản thu chi với mã định danh <code className="text-emerald-400">"{id}"</code> không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chủ danh sách</span>
        </Link>
      </main>
    );
  }

  const isIncome = item.type === 'income';

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb Navigation - BẮT BUỘC DÙNG <Link>, KHÔNG DÙNG <a href> */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Danh sách chi tiêu</span>
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400">{item.categoryName}</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-200 font-semibold truncate max-w-xs">#{item.invoiceNumber}</span>
      </nav>

      {/* Main Digital Receipt Card */}
      <div className="bg-slate-900 border border-emerald-800/60 rounded-3xl shadow-2xl shadow-emerald-950/40 overflow-hidden">
        {/* Receipt Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 px-6 sm:px-8 py-6 border-b border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                {isIncome ? 'KHOẢN THU VÀO' : 'KHOẢN CHI RA'}
              </span>
              <span className="text-xs text-emerald-200/80 font-mono">#{item.invoiceNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {item.title}
            </h1>
            <p className="text-xs text-emerald-200/90 mt-1">
              Giao dịch sinh viên CNTT UTC2 • Phạm Ngọc Thắng - 6651071071
            </p>
          </div>

          {/* Quick Actions (Yêu thích F=1, Sửa, Xóa, Chia sẻ) */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Nút Yêu thích (F=1) */}
            <button
              type="button"
              onClick={() => toggleFavorite(item.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isFavorite
                  ? 'bg-amber-950/70 border-amber-500 text-amber-300 shadow-md shadow-amber-950/40'
                  : 'bg-slate-950/60 border-slate-700 text-slate-200 hover:text-amber-400'
              }`}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Đã yêu thích' : 'Yêu thích'}</span>
            </button>

            {/* Sửa */}
            <button
              type="button"
              onClick={() => openEditModal(item)}
              className="p-2 rounded-xl bg-slate-950/60 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Chỉnh sửa giao dịch này"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            {/* Xóa */}
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-xl bg-slate-950/60 border border-rose-900/60 text-slate-300 hover:text-rose-400 transition-colors"
              aria-label="Xóa giao dịch này"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-950/60 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Chia sẻ liên kết giao dịch"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Amount & Layout Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1 & 2: Thông tin chi tiết */}
          <div className="md:col-span-2 space-y-6">
            {/* Ảnh chụp thực tế của khoản giao dịch sinh viên */}
            {item.imageUrl && (
              <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 group">
                <img
                  src={item.imageUrl}
                  alt={`Hình ảnh minh họa thực tế cho ${item.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 font-medium flex items-center gap-2 shadow-lg">
                    <span role="img" aria-label="camera">📷</span>
                    <span>Hình ảnh thực tế: <strong className="text-emerald-400">{item.merchantOrPayer}</strong></span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-xl bg-emerald-950/85 backdrop-blur-md border border-emerald-600/70 text-emerald-300 font-semibold shadow-lg">
                    Xác thực hệ thống UTC2
                  </span>
                </div>
              </div>
            )}

            {/* Banner Nhận diện giao dịch đối tác chuẩn xác */}
            <TransactionBanner item={item} size="lg" />

            {/* Banner Số tiền */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                  Giá Trị Giao Dịch
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isIncome ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                    }`}
                  >
                    {isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-3xl sm:text-4xl font-black tracking-tight ${
                      isIncome ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Định kỳ</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {item.isRecurring ? 'Định kỳ hàng tháng' : 'Phát sinh một lần'}
                </span>
              </div>
            </div>

            {/* Ghi chú mô tả đầy đủ */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Nội Dung Chi Tiết Khoản Thu Chi</span>
              </h3>
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                {item.description}
              </div>
            </div>

            {/* Hóa Đơn & Chứng Từ Bán Lẻ Thực Tế Riêng Biệt Cho Từng Khoản */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Hóa Đơn &amp; Chứng Từ Điện Tử Thực Tế</span>
              </h3>
              <TransactionProofIllustration item={item} />
            </div>

            {/* Bảng thuộc tính chi tiết */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Ngày thực hiện:</span>
                </span>
                <p className="font-bold text-slate-100 text-sm">{item.date}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span>Phương thức thanh toán:</span>
                </span>
                <p className="font-bold text-slate-100 text-sm">{item.paymentMethod}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-500" />
                  <span>Đơn vị / Đối tác:</span>
                </span>
                <p className="font-bold text-slate-100 text-sm">{item.merchantOrPayer}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span>Email chứng từ liên hệ:</span>
                </span>
                <p className="font-bold text-emerald-400 text-sm truncate">{item.contactEmail}</p>
              </div>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Nhãn phân loại (Tags):</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-emerald-300 border border-emerald-900/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cột 3: Hóa đơn điện tử minh họa & Giao dịch liên quan */}
          <div className="space-y-6">
            {/* Ảnh minh họa hóa đơn - Yêu cầu Accessibility: alt thật */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-800/40 text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Biên Lai Điện Tử (Digital Stamp)
              </span>
              <img
                src={receiptSvg}
                alt={`Biên lai điện tử xác thực khoản thu chi ${item.title} mã ${item.invoiceNumber}`}
                className="w-48 h-auto mx-auto rounded-xl shadow-lg border border-emerald-900/50"
              />
              <p className="text-[11px] text-slate-400">
                Chứng từ số hóa được ký điện tử bởi hệ thống EmeraldSpend.
              </p>
            </div>

            {/* Giao dịch liên quan cùng danh mục */}
            {relatedItems.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Cùng danh mục "{item.categoryName}"
                </h4>
                <div className="space-y-2.5">
                  {relatedItems.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/item/${rel.id}`}
                      className="block p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-700 transition-colors group"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-200 group-hover:text-emerald-300 truncate max-w-[160px]">
                          {rel.title}
                        </span>
                        <span
                          className={`font-bold ${rel.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}
                        >
                          {rel.type === 'income' ? '+' : '-'}{formatCurrency(rel.amount)}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">{rel.date}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
