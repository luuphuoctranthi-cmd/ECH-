import React, { useState } from 'react';
import { IoTSensorData } from '../types';
import { 
  Activity, 
  Cpu, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Search, 
  SlidersHorizontal,
  Flame,
  Droplet,
  FileCheck,
  TrendingUp,
  Info
} from 'lucide-react';

interface IoTSensorManagerProps {
  sensors: IoTSensorData[];
}

export const IoTSensorManager: React.FC<IoTSensorManagerProps> = ({ sensors: initialSensors }) => {
  const [sensors, setSensors] = useState<IoTSensorData[]>(initialSensors);
  const [filterHazardous, setFilterHazardous] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [simulatingStream, setSimulatingStream] = useState<boolean>(false);

  // Hazardous Waste (CTNH) Lookup Code Table based on TT 02/2022/TT-BTNMT & QCVN 07:2009
  const hazardousCodeLookup = [
    { code: '12 01 01', name: 'Tro bay, xỉ than, xỉ lò hơi từ quá trình đốt than', status: 'Không nguy hại if LOI < 5%', rule: 'QCVN 07:2009/BTNMT' },
    { code: '19 02 01', name: 'Dung dịch kiềm xả thải chứa kiềm xút NaOH > 10%', status: 'Chất thải nguy hại (Tính ăn mòn)', rule: 'TT 02/2022/TT-BTNMT' },
    { code: '02 07 01', name: 'Bùn vi sinh xả thải chế biến thực phẩm & bia', status: 'Chất thải thông thường', rule: 'QCVN 50:2013/BTNMT' },
    { code: '12 03 01', name: 'Dung dịch axit thải xả từ công đoạn tẩy rửa mạ', status: 'Chất thải nguy hại (Tính Axit)', rule: 'TT 02/2022/TT-BTNMT' },
    { code: '12 01 04', name: 'Bụi kim loại & Bã xỉ quặng đúc gang thép', status: 'Cần kiểm định TCLP', rule: 'QCVN 07:2009/BTNMT' },
  ];

  const handleSimulateRefresh = () => {
    setSimulatingStream(true);
    setTimeout(() => {
      setSensors((prev) =>
        prev.map((sensor) => {
          // slight fluctuation
          const delta = (Math.random() - 0.5) * 0.4;
          const newValue = Number((sensor.currentValue + delta).toFixed(2));
          return {
            ...sensor,
            currentValue: newValue,
            lastUpdated: 'Live stream vừa cập nhật',
          };
        })
      );
      setSimulatingStream(false);
    }, 800);
  };

  const filteredSensors = sensors.filter((s) => {
    if (searchQuery && !s.factoryName.toLowerCase().includes(searchQuery.toLowerCase()) && !s.resourceName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterHazardous === 'hazardous' && !s.hazardousWasteCode?.includes('19') && !s.hazardousWasteCode?.includes('12 03')) {
      return false;
    }
    if (filterHazardous === 'non_hazardous' && (s.hazardousWasteCode?.includes('19') || s.hazardousWasteCode?.includes('12 03'))) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-teal-800/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              Hệ thống IoT Telemetry Real-time & Tra cứu Mã CTNH
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Giám sát Chất lượng Phế phụ phẩm & Mã Chất thải Nguy hại (CTNH)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kết nối trực tiếp cảm biến IoT tại bể chứa, đường ống hơi và nhà xưởng. Đảm bảo 100% phế phụ phẩm đạt chuẩn an toàn QCVN trước khi luân chuyển.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSimulateRefresh}
              disabled={simulatingStream}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg border border-emerald-400/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${simulatingStream ? 'animate-spin' : ''}`} />
              <span>Đồng bộ Cảm biến IoT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên nhà máy hoặc tài nguyên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500/30 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto text-xs">
          <span className="text-slate-500 font-semibold">Lọc phân loại CTNH:</span>
          <select
            value={filterHazardous}
            onChange={(e) => setFilterHazardous(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 py-2 px-3 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">Tất cả tài nguyên IoT</option>
            <option value="non_hazardous">Không nguy hại (QCVN 07)</option>
            <option value="hazardous">Chất thải có mã CTNH</option>
          </select>
        </div>
      </div>

      {/* Live Sensors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSensors.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {sensor.hazardousWasteCode}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {sensor.resourceName}
                </h3>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Live Stream
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-500 block">{sensor.factoryName}</span>
              <span className="text-[11px] font-semibold text-slate-700 block">
                Thông số đo đạc: <strong className="text-slate-900">{sensor.parameter}</strong>
              </span>
            </div>

            {/* Metric Display */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Giá trị cảm biến</span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {sensor.currentValue} <span className="text-xs font-normal text-slate-300">{sensor.unit}</span>
                </span>
              </div>

              <div className="text-right text-[10px] text-slate-400">
                <span>Ngưỡng an toàn:</span>
                <p className="font-mono font-bold text-slate-200">
                  {sensor.safeMin} - {sensor.safeMax} {sensor.unit}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Đồng bộ: {sensor.lastUpdated}</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Đạt QCVN Môi trường
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Hazardous Waste Code Lookup Database Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              Tra cứu Mã Chất thải Nguy hại (CTNH) theo Thông tư 02/2022/TT-BTNMT
            </h2>
          </div>
          <span className="text-xs text-slate-500">Cập nhật Quy chuẩn KCN 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="p-3">Mã CTNH</th>
                <th className="p-3">Tên Chất thải / Phế phụ phẩm</th>
                <th className="p-3">Trạng thái Phân loại</th>
                <th className="p-3">Căn cứ Quy chuẩn Quốc gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {hazardousCodeLookup.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-800">{item.code}</td>
                  <td className="p-3 font-semibold text-slate-900">{item.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status.includes('Không nguy hại') || item.status.includes('thông thường')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{item.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
