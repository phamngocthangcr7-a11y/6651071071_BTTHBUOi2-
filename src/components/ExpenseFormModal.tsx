import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { ExpenseItem, TransactionType, ExpenseCategory } from '../types';
import { validateEmail } from '../utils';

export const ExpenseFormModal: React.FC = () => {
  const { state, closeFormModal, saveExpense } = useExpense();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const editingItem = state.editingItem;
  const isEditing = Boolean(editingItem);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<ExpenseCategory>('education');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [merchantOrPayer, setMerchantOrPayer] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Chuyển khoản Vietcombank');
  const [contactEmail, setContactEmail] = useState('thang.pn6651071071@utc2.edu.vn');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setAmount(editingItem.amount);
      setType(editingItem.type);
      setCategory(editingItem.category);
      setDate(editingItem.date);
      setMerchantOrPayer(editingItem.merchantOrPayer);
      setPaymentMethod(editingItem.paymentMethod);
      setContactEmail(editingItem.contactEmail);
      setDescription(editingItem.description);
      setTagsInput(editingItem.tags.join(', '));
      setInvoiceNumber(editingItem.invoiceNumber);
      setImageUrl(editingItem.imageUrl || '');
    } else {
      setTitle('');
      setAmount('');
      setType('expense');
      setCategory('education');
      setDate(new Date().toISOString().split('T')[0]);
      setMerchantOrPayer('');
      setPaymentMethod('Chuyển khoản Vietcombank');
      setContactEmail('thang.pn6651071071@utc2.edu.vn');
      setDescription('');
      setTagsInput('');
      setInvoiceNumber(`INV-UTC2-${Date.now().toString().slice(-4)}`);
      setImageUrl('');
    }
    setErrors({});
  }, [editingItem, state.isFormModalOpen]);

  // Focus trap & ESC key
  useEffect(() => {
    if (!state.isFormModalOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const els = modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
        if (els.length > 0) els[0].focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeFormModal();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const els = modalRef.current.querySelectorAll<HTMLElement>(focusableSelector);
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [state.isFormModalOpen, closeFormModal]);

  if (!state.isFormModalOpen) return null;

  const categoryNameMap: Record<ExpenseCategory, string> = {
    education: 'Học tập',
    living: 'Nhà ở & Tiện ích',
    food: 'Ăn uống',
    transport: 'Di chuyển',
    tech: 'Công nghệ & Thiết bị',
    entertainment: 'Giải trí & Thể thao',
    health: 'Sức khỏe',
    income: 'Thu nhập & Lương',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Vui lòng nhập tên khoản giao dịch.';
    if (!amount || amount <= 0) newErrors.amount = 'Số tiền phải lớn hơn 0.';
    if (!date) newErrors.date = 'Vui lòng chọn ngày giao dịch.';
    if (!merchantOrPayer.trim()) newErrors.merchantOrPayer = 'Vui lòng nhập đối tác hoặc đơn vị thanh toán.';
    if (!contactEmail.trim() || !validateEmail(contactEmail)) {
      newErrors.contactEmail = 'Email không hợp lệ (ví dụ: ten@utc2.edu.vn).';
    }
    if (!description.trim()) newErrors.description = 'Vui lòng nhập mô tả chi tiết.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newItem: ExpenseItem = {
      id: editingItem?.id ?? `exp-${Date.now()}`,
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      categoryName: categoryNameMap[category] || 'Khác',
      date,
      description: description.trim(),
      paymentMethod,
      contactEmail: contactEmail.trim(),
      merchantOrPayer: merchantOrPayer.trim(),
      tags: tags.length > 0 ? tags : ['Sinh viên UTC2'],
      invoiceNumber: invoiceNumber.trim() || `UTC2-${Date.now().toString().slice(-4)}`,
      isRecurring: editingItem?.isRecurring ?? false,
      imageUrl: imageUrl.trim() || editingItem?.imageUrl || 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80',
    };

    saveExpense(newItem);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeFormModal}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-slate-900 border border-emerald-700/60 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <h2 id="form-modal-title" className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>{isEditing ? 'Chỉnh Sửa Khoản Thu Chi' : 'Thêm Giao Dịch Mới'}</span>
          </h2>
          <button
            type="button"
            onClick={closeFormModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Đóng cửa sổ thêm giao dịch"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Loại giao dịch (Thu / Chi) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Loại giao dịch:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  type === 'expense'
                    ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-md shadow-rose-950/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Khoản Chi Tiêu (-)
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  type === 'income'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Khoản Thu Nhập (+)
              </button>
            </div>
          </div>

          {/* Tiêu đề & Số tiền */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="expense-title-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Tên giao dịch: <span className="text-rose-400">*</span>
              </label>
              <input
                id="expense-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Học phí HK2 UTC2..."
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="expense-amount-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Số tiền (VNĐ): <span className="text-rose-400">*</span>
              </label>
              <input
                id="expense-amount-input"
                type="number"
                min="1000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Ví dụ: 4500000"
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.amount && <p className="text-[11px] text-rose-400 mt-1">{errors.amount}</p>}
            </div>
          </div>

          {/* Danh mục & Ngày */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="expense-cat-select" className="block text-xs font-semibold text-slate-300 mb-1">
                Danh mục:
              </label>
              <select
                id="expense-cat-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="education">Học tập</option>
                <option value="living">Nhà ở &amp; Sinh hoạt</option>
                <option value="food">Ăn uống</option>
                <option value="transport">Di chuyển</option>
                <option value="tech">Công nghệ &amp; Thiết bị</option>
                <option value="entertainment">Giải trí &amp; Thể thao</option>
                <option value="health">Sức khỏe</option>
                <option value="income">Thu nhập &amp; Lương</option>
              </select>
            </div>

            <div>
              <label htmlFor="expense-date-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Ngày thực hiện: <span className="text-rose-400">*</span>
              </label>
              <input
                id="expense-date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.date && <p className="text-[11px] text-rose-400 mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Đối tác / Nơi thanh toán & Phương thức */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="expense-merchant-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Đối tác / Đơn vị: <span className="text-rose-400">*</span>
              </label>
              <input
                id="expense-merchant-input"
                type="text"
                value={merchantOrPayer}
                onChange={(e) => setMerchantOrPayer(e.target.value)}
                placeholder="Ví dụ: Trường UTC2, Căn tin, Petrolimex..."
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              {errors.merchantOrPayer && <p className="text-[11px] text-rose-400 mt-1">{errors.merchantOrPayer}</p>}
            </div>

            <div>
              <label htmlFor="expense-paymethod-select" className="block text-xs font-semibold text-slate-300 mb-1">
                Phương thức:
              </label>
              <select
                id="expense-paymethod-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Chuyển khoản Vietcombank">Chuyển khoản Vietcombank</option>
                <option value="Ví MoMo">Ví MoMo</option>
                <option value="Tiền mặt">Tiền mặt</option>
                <option value="Thẻ ghi nợ VCB">Thẻ ghi nợ VCB</option>
                <option value="Thẻ tín dụng">Thẻ tín dụng</option>
              </select>
            </div>
          </div>

          {/* Email xác thực (gắn kết kiểm thử hàm validateEmail) */}
          <div>
            <label htmlFor="expense-email-input" className="block text-xs font-semibold text-slate-300 mb-1">
              Email liên hệ chứng từ: <span className="text-rose-400">*</span>
            </label>
            <input
              id="expense-email-input"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="ten.sv6651071071@utc2.edu.vn"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {errors.contactEmail ? (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.contactEmail}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>Kiểm tra định dạng email regex theo hàm validateEmail trong utils.ts</span>
              </p>
            )}
          </div>

          {/* Mô tả chi tiết */}
          <div>
            <label htmlFor="expense-desc-input" className="block text-xs font-semibold text-slate-300 mb-1">
              Mô tả chi tiết giao dịch: <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="expense-desc-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập ghi chú chi tiết về khoản thu chi này (80-150 ký tự)..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {errors.description && <p className="text-[11px] text-rose-400 mt-1">{errors.description}</p>}
          </div>

          {/* Tags & Mã hóa đơn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="expense-tags-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Tags (cách nhau bằng dấu phẩy):
              </label>
              <input
                id="expense-tags-input"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Học tập, UTC2, Đồ án..."
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="expense-inv-input" className="block text-xs font-semibold text-slate-300 mb-1">
                Mã hóa đơn / Mã biên lai:
              </label>
              <input
                id="expense-inv-input"
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="INV-UTC2-2026-..."
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Link hình ảnh minh họa */}
          <div>
            <label htmlFor="expense-image-input" className="block text-xs font-semibold text-slate-300 mb-1">
              Đường link ảnh minh họa (URL):
            </label>
            <input
              id="expense-image-input"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... (Để trống nếu dùng ảnh mặc định)"
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={closeFormModal}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md shadow-emerald-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {isEditing ? 'Lưu Thay Đổi' : 'Tạo Giao Dịch Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
