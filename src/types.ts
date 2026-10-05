export type ResourceCategory = 'solid_waste' | 'energy_heat' | 'water_chemical';

export type ExchangeType = 'sale' | 'free_transport' | 'barter' | 'cost_sharing';

export type ResourceStatus = 'ready' | 'matching' | 'transferred';

export interface ResourceItem {
  id: string;
  name: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  frequency: string; // e.g., 'tấn/tháng', 'm³/ngày', 'Gcal/giờ'
  companyName: string;
  industrialZone: string; // e.g. 'KCN Nhơn Trạch 3', 'KCN Biên Hòa 2'
  province: string; // e.g. 'Đồng Nai', 'Bình Dương', 'TP. Hồ Chí Minh'
  priceOrType: string;
  exchangeType: ExchangeType;
  purity: string; // e.g., 'Tro bay độ mịn 45µm, chưa qua xử lý', 'Nước thải đợt 2 qua lọc RO'
  description: string;
  status: ResourceStatus;
  createdAt: string;
  contactPerson?: string;
  contactPhone?: string;
}

export interface MatchProposal {
  id: string;
  sourceCompany: string;
  sourceResourceName: string;
  sourceCategory: ResourceCategory;
  sourceZone: string;
  
  targetCompany: string;
  targetIndustry: string;
  targetZone: string;
  distanceKm: number;

  compatibilityScore: number; // e.g., 96
  matchReason: string; // Lý do AI đề xuất
  economicBenefit: string; // Lợi ích kinh tế (e.g. 120 triệu VNĐ/tháng)
  co2ReductionTonsYear: number; // e.g. 450
  
  synergyType: string; // e.g., 'Tận dụng nhiệt thải lò đốt', 'Thay thế cốt liệu xi măng'
  status: 'recommended' | 'negotiating' | 'contracted';
  aiAnalysisHighlights?: string[];
}

export interface SymbiosisContract {
  id: string;
  matchId: string;
  partyA: string; // Bên cung cấp
  partyB: string; // Bên tiếp nhận
  resourceName: string;
  agreedVolume: number;
  unit: string;
  agreedPrice: number; // VNĐ / unit
  logisticsMethod: string;
  contractStatus: 'draft' | 'pending_signature' | 'active';
  co2SavedYear: number;
  costSavedMonth: number;
  createdDate: string;
}

export interface IndustrialZoneStats {
  id: string;
  name: string;
  province: string;
  factoryCount: number;
  activeSymbiosisCount: number;
  totalRecycledTons: number;
  co2SavedTons: number;
  lat: number;
  lng: number;
}

export interface SystemStats {
  participatingFactories: number;
  recycledVolumeTons: number;
  co2SavedTons: number;
  economicValueBillionVnd: number;
  activeMatches: number;
}

export interface IoTSensorData {
  id: string;
  factoryName: string;
  resourceName: string;
  hazardousWasteCode?: string; // Mã CTNH e.g. '12 01 01'
  parameter: string; // e.g., 'Nhiệt độ dòng hơi', 'Độ ẩm tro bay', 'Độ pH nước xả'
  currentValue: number;
  unit: string;
  safeMin: number;
  safeMax: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface LogisticsOrder {
  id: string;
  sourceCompany: string;
  targetCompany: string;
  resourceName: string;
  volumeTons: number;
  vehicleType: string; // e.g. 'Xe bồn xi-téc 30 tấn', 'Xe tải phủ bạt'
  licensePlate: string;
  driverName: string;
  driverPhone: string;
  permitStatus: 'approved' | 'in_transit' | 'delivered';
  qrCodeToken: string;
  estimatedArrival: string;
  distanceKm: number;
}

export interface B2BAuctionItem {
  id: string;
  sellerCompany: string;
  resourceName: string;
  category: ResourceCategory;
  totalQuantity: number;
  unit: string;
  startingPriceVnd: number;
  currentHighestBidVnd: number;
  highestBidderCompany?: string;
  bidCount: number;
  timeRemainingHours: number;
  industrialZone: string;
}
