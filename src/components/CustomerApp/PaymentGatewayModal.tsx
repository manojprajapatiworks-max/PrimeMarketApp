import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Wallet,
  Building2,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod, Address } from '../../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address;
  discountAmount: number;
  couponApplied?: string;
  onSuccess: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  address,
  discountAmount,
  couponApplied,
  onSuccess
}) => {
  const { cart, placeOrder, user } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiOption, setUpiOption] = useState<'qr' | 'app' | 'vpa'>('qr');
  const [vpaId, setVpaId] = useState('9839120485@ybl');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = rawSubtotal > 500 ? 0 : 30;
  const taxAmount = Math.round(rawSubtotal * 0.05);
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + deliveryFee + taxAmount);

  const handleProcessPayment = () => {
    if (paymentMethod === 'wallet' && user.walletBalance < totalAmount) {
      alert(`आपके वॉलेट में पर्याप्त बैलेंस नहीं है। वर्तमान बैलेंस: ₹${user.walletBalance}`);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        placeOrder(address, paymentMethod, discountAmount, couponApplied);
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-auto flex flex-col text-slate-800">
        {/* Gateway Top Bar */}
        <div className="bg-indigo-600 px-4 py-3 border-b border-indigo-700 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            <div>
              <div className="font-bold text-sm text-white">प्राइममार्केट सुरक्षित भुगतान (Payment Gateway)</div>
              <div className="text-[10px] text-indigo-100 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white" />
                <span>256-Bit SSL एन्क्रिप्टेड सुरक्षित ट्रांजैक्शन</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white rounded cursor-pointer font-bold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing State Animation */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="font-bold text-lg text-indigo-950">भुगतान की पुष्टि की जा रही है...</div>
            <p className="text-xs text-slate-500">बैंक एवं भुगतान गेटवे से सुरक्षित कनेक्शन स्थापित हो रहा है। कृपया प्रतीक्षा करें।</p>
          </div>
        ) : isSuccess ? (
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="font-bold text-xl text-indigo-950">भुगतान सफल हुआ! (Payment Successful)</div>
            <p className="text-xs text-slate-600">ऑर्डर दर्ज हो गया है और लाइव ट्रैकिंग सक्रिय हो गई है।</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Amount Payable Highlight */}
            <div className="bg-indigo-50 p-3.5 rounded-2xl border border-indigo-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-indigo-950 font-bold">कुल देय राशि (Payable Amount)</div>
                <div className="text-2xl font-bold text-indigo-600">₹{totalAmount.toLocaleString('en-IN')}</div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <div>पता: <strong className="text-slate-800">{address.village}</strong></div>
                <div>आइटम: <strong className="text-slate-800">{cart.length} आइटम</strong></div>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-bold">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'wallet'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>वॉलेट</span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>कार्ड</span>
              </button>

              <button
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'netbanking'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>नेटबैंकिंग</span>
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>नकद (COD)</span>
              </button>
            </div>

            {/* Sub-form Panels */}
            {paymentMethod === 'upi' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex gap-2 text-xs font-bold border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setUpiOption('qr')}
                    className={`px-3 py-1 rounded-lg cursor-pointer ${
                      upiOption === 'qr' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    क्यूआर स्कैन (QR Scan)
                  </button>
                  <button
                    onClick={() => setUpiOption('app')}
                    className={`px-3 py-1 rounded-lg cursor-pointer ${
                      upiOption === 'app' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    PhonePe / GPay / Paytm
                  </button>
                  <button
                    onClick={() => setUpiOption('vpa')}
                    className={`px-3 py-1 rounded-lg cursor-pointer ${
                      upiOption === 'vpa' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    UPI ID
                  </button>
                </div>

                {upiOption === 'qr' && (
                  <div className="text-center py-2 space-y-2">
                    <div className="bg-white p-3 rounded-2xl inline-block shadow-sm border border-slate-200">
                      {/* Simulating QR Code */}
                      <div className="w-36 h-36 bg-slate-900 p-2 rounded-xl flex flex-col items-center justify-center text-white text-[10px] space-y-1">
                        <QrCode className="w-20 h-20 text-indigo-400" />
                        <span className="font-bold text-white">Scan & Pay ₹{totalAmount}</span>
                      </div>
                    </div>
                    <p className="text-xs text-indigo-700 font-bold">
                      किसी भी UPI ऐप (BHIM, PhonePe, Google Pay, Paytm) से QR कोड स्कैन करके भुगतान करें
                    </p>
                  </div>
                )}

                {upiOption === 'app' && (
                  <div className="grid grid-cols-3 gap-2 text-xs text-center font-bold">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-600 cursor-pointer text-slate-800">
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                      <span>PhonePe</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-600 cursor-pointer text-slate-800">
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <span>Google Pay</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 hover:border-indigo-600 cursor-pointer text-slate-800">
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-cyan-600" />
                      <span>Paytm UPI</span>
                    </div>
                  </div>
                )}

                {upiOption === 'vpa' && (
                  <div>
                    <label className="text-xs text-slate-600 font-semibold block mb-1">अपनी UPI आईडी दर्ज करें:</label>
                    <input
                      type="text"
                      value={vpaId}
                      onChange={e => setVpaId(e.target.value)}
                      placeholder="e.g. 9839120485@ybl"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-semibold">प्राइममार्केट वॉलेट बैलेंस:</span>
                  <span className="text-lg font-bold text-indigo-600">₹{user.walletBalance}</span>
                </div>
                {user.walletBalance < totalAmount ? (
                  <div className="p-2.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 font-bold">
                    बैलेंस कम है। कृपया ₹{totalAmount - user.walletBalance} ऑनलाइन भुगतान करें या वॉलेट रिचार्ज करें।
                  </div>
                ) : (
                  <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-700 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>वॉलेट से भुगतान पर 0% शुल्क एवं तुरंत रसीद मिलेगी।</span>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">कार्ड नंबर (Card Number):</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8920"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">वैधता (Exp MM/YY):</label>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={e => setCardExp(e.target.value)}
                      placeholder="08/29"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">CVV:</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <label className="text-xs text-slate-600 font-semibold block">बैंक का चयन करें:</label>
                <select
                  value={selectedBank}
                  onChange={e => setSelectedBank(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="sbi">भारतीय स्टेट बैंक (State Bank of India)</option>
                  <option value="pnb">पंजाब नेशनल बैंक (PNB)</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="bob">बैंक ऑफ बड़ौदा (Bank of Baroda)</option>
                </select>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-2 text-xs">
                <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-indigo-600" />
                  <span>कैश ऑन डिलीवरी (Cash on Delivery)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  सामान आपके गांव <strong className="text-slate-800">{address.village}</strong> पहुँचने पर डिलीवरी पार्टनर सतीश यादव को नकद राशि दें।
                </p>
              </div>
            )}

            {/* Complete Payment Button */}
            <button
              onClick={handleProcessPayment}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-white" />
              <span>₹{totalAmount.toLocaleString('en-IN')} का सुरक्षित भुगतान करें</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
