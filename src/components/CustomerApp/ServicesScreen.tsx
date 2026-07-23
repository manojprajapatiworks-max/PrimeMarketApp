import React, { useState } from 'react';
import { Wrench, Star, ShieldCheck, Phone, Clock, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockData';
import { ServiceItem } from '../../types';
import { useApp } from '../../context/AppContext';

export const ServicesScreen: React.FC = () => {
  const { createServiceBooking, user, serviceBookings } = useApp();

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  const categories = [
    { id: 'all', labelHi: 'सभी सेवाएं (All)' },
    { id: 'बिजली मिस्त्री', labelHi: 'बिजली मिस्त्री (Electrician)' },
    { id: 'प्लंबर व बोरिंग', labelHi: 'प्लंबर व ट्यूबवेल (Plumber)' },
    { id: 'डॉक्टर परामर्श', labelHi: 'डॉक्टर परामर्श (Doctor)' },
  ];

  const filteredServices = MOCK_SERVICES.filter(s =>
    selectedCategoryFilter === 'all' ? true : s.category === selectedCategoryFilter
  );

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedSlot) {
      alert('कृपया सेवा का समय स्लॉट चुनें।');
      return;
    }

    const booking = createServiceBooking(
      selectedService.id,
      user.addresses[0],
      '2026-07-24',
      selectedSlot
    );

    setBookingSuccess(booking);
    setSelectedService(null);
    setSelectedSlot('');
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl text-white shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              स्थानीय कुशल कारीगर व सेवाएं (Local Services & Experts)
            </h1>
            <p className="text-xs text-slate-300">
              गांव में सत्यापित बिजली मिस्त्री, प्लंबर, ट्यूबवेल रिपेयरिंग व डॉक्टर परामर्श घर बैठे बुक करें।
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryFilter(cat.id)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategoryFilter === cat.id
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat.labelHi}
          </button>
        ))}
      </div>

      {/* Active Bookings Banner */}
      {serviceBookings.length > 0 && (
        <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-2 shadow-sm">
          <div className="font-bold text-indigo-950 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>आपकी सक्रिय सेवा बुकिंग (Active Bookings)</span>
          </div>
          {serviceBookings.map(b => (
            <div key={b.id} className="bg-white p-3 rounded-xl border border-indigo-100 flex items-center justify-between text-xs shadow-sm">
              <div>
                <div className="font-bold text-slate-800">{b.service.titleHi} ({b.service.providerName})</div>
                <div className="text-slate-500 text-[11px]">समय: {b.timeSlot} | पता: {b.address.village}</div>
              </div>
              <div className="text-right">
                <div className="text-indigo-600 font-bold">₹{b.totalAmount}</div>
                <div className="text-[10px] text-emerald-700 font-mono font-bold">OTP: {b.otp}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Service Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={service.providerPhoto}
                  alt={service.providerName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                      {service.category}
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-bold text-xs bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {service.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mt-1">{service.titleHi}</h3>
                  <div className="text-xs text-slate-500 font-semibold">{service.providerName}</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>अनुभव: <strong>{service.experienceYears} वर्ष</strong> | यूपी सरकार द्वारा सत्यापित</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>सेवा क्षेत्र: <strong>ब्लॉक {service.block}, {service.district}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] text-slate-400">विजिट शुल्क (Visiting Fee):</div>
                <div className="text-lg font-bold text-indigo-600">₹{service.price}</div>
              </div>
              <button
                onClick={() => {
                  setSelectedService(service);
                  setSelectedSlot(service.availableSlots[0] || '');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                बुकिंग करें (Book)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Drawer Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-indigo-950 text-sm">{selectedService.titleHi}</h3>
              <button onClick={() => setSelectedService(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer font-bold">✕</button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-800">समय स्लॉट चुनें (Select Time Slot):</div>
              <div className="grid grid-cols-1 gap-2">
                {selectedService.availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl border text-left font-bold transition-colors cursor-pointer ${
                      selectedSlot === slot
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs shadow-sm cursor-pointer"
            >
              ₹{selectedService.price} में बुकिंग कन्फर्म करें
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
