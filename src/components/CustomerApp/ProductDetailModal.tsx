import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, Truck, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCheckoutOpen, language } = useApp();
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col text-slate-800">
        {/* Header Close Bar */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
          <div className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>सत्यापित उत्पाद (Verified Product)</span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image Box */}
            <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square border border-slate-200">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-indigo-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info Box */}
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {product.brand}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-snug mt-1">
                  {language === 'hi' ? product.nameHi || product.name : product.name}
                </h2>
              </div>

              {/* Seller & Rating */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div className="font-bold text-slate-800">{product.sellerName}</div>
                    <div className="text-[10px] text-slate-500">विक्रेता दुकान | {product.village}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-1 rounded-lg border border-amber-100">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Price & Unit */}
              <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                      {discountPercent}% बचाएं
                    </span>
                  )}
                </div>
                <div className="text-xs text-indigo-950 mt-1">
                  इकाई (Unit): <span className="font-bold text-indigo-700">{product.unit}</span> | HSN: {product.hsnCode} (जीएसटी {product.gstRate}%)
                </div>
              </div>

              {/* Fast Village Delivery SLA */}
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <span>24-48 घंटे में आपके गांव <strong className="text-slate-800">{product.village}, {product.district}</strong> पर निःशुल्क होम डिलीवरी</span>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="border-t border-slate-100 pt-3">
            <h4 className="font-bold text-indigo-950 text-xs sm:text-sm mb-1">विवरण (Description)</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'hi' ? product.descriptionHi || product.description : product.description}
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600 border-t border-slate-100 pt-3">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <span>100% असली उत्पाद</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <span>सुरक्षित पेमेंट गेटवे</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <span>लाइव जीपीएस ट्रैकिंग</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {/* Qty Selector */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="text-slate-600 hover:text-slate-900 font-bold text-base px-1 cursor-pointer"
            >
              -
            </button>
            <span className="font-bold text-sm text-indigo-600 px-2">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="text-slate-600 hover:text-slate-900 font-bold text-base px-1 cursor-pointer"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>कार्ट में जोड़ें</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <span>अभी खरीदें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
