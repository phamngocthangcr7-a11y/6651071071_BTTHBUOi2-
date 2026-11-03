import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ShieldCheck, Heart, Sparkles, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Cột 1: Thông tin ứng dụng */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Emerald<span className="text-emerald-500">Spend</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dự án thực hành môn Thiết Kế Web (Buổi 2). Nền tảng quản lý tài chính cá nhân dành cho sinh viên CNTT UTC2.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>WCAG AA • Production-Ready</span>
            </div>
          </div>

          {/* Cột 2: Bảng chỉ số cá nhân hóa theo MSSV */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Bảng Phân Công Cá Nhân Hóa (MSSV: 6651071071)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Chỉ số S</span>
                <span className="text-emerald-400 font-bold text-sm">S = 34</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Tổng chữ số MSSV</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Chủ đề D (D=4)</span>
                <span className="text-emerald-400 font-bold text-sm">Chi tiêu cá nhân</span>
                <p className="text-[10px] text-slate-400 mt-0.5">D = 34 mod 15 = 4</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Tính năng F (F=1)</span>
                <span className="text-amber-400 font-bold text-sm">Yêu thích + Modal + Skeleton</span>
                <p className="text-[10px] text-slate-400 mt-0.5">F = 71 mod 10 = 1</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Màu chủ đạo C (C=1)</span>
                <span className="text-emerald-400 font-bold text-sm">Emerald (#059669)</span>
                <p className="text-[10px] text-slate-400 mt-0.5">C = 6 mod 5 = 1</p>
              </div>
            </div>
          </div>

          {/* Cột 3: Liên kết nhanh */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-200">Điều hướng</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Trang chủ (Danh sách &amp; Dashboard)
                </Link>
              </li>
              <li>
                <Link to="/item/exp-001" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Chi tiết giao dịch mẫu (#EXP-001)
                </Link>
              </li>
              <li className="flex items-center gap-1 text-slate-500 pt-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Thiết kế bởi SV Phạm Ngọc Thắng</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền & Ghi chú cuối trang */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            &copy; 2026 <strong className="text-slate-300">Phạm Ngọc Thắng</strong> • MSSV: <strong className="text-emerald-400">6651071071</strong> • Đại học Giao thông Vận tải Phân hiệu tại TPHCM (UTC2).
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>React 18 • TypeScript Strict • Tailwind CSS</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
