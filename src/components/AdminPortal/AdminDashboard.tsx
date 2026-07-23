import React from 'react';
import { ShieldCheck, TrendingUp, Users, Store, Package, Database, Activity, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { orders } = useApp();

  const districtSales = [
    { district: 'लखनऊ (Lucknow)', sales: '₹1,42,800', orders: 1840, sellers: 120 },
    { district: 'गोरखपुर (Gorakhpur)', sales: '₹98,500', orders: 1210, sellers: 85 },
    { district: 'वाराणसी (Varanasi)', sales: '₹84,200', orders: 940, sellers: 72 },
    { district: 'बाराबंकी (Barabanki)', sales: '₹62,100', orders: 710, sellers: 54 },
    { district: 'अयोध्या (Ayodhya)', sales: '₹58,900', orders: 680, sellers: 48 },
  ];

  const microservices = [
    { name: 'Identity Service', status: 'Healthy', latency: '42 ms' },
    { name: 'Catalog Service', status: 'Healthy', latency: '88 ms' },
    { name: 'Order Service', status: 'Healthy', latency: '110 ms' },
    { name: 'Payment Gateway Proxy', status: 'Healthy', latency: '145 ms' },
    { name: 'Delivery GPS Service', status: 'Healthy', latency: '65 ms' },
    { name: 'Kisan AI Gemini Service', status: 'Healthy', latency: '210 ms' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Admin Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800">
              प्राइममार्केट मास्टर एडमिन (Enterprise Admin Portal)
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            उत्तर प्रदेश 75 जिलों में ई-कॉमर्स, डिलीवरी नेटवर्क एवं सीएससी डिजिटल सेवाओं की लाइव निगरानी।
          </p>
        </div>

        <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-700 font-mono font-bold">
          सिस्टम स्थिति: <strong className="text-indigo-600">99.99% Uptime</strong> | v1.0.0
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">कुल जीएमवी (Gross GMV)</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">₹4,46,500</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ 24% मासिक वृद्धि</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">कुल पंजीकृत ग्राम उपभोक्ता</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">1,48,200</div>
          <div className="text-[10px] text-slate-500 mt-1">75 जिलों में</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">सत्यापित विक्रेता दुकानें</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">12,450</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">100% GST Verified</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">सक्रिय डिलीवरी राइडर्स</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">3,890</div>
          <div className="text-[10px] text-slate-500 mt-1">औसत डिलीवरी: 22 मिनट</div>
        </div>
      </div>

      {/* District Wise Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3 shadow-sm text-slate-800">
          <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <span>जिला-वार बिक्री विवरणी (UP District Sales)</span>
          </h2>

          <div className="divide-y divide-slate-100">
            {districtSales.map((d, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800">{d.district}</div>
                  <div className="text-slate-500 text-[11px]">{d.orders} ऑर्डर | {d.sellers} विक्रेता</div>
                </div>
                <div className="font-bold text-indigo-600 text-sm">{d.sales}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Microservices Health */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3 shadow-sm text-slate-800">
          <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <span>माइक्रोसर्विसेज हेल्थ (Domain Services Health)</span>
          </h2>

          <div className="space-y-2">
            {microservices.map((ms, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{ms.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono text-[11px]">{ms.latency}</span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100">
                    {ms.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
