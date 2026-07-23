import React from 'react';
import {
  Sprout,
  ShoppingBag,
  Smartphone,
  Wrench,
  Landmark,
  Briefcase,
  Sparkles,
  MapPin,
  Truck,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_SELLERS } from '../../data/mockData';
import { ProductCard } from './ProductCard';

export const HomeScreen: React.FC = () => {
  const {
    user,
    setActiveTab,
    setIsAIAssistantOpen,
    orders,
    setActiveTrackingOrder,
    setSelectedCategory,
    language
  } = useApp();

  const activeTrackingOrder = orders.find(o => o.trackingStage !== 'delivered');
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return ShoppingBag;
      case 'Sprout': return Sprout;
      case 'Smartphone': return Smartphone;
      case 'Wrench': return Wrench;
      case 'Landmark': return Landmark;
      case 'Briefcase': return Briefcase;
      default: return ShoppingBag;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Live Order GPS Tracking Alert Banner */}
      {activeTrackingOrder && (
        <div
          onClick={() => {
            setActiveTrackingOrder(activeTrackingOrder);
            setActiveTab('orders');
          }}
          className="bg-white border-2 border-indigo-600 p-4 rounded-2xl cursor-pointer shadow-md hover:shadow-lg transition-all flex items-center justify-between gap-3 text-slate-800"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  लाइव डिलीवरी जारी 🛵
                </span>
                <span className="text-xs text-indigo-600 font-mono font-bold">
                  सं.: {activeTrackingOrder.orderNumber}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">
                डिलीवरी पार्टनर सतीश यादव आपके ग्राम <span className="text-indigo-600">{activeTrackingOrder.address.village}</span> आ रहे हैं।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden xs:block text-right">
              <div className="text-[10px] text-slate-400">अनुमानित समय</div>
              <div className="text-sm font-bold text-indigo-600">{activeTrackingOrder.estimatedDeliveryMinutes} मिनट</div>
            </div>
            <div className="p-2 bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm">
              <span>ट्रैक करें</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Main Rural Hero Banner Carousel */}
      <div className="relative bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-400/30">
            <Zap className="w-3.5 h-3.5 fill-indigo-300" />
            <span>उत्तर प्रदेश 75 जिलों में सबसे तेज़ ग्राम डिलीवरी</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
            उत्तर प्रदेश का अपना <span className="text-indigo-400">ग्रामीण डिजिटल</span> सुपर ऐप
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            प्रमाणित गेहूं व सरसों बीज, इफको खाद, किराना राशन, सोलर लाइट एवं स्थानीय बिजली मिस्त्री व डॉक्टर सेवाएं सीधे अपने गांव में प्राप्त करें।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('categories')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <span>खरीदारी शुरू करें (Shop Now)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>किसान मित्र AI से पूछें</span>
            </button>
          </div>
        </div>

        {/* Decorative Badge Overlay */}
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Quick Category Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
            <Sprout className="w-5 h-5 text-indigo-600" />
            <span>प्रमुख श्रेणियां (Main Categories)</span>
          </h2>
          <button
            onClick={() => setActiveTab('categories')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>सभी देखें ({MOCK_CATEGORIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {MOCK_CATEGORIES.map(cat => {
            const IconComp = getCategoryIcon(cat.icon);
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id === 'cat_services') setActiveTab('services');
                  else if (cat.id === 'cat_csc') setActiveTab('csc');
                  else setActiveTab('categories');
                }}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-3 text-center cursor-pointer transition-all hover:-translate-y-0.5 shadow-sm hover:shadow group flex flex-col items-center justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 text-xs leading-snug line-clamp-2">
                    {cat.nameHi}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{cat.itemCount}+ आइटम्स</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Products Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" />
            <span>खास ऑफ़र व लोकप्रिय उत्पाद (Popular Products)</span>
          </h2>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            100% ओरिजिनल सामान
          </span>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Kisan AI Assistant Highlight Card */}
      <div className="bg-indigo-50 border border-indigo-100 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-950 text-sm sm:text-base">
              किसान मित्र AI असिस्टेंट (AI Farming & Shopping Guide)
            </h3>
            <p className="text-xs text-slate-600">
              अपनी भाषा (हिंदी/अवधी) में गेहूं, सरसों, खाद की खुराक, मंडी रेट या ऐप सहायता के प्रश्न पूछें।
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          अभी बात करें (Ask AI)
        </button>
      </div>

      {/* Verified Local Sellers List */}
      <div className="space-y-3">
        <h2 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span>आपके निकटतम सत्यापित विक्रेता दुकानें (Local Verified Sellers)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_SELLERS.map(seller => (
            <div
              key={seller.id}
              className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-800 text-xs sm:text-sm">{seller.shopName}</div>
                <div className="text-[11px] text-slate-500">प्रो.: {seller.ownerName}</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                  📍 ग्राम- {seller.village}, {seller.district}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 font-bold text-xs px-2 py-0.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{seller.rating}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{seller.totalOrders}+ ऑर्डर</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
