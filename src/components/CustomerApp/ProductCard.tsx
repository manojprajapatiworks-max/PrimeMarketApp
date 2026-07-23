import React from 'react';
import { Star, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart, setIsCheckoutOpen, language, setSelectedProduct } = useApp();

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => {
        setSelectedProduct(product);
        if (onSelectProduct) onSelectProduct(product);
      }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-300 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col group cursor-pointer"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="bg-indigo-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isOrganic && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
              100% जैविक
            </span>
          )}
        </div>

        {discountPercent > 0 && (
          <span className="absolute top-2 right-2 bg-rose-500 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
            {discountPercent}% छूट
          </span>
        )}

        {/* Village Location Badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur text-slate-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm">
          📍 {product.village}, {product.district}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller Tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="truncate flex items-center gap-1 text-slate-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              {product.sellerName}
            </span>
            <span className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {product.rating}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
            {language === 'hi' ? product.nameHi || product.name : product.name}
          </h3>

          <div className="text-[10px] text-slate-400 mb-2">
            मात्रा: <span className="text-slate-600 font-semibold">{product.unit}</span> | HSN: {product.hsnCode} (GST {product.gstRate}%)
          </div>
        </div>

        {/* Price & Action Row */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base sm:text-lg font-bold text-indigo-600">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100">
            <button
              onClick={handleAddToCart}
              className="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>कार्ट</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-1.5 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors active:scale-95 shadow-sm cursor-pointer"
            >
              <span>खरीदें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
