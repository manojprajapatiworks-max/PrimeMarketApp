import React, { useState } from 'react';
import { Sparkles, X, Send, Mic, Volume2, Bot, User, Sprout, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const KisanAIAssistantModal: React.FC = () => {
  const { isAIAssistantOpen, setIsAIAssistantOpen, language } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: language === 'hi'
        ? 'नमस्ते राम प्रकाश जी! मैं प्राइममार्केट किसान एवं ग्रामीण मित्र AI हूँ। आप मुझसे सरसों, गेहूं बीज, खाद, कृषि रोग उपचार, मंडी भाव या डिलीवरी के बारे में कुछ भी पूछ सकते हैं।'
        : 'Hello! I am PrimeMarket Kisan & Rural Assistant AI. Ask me about seeds, fertilizers, crop health, mandi rates, or shopping on PrimeMarket.'
    }
  ]);

  if (!isAIAssistantOpen) return null;

  const quickPrompts = [
    'गेहूं की फसल में पहला पानी और यूरिया कब दें?',
    'सरसों में माहू (कीट) नियंत्रण हेतु उत्तम दवा?',
    'इफको नैनो यूरिया का सही इस्तेमाल कैसे करें?',
    'मलिहाबाद मंडी में आज गेहूं व धान का भाव?'
  ];

  const handleSendQuery = async (queryText?: string) => {
    const promptToUse = queryText || inputQuery;
    if (!promptToUse.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: promptToUse }]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse, lang: language })
      });
      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'उत्तर प्राप्त नहीं हो सका।'
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'नेटवर्क में त्रुटि हुई। कृपया पुन: प्रयास करें।'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden relative text-slate-800">
        {/* Header Bar */}
        <div className="bg-indigo-600 p-3.5 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight text-white">
                किसान मित्र AI (PrimeMarket Kisan Assistant)
              </div>
              <div className="text-[10px] font-medium text-indigo-100">
                संचालित: Gemini AI models | हिंदी व अवधी में सहायता
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-slate-50 p-2.5 border-b border-slate-200 overflow-x-auto flex gap-2 scrollbar-none text-xs">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(qp)}
              className="bg-white hover:bg-slate-100 text-indigo-700 border border-slate-200 px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-bold flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <Sprout className="w-3.5 h-3.5 text-indigo-600" />
              <span>{qp}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2 text-xs sm:text-sm ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-none shadow-sm'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold animate-pulse">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>किसान मित्र सोच रहा है...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendQuery()}
            placeholder="कृषि, बीज या दुकान के बारे में बोलें या लिखें..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={() => handleSendQuery()}
            disabled={loading}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
