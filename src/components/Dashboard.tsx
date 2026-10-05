import React from 'react';
import { SystemStats, IndustrialZoneStats, MatchProposal, ResourceItem } from '../types';
import { 
  Factory, 
  Recycle, 
  Leaf, 
  Coins, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Building2, 
  Zap, 
  Droplets, 
  CheckCircle2, 
  ExternalLink,
  Flame,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  stats: SystemStats;
  zones: IndustrialZoneStats[];
  recentMatches: MatchProposal[];
  resources: ResourceItem[];
  onNavigateToMatchmaker: () => void;
  onNavigateToInventory: () => void;
  onSelectMatchToNegotiate: (match: MatchProposal) => void;
  onOpenESGModal?: () => void;
  onOpenAIConsultant?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  zones,
  recentMatches,
  resources,
  onNavigateToMatchmaker,
  onNavigateToInventory,
  onSelectMatchToNegotiate,
  onOpenESGModal,
  onOpenAIConsultant,
}) => {
  // Calculate breakdown numbers
  const solidWasteCount = resources.filter(r => r.category === 'solid_waste').length;
  const energyHeatCount = resources.filter(r => r.category === 'energy_heat').length;
  const waterChemCount = resources.filter(r => r.category === 'water_chemical').length;
  const totalRes = resources.length || 1;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with Call to Action */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-900 text-white p-6 sm:p-10 border border-emerald-800/40 shadow-2xl">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 top-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            Nền tảng Sinh thái Công nghiệp Thế hệ mới 2026
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Tối ưu hóa Phế phụ phẩm & Năng lượng thừa thông qua <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">Bộ não AI Cộng sinh</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Kết nối trực tiếp các doanh nghiệp trong vùng kinh tế công nghiệp sáp nhập địa giới. Biến chất thải của nhà máy này thành nguyên liệu đầu vào giá trị cao cho nhà máy khác, giảm chi phí xử lý và hạ lượng phát thải carbon.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToMatchmaker}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              Tìm đối tác cộng sinh AI ngay
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToInventory}
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold px-5 py-3 rounded-2xl border border-slate-700 transition-all hover:border-slate-500 cursor-pointer"
            >
              <Recycle className="w-4 h-4 text-emerald-400" />
              Khai báo Sổ tay Phế phụ phẩm
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key KPI Metric Cards (Bắt buộc theo yêu cầu) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Chỉ số Tác động Môi trường & Kinh tế Toàn mạng lưới
          </h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            Cập nhật thời gian thực
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Số lượng nhà máy tham gia */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Cơ sở sản xuất
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Factory className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.participatingFactories.toLocaleString('vi-VN')}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">+12 nhà máy</span> tháng này
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Nhà máy tham gia hệ thống KCN
            </div>
          </div>

          {/* Card 2: Khối lượng phế phụ phẩm đã tuần hoàn */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Phế phụ phẩm tuần hoàn
              </span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                <Recycle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.recycledVolumeTons.toLocaleString('vi-VN')}{' '}
              <span className="text-base font-semibold text-slate-600">tấn</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
              <span className="text-teal-600 font-semibold">↑ 18.4%</span> so với cùng kỳ
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Tổng khối lượng tài nguyên đã tái chế
            </div>
          </div>

          {/* Card 3: Lượng khí thải CO2 tiết kiệm được */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Khí thải CO₂ tiết kiệm
              </span>
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/60 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.co2SavedTons.toLocaleString('vi-VN')}{' '}
              <span className="text-base font-semibold text-slate-600">tấn CO₂e</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
              Tương đương <span className="text-green-700 font-semibold">5.2 triệu cây xanh</span>
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Cắt giảm khí nhà kính toàn mạng lưới
            </div>
          </div>

          {/* Card 4: Giá trị kinh tế tạo ra */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Giá trị kinh tế tạo ra
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.economicValueBillionVnd}{' '}
              <span className="text-base font-semibold text-slate-600">Tỷ VNĐ</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1">
              Tiết kiệm từ <span className="text-amber-700 font-semibold">mua nguyên liệu & xử lý</span>
            </p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Tổng giá trị thặng dư cộng sinh
            </div>
          </div>
        </div>
      </div>

      {/* Resource Category Distribution & Industrial Zones Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Resource Categories & Key Metrics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Phân bổ Cơ cấu Tài nguyên Thừa đang đăng ký
              </h3>
              <p className="text-xs text-slate-500">
                Phân loại chi tiết theo 3 nhóm phụ phẩm cốt lõi
              </p>
            </div>
            <button
              onClick={onNavigateToInventory}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
            >
              Xem danh mục Sổ tay
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Solid Waste */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Phế phẩm rắn
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {Math.round((solidWasteCount / totalRes) * 100)}%
                </span>
              </div>
              <p className="text-2xl font-black text-slate-800">
                {solidWasteCount} <span className="text-xs font-normal text-slate-500">loại</span>
              </p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${(solidWasteCount / totalRes) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 truncate">Tro bay, xỉ than, mút xốp, bùn vi sinh...</p>
            </div>

            {/* Energy / Heat */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Nhiệt thải & Năng lượng
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  {Math.round((energyHeatCount / totalRes) * 100)}%
                </span>
              </div>
              <p className="text-2xl font-black text-slate-800">
                {energyHeatCount} <span className="text-xs font-normal text-slate-500">loại</span>
              </p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{ width: `${(energyHeatCount / totalRes) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 truncate">Hơi nước dư, khí nóng 165°C, nhiệt ngưng...</p>
            </div>

            {/* Water / Chemical */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Nước & Hóa chất
                </span>
                <span className="text-xs font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-full">
                  {Math.round((waterChemCount / totalRes) * 100)}%
                </span>
              </div>
              <p className="text-2xl font-black text-slate-800">
                {waterChemCount} <span className="text-xs font-normal text-slate-500">loại</span>
              </p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-sky-500 h-1.5 rounded-full"
                  style={{ width: `${(waterChemCount / totalRes) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 truncate">Nước thải Cột A, NaOH kiềm phế, kiềm dư...</p>
            </div>
          </div>

          {/* Quick Guidance Box for ESG Compliance */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Tiêu chuẩn KCN Sinh thái theo Nghị định 35/2022/NĐ-CP:</span>
              <p className="text-slate-700 leading-relaxed">
                Các doanh nghiệp thực hiện tối thiểu 01 liên kết cộng sinh công nghiệp sẽ được ưu tiên tiếp cận nguồn vốn ưu đãi xanh, miễn giảm thuế bảo vệ môi trường và cấp chứng chỉ KCN Sinh thái Tiêu chuẩn Quốc gia.
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Industrial Zones List */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Vùng KCN Sáp nhập
              </h3>
              <span className="text-xs text-slate-500">{zones.length} khu vực</span>
            </div>

            <div className="space-y-3">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 transition-colors flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">{zone.name}</p>
                    <p className="text-[11px] text-slate-500">{zone.province} • {zone.factoryCount} nhà máy</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full block">
                      {zone.activeSymbiosisCount} liên kết
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {(zone.totalRecycledTons / 1000).toFixed(1)}k tấn tái chế
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToMatchmaker}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              Kích hoạt AI Tìm ghép nối vùng KCN
            </button>
          </div>
        </div>
      </div>

      {/* Risk Analysis & Mitigation Strategy Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-0.5 rounded-full text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Khung Đánh giá An toàn Vận hành KCN
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Phân tích Rủi ro & Giải pháp Phòng ngừa Triển khai Thực tế
            </h2>
            <p className="text-xs text-slate-500">
              Đảm bảo tính tuân thủ pháp lý, an toàn thông tin doanh nghiệp và kiểm soát chất lượng khi đưa hệ thống vào thí điểm tại địa phương.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk 1: Security */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                01
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Rủi ro Bảo mật</span>
                <h3 className="text-sm font-bold text-slate-900">
                  Rủi ro về bảo mật dữ liệu công nghiệp
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
              <strong>Nguy cơ:</strong> Thông số kỹ thuật, quy trình công nghệ và trữ lượng phế phụ phẩm của nhà máy có thể bị rò rỉ hoặc đối thủ cạnh tranh khai thác.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Giải pháp khắc phục & Kiểm soát:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Tích hợp cơ chế mã hóa dữ liệu đầu cuối (End-to-End Encryption) và phân quyền tài khoản chặt chẽ theo phân cấp quản lý của Ban Quản lý KCN (Role-Based Access Control). Thông tin chỉ hiển thị dạng mã hóa ẩn danh trước khi 2 bên ký thỏa thuận bảo mật (NDA).
              </p>
            </div>
          </div>

          {/* Risk 2: Legal & Dispute */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                02
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Rủi ro Pháp lý</span>
                <h3 className="text-sm font-bold text-slate-900">
                  Rủi ro pháp lý trong giao dịch điện tử tuần hoàn
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
              <strong>Nguy cơ:</strong> Tranh chấp về sai lệch chỉ tiêu chất lượng, tạp chất hoặc khối lượng phế phụ phẩm khi giao nhận thực tế tại nhà xưởng.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Giải pháp khắc phục & Kiểm soát:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Tích hợp bộ hợp đồng mẫu chuẩn theo Nghị định 35/2022/NĐ-CP đính kèm điều khoản bắt buộc về kiểm định mẫu vật lý (Physical Sampling Test) do đơn vị thứ 3 độc lập thực hiện trước khi thực hiện bàn giao chính thức.
              </p>
            </div>
          </div>

          {/* Risk 3: Transport & QR Permit */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                03
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Rủi ro Vận chuyển</span>
                <h3 className="text-sm font-bold text-slate-900">
                  Rủi ro vi phạm quy định chất thải nguy hại (CTNH) khi lưu thông
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
              <strong>Nguy cơ:</strong> Phương tiện vận chuyển bị đình trệ tại trạm kiểm soát hoặc bị xử phạt do thiếu mã phép phân loại chất thải theo TT 02/2022/TT-BTNMT.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Giải pháp khắc phục & Kiểm soát:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Cấp Giấy phép Vận chuyển Mã QR Mã hóa liên thông với BQL KCN, tự động tra cứu mã CTNH và phương tiện xe bồn chuyên dụng được cấp phép trước khi cho phép xuất bến.
              </p>
            </div>
          </div>

          {/* Risk 4: IoT Operational Sensor Accuracy */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                04
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">Rủi ro IoT & Dòng năng lượng</span>
                <h3 className="text-sm font-bold text-slate-900">
                  Rủi ro biến động nhiệt độ / lưu lượng dòng hơi ngưng real-time
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
              <strong>Nguy cơ:</strong> Gián đoạn nguồn cung nhiệt thừa do nhà máy nguồn giảm công suất đột xuất ảnh hưởng đến chuỗi sấy nông sản bên mua.
            </p>

            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Giải pháp khắc phục & Kiểm soát:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Lắp đặt thiết bị Telemetry Cảm biến IoT giám sát nhiệt độ/áp suất liên tục 24/7 với cảnh báo sớm bằng tin nhắn SMS/Email tự động kích hoạt lò sấy dự phòng khi nhiệt độ giảm quá 10%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured AI Match Proposals Preview */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">
                Đề xuất Ghép nối AI Tiêu biểu Mới nhất
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Các phương án cộng sinh có tỷ lệ tương thích cao do "Bộ não AI EcoMatch" tính toán
            </p>
          </div>

          <button
            onClick={onNavigateToMatchmaker}
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 cursor-pointer"
          >
            Xem tất cả đề xuất AI ({recentMatches.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recentMatches.slice(0, 2).map((match) => (
            <div
              key={match.id}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Match Header Score */}
                <div className="flex items-start justify-between gap-2">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {match.compatibilityScore}% Tương thích
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                    Bán kính {match.distanceKm} km
                  </span>
                </div>

                {/* Company Synergy Diagram */}
                <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span className="text-emerald-700 font-extrabold truncate max-w-[45%]">
                      {match.sourceCompany}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px] px-1 bg-slate-100 rounded">➔</span>
                    <span className="text-teal-700 font-extrabold truncate max-w-[45%] text-right">
                      {match.targetCompany}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 flex items-center justify-between bg-slate-50 p-2 rounded-lg">
                    <span className="font-medium text-emerald-900 truncate">
                      {match.sourceResourceName}
                    </span>
                    <span className="text-slate-500 text-[10px] shrink-0 font-medium">
                      {match.synergyType}
                    </span>
                  </div>
                </div>

                {/* AI Reasoning Section (Rất quan trọng theo yêu cầu) */}
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs space-y-1">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Lý do AI đề xuất:
                  </span>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {match.matchReason}
                  </p>
                </div>
              </div>

              {/* Bottom Action & Stats */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-700">
                    {match.economicBenefit}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Giảm {match.co2ReductionTonsYear} tấn CO₂/năm
                  </p>
                </div>

                <button
                  onClick={() => onSelectMatchToNegotiate(match)}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Kết nối & Thương thảo
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
