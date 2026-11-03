import React from 'react';
import { ExpenseItem } from '../types';

interface TransactionBannerProps {
  item: ExpenseItem;
  size?: 'sm' | 'md' | 'lg';
}

export const TransactionBanner: React.FC<TransactionBannerProps> = ({ item, size = 'md' }) => {
  // Cấu hình chủ đề đồ họa và nhận diện thực tế cho từng khoản giao dịch sinh viên UTC2
  const getBannerDetails = (id: string, cat: string) => {
    switch (id) {
      case 'exp-001':
        return {
          icon: '🎓',
          brand: 'ĐH GIAO THÔNG VẬN TẢI - UTC2',
          sub: 'Hóa đơn học phí tín chỉ chính quy',
          seal: 'ĐÃ THU HỌC PHÍ',
          bgGradient: 'from-emerald-900 via-emerald-800 to-teal-950',
          accent: '#10b981',
          code: 'UTC2-FINANCE-2026',
        };
      case 'exp-002':
        return {
          icon: '💼',
          brand: 'FPT SOFTWARE GLOBAL',
          sub: 'Phụ cấp thực tập Frontend Developer',
          seal: 'PAYROLL VERIFIED',
          bgGradient: 'from-blue-900 via-indigo-900 to-slate-950',
          accent: '#3b82f6',
          code: 'FPT-HCM-FE-INTERN',
        };
      case 'exp-003':
        return {
          icon: '🏠',
          brand: 'NHÀ TRỌ LÊ VĂN VIỆT',
          sub: 'Tiền thuê trọ sinh viên gần UTC2',
          seal: 'ĐÃ THANH TOÁN',
          bgGradient: 'from-violet-900 via-purple-900 to-slate-950',
          accent: '#8b5cf6',
          code: 'TRO-LVV-Q9-OCT',
        };
      case 'exp-004':
        return {
          icon: '🏆',
          brand: 'HỌC BỔNG XUẤT SẮC UTC2',
          sub: 'Khen thưởng học tập khoa CNTT',
          seal: 'KHUYẾN KHÍCH HT',
          bgGradient: 'from-amber-900 via-yellow-900 to-slate-950',
          accent: '#f59e0b',
          code: 'UTC2-SCHOLARSHIP-K62',
        };
      case 'exp-005':
        return {
          icon: '⚡',
          brand: 'ĐIỆN LỰC THỦ ĐỨC & VIETTEL',
          sub: 'Hóa đơn điện nước & cáp quang wifi',
          seal: 'ĐÃ THANH TOÁN',
          bgGradient: 'from-sky-900 via-blue-950 to-slate-950',
          accent: '#0ea5e9',
          code: 'UTIL-ELEC-WIFI-OCT',
        };
      case 'exp-006':
        return {
          icon: '💾',
          brand: 'MEMORYZONE THỦ ĐỨC',
          sub: 'SSD Samsung 980 NVMe 1TB PCIe',
          seal: 'BẢO HÀNH 5 NĂM',
          bgGradient: 'from-cyan-900 via-teal-950 to-slate-950',
          accent: '#06b6d4',
          code: 'MZ-SAMSUNG-980-PRO',
        };
      case 'exp-007':
        return {
          icon: '🍱',
          brand: 'CĂN TIN KHU A - UTC2',
          sub: 'Suất cơm trưa tháng sinh viên',
          seal: 'ĐÃ XÁC NHẬN',
          bgGradient: 'from-amber-950 via-orange-950 to-slate-950',
          accent: '#f97316',
          code: 'CANTIN-UTC2-LUNCH',
        };
      case 'exp-008':
        return {
          icon: '⛽',
          brand: 'PETROLIMEX TRẠM 32',
          sub: 'Xăng RON 95-V Ngã tư Thủ Đức',
          seal: 'HÓA ĐƠN ĐIỆN TỬ',
          bgGradient: 'from-rose-950 via-red-900 to-slate-950',
          accent: '#f43f5e',
          code: 'PETROLIMEX-SG-95',
        };
      case 'exp-009':
        return {
          icon: '📚',
          brand: 'NHÀ SÁCH FAHASA QUẬN 9',
          sub: 'Giáo trình Cấu trúc dữ liệu & React',
          seal: 'SÁCH CHÍNH HÃNG',
          bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
          accent: '#10b981',
          code: 'FAHASA-IT-BOOKS',
        };
      case 'exp-010':
        return {
          icon: '🇬🇧',
          brand: 'TỔ CHỨC GIÁO DỤC IIG VIỆT NAM',
          sub: 'Lệ phí thi chứng chỉ quốc tế TOEIC',
          seal: 'ETS VERIFIED',
          bgGradient: 'from-indigo-950 via-blue-900 to-slate-950',
          accent: '#6366f1',
          code: 'IIG-TOEIC-750-EXAM',
        };
      case 'exp-011':
        return {
          icon: '⌨️',
          brand: 'SILICONZ - KEYCHRON STORE',
          sub: 'Bàn phím cơ không dây K2 Pro',
          seal: 'CHÍNH HÃNG 100%',
          bgGradient: 'from-teal-950 via-slate-900 to-slate-950',
          accent: '#14b8a6',
          code: 'KEYCHRON-K2-PRO-RGB',
        };
      case 'exp-012':
        return {
          icon: '🚌',
          brand: 'XE BUÝT TPHCM (TUYẾN 55 & 56)',
          sub: 'Vé tập xe buýt sinh viên liên tuyến',
          seal: 'TRỢ GIÁ SINH VIÊN',
          bgGradient: 'from-green-950 via-emerald-900 to-slate-950',
          accent: '#22c55e',
          code: 'BUS-TPHCM-LINE-55',
        };
      case 'exp-013':
        return {
          icon: '🥇',
          brand: 'ĐOÀN TRƯỜNG ĐH GTVT - UTC2',
          sub: 'Giải Nhất cuộc thi Thiết kế Website',
          seal: 'CHỨNG NHẬN GIẢI',
          bgGradient: 'from-amber-900 via-yellow-950 to-slate-950',
          accent: '#eab308',
          code: 'UTC2-WEB-AWARD-FIRST',
        };
      case 'exp-014':
        return {
          icon: '☕',
          brand: 'THE COFFEE HOUSE - ĐỖ XUÂN HỢP',
          sub: 'Cà phê Cold Brew ôn thi học kỳ',
          seal: 'HOÀN TẤT',
          bgGradient: 'from-amber-950 via-stone-900 to-slate-950',
          accent: '#d97706',
          code: 'TCH-DXH-COLDBREW',
        };
      case 'exp-015':
        return {
          icon: '⚽',
          brand: 'SÂN BÓNG ĐÁ SAO VÀNG',
          sub: 'Sân cỏ nhân tạo Tăng Nhơn Phú A',
          seal: 'ĐÃ ĐẶT SÂN',
          bgGradient: 'from-emerald-950 via-green-900 to-slate-950',
          accent: '#10b981',
          code: 'FB-TNPA-MATCH-K62',
        };
      case 'exp-016':
        return {
          icon: '🩺',
          brand: 'BẢO HIỂM XÃ HỘI TP THỦ ĐỨC',
          sub: 'Thẻ BHYT bắt buộc sinh viên UTC2',
          seal: 'HIỆU LỰC 12 THÁNG',
          bgGradient: 'from-rose-950 via-slate-900 to-slate-950',
          accent: '#f43f5e',
          code: 'BHYT-UTC2-2026-2027',
        };
      case 'exp-017':
        return {
          icon: '👨‍🏫',
          brand: 'BỘ MÔN HTTT - KHOA CNTT UTC2',
          sub: 'Thù lao trợ giảng Lab Lập trình Web',
          seal: 'XÁC NHẬN KHOA',
          bgGradient: 'from-blue-950 via-indigo-950 to-slate-950',
          accent: '#3b82f6',
          code: 'TA-WEB-LAB-UTC2',
        };
      case 'exp-018':
        return {
          icon: '🖱️',
          brand: 'PHONG VŨ COMPUTER THỦ ĐỨC',
          sub: 'Chuột công thái học Logitech MX Master 3S',
          seal: 'CHÍNH HÃNG DGW',
          bgGradient: 'from-slate-900 via-cyan-950 to-slate-950',
          accent: '#06b6d4',
          code: 'LOGI-MX-MASTER-3S',
        };
      case 'exp-019':
        return {
          icon: '☁️',
          brand: 'GOOGLE IRELAND LIMITED',
          sub: 'Gói dung lượng Google One 100GB',
          seal: 'GIA HẠN THÀNH CÔNG',
          bgGradient: 'from-blue-950 via-slate-900 to-slate-950',
          accent: '#3b82f6',
          code: 'GOOG-ONE-100GB-SUB',
        };
      case 'exp-020':
        return {
          icon: '📶',
          brand: 'VIETTEL TELECOM THỦ ĐỨC',
          sub: 'Gói cước 4G sinh viên tốc độ cao ST90K',
          seal: 'ĐÃ KÍCH HOẠT',
          bgGradient: 'from-red-950 via-rose-950 to-slate-950',
          accent: '#ef4444',
          code: 'VTT-4G-ST90K-OCT',
        };
      case 'exp-021':
        return {
          icon: '🛒',
          brand: 'SIÊU THỊ CO.OPMART XA LỘ HÀ NỘI',
          sub: 'Thực phẩm rau củ & sữa tươi sạch',
          seal: 'XÁC NHẬN POS',
          bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
          accent: '#059669',
          code: 'COOP-XLHN-GROCERY',
        };
      case 'exp-022':
        return {
          icon: '💻',
          brand: 'UDEMY INC. - E-LEARNING',
          sub: 'React 18 & TypeScript Pro Masterclass',
          seal: 'LIFETIME ACCESS',
          bgGradient: 'from-purple-950 via-violet-900 to-slate-950',
          accent: '#a855f7',
          code: 'UDEMY-REACT-TS-CERT',
        };
      case 'exp-023':
        return {
          icon: '🚀',
          brand: 'KHU CÔNG NGHỆ CAO TPHCM',
          sub: 'Giải Nhì Hackathon Lập trình SV 48h',
          seal: 'GIẢI THƯỞNG CHÍNH THỨC',
          bgGradient: 'from-amber-900 via-rose-950 to-slate-950',
          accent: '#f59e0b',
          code: 'HACKATHON-SHTP-2026',
        };
      case 'exp-024':
        return {
          icon: '💊',
          brand: 'NHÀ THUỐC FPT LONG CHÂU LÊ VĂN VIỆT',
          sub: 'Vitamin C & Thuốc nhỏ mắt chống mỏi',
          seal: 'CHUẨN GPP',
          bgGradient: 'from-blue-950 via-sky-950 to-slate-950',
          accent: '#0284c7',
          code: 'LC-LVV-PHARMACY',
        };
      default:
        return {
          icon: cat === 'income' ? '💵' : '🧾',
          brand: item.merchantOrPayer.toUpperCase(),
          sub: item.title,
          seal: 'ĐÃ GHI NHẬN',
          bgGradient: 'from-slate-900 via-slate-900 to-slate-950',
          accent: '#10b981',
          code: item.invoiceNumber,
        };
    }
  };

  const details = getBannerDetails(item.id, item.category);
  const heightClass = size === 'lg' ? 'h-52 sm:h-64' : size === 'sm' ? 'h-32' : 'h-36 sm:h-40';

  return (
    <div
      className={`relative ${heightClass} w-full overflow-hidden rounded-xl bg-gradient-to-br ${details.bgGradient} border border-slate-700/60 shadow-inner flex flex-col justify-between p-3.5 select-none transition-transform duration-300 group-hover:scale-[1.02]`}
    >
      {/* Nền họa tiết vi mạch / lưới tài chính Fintech công nghệ cao */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 160"
        preserveAspectRatio="none"
      >
        <path d="M0,20 Q100,5 200,30 T400,20 L400,160 L0,160 Z" fill="none" stroke={details.accent} strokeWidth="1" />
        <circle cx="50" cy="40" r="2" fill={details.accent} />
        <circle cx="150" cy="80" r="2" fill={details.accent} />
        <circle cx="320" cy="50" r="3" fill={details.accent} />
        <line x1="50" y1="40" x2="150" y2="80" stroke={details.accent} strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="150" y1="80" x2="320" y2="50" stroke={details.accent} strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      {/* Dải sáng gradient phát sáng nhẹ */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ backgroundColor: details.accent }}
      />

      {/* Hàng 1: Icon nhận diện lớn + Nhãn thương hiệu đối tác thực tế */}
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center text-xl shadow-md"
            style={{ borderColor: `${details.accent}60` }}
          >
            <span role="img" aria-label={details.brand}>
              {details.icon}
            </span>
          </div>
          <div>
            <h4 className="text-[11px] sm:text-xs font-black tracking-tight text-white line-clamp-1 drop-shadow-sm uppercase">
              {details.brand}
            </h4>
            <p className="text-[10px] text-slate-300/80 line-clamp-1">
              {details.sub}
            </p>
          </div>
        </div>

        {/* Tem con dấu bảo mật / chứng thực tài chính (Watermark Stamp) */}
        <div
          className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border shadow-sm backdrop-blur-sm"
          style={{
            borderColor: `${details.accent}80`,
            backgroundColor: `${details.accent}20`,
            color: details.accent,
          }}
        >
          {details.seal}
        </div>
      </div>

      {/* Hàng 2: Mã giao dịch & Sinh viên UTC2 xác thực */}
      <div className="relative z-10 flex items-end justify-between text-[10px] text-slate-300/90 pt-2 border-t border-slate-700/40">
        <span className="font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
          #{details.code}
        </span>
        <span className="text-[9.5px] text-slate-400 font-medium">
          Xác thực hệ thống UTC2
        </span>
      </div>
    </div>
  );
};
