import React, { useState } from 'react';
import { MatchProposal, ResourceItem } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  TrendingUp, 
  Coins, 
  Leaf, 
  ArrowRight, 
  SlidersHorizontal, 
  Building2, 
  Zap, 
  RefreshCw, 
  Info, 
  ShieldCheck,
  ChevronDown,
  Layers
} from 'lucide-react';

interface SmartMatchmakerProps {
  matches: MatchProposal[];
  resources: ResourceItem[];
  onTriggerRunAI: (criteria: any) => Promise<void>;
  isLoadingAI: boolean;
  onSelectMatchToNegotiate: (match: MatchProposal) => void;
}

export const SmartMatchmaker: React.FC<SmartMatchmakerProps> = ({
  matches,
  resources,
  onTriggerRunAI,
  isLoadingAI,
  onSelectMatchToNegotiate,
}) => {
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [priorityFocus, setPriorityFocus] = useState<'co2' | 'cost' | 'distance'>('co2');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleRunAISearch = async () => {
    await onTriggerRunAI({
      maxDistanceKm: maxDistance,
      priorityFocus,
      zone: selectedZone,
      resourceCount: resources.length,
    });
  };

  // Filter local matches according to controls
  const filteredMatches = matches.filter((m) => {
    if (m.distanceKm > maxDistance) return false;
    if (selectedZone !== 'all' && m.sourceZone !== selectedZone && m.targetZone !== selectedZone) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner for Core AI Brain */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            Bộ Não AI Gợi Ý Ghép Nối Cộng Sinh (Smart Matchmaker Engine)
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Thuật toán AI Ghép nối Tuần hoàn Phế phụ phẩm
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Phân tích tự động đặc tính hóa lý, khoảng cách địa lý, tiêu chuẩn công nghiệp và mô hình chi phí logistics giữa các nhà máy để đề xuất điểm cộng sinh tối ưu nhất.
          </p>

          {/* Core Button "Tìm đối tác cộng sinh AI" (Theo đúng yêu cầu) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleRunAISearch}
              disabled={isLoadingAI}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/80 border border-emerald-300/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 cursor-pointer"
            >
              {isLoadingAI ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-200" />
                  <span>Bộ não AI đang tính toán cộng sinh...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 text-amber-200 animate-bounce" />
                  <span>Tìm đối tác cộng sinh AI</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold px-4 py-3 rounded-2xl border border-slate-700 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span>Tùy chỉnh tiêu chí AI</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Bán kính Khoảng cách Tối đa: <span className="text-emerald-400 font-bold">{maxDistance} km</span>
              </label>
              <input
                type="range"
                min="2"
                max="50"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Tiêu chí Ưu tiên tính toán:
              </label>
              <select
                value={priorityFocus}
                onChange={(e) => setPriorityFocus(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="co2">Tối ưu hóa Giảm thải CO₂ & ESG</option>
                <option value="cost">Tối ưu hóa Chi phí & ROI Kinh tế</option>
                <option value="distance">Tối ưu hóa Vận chuyển Nội bộ KCN</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">
                Khu Công Nghiệp vùng trọng điểm:
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">Tất cả KCN Sáp nhập</option>
                <option value="KCN Nhơn Trạch III">KCN Nhơn Trạch III (Đồng Nai)</option>
                <option value="KCN Biên Hòa 2">KCN Biên Hòa 2 (Đồng Nai)</option>
                <option value="KCN Hiệp Phước">KCN Hiệp Phước (TP.HCM)</option>
                <option value="KCN VSIP I">KCN VSIP I (Bình Dương)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* AI Matches List Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              Danh sách Đề xuất Ghép nối Sinh thái ({filteredMatches.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Được xếp hạng theo chỉ số % tương thích từ Bộ não AI EcoMatch
            </p>
          </div>

          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 hidden sm:block">
            Mô hình Gemini 3.6 Flash Analysis
          </div>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <Info className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-700 font-semibold">Chưa tìm thấy đề xuất ghép nối tương thích trong bán kính {maxDistance}km</p>
            <p className="text-xs text-slate-400">Hãy mở rộng bán kính khoảng cách hoặc nhấn nút "Tìm đối tác cộng sinh AI" phía trên.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all space-y-6 relative overflow-hidden group"
              >
                {/* Top Badge Banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      {match.compatibilityScore}% ĐIỂM TƯƠNG THÍCH CỘNG SINH
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-200">
                      {match.synergyType}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Khoảng cách: <strong className="text-slate-800">{match.distanceKm} km</strong>
                    </span>
                  </div>
                </div>

                {/* Company A -> Company B Relationship Card */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  {/* Source Company (Bên cung cấp) */}
                  <div className="md:col-span-3 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Bên phát thải / Cung cấp
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {match.sourceCompany}
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      {match.sourceResourceName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Vị trí: {match.sourceZone}
                    </p>
                  </div>

                  {/* Transfer Indicator Arrow */}
                  <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                      Chuyển giao
                    </span>
                  </div>

                  {/* Target Company (Bên tiêu thụ) */}
                  <div className="md:col-span-3 space-y-1 md:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                      Bên tiếp nhận / Tiêu thụ
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {match.targetCompany}
                    </h3>
                    <p className="text-xs text-slate-700 font-semibold">
                      Ngành: {match.targetIndustry}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Vị trí: {match.targetZone}
                    </p>
                  </div>
                </div>

                {/* Core Feature: "LÝ DO AI ĐỀ XUẤT" (Strict Requirement from Prompt) */}
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-amber-200/80 text-amber-900">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      Lý do AI đề xuất ghép nối:
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {match.matchReason}
                  </p>

                  {match.aiAnalysisHighlights && (
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {match.aiAnalysisHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Impact & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <Coins className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-[10px] text-slate-500 block leading-none">Lợi ích kinh tế</span>
                        <span className="text-xs font-extrabold text-emerald-800">{match.economicBenefit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-xl border border-green-200">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="text-[10px] text-slate-500 block leading-none">Giảm phát thải</span>
                        <span className="text-xs font-extrabold text-green-800">{match.co2ReductionTonsYear} Tấn CO₂/năm</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Action Button: "Kết nối và thương thảo ngay" */}
                  <button
                    onClick={() => onSelectMatchToNegotiate(match)}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-md shadow-emerald-900/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Kết nối và thương thảo ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
