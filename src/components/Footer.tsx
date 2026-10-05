import React from 'react';
import { Recycle, ShieldCheck, Leaf, Building2, Phone, Mail, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">EcoMatch Industrial</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Nền tảng Cộng sinh Công nghiệp và Tuần hoàn Phế phụ phẩm hàng đầu dành cho các khu công nghiệp sáp nhập địa giới tại Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Tiêu chuẩn KCN Sinh thái Quốc gia
            </div>
          </div>

          {/* Core Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Tính năng Cốt lõi</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Trang chủ Chỉ số Tác động (Dashboard)</li>
              <li>• Sổ tay Tài nguyên Thừa & Nhiệt thải</li>
              <li>• Bộ não AI Gợi ý Ghép nối (Smart Matchmaker)</li>
              <li>• Không gian Thương thảo & Hợp đồng KCN</li>
              <li>• Bản đồ Mạng lưới Sinh thái KCN</li>
            </ul>
          </div>

          {/* Legal & Regulation Framework */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Khung Pháp lý & Báo cáo</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Nghị định 35/2022/NĐ-CP Quản lý KCN</li>
              <li>• Luật Bảo vệ Môi trường 2020</li>
              <li>• Báo cáo Tự động Giảm phát thải ESG</li>
              <li>• Tiêu chuẩn TCVN 6882 Tro bay lò hơi</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Hỗ trợ BQL Khu Công Nghiệp</h4>
            <div className="space-y-1.5 text-slate-400">
              <p className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                Văn phòng Ban Quản lý KCN Liên Tỉnh
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                Hotline Hỗ trợ Kỹ thuật: 1900-ECOMATCH
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                hotro@ecomatch-industrial.vn
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2 text-[11px]">
          <p>© 2026 EcoMatch Industrial. Phát triển cho Hạ tầng Công nghiệp Tuần hoàn Việt Nam.</p>
          <p>Liên hệ 0972424691</p>
        </div>
      </div>
    </footer>
  );
};
