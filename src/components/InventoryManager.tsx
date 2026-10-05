import React, { useState } from 'react';
import { ResourceItem, ResourceCategory, ExchangeType } from '../types';
import { GoogleFactoryDiscoveryModal } from './GoogleFactoryDiscoveryModal';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Trash2, 
  Sparkles, 
  Layers, 
  CheckCircle, 
  MapPin, 
  Tag, 
  Building2, 
  PhoneCall, 
  Calendar,
  X,
  Droplets,
  Flame,
  Boxes,
  Info,
  Globe
} from 'lucide-react';

interface InventoryManagerProps {
  resources: ResourceItem[];
  onAddResource: (newItem: Omit<ResourceItem, 'id' | 'createdAt' | 'status'>) => void;
  onDeleteResource: (id: string) => void;
  onTriggerAIMatchForResource: (resource: ResourceItem) => void;
  showAddModalDirectly?: boolean;
  onCloseAddModalDirectly?: () => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  resources,
  onAddResource,
  onDeleteResource,
  onTriggerAIMatchForResource,
  showAddModalDirectly = false,
  onCloseAddModalDirectly,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(showAddModalDirectly);
  const [isGoogleCrawlerOpen, setIsGoogleCrawlerOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('solid_waste');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState('tấn');
  const [frequency, setFrequency] = useState('tấn/tháng');
  const [companyName, setCompanyName] = useState('');
  const [industrialZone, setIndustrialZone] = useState('KCN Nhơn Trạch III');
  const [province, setProvince] = useState('Đồng Nai');
  const [priceOrType, setPriceOrType] = useState('Bán theo giá thỏa thuận');
  const [exchangeType, setExchangeType] = useState<ExchangeType>('sale');
  const [purity, setPurity] = useState('');
  const [description, setDescription] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Handle direct modal state sync
  React.useEffect(() => {
    if (showAddModalDirectly) {
      setIsModalOpen(true);
    }
  }, [showAddModalDirectly]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onCloseAddModalDirectly) onCloseAddModalDirectly();
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !companyName.trim()) {
      alert('Vui lòng điền đầy đủ Tên phụ phẩm và Tên công ty!');
      return;
    }

    onAddResource({
      name,
      category,
      quantity: Number(quantity) || 1,
      unit,
      frequency,
      companyName,
      industrialZone,
      province,
      priceOrType,
      exchangeType,
      purity: purity || 'Chất lượng đồng nhất',
      description,
      contactPerson: contactPerson || 'Đại diện Kỹ thuật KCN',
      contactPhone: contactPhone || '0909.123.456',
    });

    // Reset Form
    setName('');
    setDescription('');
    setPurity('');
    setIsModalOpen(false);
    if (onCloseAddModalDirectly) onCloseAddModalDirectly();
  };

  // Filter Logic
  const filteredResources = resources.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.industrialZone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;

    const matchesZone = 
      selectedZoneFilter === 'all' || item.industrialZone === selectedZoneFilter;

    return matchesSearch && matchesCategory && matchesZone;
  });

  const getCategoryBadge = (cat: ResourceCategory) => {
    switch (cat) {
      case 'solid_waste':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            <Boxes className="w-3.5 h-3.5 text-emerald-600" />
            Phế phẩm rắn
          </span>
        );
      case 'energy_heat':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Nhiệt thải / Năng lượng
          </span>
        );
      case 'water_chemical':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 text-xs font-bold px-2.5 py-1 rounded-full border border-sky-200">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            Nước / Hóa chất
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              Sổ tay Tài nguyên Thừa & Phế phụ phẩm KCN
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Danh mục tài nguyên dư thừa, nhiệt thải, nước thải tái chế chờ kết nối cộng sinh
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsGoogleCrawlerOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-xs"
          >
            <Globe className="w-4 h-4 text-emerald-400 animate-pulse" />
            🔍 Quét Dữ liệu Nhà máy từ Google
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-emerald-900/20 transition-all cursor-pointer text-xs"
          >
            <PlusCircle className="w-4 h-4" />
            Khai báo Thủ công
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Search Field */}
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Tìm theo tên phế phẩm, nhà máy, khu công nghiệp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-medium text-slate-700"
          >
            <option value="all">Tất cả Phân loại (3 Nhóm)</option>
            <option value="solid_waste">Phế phẩm rắn</option>
            <option value="energy_heat">Nhiệt thải / Năng lượng</option>
            <option value="water_chemical">Nước / Hóa chất</option>
          </select>
        </div>

        {/* Zone Filter */}
        <div>
          <select
            value={selectedZoneFilter}
            onChange={(e) => setSelectedZoneFilter(e.target.value)}
            className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 font-medium text-slate-700"
          >
            <option value="all">Tất cả Khu công nghiệp</option>
            <option value="KCN Nhơn Trạch III">KCN Nhơn Trạch III</option>
            <option value="KCN Biên Hòa 2">KCN Biên Hòa 2</option>
            <option value="KCN Hiệp Phước">KCN Hiệp Phước</option>
            <option value="KCN VSIP I">KCN VSIP I</option>
          </select>
        </div>
      </div>

      {/* Catalog Table & Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Hiển thị {filteredResources.length} / {resources.length} Tài nguyên trong Sổ tay
          </span>
          <span className="text-xs text-slate-400">
            Cập nhật bởi BQL Các KCN
          </span>
        </div>

        {filteredResources.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Info className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-semibold">Chưa tìm thấy phế phụ phẩm phù hợp tìm kiếm</p>
            <p className="text-xs text-slate-400">Thử thay đổi từ khóa hoặc bộ lọc khu công nghiệp.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {getCategoryBadge(item.category)}
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {item.quantity} {item.unit} ({item.frequency})
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {item.priceOrType}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.industrialZone}, {item.province}
                    </span>
                    {item.contactPerson && (
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                        {item.contactPerson} ({item.contactPhone})
                      </span>
                    )}
                  </div>

                  {item.purity && (
                    <div className="text-[11px] text-slate-500 bg-slate-100/70 px-3 py-1.5 rounded-lg border border-slate-200/50 inline-block font-mono">
                      <strong className="text-slate-700 font-sans">Thông số kỹ thuật/Độ sạch:</strong> {item.purity}
                    </div>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <button
                    onClick={() => onTriggerAIMatchForResource(item)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm cursor-pointer transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    AI Tìm đối tác ghép nối
                  </button>

                  <button
                    onClick={() => onDeleteResource(item.id)}
                    title="Xóa tài nguyên"
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL FORM: Khai báo tài nguyên thừa mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-emerald-600" />
                  Khai báo Sổ tay Tài nguyên Thừa & Năng lượng dư
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nhập thông tin phế phụ phẩm để Bộ não AI tự động tìm đối tác ghép nối
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-sm">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phân loại Tài nguyên / Phế phẩm *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory('solid_waste')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      category === 'solid_waste'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Boxes className="w-5 h-5 text-emerald-600" />
                    Phế phẩm rắn
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('energy_heat')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      category === 'energy_heat'
                        ? 'bg-amber-50 border-amber-500 text-amber-800 ring-2 ring-amber-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Flame className="w-5 h-5 text-amber-600" />
                    Nhiệt thải / Năng lượng
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('water_chemical')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      category === 'water_chemical'
                        ? 'bg-sky-50 border-sky-500 text-sky-800 ring-2 ring-sky-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Droplets className="w-5 h-5 text-sky-600" />
                    Nước / Hóa chất
                  </button>
                </div>
              </div>

              {/* Name & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên Tài nguyên / Phế phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Tro bay lò hơi, Hơi nước dư 180°C, Bùn vi sinh..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khối lượng / Tần suất *
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
                    />
                    <select
                      value={unit}
                      onChange={(e) => {
                        setUnit(e.target.value);
                        setFrequency(`${e.target.value}/tháng`);
                      }}
                      className="w-1/2 px-2 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 font-medium"
                    >
                      <option value="tấn">Tấn</option>
                      <option value="m³">m³</option>
                      <option value="Gcal">Gcal</option>
                      <option value="kWh">kWh</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Company & Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên Doanh nghiệp / Nhà máy phát thải *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Công ty Cổ phần..."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Khu Công Nghiệp & Tỉnh/Thành *
                  </label>
                  <select
                    value={industrialZone}
                    onChange={(e) => {
                      setIndustrialZone(e.target.value);
                      if (e.target.value.includes('Biên Hòa') || e.target.value.includes('Nhơn Trạch')) setProvince('Đồng Nai');
                      if (e.target.value.includes('Hiệp Phước')) setProvince('TP. Hồ Chí Minh');
                      if (e.target.value.includes('VSIP')) setProvince('Bình Dương');
                    }}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none font-medium"
                  >
                    <option value="KCN Nhơn Trạch III">KCN Nhơn Trạch III (Đồng Nai)</option>
                    <option value="KCN Biên Hòa 2">KCN Biên Hòa 2 (Đồng Nai)</option>
                    <option value="KCN Hiệp Phước">KCN Hiệp Phước (TP.HCM)</option>
                    <option value="KCN VSIP I">KCN VSIP I (Bình Dương)</option>
                  </select>
                </div>
              </div>

              {/* Price & Exchange Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hình thức Trao đổi *
                  </label>
                  <select
                    value={exchangeType}
                    onChange={(e) => setExchangeType(e.target.value as ExchangeType)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none font-medium"
                  >
                    <option value="sale">Bán thương mại (Thỏa thuận giá)</option>
                    <option value="free_transport">Miễn phí (Bên nhận hỗ trợ vận chuyển)</option>
                    <option value="barter">Trao đổi lấy phụ phẩm khác</option>
                    <option value="cost_sharing">Chia sẻ chi phí xử lý / năng lượng gốc</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Đơn giá hoặc Điều kiện chi tiết
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 250.000 VNĐ/tấn hoặc Miễn phí"
                    value={priceOrType}
                    onChange={(e) => setPriceOrType(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
                  />
                </div>
              </div>

              {/* Purity & Technical Specs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đặc tính Kỹ thuật & Độ sạch (Độ ẩm, chỉ số LOI, pH, nhiệt độ...)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Độ mịn hạt 42µm, nhiệt độ dòng thải 165°C, pH 7.2..."
                  value={purity}
                  onChange={(e) => setPurity(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả Chi tiết Tiềm năng Tái chế / Sử dụng lại
                </label>
                <textarea
                  rows={2}
                  placeholder="Ứng dụng đề xuất, nguồn gốc phát thải, điều kiện bàn giao..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none resize-none"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Người phụ trách Kỹ thuật / Môi trường
                  </label>
                  <input
                    type="text"
                    placeholder="Kỹ sư Nguyễn Văn A"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại / Zalo liên hệ
                  </label>
                  <input
                    type="text"
                    placeholder="0912.xxx.xxx"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 outline-none"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-900/20 cursor-pointer transition-all"
                >
                  Lưu Sổ tay & Tìm ghép nối AI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Google Auto-Discovery Modal */}
      <GoogleFactoryDiscoveryModal
        isOpen={isGoogleCrawlerOpen}
        onClose={() => setIsGoogleCrawlerOpen(false)}
        onImportResource={(newItem) => {
          onAddResource(newItem);
        }}
      />
    </div>
  );
};
