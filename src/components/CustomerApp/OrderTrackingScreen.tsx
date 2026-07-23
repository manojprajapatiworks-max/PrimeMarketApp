import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  FileText,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InvoiceModal } from '../InvoiceModal';

export const OrderTrackingScreen: React.FC = () => {
  const { orders, activeTrackingOrder, setActiveTrackingOrder } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any>(null);

  const displayOrder = activeTrackingOrder || orders[0];

  if (!displayOrder) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-3">
        <Package className="w-12 h-12 text-slate-600 mx-auto" />
        <div className="font-bold text-slate-200">कोई ऑर्डर नहीं पाया गया</div>
        <p className="text-xs">आपने अभी तक कोई ऑर्डर दर्ज नहीं किया है।</p>
      </div>
    );
  }

  const stages = [
    { key: 'placed', labelHi: 'ऑर्डर स्वीकार हुआ', labelEn: 'Order Placed' },
    { key: 'packed', labelHi: 'पैकिंग पूर्ण', labelEn: 'Packed' },
    { key: 'shipped', labelHi: 'डिलीवरी हब रवाना', labelEn: 'Shipped' },
    { key: 'out_for_delivery', labelHi: 'आउट फॉर डिलीवरी', labelEn: 'Out for Delivery' },
    { key: 'delivered', labelHi: 'ग्राम में डिलीवर हुआ', labelEn: 'Delivered' },
  ];

  const getStageIndex = (stage: string) => {
    switch (stage) {
      case 'placed': return 0;
      case 'packed': return 1;
      case 'shipped': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 3;
    }
  };

  const currentStageIndex = getStageIndex(displayOrder.trackingStage);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Top Header & Order Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-indigo-700 font-bold uppercase bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              लाइव जीपीएस ट्रैकिंग
            </span>
            <span className="text-xs text-slate-500 font-medium">सं.: {displayOrder.orderNumber}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 mt-1">
            डिलीवरी स्थिति (Real-Time Live Order Tracking)
          </h1>
          <p className="text-xs text-slate-500">
            गंतव्य: ग्राम <strong className="text-indigo-600">{displayOrder.address.village}</strong>, ब्लॉक {displayOrder.address.block}, {displayOrder.address.district}
          </p>
        </div>

        {/* Invoice & Order Swapper */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {orders.length > 1 && (
            <select
              value={displayOrder.id}
              onChange={e => {
                const found = orders.find(o => o.id === e.target.value);
                if (found) setActiveTrackingOrder(found);
              }}
              className="bg-slate-100 text-xs text-slate-800 border border-slate-200 rounded-xl px-2.5 py-2 font-medium"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} (₹{o.finalAmount})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setSelectedInvoiceOrder(displayOrder)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-indigo-200" />
            <span>टैक्स इनवॉइस देखें</span>
          </button>
        </div>
      </div>

      {/* Interactive Live Animated GPS Map Simulation */}
      <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-emerald-300">लाइव जीपीएस लोकेशन प्रोग्रेस</span>
          </div>
          <div className="text-indigo-300 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>अनुमानित समय: {displayOrder.estimatedDeliveryMinutes} मिनट</span>
          </div>
        </div>

        {/* Animated Visual Map Route Box */}
        <div className="relative h-52 sm:h-60 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden p-4 flex flex-col justify-between">
          {/* Map Grid Background Gridlines */}
          <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

          {/* Route Start Point: Warehouse Hub */}
          <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-200">
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 shadow">
              <Package className="w-4 h-4 text-indigo-400" />
              <span>प्राइममार्केट हब (लखनऊ)</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-indigo-400 shadow">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>ग्राम {displayOrder.address.village} (घर)</span>
            </div>
          </div>

          {/* Dynamic Progress Line & Rider Marker */}
          <div className="relative z-10 my-auto py-4">
            {/* Road SVG Line */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700 relative">
              <div
                className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${displayOrder.riderProgressPercentage}%` }}
              ></div>
            </div>

            {/* Rider Icon Animated Marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out flex flex-col items-center"
              style={{ left: `calc(${Math.min(92, Math.max(5, displayOrder.riderProgressPercentage))}% - 20px)` }}
            >
              <div className="bg-indigo-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap animate-bounce flex items-center gap-1">
                <span>🛵 सतीश यादव</span>
                <span className="text-[9px] text-indigo-200">({displayOrder.riderProgressPercentage}%)</span>
              </div>
            </div>
          </div>

          {/* Live Progress Info Bar */}
          <div className="relative z-10 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>लाइव स्पीड: <strong className="text-white">32 किमी/घंटा</strong></span>
            </div>

            {/* OTP Code Display Box */}
            <div className="bg-indigo-500/20 px-3 py-1 rounded-xl border border-indigo-400/40 text-indigo-200 font-bold flex items-center gap-1.5">
              <span>डिलीवरी OTP:</span>
              <span className="text-base font-bold text-white tracking-wider bg-slate-950 px-2 py-0.5 rounded-lg border border-indigo-400/50">
                {displayOrder.deliveryOtp}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step Progress Timeline */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          <span>ऑर्डर प्रगति चरण (Step Timeline)</span>
        </h3>

        <div className="grid grid-cols-5 gap-1 relative text-center text-[10px] sm:text-xs">
          {stages.map((stg, idx) => {
            const isDone = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stg.key} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    isDone
                      ? 'bg-indigo-600 text-white font-bold ring-4 ring-indigo-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span
                  className={`font-semibold leading-tight ${
                    isCurrent ? 'text-indigo-600 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {stg.labelHi}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rider & Delivery Partner Details Card */}
      {displayOrder.rider && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={displayOrder.rider.photo}
              alt={displayOrder.rider.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-600"
            />
            <div>
              <div className="font-bold text-sm text-slate-800">{displayOrder.rider.name}</div>
              <div className="text-xs text-indigo-600 font-medium">
                वाहन: {displayOrder.rider.vehicleNo} ({displayOrder.rider.vehicleType})
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-600" />
                <span>सत्यापित डिलीवरी पार्टनर | रेटिंग {displayOrder.rider.rating} ★</span>
              </div>
            </div>
          </div>

          <a
            href={`tel:${displayOrder.rider.phone}`}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xs:inline">कॉल करें</span>
          </a>
        </div>
      )}

      {/* Itemized Order Summary */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2">
          ऑर्डर की वस्तुएं ({displayOrder.items.length} आइटम)
        </h3>

        <div className="divide-y divide-slate-100">
          {displayOrder.items.map(item => (
            <div key={item.product.id} className="py-3 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-800">{item.product.nameHi || item.product.name}</div>
                  <div className="text-slate-500 text-[11px]">
                    विक्रेता: {item.product.sellerName} | मात्रा: {item.quantity}
                  </div>
                </div>
              </div>

              <div className="font-bold text-indigo-600 text-sm">
                ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Order Payment Summary Row */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold mt-3">
          <div>
            भुगतान विधि: <strong className="text-slate-800 uppercase">{displayOrder.paymentMethod}</strong> | आईडी: {displayOrder.transactionId}
          </div>
          <div className="text-sm font-bold text-indigo-600">
            कुल देय: ₹{displayOrder.finalAmount.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Printable Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
