import React from 'react';
import { 
  Factory, 
  Recycle, 
  Cpu, 
  MapPin, 
  Handshake, 
  PlusCircle, 
  Sparkles,
  BarChart3,
  Layers,
  Award,
  Bot,
  Activity,
  Truck,
  Gavel
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'inventory' | 'matchmaker' | 'map' | 'contracts' | 'iot' | 'logistics' | 'marketplace';
  setActiveTab: (tab: 'dashboard' | 'inventory' | 'matchmaker' | 'map' | 'contracts' | 'iot' | 'logistics' | 'marketplace') => void;
  onOpenAddResource: () => void;
  onOpenESGModal: () => void;
  onOpenAIConsultant: () => void;
  totalResourcesCount: number;
  totalMatchesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddResource,
  onOpenESGModal,
  onOpenAIConsultant,
  totalResourcesCount,
  totalMatchesCount,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-emerald-800/50 sticky top-0 z-40 shadow-lg">
      {/* Top Notification Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/40 px-4 py-1.5 text-xs text-emerald-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Hệ thống KCN Liên tỉnh Sáp nhập 2026
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline">Đồng Nai • Bình Dương • TP. Hồ Chí Minh • Bà Rịa - Vũng Tàu</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAIConsultant}
            className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span>Trợ lý AI Tư vấn Pháp lý KCN</span>
          </button>
          <button
            onClick={onOpenESGModal}
            className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Báo cáo Tín chỉ Carbon ESG</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-900/40 border border-emerald-400/30">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
                  EcoMatch Industrial
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                  AI Symbiosis
                </span>
              </div>
              <p className="text-xs text-emerald-200/70 truncate hidden sm:block">
                Nền tảng Cộng sinh Công nghiệp & Tuần hoàn Phế phụ phẩm
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Trang chủ
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'inventory'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              Sổ tay Tài nguyên
              <span className="ml-1 bg-slate-800 text-emerald-300 text-xs px-1.5 py-0.2 rounded-full border border-emerald-800">
                {totalResourcesCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('matchmaker')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'matchmaker'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-2 ring-emerald-400/50'
                  : 'text-emerald-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              Bộ não AI Ghép nối
              <span className="bg-amber-500/20 text-amber-300 text-xs px-1.5 py-0.2 rounded-full border border-amber-500/30 font-semibold">
                {totalMatchesCount} Đề xuất
              </span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'map'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Bản đồ KCN
            </button>

            <button
              onClick={() => setActiveTab('contracts')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'contracts'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Handshake className="w-4 h-4" />
              Thương thảo & Hợp đồng
            </button>

            <button
              onClick={() => setActiveTab('iot')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'iot'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              IoT & Mã CTNH
            </button>

            <button
              onClick={() => setActiveTab('logistics')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'logistics'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Truck className="w-4 h-4 text-teal-400" />
              Logistics & Mã QR
            </button>

            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-amber-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Gavel className="w-4 h-4 text-amber-400" />
              Sàn Đấu giá
            </button>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddResource}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-emerald-900/40 border border-emerald-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng ký Tài nguyên thừa</span>
              <span className="sm:hidden">Thêm</span>
            </button>
          </div>
        </div>

        {/* Mobile Subnav */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Trang chủ
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'inventory' ? 'bg-emerald-600 text-white' : 'text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Sổ tay ({totalResourcesCount})
          </button>
          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'matchmaker' ? 'bg-emerald-600 text-white' : 'text-emerald-300 font-semibold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI Ghép nối
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-300'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Bản đồ
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'contracts' ? 'bg-emerald-600 text-white' : 'text-slate-300'
            }`}
          >
            <Handshake className="w-3.5 h-3.5" />
            Hợp đồng
          </button>
          <button
            onClick={() => setActiveTab('iot')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'iot' ? 'bg-emerald-600 text-white' : 'text-slate-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            IoT & CTNH
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'logistics' ? 'bg-emerald-600 text-white' : 'text-slate-300'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-teal-400" />
            Logistics
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shrink-0 ${
              activeTab === 'marketplace' ? 'bg-emerald-600 text-white' : 'text-amber-300'
            }`}
          >
            <Gavel className="w-3.5 h-3.5 text-amber-400" />
            Đấu giá
          </button>
        </div>
      </div>
    </header>
  );
};
