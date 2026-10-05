import React, { useState } from 'react';
import { SymbiosisContract, ResourceItem } from '../types';
import { 
  X, 
  Leaf, 
  Award, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  Building2, 
  FileText,
  Sparkles,
  TrendingUp,
  Coins
} from 'lucide-react';

interface ESGCalculatorModalProps {
  onClose: () => void;
  resources: ResourceItem[];
  contracts: SymbiosisContract[];
}

export const ESGCalculatorModal: React.FC<ESGCalculatorModalProps> = ({
  onClose,
  resources,
  contracts,
}) => {
  // Calculator inputs
  const [selectedResourceType, setSelectedResourceType] = useState<string>('fly_ash');
  const [monthlyVolume, setMonthlyVolume] = useState<number>(500);
  const [energyType, setEnergyType] = useState<string>('coal_boiler');
  const [transportDistance, setTransportDistance] = useState<number>(15);

  // Carbon credit market price in USD / ton CO2e
  const [carbonCreditPriceUsd, setCarbonCreditPriceUsd] = useState<number>(12); // $12/ton CO2e

  // Dynamic Emission Savings Calculations
  // Fly ash replacing cement: ~0.85 ton CO2 per ton fly ash
  // Waste heat replacing coal: ~2.1 tons CO2 per Gcal
  // Recycled water: ~0.002 tons CO2 per m3
  let co2SavedPerUnit = 0.85;
  let unitLabel = 'tấn/tháng';

  if (selectedResourceType === 'waste_heat') {
    co2SavedPerUnit = 2.1;
    unitLabel = 'Gcal/tháng';
  } else if (selectedResourceType === 'recycled_water') {
    co2SavedPerUnit = 0.002;
    unitLabel = 'm³/tháng';
  } else if (selectedResourceType === 'scrap_plastic') {
    co2SavedPerUnit = 1.45;
    unitLabel = 'tấn/tháng';
  }

  // Avoided emissions per year
  const yearlyCo2Avoided = Math.round(monthlyVolume * co2SavedPerUnit * 12);
  
  // Transport emissions saved (internal KCN vs long distance)
  const transportSavedCo2 = Math.round((monthlyVolume * (100 - transportDistance) * 0.0001) * 12);
  const totalCo2SavedYear = yearlyCo2Avoided + transportSavedCo2;

  // Carbon Credit value
  const yearlyCreditUsd = totalCo2SavedYear * carbonCreditPriceUsd;
  const yearlyCreditVnd = yearlyCreditUsd * 25400; // 25,400 VND/USD

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Công cụ Tính Tín chỉ Carbon ESG & Báo cáo Tín nhiệm KCN Sinh thái
              </h2>
              <p className="text-xs text-slate-500">
                Theo chuẩn ISO 14064, GHG Protocol Scope 3 & Nghị định 35/2022/NĐ-CP Quản lý KCN
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Column Layout: Inputs & Certificate Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Inputs Panel */}
          <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-700 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              Thông số Hoạt động Tuần hoàn
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loại Tài nguyên Cộng sinh:
              </label>
              <select
                value={selectedResourceType}
                onChange={(e) => setSelectedResourceType(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs py-2 px-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="fly_ash">Tro bay & Xỉ than (Thay thế xi măng)</option>
                <option value="waste_heat">Nhiệt dư & Dòng hơi nóng (Thay lò hơi)</option>
                <option value="recycled_water">Nước thải Cột A tái sử dụng</option>
                <option value="scrap_plastic">Nhựa phế liệu & Bùn thải hữu cơ</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Khối lượng tuần hoàn:</span>
                <span className="text-emerald-700 font-extrabold">{monthlyVolume} {unitLabel}</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Bán kính Vận chuyển Nội bộ:</span>
                <span className="text-emerald-700 font-extrabold">{transportDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={transportDistance}
                onChange={(e) => setTransportDistance(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Định giá Tín chỉ Carbon (Sàn VCM/Sàn Quốc tế):</span>
                <span className="text-emerald-700 font-extrabold">${carbonCreditPriceUsd} / tấn CO₂e</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={carbonCreditPriceUsd}
                onChange={(e) => setCarbonCreditPriceUsd(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Calculated ESG Badges */}
            <div className="p-3 bg-emerald-900 text-white rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Tổng phát thải CO₂ cắt giảm:</span>
                <span className="font-extrabold text-emerald-300 text-sm">
                  {totalCo2SavedYear.toLocaleString('vi-VN')} Tấn CO₂e/năm
                </span>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-emerald-800">
                <span className="text-slate-300">Giá trị Tín chỉ Carbon quy đổi:</span>
                <span className="font-extrabold text-amber-300">
                  {yearlyCreditVnd.toLocaleString('vi-VN')} VNĐ (${yearlyCreditUsd.toLocaleString('en-US')})
                </span>
              </div>
            </div>
          </div>

          {/* Right Preview Certificate Display */}
          <div className="lg:col-span-7 bg-amber-50/40 p-6 rounded-2xl border border-amber-200/80 flex flex-col justify-between space-y-4 relative">
            {/* Printable Certificate Layout */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    ESG
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                      CHỨNG NHẬN CỘNG SINH & GIẢM PHÁT THẢI ESG
                    </h4>
                    <p className="text-[10px] text-slate-500">Mã định danh BQL KCN: ESG-ECOMATCH-2026-9921</p>
                  </div>
                </div>

                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-300">
                  ĐẠT CHUẨN LEEDS / LOTUS
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
                <p>
                  Xác nhận dự án cộng sinh tuần hoàn tài nguyên giữa các nhà máy thành viên thuộc <strong>Ban Quản lý Khu Công Nghiệp Liên Tỉnh</strong>:
                </p>

                <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1.5 font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dòng tài nguyên:</span>
                    <strong className="text-slate-900">
                      {selectedResourceType === 'fly_ash' && 'Tro bay lò hơi thay thế Xi măng'}
                      {selectedResourceType === 'waste_heat' && 'Dòng nhiệt thừa 165°C sấy nông sản'}
                      {selectedResourceType === 'recycled_water' && 'Nước xả Cột A tái chế tháp giải nhiệt'}
                      {selectedResourceType === 'scrap_plastic' && 'Tái chế phế liệu hạt nhựa'}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Quy mô tuần hoàn:</span>
                    <strong className="text-slate-900">{monthlyVolume} {unitLabel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cắt giảm phát thải Scope 3 (GHG Protocol):</span>
                    <strong className="text-green-700 font-extrabold">{totalCo2SavedYear.toLocaleString('vi-VN')} Tấn CO₂/năm</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-slate-500 block">Ưu đãi Thuế TNDN:</span>
                    <span className="font-bold text-emerald-800">Miễn 2 năm, giảm 50% 4 năm tiếp theo</span>
                  </div>
                  <div className="p-2 bg-teal-50 rounded-lg border border-teal-200">
                    <span className="text-slate-500 block">Đánh giá Xếp hạng ESG:</span>
                    <span className="font-bold text-teal-800">Xếp hạng AA+ Tiêu chuẩn KCN Sinh Thái</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Print & Export Actions */}
            <div className="pt-3 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Dữ liệu sẵn sàng kết xuất cho báo cáo kiểm toán BQL KCN & Bộ TN&MT
              </span>

              <button
                onClick={handlePrintCertificate}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                In Giấy chứng nhận ESG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
