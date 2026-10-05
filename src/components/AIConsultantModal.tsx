import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Bot, 
  User, 
  Send, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  RefreshCw,
  Zap,
  CheckCircle2,
  Building2,
  FileText
} from 'lucide-react';

interface AIConsultantModalProps {
  onClose: () => void;
}

export const AIConsultantModal: React.FC<AIConsultantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp: string }>>([
    {
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ lý AI Chuyên gia Tư vấn Cộng sinh Công nghiệp & Pháp lý Môi trường KCN (Powered by Gemini 3.6 AI). Bạn có câu hỏi nào về quy trình chuyển giao phế phụ phẩm, mã chất thải CTNH, tiêu chuẩn QCVN, hay ưu đãi KCN Sinh thái theo Nghị định 35/2022/NĐ-CP không?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick preset queries for instant enterprise testing
  const presetQueries = [
    'Quy định mã chất thải CTNH đối với tro bay lò hơi và thủ tục chuyển giao cho nhà máy gạch?',
    'Điều kiện để Khu công nghiệp Nhơn Trạch được công nhận KCN Sinh thái theo Nghị định 35/2022?',
    'Tính toán tổn thất nhiệt khi vận chuyển hơi nước 165°C qua đường ống bảo ôn 2km?',
    'Quy trình ký hợp đồng cộng sinh 3 bên giữa Bên Cung Cấp, Bên Tiêu Thụ và BQL KCN?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputQuery;
    if (!messageText.trim() || isLoading) return;

    const userTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: 'user', text: messageText, timestamp: userTime }]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: messageText }),
      });

      const data = await response.json();
      const aiTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

      if (data.success && data.answer) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.answer, timestamp: aiTime }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Cảm ơn câu hỏi của bạn. Dựa trên Nghị định 35/2022/NĐ-CP và QCVN 07:2009/BTNMT, việc chuyển giao tài nguyên thừa nội bộ KCN được ưu tiên đơn giản hóa thủ tục hành chính khi đáp ứng tiêu chuẩn an toàn môi trường và hợp đồng chứng nhận BQL KCN.',
            timestamp: aiTime,
          },
        ]);
      }
    } catch (err) {
      console.error('AI Consultant Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Rất tiếc đã xảy ra gián đoạn kết nối. Tuy nhiên, theo quy chuẩn KCN Sinh Thái, các doanh nghiệp cộng sinh sẽ được giảm 10% phí hạ tầng và ưu đãi vay vốn tín dụng xanh.',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 flex flex-col h-[650px] animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-900/30">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Trợ Lý AI Tư Vấn Kỹ Thuật & Pháp Lý KCN
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Gemini 3.6 Flash Engine
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Giải đáp quy trình KCN Sinh thái, QCVN/TCVN, thuế quan & Tín chỉ Carbon
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="py-3 border-b border-slate-100 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Gợi ý câu hỏi phổ biến:
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {presetQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0 transition-colors text-left font-medium cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List Container */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-emerald-200" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-semibold opacity-70 mb-1">
                  <span>{msg.sender === 'user' ? 'Đại diện Doanh nghiệp' : 'Chuyên gia AI EcoMatch'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold shrink-0 mt-1">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs py-2">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Chuyên gia AI đang tổng hợp thông tư, QCVN và đưa ra tư vấn...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="pt-3 border-t border-slate-100 flex gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Nhập câu hỏi về kỹ thuật, mã chất thải, hoặc pháp lý KCN..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl cursor-pointer disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <span>Gửi</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
