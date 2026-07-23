import React from 'react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from './ProductCard';
import { useApp } from '../../context/AppContext';

export const CategoryScreen: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery } = useApp();

  const activeCategory = MOCK_CATEGORIES.find(c => c.id === selectedCategory) || MOCK_CATEGORIES[0];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCat = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameHi.includes(searchQuery)
      : true;
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Category Pills Header */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          सभी उत्पाद (All Products)
        </button>

        {MOCK_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.nameHi}
          </button>
        ))}
      </div>

      {/* Subcategories list */}
      {activeCategory.subcategories && (
        <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap gap-2 text-xs shadow-sm">
          <span className="text-slate-500 font-bold self-center">उप-श्रेणियां:</span>
          {activeCategory.subcategories.map((sub, idx) => (
            <span
              key={idx}
              className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-lg font-semibold"
            >
              {sub}
            </span>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-slate-800 text-base">
            {selectedCategory ? activeCategory.nameHi : 'सभी ग्राम उत्पाद'} ({filteredProducts.length} उपलब्ध)
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
            कोई उत्पाद नहीं मिला।
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
