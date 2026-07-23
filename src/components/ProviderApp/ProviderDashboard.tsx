import React, { useState } from 'react';
import { Wrench, Star, Calendar, CheckCircle2, Phone, Clock } from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const ProviderDashboard: React.FC = () => {
  const { serviceBookings } = useApp();
  const provider = MOCK_SERVICES[0];
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex items-center justify-between gap-4 text-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={provider.providerPhoto}
            alt={provider.providerName}
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600"
          />
          <div>
            <div className="font-bold text-slate-800 text-base">{provider.providerName}</div>
            <div className="text-xs text-indigo-600 font-semibold">{provider.titleHi}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">अनुभव: {provider.experienceYears} वर्ष | क्षेत्र: मलिहाबाद</div>
          </div>
        </div>

        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
            isAvailable ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {isAvailable ? 'उपलब्ध (AVAILABLE)' : 'व्यस्त (OFFLINE)'}
        </button>
      </div>

      {/* Bookings Received List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm text-slate-800">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span>प्राप्त सेवा बुकिंग की सूची ({serviceBookings.length})</span>
        </h2>

        <div className="space-y-3">
          {serviceBookings.map(sb => (
            <div key={sb.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-indigo-950">
                <span>बुकिंग सं.: {sb.bookingNumber}</span>
                <span className="text-indigo-600 font-bold">शुल्क: ₹{sb.totalAmount}</span>
              </div>

              <div className="text-slate-800 font-bold">{sb.customerName} (मो: {sb.customerMobile})</div>
              <div className="text-slate-600">
                ग्राम- {sb.address.village}, मकान- {sb.address.house}, ब्लॉक- {sb.address.block}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[11px]">
                <span className="text-indigo-600 font-bold">समय स्लॉट: {sb.timeSlot}</span>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  OTP: {sb.otp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
