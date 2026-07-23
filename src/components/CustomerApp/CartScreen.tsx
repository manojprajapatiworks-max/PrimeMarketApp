import React, { useState } from 'react';
import { ShoppingBag, Trash2, MapPin, Tag, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CheckoutModal } from './CheckoutModal';

export const CartScreen: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, setActiveTab, user, setIsCheckoutOpen } = useApp();

  const [coupon, setCoupon] = useState('KISAN100');
  const [discount, setDiscount] = useState(100);

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = rawSubtotal > 500 ? 0 : 30;
  const taxAmount = Math.round(rawSubtotal * 0.05);
  const finalTotal = Math.max(0, rawSubtotal - discount + deliveryFee + taxAmount);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center space-y-4 bg-white border border-slate-200 rounded-3xl my-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">आपकी कार्ट खाली है!</h2>
        <p className="text-xs text-slate-500">
          गेहूं बीज, इफको खाद, सोलर लाइट या किराने का सामान चुनें और तुरंत ऑर्डर करें।
        </p>
        <button
          onClick={() => setActiveTab('home')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          खरीदारी शुरू करें
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <span>आपकी कार्ट ({cart.length} उत्पाद)</span>
        </h1>
        <button
          onClick={() => setActiveTab('home')}
          className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>और सामान देखें</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-sm flex items-center gap-3 sm:gap-4"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-50 border border-slate-100 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-indigo-600 font-bold">{item.product.brand}</div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                  {item.product.nameHi || item.product.name}
                </h3>
                <div className="text-[10px] text-slate-500">
                  मात्रा इकाई: {item.product.unit} | विक्रेता: {item.product.sellerName}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="font-bold text-indigo-600 text-sm sm:text-base">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, -1)}
                      className="text-slate-600 hover:text-slate-900 font-bold text-sm px-1.5 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-xs text-slate-800">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, 1)}
                      className="text-slate-600 hover:text-slate-900 font-bold text-sm px-1.5 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                title="हटाएं"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Delivery Alert Banner */}
          <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100 text-xs text-indigo-950 flex items-center gap-2 shadow-sm">
            <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>
              ₹500 से अधिक के ऑर्डर पर आपके गांव <strong className="text-indigo-700">{user.village}</strong> पर बिल्कुल निःशुल्क होम डिलीवरी!
            </span>
          </div>
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm text-slate-800">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
              बिल का कुल हिसाब (Bill Summary)
            </h3>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>सामान की कुल कीमत:</span>
                <span className="font-semibold text-slate-800">₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>कूपन डिस्काउंट:</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span>ग्राम होम डिलीवरी शुल्क:</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>अनुमानित टैक्स (GST):</span>
                <span>₹{taxAmount}</span>
              </div>

              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-base text-indigo-600">
                <span>कुल भुगतान राशि:</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <span>सुरक्षित चेकआउट करें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal />
    </div>
  );
};
