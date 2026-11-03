import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExpenseModal } from './components/ExpenseModal';
import { ExpenseFormModal } from './components/ExpenseFormModal';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';

export const App: React.FC = () => {
  return (
    <ExpenseProvider>
      {/* Sử dụng HashRouter theo mục II đề bài để đảm bảo chạy mượt mà trên GitHub Pages không bị lỗi 404 khi F5 */}
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-600 selection:text-white">
          {/* Thanh điều hướng toàn cục */}
          <Header />

          {/* Nội dung các Route */}
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/item/:id" element={<DetailPage />} />
            <Route path="*" element={<ListPage />} />
          </Routes>

          {/* Modal xem nhanh chi tiết giao dịch (có bẫy tiêu điểm Focus Trap & phím ESC theo đề bài F=1) */}
          <ExpenseModal />

          {/* Modal Thêm mới / Sửa giao dịch (lưu vào localStorage theo đề bài D=4) */}
          <ExpenseFormModal />

          {/* Chân trang bản quyền sinh viên Phạm Ngọc Thắng - 6651071071 */}
          <Footer />
        </div>
      </HashRouter>
    </ExpenseProvider>
  );
};

export default App;
