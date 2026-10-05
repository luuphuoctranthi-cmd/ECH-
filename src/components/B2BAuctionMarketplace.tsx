import React, { useState } from 'react';
import { B2BAuctionItem } from '../types';
import { updateAuctionBidInFirestore } from '../services/firestoreService';
import { 
  Gavel, 
  Clock, 
  Coins, 
  Building2, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Search,
  Tag,
  ArrowUpRight
} from 'lucide-react';

interface B2BAuctionMarketplaceProps {
  auctionItems: B2BAuctionItem[];
}

export const B2BAuctionMarketplace: React.FC<B2BAuctionMarketplaceProps> = ({ auctionItems: initialItems }) => {
  const [items, setItems] = useState<B2BAuctionItem[]>(initialItems);
  const [biddingItemId, setBiddingItemId] = useState<string | null>(null);
  const [bidIncrementVnd, setBidIncrementVnd] = useState<number>(10000);
  const [bidderName, setBidderName] = useState<string>('Công ty Xi măng Nghi Sơn (Đồng Nai)');

  const handlePlaceBid = (itemId: string) => {
    const targetItem = items.find((i) => i.id === itemId);
    if (targetItem) {
      const newPrice = targetItem.currentHighestBidVnd + bidIncrementVnd;
      const newBidCount = targetItem.bidCount + 1;
      updateAuctionBidInFirestore(itemId, newPrice, bidderName, newBidCount);
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newPrice = item.currentHighestBidVnd + bidIncrementVnd;
          return {
            ...item,
            currentHighestBidVnd: newPrice,
            highestBidderCompany: bidderName,
            bidCount: item.bidCount + 1,
          };
        }
        return item;
      })
    );
    setBiddingItemId(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-800/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Gavel className="w-4 h-4 text-amber-400" />
              Sàn Giao dịch Đấu giá Phế liệu & Năng lượng Dư B2B
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Chợ Đấu giá Công khai & Đặt hàng Nhóm KCN
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Niêm yết các lô tài nguyên tuần hoàn khối lượng lớn. Cơ chế Đấu giá Spot Auction và Mua chung Group Buying giúp tối ưu hóa giá mua/bán giữa các nhà máy.
            </p>
          </div>

          <div className="p-4 bg-amber-900/40 rounded-2xl border border-amber-500/30 text-xs space-y-1 shrink-0">
            <span className="text-amber-300 font-bold block">Tổng khối lượng niêm yết:</span>
            <p className="text-xl font-extrabold font-mono text-white">29.300 Tấn & Gcal</p>
          </div>
        </div>
      </div>

      {/* Auction Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.industrialZone}
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-amber-600" />
                  Còn {item.timeRemainingHours} giờ
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                  {item.resourceName}
                </h3>
                <span className="text-xs text-slate-500 block">{item.sellerCompany}</span>
              </div>

              {/* Volume & Pricing Box */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Khối lượng lô hàng:</span>
                  <strong className="text-emerald-400 font-bold">
                    {item.totalQuantity.toLocaleString('vi-VN')} {item.unit}
                  </strong>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-300">Giá đặt cao nhất:</span>
                  <span className="text-lg font-black font-mono text-amber-300">
                    {item.currentHighestBidVnd.toLocaleString('vi-VN')} VNĐ/{item.unit}
                  </span>
                </div>

                {item.highestBidderCompany && (
                  <p className="text-[10px] text-slate-400 pt-1 text-right">
                    Nhà máy đang dẫn đầu: <strong className="text-slate-200">{item.highestBidderCompany}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500">
                {item.bidCount} Lượt đặt giá
              </span>

              <button
                onClick={() => setBiddingItemId(item.id)}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-900/20"
              >
                <Gavel className="w-4 h-4 text-amber-200" />
                <span>Đặt Giá Đấu Thầu</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Place Bid Modal */}
      {biddingItemId && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Xác nhận Đặt Giá Đấu Thầu B2B
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tên Doanh nghiệp Đặt giá:</label>
                <input
                  type="text"
                  value={bidderName}
                  onChange={(e) => setBidderName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Bước giá tăng (VNĐ):</label>
                <select
                  value={bidIncrementVnd}
                  onChange={(e) => setBidIncrementVnd(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value={10000}>+ 10.000 VNĐ / đơn vị</option>
                  <option value={20000}>+ 20.000 VNĐ / đơn vị</option>
                  <option value={50000}>+ 50.000 VNĐ / đơn vị</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setBiddingItemId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handlePlaceBid(biddingItemId)}
                className="px-5 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Gửi Đợt Đặt Giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
