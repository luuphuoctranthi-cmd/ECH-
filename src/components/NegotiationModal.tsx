import React, { useState } from 'react';
import { MatchProposal, SymbiosisContract } from '../types';
import { 
  X, 
  Handshake, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Coins, 
  Leaf, 
  Download, 
  Send, 
  Calculator, 
  Truck, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NegotiationModalProps {
  match: MatchProposal | null;
  onClose: () => void;
  onSaveContract: (contract: SymbiosisContract) => void;
}

export const NegotiationModal: React.FC<NegotiationModalProps> = ({
  match,
  onClose,
  onSaveContract,
}) => {
  if (!match) return null;

  // State for interactive negotiation terms
  const [agreedVolume, setAgreedVolume] = useState<number>(300); // e.g. 300 tấn/tháng
  const [unitPrice, setUnitPrice] = useState<number>(240000); // 240,000 VNĐ/tấn
  const [logisticsMethod, setLogisticsMethod] = useState<string>('Vận tải xe bồn chuyên dụng KCN Nhơn Trạch');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    {
      sender: match.sourceCompany,
      text: `Xin chào ${match.targetCompany}, chúng tôi rất hào hứng với phương án cộng sinh do AI EcoMatch đề xuất. Bên tôi có thể đáp ứng sản lượng tro bay đều đặn hằng tháng.`,
      time: '10:15',
    },
    {
      sender: match.targetCompany,
      text: `Chào anh! Chất lượng tro bay bên anh đạt chuẩn TCVN 6882 rất phù hợp với nhà máy gạch không nung của chúng tôi. Chúng tôi đề xuất mức giá 240.000 VNĐ/tấn.`,
      time: '10:18',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [contractCreated, setContractCreated] = useState(false);

  // Dynamic calculations
  const monthlyRevenueVnd = agreedVolume * unitPrice;
  const yearlyCo2Saved = Math.round(agreedVolume * 1.8 * 12); // ~1.8 tons CO2 per ton recycled
  const yearlyCostSavedVnd = Math.round(monthlyRevenueVnd * 12 * 0.45); // estimated savings

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'Đại diện Thương thảo',
        text: newMessage,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMessage('');
  };

  const handleGenerateContract = () => {
    const contract: SymbiosisContract = {
      id: `hd-cs-${Date.now()}`,
      matchId: match.id,
      partyA: match.sourceCompany,
      partyB: match.targetCompany,
      resourceName: match.sourceResourceName,
      agreedVolume,
      unit: 'tấn/tháng',
      agreedPrice: unitPrice,
      logisticsMethod,
      contractStatus: 'pending_signature',
      co2SavedYear: yearlyCo2Saved,
      costSavedMonth: monthlyRevenueVnd,
      createdDate: new Date().toLocaleDateString('vi-VN'),
    };

    onSaveContract(contract);
    setContractCreated(true);
  };

  const downloadContractText = () => {
    const textContent = `
====================================================================
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
--------------------------------------------------------------------
DỰ THẢO HỢP ĐỒNG CỘNG SINH CÔNG NGHIỆP & CHUYỂN GIAO PHẾ PHỤ PHẨM
(Căn cứ Nghị định 35/2022/NĐ-CP về Quản lý Khu công nghiệp & KCN Sinh thái)

Mã Hợp Đồng: HDCS-${match.id.toUpperCase()}
Ngày khởi tạo: ${new Date().toLocaleDateString('vi-VN')}

BÊN A (BÊN CUNG CẤP): ${match.sourceCompany}
Địa chỉ / Khu công nghiệp: ${match.sourceZone}

BÊN B (BÊN TIẾP NHẬN): ${match.targetCompany}
Đại diện Ngành nghề: ${match.targetIndustry}
Địa chỉ / Khu công nghiệp: ${match.targetZone}

ĐIỀU 1: NỘI DUNG THỎA THUẬN CỘNG SINH
- Tài nguyên/Phế phụ phẩm bàn giao: ${match.sourceResourceName}
- Khối lượng bàn giao cam kết: ${agreedVolume} tấn/tháng
- Đơn giá thỏa thuận: ${unitPrice.toLocaleString('vi-VN')} VNĐ/tấn
- Tổng giá trị hợp đồng ước tính: ${(monthlyRevenueVnd * 12).toLocaleString('vi-VN')} VNĐ/năm
- Phương thức vận chuyển: ${logisticsMethod} (Khoảng cách: ${match.distanceKm} km)

ĐIỀU 2: CHỈ SỐ MÔI TRƯỜNG & CAM KẾT ESG
- Lượng phát thải CO2 giảm thiểu ước tính: ${yearlyCo2Saved.toLocaleString('vi-VN')} tấn CO2e/năm
- Đạt tiêu chuẩn KCN Sinh thái Tiêu chuẩn Quốc gia (Nghị định 35/2022/NĐ-CP).

ĐIỀU 3: ĐIỀU KHOẢN THI HÀNH
Hai bên cam kết tuân thủ các quy định về An toàn Môi trường, Đo lường chất lượng và báo cáo BQL Khu công nghiệp định kỳ.

ĐẠI DIỆN BÊN A                                Đại diện BÊN B
(Ký & ghi rõ họ tên)                          (Ký & ghi rõ họ tên)
====================================================================
    `;

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Du_Thao_Hop_Dong_Cong_Sinh_${match.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Không gian Thương thảo & Tạo Hợp đồng Cộng sinh
              </h2>
              <p className="text-xs text-slate-500">
                Mã kết nối AI: <span className="font-mono text-emerald-700 font-bold">{match.id}</span>
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

        {/* Overview Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Bên Cung cấp (Bên A):</span>
            <p className="font-bold text-slate-900 text-sm">{match.sourceCompany}</p>
            <p className="text-slate-500">{match.sourceZone} • {match.sourceResourceName}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-teal-700 uppercase">Bên Tiêu thụ (Bên B):</span>
            <p className="font-bold text-slate-900 text-sm">{match.targetCompany}</p>
            <p className="text-slate-500">{match.targetZone} • {match.targetIndustry}</p>
          </div>
        </div>

        {/* 2 Main Columns: Live Parameters / ROI Simulator & Live Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: ROI Simulator & Contract Terms */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              Công cụ Mô phỏng ROI & Giá trị Hợp đồng
            </h3>

            {/* Slider 1: Volume */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Sản lượng bàn giao cam kết:</span>
                <span className="text-emerald-700 font-extrabold">{agreedVolume} tấn/tháng</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={agreedVolume}
                onChange={(e) => setAgreedVolume(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Slider 2: Unit Price */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Đơn giá đề xuất:</span>
                <span className="text-emerald-700 font-extrabold">{unitPrice.toLocaleString('vi-VN')} VNĐ/tấn</span>
              </div>
              <input
                type="range"
                min="50000"
                max="800000"
                step="10000"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Logistics Input */}
            <div className="space-y-1 text-xs">
              <label className="font-semibold text-slate-700 block">Phương án Logistics KCN:</label>
              <input
                type="text"
                value={logisticsMethod}
                onChange={(e) => setLogisticsMethod(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
              />
            </div>

            {/* Calculated Impact Metrics */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Giá trị hợp đồng hàng tháng:</span>
                <span className="font-extrabold text-emerald-800 text-sm">
                  {monthlyRevenueVnd.toLocaleString('vi-VN')} VNĐ/tháng
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Giảm phát thải CO₂ ước tính:</span>
                <span className="font-extrabold text-green-700">
                  {yearlyCo2Saved.toLocaleString('vi-VN')} tấn CO₂/năm
                </span>
              </div>
            </div>

            {/* Contract Generation Button */}
            <div className="pt-2">
              {!contractCreated ? (
                <button
                  onClick={handleGenerateContract}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Khởi tạo Dự thảo Hợp đồng Cộng sinh
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="p-2.5 bg-green-100 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    Đã khởi tạo Dự thảo Hợp đồng thành công!
                  </div>
                  <button
                    onClick={downloadContractText}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    Tải Dự thảo Hợp đồng bản Tiếng Việt (.TXT)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Live Chat & Negotiation Workspace */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Handshake className="w-4 h-4 text-teal-600" />
              Nhật ký Thương thảo Trực tiếp 2 Bên
            </h3>

            <div className="flex-1 max-h-60 overflow-y-auto space-y-3 p-3 bg-white rounded-xl border border-slate-200/80">
              {chatMessages.map((msg, index) => (
                <div key={index} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="p-2.5 rounded-xl bg-slate-100 text-slate-800 leading-relaxed font-medium">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập đề xuất hoặc câu hỏi thương thảo..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/30 outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Hợp đồng tuân thủ Nghị định 35/2022/NĐ-CP KCN Sinh thái
          </span>
          <button onClick={onClose} className="text-slate-600 hover:underline cursor-pointer font-medium">
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
