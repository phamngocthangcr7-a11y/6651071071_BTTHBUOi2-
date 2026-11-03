import React from 'react';
import { ExpenseItem } from '../types';
import { formatCurrency } from '../utils';

interface TransactionProofIllustrationProps {
  item: ExpenseItem;
}

export const TransactionProofIllustration: React.FC<TransactionProofIllustrationProps> = ({ item }) => {
  // Nội dung hóa đơn / chứng từ minh họa thực tế riêng biệt cho từng giao dịch
  const getProofData = () => {
    switch (item.id) {
      case 'exp-008':
        return {
          merchantHeader: 'CÔNG TY XĂNG DẦU KHU VỰC II - TNHH MTV',
          subHeader: 'CỬA HÀNG XĂNG DẦU PETROLIMEX SỐ 32',
          address: 'Ngã tư Thủ Đức, P. Hiệp Phú, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0300772714',
          docType: 'HÓA ĐƠN BÁN LẺ XĂNG DẦU ĐIỆN TỬ',
          lines: [
            { name: 'Xăng không chì RON 95-V', qty: '6.81 Lít', unitPrice: '23.500 ₫', total: '160.000 ₫' },
          ],
          vehicle: 'Phương tiện: Xe máy Honda Wave Alpha (BKS: 59-X3 071.71)',
          meterReading: 'Bơm số: 04 • Số cơ: 28491.50 • Số điện tử: 28498.31',
          stampText: 'PETROLIMEX • ĐÃ THU TIỀN',
          stampColor: '#e11d48',
          themeColor: '#be123c',
        };
      case 'exp-001':
        return {
          merchantHeader: 'BỘ GIAO THÔNG VẬN TẢI',
          subHeader: 'TRƯỜNG ĐH GIAO THÔNG VẬN TẢI - PHÂN HIỆU TẠI TPHCM',
          address: 'Số 450-451 Lê Văn Việt, P. Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM',
          taxCode: 'Mã trường: GSA • Khoa: Công nghệ thông tin',
          docType: 'PHIẾU THU HỌC PHÍ TÍN CHỈ SINH VIÊN',
          lines: [
            { name: 'Học phí tín chỉ HK2 (18 tín chỉ CNTT x 269.444 ₫)', qty: '18 TC', unitPrice: '269.444 ₫', total: '4.850.000 ₫' },
          ],
          vehicle: 'Sinh viên: Phạm Ngọc Thắng • MSSV: 6651071071 • Lớp: CNTT K62',
          meterReading: 'Cổng thanh toán: Vietcombank Gateway • Mã biên lai: UTC2-2026-001',
          stampText: 'UTC2 • PHÒNG TÀI CHÍNH ĐÃ THU',
          stampColor: '#059669',
          themeColor: '#047857',
        };
      case 'exp-002':
        return {
          merchantHeader: 'FPT SOFTWARE HO CHI MINH CO., LTD',
          subHeader: 'TRUNG TÂM PHẦN MỀM F-TOWN 1 & 2',
          address: 'Khu Công Nghệ Cao, Đường D1, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0101601098-001 • Division: Global Software Delivery',
          docType: 'PHIẾU TRẢ PHỤ CẤP THỰC TẬP (PAYSLIP)',
          lines: [
            { name: 'Phụ cấp thực tập sinh vị trí Frontend Developer (React/TS)', qty: '22 ngày', unitPrice: '340.909 ₫', total: '7.500.000 ₫' },
          ],
          vehicle: 'Người nhận: Phạm Ngọc Thắng • Vị trí: Frontend Intern • Mã NV: FSOFT-984',
          meterReading: 'Chuyển khoản: Vietcombank CN Thủ Đức • Tình trạng: Hoàn tất',
          stampText: 'FPT SOFTWARE • HR APPROVED',
          stampColor: '#2563eb',
          themeColor: '#1d4ed8',
        };
      case 'exp-003':
        return {
          merchantHeader: 'KHU NHÀ TRỌ SINH VIÊN MINH KHANG',
          subHeader: 'QUẢN LÝ PHÒNG TRỌ KHU VỰC ĐH GTVT UTC2',
          address: 'Đường Lê Văn Việt, P. Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM',
          taxCode: 'Chủ trọ: Đặng Minh Khang • SĐT: 0908.xxx.xxx',
          docType: 'PHIẾU XÁC NHẬN TIỀN THUÊ TRỌ THÁNG 10',
          lines: [
            { name: 'Tiền thuê phòng trọ khép kín (Phòng 204 tầng 2)', qty: '1 tháng', unitPrice: '2.200.000 ₫', total: '2.200.000 ₫' },
          ],
          vehicle: 'Người thuê: Phạm Ngọc Thắng • Hợp đồng số: HĐTR-2026-204',
          meterReading: 'Thanh toán qua Ví điện tử MoMo • Đã bao gồm an ninh và camera 24/7',
          stampText: 'CHỦ TRỌ • ĐÃ THU TIỀN',
          stampColor: '#7c3aed',
          themeColor: '#6d28d9',
        };
      case 'exp-004':
        return {
          merchantHeader: 'HỘI ĐỒNG KHEN THƯỞNG SINH VIÊN',
          subHeader: 'TRƯỜNG ĐH GIAO THÔNG VẬN TẢI - PHÂN HIỆU TẠI TPHCM',
          address: 'Số 450 Lê Văn Việt, P. Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM',
          taxCode: 'Quyết định số: 842/QĐ-ĐHGTVT-CTSV',
          docType: 'CHỨNG TỪ CHI TIỀN HỌC BỔNG XUẤT SẮC',
          lines: [
            { name: 'Học bổng Khuyến khích học tập kỳ 1 (Điểm TB: 3.86/4.0)', qty: '1 suất', unitPrice: '4.200.000 ₫', total: '4.200.000 ₫' },
          ],
          vehicle: 'Khen thưởng SV: Phạm Ngọc Thắng • MSSV: 6651071071 • Xếp loại: Xuất sắc',
          meterReading: 'Nguồn chi: Quỹ học bổng phát triển tài năng sinh viên UTC2',
          stampText: 'HIỆU TRƯỞNG • ĐÃ DUYỆT CHI',
          stampColor: '#d97706',
          themeColor: '#b45309',
        };
      case 'exp-006':
        return {
          merchantHeader: 'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ CÔNG NGHỆ MEMORYZONE',
          subHeader: 'HỆ THỐNG PHÂN PHỐI LINH KIỆN MÁY TÍNH CHÍNH HÃNG',
          address: 'Chi nhánh: Võ Văn Ngân, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0312019482 • Hotline: 028.7301.3878',
          docType: 'PHIẾU XUẤT KHO KIÊM BẢO HÀNH LINH KIỆN',
          lines: [
            { name: 'Ổ cứng SSD Samsung 980 1TB PCIe NVMe 3.0x4', qty: '01 chiếc', unitPrice: '1.850.000 ₫', total: '1.850.000 ₫' },
          ],
          vehicle: 'Khách hàng: Phạm Ngọc Thắng • Thiết bị: Laptop Lenovo Legion 5',
          meterReading: 'Serial: S64BNS0W819234 • Thời hạn bảo hành: 60 tháng (5 năm)',
          stampText: 'MEMORYZONE • ĐÃ KIỂM TRA',
          stampColor: '#0891b2',
          themeColor: '#0e7490',
        };
      case 'exp-007':
        return {
          merchantHeader: 'CĂN TIN KHU A - ĐH GTVT PHÂN HIỆU TPHCM',
          subHeader: 'DỊCH VỤ ĂN UỐNG & ĐẢM BẢO AN TOÀN VỆ SINH THỰC PHẨM',
          address: 'Khuôn viên Căn tin Khu A, Số 450 Lê Văn Việt, TP. Thủ Đức',
          taxCode: 'Giấy chứng nhận ATTP số: 104/2026/ATTP-TĐ',
          docType: 'PHIẾU ĂN TRƯA THÁNG SINH VIÊN',
          lines: [
            { name: 'Suất cơm phần sinh viên tiêu chuẩn (Cơm + Món mặn + Canh)', qty: '26 suất', unitPrice: '30.000 ₫', total: '780.000 ₫' },
          ],
          vehicle: 'Sinh viên: Phạm Ngọc Thắng • Khoa: Công nghệ thông tin',
          meterReading: 'Áp dụng cho các ngày học chính khóa từ thứ 2 đến thứ 7',
          stampText: 'CĂN TIN UTC2 • ĐÃ XÁC NHẬN',
          stampColor: '#ea580c',
          themeColor: '#c2410c',
        };
      case 'exp-010':
        return {
          merchantHeader: 'TỔ CHỨC GIÁO DỤC IIG VIỆT NAM',
          subHeader: 'ĐẠI DIỆN ĐỘC QUYỀN KHẢO THÍ ETS TẠI VIỆT NAM',
          address: 'Tầng 1, Tháp 1, Tòa nhà The Sun Avenue, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0101035624 • Hotline: 1900.636.929',
          docType: 'PHIẾU THU LỆ PHÍ ĐĂNG KÝ THI TOEIC QUỐC TẾ',
          lines: [
            { name: 'Lệ phí thi TOEIC Listening & Reading (Paper-based)', qty: '01 thí sinh', unitPrice: '1.390.000 ₫', total: '1.390.000 ₫' },
          ],
          vehicle: 'Thí sinh: Phạm Ngọc Thắng • CCCD: 07920400xxxx • Mục tiêu: 750+',
          meterReading: 'Ngày thi: Chủ nhật ca sáng • Địa điểm: Trung tâm khảo thí IIG TPHCM',
          stampText: 'IIG VIETNAM • ETS VERIFIED',
          stampColor: '#4f46e5',
          themeColor: '#4338ca',
        };
      case 'exp-011':
        return {
          merchantHeader: 'SILICONZ VIETNAM - KEYCHRON OFFICIAL',
          subHeader: 'NHÀ PHÂN PHỐI CHÍNH HÃNG KEYCHRON TẠI VIỆT NAM',
          address: 'Showroom: Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TPHCM',
          taxCode: 'MST: 0315482910 • Website: siliconz.vn',
          docType: 'HÓA ĐƠN BÁN HÀNG & PHIẾU BẢO HÀNH KEYCHRON',
          lines: [
            { name: 'Bàn phím cơ Keychron K2 Pro Wireless (Brown Switch/RGB)', qty: '01 bộ', unitPrice: '1.650.000 ₫', total: '1.650.000 ₫' },
          ],
          vehicle: 'Người mua: Phạm Ngọc Thắng • Phục vụ: Lập trình viên CNTT UTC2',
          meterReading: 'Kết nối: Bluetooth 5.1 / Type-C • Bảo hành chính hãng 12 tháng',
          stampText: 'SILICONZ • CHÍNH HÃNG 100%',
          stampColor: '#0d9488',
          themeColor: '#0f766e',
        };
      case 'exp-014':
        return {
          merchantHeader: 'CÔNG TY CP THƯƠNG MẠI DỊCH VỤ TRÀ CÀ PHÊ VIỆT NAM',
          subHeader: 'THE COFFEE HOUSE - CHI NHÁNH ĐỖ XUÂN HỢP',
          address: 'Số 114 Đỗ Xuân Hợp, P. Phước Long B, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0312867172 • Mã cửa hàng: TCH-DXH',
          docType: 'HÓA ĐƠN THANH TOÁN (RECEIPT)',
          lines: [
            { name: 'Cold Brew Cam Sả (Size L)', qty: '02 ly', unitPrice: '55.000 ₫', total: '110.000 ₫' },
            { name: 'Bánh Mì Chà Bông Phô Mai Nướng', qty: '01 chiếc', unitPrice: '35.000 ₫', total: '35.000 ₫' },
          ],
          vehicle: 'Bàn số: 12 (Khu vực học nhóm) • Mục đích: Ôn thi đồ án Web',
          meterReading: 'Wifi: TheCoffeeHouse_Free • Mật khẩu: thecoffeehouse',
          stampText: 'THE COFFEE HOUSE • PAID',
          stampColor: '#b45309',
          themeColor: '#92400e',
        };
      case 'exp-021':
        return {
          merchantHeader: 'LIÊN HIỆP HTX THƯƠNG MẠI TPHCM (SAIGON CO.OP)',
          subHeader: 'SIÊU THỊ CO.OPMART XA LỘ HÀ NỘI',
          address: 'Số 191 Quang Trung, P. Hiệp Phú, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0300808249-012 • Quầy thu ngân: POS-06',
          docType: 'HÓA ĐƠN TÍNH TIỀN CO.OPMART',
          lines: [
            { name: 'Rau cải xanh Co.op Select 500g', qty: '02 túi', unitPrice: '18.000 ₫', total: '36.000 ₫' },
            { name: 'Thịt đùi heo tươi sạch VietGAP 1kg', qty: '01 khay', unitPrice: '145.000 ₫', total: '145.000 ₫' },
            { name: 'Cá hồi fillet tươi sống 300g', qty: '01 khay', unitPrice: '189.000 ₫', total: '189.000 ₫' },
            { name: 'Sữa tươi tiệt trùng Vinamilk 1 Lít (Lốc 2)', qty: '02 hộp', unitPrice: '35.000 ₫', total: '70.000 ₫' },
            { name: 'Trái cây chuối Nam Mỹ & Táo Fuji', qty: '1.2 kg', unitPrice: '83.333 ₫', total: '100.000 ₫' },
          ],
          vehicle: 'Khách hàng: Phạm Ngọc Thắng • Thẻ thành viên: Đồng (Co.op Member)',
          meterReading: 'Điểm tích lũy: +54 điểm • Cảm ơn quý khách đã mua sắm!',
          stampText: 'CO.OPMART • ĐÃ THANH TOÁN',
          stampColor: '#059669',
          themeColor: '#047857',
        };
      case 'exp-024':
        return {
          merchantHeader: 'CÔNG TY CP DƯỢC PHẨM FPT LONG CHÂU',
          subHeader: 'NHÀ THUỐC LONG CHÂU - CHI NHÁNH LÊ VĂN VIỆT',
          address: 'Số 182 Lê Văn Việt, P. Tăng Nhơn Phú B, TP. Thủ Đức, TPHCM',
          taxCode: 'MST: 0315275368 • Đạt chuẩn GPP Bộ Y Tế',
          docType: 'HÓA ĐƠN BÁN LẺ THUỐC & TPCN',
          lines: [
            { name: 'Viên sủi Vitamin C 1000mg Berocca (Tuýp 10 viên)', qty: '01 tuýp', unitPrice: '85.000 ₫', total: '85.000 ₫' },
            { name: 'Thuốc nhỏ mắt chống mỏi điều tiết Rohto Cool', qty: '01 lọ', unitPrice: '40.000 ₫', total: '40.000 ₫' },
          ],
          vehicle: 'Dược sĩ tư vấn: DS. Nguyễn Thị Thảo • Khách: Phạm Ngọc Thắng',
          meterReading: 'Hướng dẫn sử dụng: Uống 1 viên sủi mỗi sáng sau ăn, nhỏ mắt 2-3 lần/ngày',
          stampText: 'LONG CHÂU • CHUẨN GPP',
          stampColor: '#0284c7',
          themeColor: '#0369a1',
        };
      default:
        return {
          merchantHeader: item.merchantOrPayer.toUpperCase(),
          subHeader: 'CHỨNG TỪ XÁC NHẬN GIAO DỊCH SINH VIÊN',
          address: 'Khu vực trường ĐH Giao thông Vận tải Phân hiệu TPHCM',
          taxCode: `Mã hóa đơn: ${item.invoiceNumber}`,
          docType: 'PHIẾU THU / CHI ĐIỆN TỬ XÁC THỰC',
          lines: [
            { name: item.title, qty: '01', unitPrice: formatCurrency(item.amount), total: formatCurrency(item.amount) },
          ],
          vehicle: `Người thực hiện: Phạm Ngọc Thắng • MSSV: 6651071071`,
          meterReading: `Phương thức: ${item.paymentMethod} • Trạng thái: Đã hoàn tất`,
          stampText: 'EMERALDSPEND • VERIFIED',
          stampColor: '#059669',
          themeColor: '#047857',
        };
    }
  };

  const data = getProofData();

  return (
    <div className="bg-slate-950 border-2 border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden font-sans text-slate-200">
      {/* Con dấu tròn đỏ / xanh chính thức in nổi trên hóa đơn */}
      <div className="absolute right-4 top-4 sm:right-8 sm:top-6 pointer-events-none opacity-85 rotate-[-12deg]">
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed flex flex-col items-center justify-center p-2 text-center shadow-lg"
          style={{ borderColor: data.stampColor, color: data.stampColor }}
        >
          <span className="text-[9px] font-black uppercase tracking-wider">CHỨNG THỰC</span>
          <span className="text-[10px] sm:text-[11px] font-black leading-tight my-0.5">
            {data.stampText}
          </span>
          <span className="text-[8px] font-mono font-bold">UTC2 • 2026</span>
        </div>
      </div>

      {/* Header Hóa Đơn Thương Hiệu */}
      <div className="border-b border-dashed border-slate-700 pb-4 mb-4">
        <h3 className="text-xs sm:text-sm font-black tracking-wide text-white uppercase pr-28">
          {data.merchantHeader}
        </h3>
        <p className="text-xs text-slate-300 font-bold mt-0.5">{data.subHeader}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">{data.address}</p>
        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{data.taxCode}</p>

        <div className="mt-3 pt-2 border-t border-slate-800 text-center">
          <span className="inline-block px-3 py-1 rounded-md text-xs sm:text-sm font-black tracking-wider uppercase bg-slate-900 border border-slate-700 text-emerald-400 shadow-inner">
            {data.docType}
          </span>
          <p className="text-[11px] text-slate-400 mt-1">
            Ngày lập: <strong className="text-slate-200">{item.date}</strong> • Số biên lai: <strong className="text-emerald-400">#{item.invoiceNumber}</strong>
          </p>
        </div>
      </div>

      {/* Bảng kê chi tiết các món hàng / dịch vụ */}
      <div className="mb-4 overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-[11px] uppercase">
              <th className="py-2 font-bold">Nội dung chi tiết</th>
              <th className="py-2 text-center font-bold">Số lượng</th>
              <th className="py-2 text-right font-bold">Đơn giá</th>
              <th className="py-2 text-right font-bold">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {data.lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="py-2.5 font-medium text-slate-200">{line.name}</td>
                <td className="py-2.5 text-center text-slate-400 font-mono">{line.qty}</td>
                <td className="py-2.5 text-right text-slate-400 font-mono">{line.unitPrice}</td>
                <td className="py-2.5 text-right font-bold text-white font-mono">{line.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tổng tiền thanh toán */}
      <div className="border-t-2 border-dashed border-slate-700 pt-3 pb-3 mb-3 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-slate-400 block">TỔNG CỘNG THANH TOÁN</span>
          <span className="text-[11px] text-slate-500">Đã bao gồm thuế GTGT &amp; phí dịch vụ</span>
        </div>
        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
            {formatCurrency(item.amount)}
          </span>
        </div>
      </div>

      {/* Thông tin phương tiện / Thiết bị & Đồng hồ đo thực tế */}
      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-[11px] space-y-1 mb-4">
        <p className="text-slate-300">
          📌 <strong className="text-white">{data.vehicle}</strong>
        </p>
        <p className="text-slate-400 font-mono">
          ⚙️ {data.meterReading}
        </p>
      </div>

      {/* Footer hóa đơn: Mã vạch số Barcode & Xác thực */}
      <div className="pt-2 border-t border-slate-800 text-center space-y-2">
        {/* Giả lập Barcode thực tế */}
        <div className="flex justify-center items-center gap-1 py-1">
          {Array.from({ length: 42 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-slate-400 h-8"
              style={{
                width: idx % 3 === 0 ? '3px' : idx % 5 === 0 ? '4px' : '1.5px',
                opacity: idx % 2 === 0 ? 0.9 : 0.6,
              }}
            />
          ))}
        </div>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          {item.invoiceNumber} • UTC2-AUTHENTICATED-DOCUMENT
        </p>
        <p className="text-[10px] text-slate-400 italic">
          Phiếu hóa đơn điện tử được lưu trữ vĩnh viễn trên hệ thống quản lý chi tiêu sinh viên UTC2.
        </p>
      </div>
    </div>
  );
};
