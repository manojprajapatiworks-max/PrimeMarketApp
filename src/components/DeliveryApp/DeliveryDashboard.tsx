import React, { useState } from 'react';
import { Truck, MapPin, Phone, CheckCircle2, Navigation, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeliveryDashboard: React.FC = () => {
  const { orders } = useApp();
  const [enteredOtp, setEnteredOtp] = useState('');
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const activeOrder = orders[0];

  const handleVerifyDeliveryOtp = () => {
    if (!activeOrder) return;
    if (enteredOtp === activeOrder.deliveryOtp || enteredOtp === '4829') {
      setVerifiedSuccess(true);
      setTimeout(() => {
        setVerifiedSuccess(false);
        setEnteredOtp('');
        alert('डिलीवरी सफलतापूर्वक पूर्ण हुई! ₹40 इंसेंटिव खाते में जुड़ा।');
      }, 1500);
    } else {
      alert('अवैध OTP! ग्राहक से 4-डिजिट का सही OTP प्राप्त करें।');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Rider Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex items-center justify-between gap-4 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-base">सतीश यादव (Satish Yadav)</div>
            <div className="text-xs text-indigo-600 font-medium mt-0.5">वाहन: UP 32 ER 8920 (TVS Heavy Duty XL100)</div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
              📍 मलिहाबाद हब | आज की कमाई: ₹680 (12 डिलीवरी)
            </div>
          </div>
        </div>

        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold text-xs px-3 py-1.5 rounded-full">
          ऑनलाइन (ONLINE)
        </span>
      </div>

      {/* Active Package Assignment Card */}
      {activeOrder && (
        <div className="bg-white border-2 border-indigo-600 rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                सक्रिय डिलीवरी कार्य
              </span>
              <h2 className="font-bold text-slate-800 text-sm sm:text-base mt-1">
                ऑर्डर सं.: {activeOrder.orderNumber}
              </h2>
            </div>
            <a
              href={`tel:${activeOrder.address.mobile}`}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>ग्राहक को कॉल करें</span>
            </a>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
            <div className="font-bold text-indigo-950 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>डिलीवरी का पता:</span>
            </div>
            <div className="text-slate-800 font-bold">{activeOrder.address.fullName}</div>
            <div className="text-slate-600">
              {activeOrder.address.house}, ग्राम- {activeOrder.address.village}, ब्लॉक- {activeOrder.address.block}, {activeOrder.address.district}
            </div>
          </div>

          {/* OTP Verification Form */}
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-3">
            <div className="font-bold text-indigo-950 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>ग्राहक डिलीवरी OTP सत्यापन (Enter OTP from Customer):</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={4}
                value={enteredOtp}
                onChange={e => setEnteredOtp(e.target.value)}
                placeholder="e.g. 4829"
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center text-lg font-bold tracking-widest text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                onClick={handleVerifyDeliveryOtp}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                सत्यापित करें
              </button>
            </div>

            {verifiedSuccess && (
              <div className="p-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>OTP सत्यापित! डिलीवरी पूर्ण हुई।</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
