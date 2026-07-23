import React, { useState } from 'react';
import { X, MapPin, Tag, Truck, ArrowRight, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { Address } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, user, setActiveTab } = useApp();

  const [selectedAddress, setSelectedAddress] = useState<Address>(
    user.addresses[0] || {
      id: 'addr_new',
      fullName: user.fullName,
      mobile: user.mobile,
      house: 'मकान नं. 12',
      village: user.village,
      post: user.block,
      block: user.block,
      district: user.district,
      pinCode: '226102'
    }
  );

  const [deliverySlot, setDeliverySlot] = useState('आज शाम (4 PM - 7 PM)');
  const [couponInput, setCouponInput] = useState('KISAN100');
  const [appliedCoupon, setAppliedCoupon] = useState<string | undefined>('KISAN100');
  const [discountAmount, setDiscountAmount] = useState(100);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isCheckoutOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = rawSubtotal > 500 ? 0 : 30;
  const taxAmount = Math.round(rawSubtotal * 0.05);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee + taxAmount);

  const handleApplyCoupon = () => {
    if (couponInput.toUpperCase() === 'KISAN100') {
      setAppliedCoupon('KISAN100');
      setDiscountAmount(100);
    } else if (couponInput.toUpperCase() === 'PRIMEVILLAGE') {
      setAppliedCoupon('PRIMEVILLAGE');
      setDiscountAmount(150);
    } else if (couponInput.toUpperCase() === 'FARMER50') {
      setAppliedCoupon('FARMER50');
      setDiscountAmount(50);
    } else {
      alert('अवैध कूपन कोड। कृपया KISAN100, PRIMEVILLAGE या FARMER50 का उपयोग करें।');
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col text-slate-800">
          {/* Header */}
          <div className="px-4 py-3 bg-indigo-600 border-b border-indigo-700 flex items-center justify-between text-white sticky top-0 z-10">
            <div className="font-bold text-sm text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-white" />
              <span>एक्सप्रेस चेकआउट (Express Checkout)</span>
            </div>
            <button onClick={() => setIsCheckoutOpen(false)} className="text-white/80 hover:text-white cursor-pointer font-bold">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
            {/* Address Selection Section */}
            <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between font-bold text-indigo-950">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>डिलीवरी का ग्राम पता (Delivery Address)</span>
                </span>
                <button
                  onClick={() => alert('नया ग्राम पता जोड़ने का फॉर्म')}
                  className="text-[11px] text-indigo-600 hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>नया पता</span>
                </button>
              </div>

              <div className="space-y-2 pt-1">
                {user.addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedAddress.id === addr.id
                        ? 'bg-indigo-50/80 border-indigo-600 text-slate-900 font-medium shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-indigo-700">{addr.fullName} ({addr.mobile})</div>
                    <div className="text-slate-600 leading-snug mt-0.5">
                      {addr.house}, ग्राम- {addr.village}, ब्लॉक- {addr.block}, जिला- {addr.district} ({addr.pinCode})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Slot Selection */}
            <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span>डिलीवरी समय स्लॉट (Delivery Time Slot)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  'आज शाम (4 PM - 7 PM)',
                  'कल सुबह (8 AM - 11 AM)',
                  'कल दोपहर (12 PM - 3 PM)',
                  'एक्सप्रेस (2 घंटे में)'
                ].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setDeliverySlot(slot)}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-colors cursor-pointer ${
                      deliverySlot === slot
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Code Applicator */}
            <div className="bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span>किसान व छूट कूपन (Discount Coupon)</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="e.g. KISAN100"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white shadow-sm cursor-pointer"
                >
                  लागू करें
                </button>
              </div>
              {appliedCoupon && (
                <div className="text-[11px] text-indigo-700 font-bold bg-indigo-50 p-2 rounded-xl border border-indigo-100">
                  🎉 कूपन '{appliedCoupon}' लागू हुआ! ₹{discountAmount} की सीधी छूट मिली।
                </div>
              )}
            </div>

            {/* Final Order Price Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-slate-700">
              <div className="font-bold text-indigo-950 text-sm mb-2">बिल विवरण (Bill Details)</div>
              <div className="flex justify-between">
                <span>सामान की मूल कीमत ({cart.length} आइटम):</span>
                <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-indigo-700 font-bold">
                  <span>कूपन छूट:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ग्राम होम डिलीवरी शुल्क:</span>
                <span>{deliveryFee === 0 ? <strong className="text-indigo-700">निःशुल्क (FREE)</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>अनुमानित जीएसटी व टैक्स:</span>
                <span>₹{taxAmount}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-base text-indigo-600">
                <span>कुल देय राशि:</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer Proceed to Payment */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-slate-500">कुल भुगतान:</div>
              <div className="text-lg font-bold text-indigo-600">₹{finalTotal.toLocaleString('en-IN')}</div>
            </div>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <span>भुगतान गेटवे खोलें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        address={selectedAddress}
        discountAmount={discountAmount}
        couponApplied={appliedCoupon}
        onSuccess={() => {
          setIsCheckoutOpen(false);
          setActiveTab('orders');
        }}
      />
    </>
  );
};
