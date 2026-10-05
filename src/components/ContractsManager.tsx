import React from 'react';
import { SymbiosisContract, MatchProposal } from '../types';
import { Handshake, FileText, Download, CheckCircle2, Building2, Coins, Leaf, ArrowRight, ShieldCheck, Plus } from 'lucide-react';

interface ContractsManagerProps {
  contracts: SymbiosisContract[];
  matches: MatchProposal[];
  onSelectMatchToNegotiate: (match: MatchProposal) => void;
}

export const ContractsManager: React.FC<ContractsManagerProps> = ({
  contracts,
  matches,
  onSelectMatchToNegotiate,
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Handshake className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              Quản lý Thương thảo & Hợp đồng Cộng sinh Công nghiệp
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi tiến độ ký kết thỏa thuận hợp tác, dự thảo hợp đồng pháp lý và cấp chứng nhận ESG
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            {contracts.length} Hợp đồng đã khởi tạo
          </span>
        </div>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-600" />
          Danh sách Dự thảo Hợp đồng & Thỏa thuận đã lập
        </h2>

        {contracts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <Handshake className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-700 font-semibold">Chưa có hợp đồng nào được khởi tạo</p>
            <p className="text-xs text-slate-400">
              Hãy bấm vào nút "Kết nối và thương thảo ngay" trên các thẻ đề xuất ghép nối AI để tạo hợp đồng.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {contract.id}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {contract.resourceName}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Chờ hai bên ký số KCN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bên Cung cấp (Bên A):</span>
                    <strong className="text-slate-900 font-bold">{contract.partyA}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bên Tiêu thụ (Bên B):</span>
                    <strong className="text-slate-900 font-bold">{contract.partyB}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Sản lượng cam kết</span>
                    <strong className="text-slate-900 font-bold">{contract.agreedVolume} {contract.unit}</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Đơn giá thỏa thuận</span>
                    <strong className="text-emerald-700 font-bold">{contract.agreedPrice.toLocaleString('vi-VN')} VNĐ/tấn</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Cắt giảm CO₂</span>
                    <strong className="text-green-700 font-bold">{contract.co2SavedYear} Tấn CO₂/năm</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Ngày tạo: {contract.createdDate}</span>
                  <span className="text-emerald-700 font-bold">Tuân thủ Nghị định 35/2022/NĐ-CP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available AI Matches Ready for Negotiation */}
      <div className="space-y-4 pt-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Handshake className="w-4 h-4 text-emerald-600" />
          Các Đề xuất AI đang sẵn sàng mở Không gian Thương thảo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-all shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {m.compatibilityScore}% Tương thích
                  </span>
                  <span className="text-[11px] text-slate-500">{m.synergyType}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">
                  {m.sourceCompany} ➔ {m.targetCompany}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {m.matchReason}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-700">{m.economicBenefit}</span>
                <button
                  onClick={() => onSelectMatchToNegotiate(m)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1"
                >
                  Mở không gian thương thảo
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
