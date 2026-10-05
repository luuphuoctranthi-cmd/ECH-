import React, { useState } from 'react';
import { IndustrialZoneStats, MatchProposal } from '../types';
import { MapPin, Building2, Recycle, Layers, ExternalLink, Sparkles, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

interface SymbiosisMapProps {
  zones: IndustrialZoneStats[];
  matches: MatchProposal[];
  onSelectMatch: (match: MatchProposal) => void;
}

export const SymbiosisMap: React.FC<SymbiosisMapProps> = ({
  zones,
  matches,
  onSelectMatch,
}) => {
  const [selectedZone, setSelectedZone] = useState<IndustrialZoneStats>(zones[0]);

  // Matches involving this zone
  const zoneMatches = matches.filter(
    (m) => m.sourceZone === selectedZone.name || m.targetZone === selectedZone.name
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              Bản đồ Mạng lưới Cộng sinh Vùng KCN Sáp nhập
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Trực quan hóa luồng tài nguyên tuần hoàn, nhiệt dư và dòng chất thải giữa các Khu Công nghiệp vùng kinh tế phía Nam
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            4 Vùng trọng điểm • {zones.reduce((a, b) => a + b.factoryCount, 0)} Nhà máy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Interactive Industrial Map Visualizer */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-emerald-800/40 shadow-xl text-white space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Sơ đồ Liên kết Vùng KCN (Giai đoạn 2026 - 2030)
              </span>
            </div>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              Tọa độ GIS KCN Sinh Thái
            </span>
          </div>

          {/* Canvas Map Simulation */}
          <div className="relative min-h-[380px] bg-slate-950 rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

            {/* Industrial Zone Nodes */}
            <div className="relative z-10 grid grid-cols-2 gap-6 my-auto">
              {zones.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative group ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-400 shadow-lg shadow-emerald-900/50 ring-2 ring-emerald-500/30'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30 mb-2">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                        {zone.activeSymbiosisCount} Liên kết
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {zone.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {zone.province} • {zone.factoryCount} nhà máy
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Đã tái chế:</span>
                      <strong className="text-emerald-300 font-mono">
                        {(zone.totalRecycledTons / 1000).toFixed(1)}k tấn
                      </strong>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Phế phẩm rắn
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Dòng Nhiệt thải
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Nước & Hóa chất
                </span>
              </div>
              <span>Click chọn KCN để xem luồng kết nối</span>
            </div>
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                Chi tiết KCN đang chọn
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                {selectedZone.name}
              </h2>
              <p className="text-xs text-slate-500">
                Tỉnh/Thành: <strong className="text-slate-800">{selectedZone.province}</strong>
              </p>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Nhà máy tham gia</span>
                <strong className="text-slate-900 text-base font-bold">{selectedZone.factoryCount}</strong>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-emerald-700 block text-[10px]">Cộng sinh hoạt động</span>
                <strong className="text-emerald-900 text-base font-bold">{selectedZone.activeSymbiosisCount} cặp</strong>
              </div>
            </div>

            {/* Zone Symbiosis Matches */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Các Luồng Cộng sinh tiêu biểu tại KCN này:
              </h3>

              {zoneMatches.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 italic">
                  Đang cập nhật thêm luồng cộng sinh tại khu vực này.
                </p>
              ) : (
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {zoneMatches.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200/80 transition-all space-y-1.5 cursor-pointer"
                      onClick={() => onSelectMatch(m)}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span className="truncate max-w-[70%]">{m.synergyType}</span>
                        <span className="text-emerald-700 text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full">
                          {m.compatibilityScore}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {m.sourceCompany} ➔ {m.targetCompany}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span>{m.economicBenefit}</span>
                        <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                          Thương thảo <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Mạng lưới hạ tầng truyền dẫn nhiệt và vận chuyển nội bộ KCN được hỗ trợ bởi BQL.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
