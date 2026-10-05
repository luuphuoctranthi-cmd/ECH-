import React, { useState } from 'react';
import { LogisticsOrder } from '../types';
import { saveLogisticsOrderToFirestore } from '../services/firestoreService';
import { 
  Truck, 
  QrCode, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Phone, 
  Navigation,
  Plus,
  Send,
  X
} from 'lucide-react';

interface LogisticsPermitManagerProps {
  orders: LogisticsOrder[];
}

export const LogisticsPermitManager: React.FC<LogisticsPermitManagerProps> = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState<LogisticsOrder[]>(initialOrders);
  const [selectedQrOrder, setSelectedQrOrder] = useState<LogisticsOrder | null>(null);
  const [showNewPermitModal, setShowNewPermitModal] = useState<boolean>(false);

  // New Permit Form State
  const [sourceCompany, setSourceCompany] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [volumeTons, setVolumeTons] = useState(30);
  const [vehicleType, setVehicleType] = useState('Xe bồn xi-téc chuyên dụng 30 tấn');
  const [licensePlate, setLicensePlate] = useState('60C-912.88');
  const [driverName, setDriverName] = useState('Tài xế Võ Hoàng Nam');
  const [driverPhone, setDriverPhone] = useState('0912.445.678');

  const handleCreatePermit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceCompany || !targetCompany || !resourceName) return;

    const newOrder: LogisticsOrder = {
      id: `log-${Math.floor(1000 + Math.random() * 9000)}`,
      sourceCompany,
      targetCompany,
      resourceName,
      volumeTons,
      vehicleType,
      licensePlate,
      driverName,
      driverPhone,
      permitStatus: 'approved',
      qrCodeToken: `ECOMATCH-PERMIT-${licensePlate.replace(/[^A-Z0-9]/g, '')}-2026`,
      estimatedArrival: 'Đang chuẩn bị điều xe xuất bến',
      distanceKm: 4.8,
    };

    setOrders([newOrder, ...orders]);
    saveLogisticsOrderToFirestore(newOrder);
    setShowNewPermitModal(false);
    // Reset
    setSourceCompany('');
    setTargetCompany('');
    setResourceName('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Truck className="w-4 h-4 text-emerald-400" />
              Trung tâm Điều phối Logistics & Cấp phép BQL KCN
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Quản lý Đội xe Chuyên dụng & Giấy phép Vận chuyển Liên KCN
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tự động hóa thủ tục cấp Giấy phép Vận chuyển tài nguyên tuần hoàn nội bộ KCN. Mã QR điện tử giúp tài xế qua Trạm kiểm soát BQL KCN trong 5 giây.
            </p>
          </div>

          <button
            onClick={() => setShowNewPermitModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-lg border border-emerald-400/30 flex items-center gap-2 cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-4 h-4 text-emerald-200" />
            <span>Tạo Giấy phép Vận chuyển Mới</span>
          </button>
        </div>
      </div>

      {/* Logistics Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-mono text-xs font-bold text-slate-500">{order.id}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                    order.permitStatus === 'delivered'
                      ? 'bg-slate-100 text-slate-700 border-slate-300'
                      : order.permitStatus === 'in_transit'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {order.permitStatus === 'delivered' && 'Đã Giao Hàng'}
                  {order.permitStatus === 'in_transit' && 'Đang Vận Chuyển'}
                  {order.permitStatus === 'approved' && 'Đã Duyệt Giấy Phép'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{order.resourceName}</h3>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Khối lượng: {order.volumeTons} Tấn
                </span>
              </div>

              {/* Source & Target Flow */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Nơi bốc hàng (Bên xuất):</span>
                    <strong className="text-slate-900 font-medium">{order.sourceCompany}</strong>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                  <Navigation className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Nơi dỡ hàng (Bên nhập):</span>
                    <strong className="text-slate-900 font-medium">{order.targetCompany}</strong>
                  </div>
                </div>
              </div>

              {/* Vehicle & Driver Details */}
              <div className="text-xs space-y-1 text-slate-700 pt-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Loại phương tiện:</span>
                  <span className="font-semibold text-slate-900">{order.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Biển kiểm soát:</span>
                  <strong className="font-mono text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                    {order.licensePlate}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tài xế phụ trách:</span>
                  <span className="font-medium text-slate-900">
                    {order.driverName} ({order.driverPhone})
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Inspection Trigger */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {order.estimatedArrival}
              </span>

              <button
                onClick={() => setSelectedQrOrder(order)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                Hiển thị Mã QR
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal Display */}
      {selectedQrOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Mã Giấy phép BQL KCN</span>
              <button
                onClick={() => setSelectedQrOrder(null)}
                className="text-slate-400 hover:text-slate-600 rounded-full p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-inner">
                {/* Visual Simulated QR Code graphic */}
                <div className="w-full h-full bg-slate-900 rounded grid grid-cols-4 gap-1 p-2">
                  <div className="bg-white rounded"></div>
                  <div className="bg-slate-900 border border-white rounded"></div>
                  <div className="bg-white rounded"></div>
                  <div className="bg-white rounded"></div>
                  <div className="bg-white rounded"></div>
                  <div className="bg-white rounded"></div>
                  <div className="bg-slate-900 rounded"></div>
                  <div className="bg-white rounded"></div>
                </div>
              </div>
              <p className="font-mono text-[11px] text-emerald-400 font-bold tracking-wider">
                {selectedQrOrder.qrCodeToken}
              </p>
            </div>

            <div className="text-left text-xs space-y-1 text-slate-700">
              <p><strong>Bên xuất:</strong> {selectedQrOrder.sourceCompany}</p>
              <p><strong>Bên nhập:</strong> {selectedQrOrder.targetCompany}</p>
              <p><strong>Phương tiện:</strong> {selectedQrOrder.licensePlate} ({selectedQrOrder.driverName})</p>
            </div>

            <button
              onClick={() => setSelectedQrOrder(null)}
              className="w-full bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}

      {/* Modal create new permit */}
      {showNewPermitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Đăng ký Giấy phép Vận chuyển BQL KCN
              </h3>
              <button
                onClick={() => setShowNewPermitModal(false)}
                className="text-slate-400 hover:text-slate-600 rounded-full p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePermit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tên Doanh nghiệp Cung cấp (Bên Xuất):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Công ty Nhiệt điện Đồng Nai"
                  value={sourceCompany}
                  onChange={(e) => setSourceCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tên Doanh nghiệp Tiêu thụ (Bên Nhập):</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Công ty Gạch Xanh An Phát"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tên Loại Tài nguyên / Chất thải:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tro bay lò hơi TCVN 6882"
                  value={resourceName}
                  onChange={(e) => setResourceName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Khối lượng (Tấn):</label>
                  <input
                    type="number"
                    value={volumeTons}
                    onChange={(e) => setVolumeTons(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Biển kiểm soát:</label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPermitModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer"
                >
                  Phê duyệt & Cấp Mã QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
