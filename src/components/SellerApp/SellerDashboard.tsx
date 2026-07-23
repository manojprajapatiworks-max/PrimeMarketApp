import React, { useState } from 'react';
import { Store, Plus, Package, DollarSign, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_SELLERS, MOCK_PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';

export const SellerDashboard: React.FC = () => {
  const seller = MOCK_SELLERS[0];
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [newProdName, setNewProdName] = useState('');
  const [newProdNameHi, setNewProdNameHi] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(500);
  const [newProdMrp, setNewProdMrp] = useState(650);
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdHsn, setNewProdHsn] = useState('10019910');

  const handleAddProduct = () => {
    if (!newProdName) return;

    const newProd: Product = {
      id: `prod_${Date.now()}`,
      sellerId: seller.id,
      sellerName: seller.shopName,
      sellerRating: seller.rating,
      brand: 'Kisan Brand',
      name: newProdName,
      nameHi: newProdNameHi || newProdName,
      category: 'cat_agriculture',
      subCategory: 'प्रमाणित बीज (Seeds)',
      price: newProdPrice,
      mrp: newProdMrp,
      unit: 'Pack',
      inStock: true,
      stockCount: newProdStock,
      rating: 5.0,
      reviewCount: 1,
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'],
      description: 'सत्यापित ग्रामीण बीज उत्पाद।',
      descriptionHi: 'सत्यापित ग्रामीण बीज उत्पाद।',
      hsnCode: newProdHsn,
      gstRate: 5,
      village: seller.village,
      district: seller.district,
      badge: 'New Launch'
    };

    setProducts([newProd, ...products]);
    setIsAddProductOpen(false);
    setNewProdName('');
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Seller Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-800">{seller.shopName}</h1>
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-600" />
                <span>GST Verified</span>
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">प्रो.: {seller.ownerName} | GSTIN: {seller.gst}</div>
            <div className="text-xs text-indigo-600 font-medium mt-0.5">📍 ग्राम- {seller.village}, जिला- {seller.district}</div>
          </div>
        </div>

        <button
          onClick={() => setIsAddProductOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>नया उत्पाद जोड़ें (Add Product)</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">आज के ऑर्डर</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">28</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">↑ 18% वृद्धि</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">कुल बिक्री (GMV)</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">₹{seller.revenue.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">सुरक्षित पेमेंट</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">वॉलेट बैलेंस</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">₹{seller.walletBalance.toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-slate-500 mt-1">कमीशन दर: {seller.commissionRate}%</div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="text-slate-500 text-xs font-bold">स्टोर रेटिंग</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{seller.rating} ★</div>
          <div className="text-[10px] text-slate-500 mt-1">{seller.totalOrders} समीक्षाएं</div>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm text-slate-800">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <Package className="w-5 h-5 text-indigo-600" />
          <span>आपकी दुकान के सामान ({products.length})</span>
        </h2>

        <div className="divide-y divide-slate-100">
          {products.map(p => (
            <div key={p.id} className="py-3 flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-3">
                <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-200" />
                <div>
                  <div className="font-bold text-slate-800">{p.nameHi || p.name}</div>
                  <div className="text-slate-500 text-[11px]">HSN: {p.hsnCode} | GST: {p.gstRate}%</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-indigo-600 text-sm">₹{p.price}</div>
                <div className="text-[10px] text-emerald-700 font-semibold">स्टॉक: {p.stockCount} पीस</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 space-y-3 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-indigo-950 text-sm">नया उत्पाद जोड़ें</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 font-semibold">
              <div>
                <label className="block mb-1">उत्पाद का नाम (हिंदी):</label>
                <input
                  type="text"
                  value={newProdNameHi}
                  onChange={e => setNewProdNameHi(e.target.value)}
                  placeholder="e.g. सरसो बीज"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block mb-1">उत्पाद नाम (English):</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  placeholder="e.g. Hybrid Mustard Seeds"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1">बिक्री मूल्य (Price):</label>
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">MRP:</label>
                  <input
                    type="number"
                    value={newProdMrp}
                    onChange={e => setNewProdMrp(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddProduct}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              उत्पाद प्रकाशित करें (Publish)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
