# 6651071071 - BÀI THỰC HÀNH WEB BUỔI 2 (LAB 2)
## Đề tài: Quản Lý Chi Tiêu Cá Nhân (Personal Expense & Finance Tracker)

> **Môn học:** Thiết Kế Web — Giảng viên: ThS. Nguyễn Thiện Dương  
> **Trường:** Đại học Giao thông Vận tải Phân hiệu tại TPHCM (UTC2)  
> **Sinh viên thực hiện:** Phạm Ngọc Thắng  
> **MSSV:** 6651071071  

---

## 1. THÔNG TIN CÁ NHÂN HÓA THEO MSSV

| Chỉ số | Công thức tính | Giá trị | Kết quả phân công đề bài |
| :--- | :--- | :---: | :--- |
| **S** | Tổng các chữ số MSSV: `6+6+5+1+0+7+1+0+7+1` | **34** | Tổng chỉ số cá nhân |
| **D** | `S mod 15 = 34 mod 15` | **4** | **Chủ đề:** Quản lý chi tiêu cá nhân (Tự tạo dữ liệu + lưu `localStorage`) |
| **F** | `(2 chữ số cuối MSSV) mod 10 = 71 mod 10` | **1** | **Bộ 3 tính năng bắt buộc:**<br>1. **Yêu thích (Favorites):** Lưu `localStorage`, có tab lọc riêng, `aria-pressed`.<br>2. **Modal chi tiết:** Đóng bằng phím `ESC`, click backdrop, **Bắt buộc có Focus Trap bẫy tiêu điểm**.<br>3. **Skeleton loading:** Khung xương nhấp nháy mô phỏng cấu trúc thẻ khi tải/lọc, có nút kiểm tra. |
| **C** | `(chữ số đầu MSSV) mod 5 = 6 mod 5` | **1** | **Màu chủ đạo:** **Emerald** (`#059669` - Tailwind `emerald-600`, kết hợp các sắc độ `emerald-50` đến `emerald-950`). |

---

## 2. KIẾN TRÚC KỸ THUẬT & CÔNG NGHỆ (TECH STACK)

- **Ngôn ngữ:** TypeScript 5 (`strict: true` trong `tsconfig.json`, tuyệt đối 0 `any` ngoại trừ chữ ký hàm `debounce` bắt buộc của đề bài).
- **Build tool:** Vite 5 (`react-ts`).
- **UI Library:** React 18 (100% Functional Components & React Hooks: `useState`, `useReducer`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useContext`).
- **Styling:** Tailwind CSS (bảng màu Emerald `#059669`, micro-interactions, dark mode slate-950 sang trọng).
- **Routing:** `react-router-dom` v6 (`HashRouter` để đảm bảo hoạt động hoàn hảo trên GitHub Pages không bao giờ bị 404 khi F5 tải lại trang). Bắt buộc 100% dùng `<Link>` hoặc `useNavigate`, không dùng `<a href>` cho liên kết nội bộ.
- **State Management:** `Context API` + `useReducer` cục bộ (tuyệt đối không dùng Redux/Zustand), tự động đồng bộ 2 chiều với `localStorage`:
  - `6651071071_expenses`: Danh sách 24 khoản thu chi thực tế của sinh viên CNTT UTC2.
  - `6651071071_favorites`: Danh sách id các mục được đánh dấu yêu thích.
- **Unit Test:** `vitest` + `@testing-library/react` + `jsdom` (vượt qua 100% 7/7 test case).
- **Linter:** `eslint` v9 flat config (`npx eslint .` đạt 0 lỗi, 0 cảnh báo).
- **Accessibility:** WCAG AA (độ tương phản chữ/nền chuẩn xác, alt mô tả thật trên toàn bộ hình ảnh, `aria-label` và `aria-pressed` trên tất cả icon buttons).

---

## 3. CẤU TRÚC THƯ MỤC CHUẨN ĐỀ BÀI

```text
6651071071_LAB2/
├── public/
├── src/
│   ├── assets/
│   │   └── receipt-placeholder.svg   # Hóa đơn điện tử số hóa sắc nét
│   ├── components/
│   │   ├── Header.tsx                # Thanh điều hướng + Badge SV + Form kiểm tra validateEmail
│   │   ├── Footer.tsx                # Bản quyền SV Phạm Ngọc Thắng + Bảng chỉ số S, D, F, C
│   │   ├── DashboardStats.tsx        # 4 thẻ KPI tài chính + Thanh phân bổ tỷ trọng danh mục
│   │   ├── FilterBar.tsx             # Tìm kiếm (debounce 300ms), lọc loại, lọc danh mục, lọc Yêu thích
│   │   ├── ExpenseCard.tsx           # Thẻ giao dịch chuẩn WCAG AA + Nút Yêu thích + Link chi tiết
│   │   ├── SkeletonCard.tsx          # Khung xương nhấp nháy mô phỏng chính xác ExpenseCard (CLS=0)
│   │   ├── ExpenseModal.tsx          # Modal xem nhanh có Focus Trap & phím tắt ESC (F=1)
│   │   └── ExpenseFormModal.tsx      # Modal thêm/sửa giao dịch lưu trực tiếp vào localStorage
│   ├── context/
│   │   └── ExpenseContext.tsx        # State management Context + useReducer đồng bộ localStorage
│   ├── pages/
│   │   ├── ListPage.tsx              # Route "/" - Dashboard tổng quan & Grid thẻ responsive
│   │   └── DetailPage.tsx            # Route "/item/:id" - Chi tiết biên lai điện tử & Giao dịch liên quan
│   ├── data/
│   │   └── data.json                 # 24 giao dịch thực tế chi tiết của sinh viên CNTT UTC2
│   ├── utils.ts                      # 4 hàm tiện ích bắt buộc (formatCurrency, truncateText, validateEmail, debounce)
│   ├── utils.test.ts                 # Bộ kiểm thử chuẩn 7 test cases được cung cấp
│   ├── App.tsx                       # Cấu hình Route và bọc ExpenseProvider
│   ├── main.tsx                      # Entry point React 18
│   └── index.css                     # Cấu hình Tailwind CSS & tùy biến thanh cuộn mượt mà
├── design/
│   └── wireframe.svg                 # Sơ đồ thiết kế Wireframe UI/UX cho cả ListPage và DetailPage
├── eslint.config.js                  # Cấu hình ESLint v9
├── tsconfig.json                     # TypeScript strict mode
├── tailwind.config.js                # Palette màu Emerald chuẩn C=1
├── vite.config.ts                    # Cấu hình Vitest & Base path deploy
└── package.json
```

---

## 4. HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN

```bash
# 1. Di chuyển vào thư mục dự án
cd 6651071071_LAB2

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Chạy môi trường phát triển (Local Dev Server)
npm run dev

# 4. Chạy kiểm thử tự động Vitest (7/7 test cases pass)
npm run test

# 5. Kiểm tra kiểu dữ liệu TypeScript (0 lỗi)
npx tsc --noEmit

# 6. Kiểm tra quy tắc mã nguồn ESLint (0 lỗi, 0 cảnh báo)
npx eslint .

# 7. Đóng gói bản phát hành production
npm run build
```

---

## 5. ĐOẠN GIẢI THÍCH KỸ THUẬT (BẮT BUỘC THEO MỤC V ĐỀ BÀI)

### Cách cài đặt tính năng "Modal chi tiết có Focus Trap và đóng bằng phím ESC" (F = 1):

Trong dự án **EmeraldSpend**, tính năng **Modal chi tiết** được cài đặt tuân thủ tiêu chuẩn tiếp cận người dùng **WCAG 2.1 AA** thông qua kỹ thuật **Focus Trap (Bẫy tiêu điểm bàn phím)** và xử lý sự kiện phím tắt trong component `ExpenseModal.tsx`. 

Khi người dùng nhấn nút *"Xem nhanh"* trên thẻ giao dịch, hook `useEffect` được kích hoạt để thực hiện chuỗi quy trình:
1. **Lưu trạng thái tiêu điểm trước đó:** Sử dụng `previousActiveElement.current = document.activeElement as HTMLElement` nhằm ghi nhớ phần tử vừa tương tác trước khi modal xuất hiện.
2. **Khóa cuộn trang nền:** Thiết lập `document.body.style.overflow = 'hidden'` để ngăn trang nền cuộn ngoài ý muốn.
3. **Kích hoạt tiêu điểm ban đầu:** Sau khi modal mount vào DOM, tiêu điểm được lập tức đặt vào phần tử tương tác đầu tiên (nút đóng modal hoặc nút yêu thích) bằng `focusableElements[0].focus()`.
4. **Bẫy bàn phím xoay vòng (Focus Trapping):** Lắng nghe sự kiện `keydown`. Nếu người dùng nhấn phím `Escape`, hàm `closeDetailModal()` lập tức được kích hoạt để đóng hộp thoại. Khi người dùng nhấn phím `Tab`, thuật toán kiểm tra: nếu đang ở phần tử focusable cuối cùng mà nhấn `Tab` xuôi, tiêu điểm sẽ được đưa quay ngược trở lại phần tử đầu tiên; ngược lại, nếu đang ở phần tử đầu tiên mà nhấn `Shift + Tab`, tiêu điểm sẽ nhảy xuống phần tử cuối cùng. Nhờ đó, người dùng khiếm thị hoặc người chỉ dùng bàn phím sẽ không bao giờ bị "kẹt" hay rò rỉ tiêu điểm ra ngoài nội dung trang nền.
5. **Hoàn trả tiêu điểm:** Khi modal đóng hoặc unmount, hook cleanup sẽ khôi phục lại `document.body.style.overflow = ''` và kích hoạt `previousActiveElement.current?.focus()`, đảm bảo trải nghiệm liền mạch và đạt điểm Accessibility tối đa trên Google Lighthouse.
