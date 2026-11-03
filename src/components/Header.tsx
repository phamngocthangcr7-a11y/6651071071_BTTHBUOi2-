import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Wallet, CheckCircle, AlertCircle, Mail, RotateCcw } from 'lucide-react';
import { useExpense } from '../context/ExpenseContext';
import { validateEmail } from '../utils';

export const Header: React.FC = () => {
  const { openAddModal, resetDefaultData } = useExpense();
  const [emailInput, setEmailInput] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showEmailBox, setShowEmailBox] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(emailInput)) {
      setEmailStatus('success');
      setTimeout(() => {
        setEmailStatus('idle');
        setShowEmailBox(false);
        setEmailInput('');
      }, 2500);
    } else {
      setEmailStatus('error');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-emerald-900/40 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Sinh viên Info */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-emerald-500 flex items-center justify-center shadow-md shadow-emerald-900/50 group-hover:scale-105 transition-transform duration-200">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    Emerald<span className="text-emerald-500">Spend</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                    UTC2
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Quản lý chi tiêu cá nhân • Đề tài D=4, F=1, C=1
                </p>
              </div>
            </Link>

            {/* Student ID Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-emerald-800/40 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300">Sinh viên:</span>
              <strong className="text-emerald-400 font-semibold">Phạm Ngọc Thắng</strong>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-mono">6651071071</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Newsletter / Báo cáo Email button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmailBox(!showEmailBox)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Nhận báo cáo tài chính qua email"
                aria-expanded={showEmailBox}
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="hidden lg:inline">Nhận Báo Cáo</span>
              </button>

              {/* Popover Form kiểm tra validateEmail */}
              {showEmailBox && (
                <div className="absolute right-0 mt-2 w-80 p-4 rounded-xl bg-slate-900 border border-emerald-800/70 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <h4 className="text-sm font-semibold text-white mb-1">Đăng ký nhận báo cáo tuần</h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Nhập email sinh viên để kiểm tra tính năng xác thực email chuẩn regex.
                  </p>
                  <form onSubmit={handleSubscribe} className="space-y-2.5">
                    <div>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="ten.sv6651071071@utc2.edu.vn"
                        className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    {emailStatus === 'success' && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Email hợp lệ! Báo cáo đã gửi mẫu.</span>
                      </div>
                    )}
                    {emailStatus === 'error' && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Địa chỉ email không đúng định dạng.</span>
                      </div>
                    )}
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowEmailBox(false)}
                        className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                      >
                        Đóng
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
                      >
                        Xác thực
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Nút Khôi phục dữ liệu gốc */}
            <button
              type="button"
              onClick={resetDefaultData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              title="Khôi phục lại 24 giao dịch mẫu sinh viên UTC2"
              aria-label="Khôi phục dữ liệu gốc"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Dữ liệu gốc</span>
            </button>

            {/* Nút Thêm giao dịch mới */}
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-md shadow-emerald-900/30 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Thêm mới khoản thu chi"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Thêm giao dịch</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
