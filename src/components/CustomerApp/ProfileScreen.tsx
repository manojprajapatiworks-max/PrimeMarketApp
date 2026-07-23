import React, { useState } from 'react';
import { User, Wallet, ShieldCheck, MapPin, Package, Plus, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { user, addWalletMoney, orders, setActiveTab, setActiveTrackingOrder, language, setLanguage } = useApp();

  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addAmount, setAddAmount] = useState(500);

  const handleAddWalletMoney = () => {
    addWalletMoney(addAmount);
    setIsAddMoneyOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* User Header Profile Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm border-2 border-indigo-200 flex-shrink-0">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-800">{user.fullName}</h1>
              {user.aadhaarVerified && (
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  <span>आधार सत्यापित</span>
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">मो: +91 {user.mobile}</div>
            <div className="text-xs text-indigo-600 font-medium mt-0.5">
              📍 ग्राम {user.village}, ब्लॉक- {user.block}, जिला- {user.district} ({user.state})
            </div>
          </div>
        </div>

        {/* Wallet Balance Widget */}
        <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-100 w-full sm:w-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">
              प्राइममार्केट वॉलेट (Wallet)
            </div>
            <div className="text-xl font-bold text-indigo-600">₹{user.walletBalance}</div>
          </div>
          <button
            onClick={() => setIsAddMoneyOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>पैसे जोड़ें</span>
          </button>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-2 shadow-sm">
        <div className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-600" />
          <span>ऐप भाषा (Language Preference)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-bold">
          {[
            { id: 'hi', label: 'हिंदी (Hindi)' },
            { id: 'en', label: 'English' },
            { id: 'awa', label: 'अवधी (Awadhi)' },
            { id: 'bho', label: 'भोजपुरी (Bhojpuri)' }
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id as any)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                language === l.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Address Book */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-sm">
        <div className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span>सहेजे गए ग्राम पते ({user.addresses.length})</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {user.addresses.map(addr => (
            <div key={addr.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>{addr.fullName}</span>
                {addr.isDefault && (
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full border border-indigo-100 font-bold">
                    मुख्य पता
                  </span>
                )}
              </div>
              <div className="text-slate-600">
                {addr.house}, ग्राम- {addr.village}, ब्लॉक- {addr.block}, {addr.district} ({addr.pinCode})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-sm">
        <div className="font-bold text-slate-800 text-xs sm:text-sm flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-600" />
            <span>पुराने ऑर्डर का इतिहास ({orders.length})</span>
          </span>
        </div>

        <div className="space-y-2">
          {orders.map(ord => (
            <div
              key={ord.id}
              onClick={() => {
                setActiveTrackingOrder(ord);
                setActiveTab('orders');
              }}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs cursor-pointer hover:border-indigo-300 transition-colors"
            >
              <div>
                <div className="font-bold text-indigo-600">{ord.orderNumber}</div>
                <div className="text-[11px] text-slate-500">
                  {new Date(ord.createdAt).toLocaleDateString('hi-IN')} | {ord.items.length} आइटम
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-800">₹{ord.finalAmount}</div>
                <div className="text-[10px] text-emerald-700 font-semibold capitalize">{ord.trackingStage.replace(/_/g, ' ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Wallet Money Modal */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-indigo-950 text-sm">प्राइममार्केट वॉलेट रिचार्ज</h3>
              <button onClick={() => setIsAddMoneyOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-600 block font-semibold">राशि दर्ज करें (Amount in ₹):</label>
              <input
                type="number"
                value={addAmount}
                onChange={e => setAddAmount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <div className="flex gap-2 text-xs font-bold pt-1">
                {[100, 500, 1000, 2000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAddAmount(amt)}
                    className="flex-1 py-1.5 rounded-lg bg-slate-100 text-indigo-600 hover:bg-indigo-50 border border-slate-200 cursor-pointer"
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddWalletMoney}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              UPI द्वारा ₹{addAmount} वॉलेट में जोड़ें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
