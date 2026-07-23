import React from 'react';
import { X, Printer, ShieldCheck, Download } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-300 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col print:max-w-none print:shadow-none print:border-none">
        {/* Modal Top Bar */}
        <div className="bg-emerald-900 px-4 py-3 text-white flex items-center justify-between print:hidden">
          <div className="font-bold text-sm text-amber-200 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>जीएसटी कर चालान (GST Tax Invoice) - {order.invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट / पीडीएफ</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Header Branding */}
          <div className="flex justify-between items-start border-b border-slate-300 pb-4">
            <div>
              <div className="text-xl font-black text-emerald-800">प्राइममार्केट (PrimeMarket)</div>
              <div className="text-slate-600 font-medium">ग्रामीण डिजिटल कॉमर्स प्लेटफॉर्म (उत्तर प्रदेश)</div>
              <div className="text-slate-500 text-[10px] mt-1">
                GSTIN: 09AAACP1234F1Z9 | CIN: U52100UP2026PTC109283
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-slate-900">TAX INVOICE</div>
              <div className="text-slate-600 font-mono">चालान सं.: {order.invoiceNumber}</div>
              <div className="text-slate-500">दिनांक: {new Date(order.createdAt).toLocaleDateString('hi-IN')}</div>
            </div>
          </div>

          {/* Seller & Customer Details Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">
                विक्रेता विवरणी (Seller Details):
              </div>
              <div className="font-bold text-slate-900">{order.items[0]?.product.sellerName || 'किसान बीज एवं खाद भंडार'}</div>
              <div className="text-slate-600">ग्राम: {order.items[0]?.product.village || 'मलिहाबाद'}, लखनऊ (उत्तर प्रदेश)</div>
              <div className="text-slate-500 text-[10px]">GSTIN: 09AABCK1234F1Z5</div>
            </div>

            <div>
              <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider mb-1">
                क्रेता विवरणी (Buyer Details):
              </div>
              <div className="font-bold text-slate-900">{order.address.fullName}</div>
              <div className="text-slate-600">
                {order.address.house}, ग्राम- {order.address.village}, ब्लॉक- {order.address.block}, जिला- {order.address.district} ({order.address.pinCode})
              </div>
              <div className="text-slate-500 text-[10px]">मो: {order.address.mobile}</div>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-left border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <th className="p-2 border-r border-slate-300">#</th>
                <th className="p-2 border-r border-slate-300">विवरण (Product)</th>
                <th className="p-2 border-r border-slate-300">HSN</th>
                <th className="p-2 border-r border-slate-300">मात्रा</th>
                <th className="p-2 border-r border-slate-300">दर (Rate)</th>
                <th className="p-2 border-r border-slate-300">जीएसटी %</th>
                <th className="p-2">कुल (Total)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.items.map((it, idx) => (
                <tr key={it.product.id}>
                  <td className="p-2 border-r border-slate-300 text-center font-mono">{idx + 1}</td>
                  <td className="p-2 border-r border-slate-300 font-semibold">{it.product.nameHi || it.product.name}</td>
                  <td className="p-2 border-r border-slate-300 font-mono text-[11px]">{it.product.hsnCode}</td>
                  <td className="p-2 border-r border-slate-300 text-center font-bold">{it.quantity}</td>
                  <td className="p-2 border-r border-slate-300">₹{it.product.price}</td>
                  <td className="p-2 border-r border-slate-300">{it.product.gstRate}%</td>
                  <td className="p-2 font-bold text-slate-900">₹{it.product.price * it.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Row */}
          <div className="flex justify-between items-end pt-2">
            <div className="text-[10px] text-slate-500 max-w-xs leading-tight">
              यह एक कम्प्यूटर जनरेटेड चालान है। इसमें किसी हस्ताक्षर की आवश्यकता नहीं है। ग्रामीण होम डिलीवरी हेतु धन्यवाद!
            </div>
            <div className="w-64 space-y-1 text-right text-slate-700">
              <div className="flex justify-between">
                <span>उप-कुल (Subtotal):</span>
                <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>कूपन डिस्काउंट:</span>
                  <span>-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>होम डिलीवरी शुल्क:</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>जीएसटी टैक्स:</span>
                <span>₹{order.taxAmount}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 border-t border-slate-400 pt-1">
                <span>अंतिम कुल राशि:</span>
                <span>₹{order.finalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
