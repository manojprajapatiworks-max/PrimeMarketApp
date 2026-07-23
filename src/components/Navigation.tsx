import React from 'react';
import {
  Home,
  Grid,
  Wrench,
  Landmark,
  PackageCheck,
  ShoppingBag,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, cart, appRole, orders } = useApp();

  if (appRole !== 'customer') return null;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrder = orders.find(o => o.trackingStage !== 'delivered');

  const navItems = [
    { id: 'home', labelHi: 'गृह', labelEn: 'Home', icon: Home },
    { id: 'categories', labelHi: 'श्रेणियां', labelEn: 'Categories', icon: Grid },
    { id: 'services', labelHi: 'सेवाएं', labelEn: 'Services', icon: Wrench },
    { id: 'csc', labelHi: 'सरकारी सीएससी', labelEn: 'CSC Govt', icon: Landmark },
    {
      id: 'orders',
      labelHi: 'ऑर्डर',
      labelEn: 'Orders',
      icon: PackageCheck,
      badge: activeOrder ? 'लाइव' : undefined
    },
    {
      id: 'cart',
      labelHi: 'कार्ट',
      labelEn: 'Cart',
      icon: ShoppingBag,
      badgeCount: cartCount > 0 ? cartCount : undefined
    },
    { id: 'profile', labelHi: 'खाता', labelEn: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 text-slate-500 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {navItems.map(item => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all relative ${
                isActive
                  ? 'text-indigo-600 font-bold bg-indigo-50/80 scale-105 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <IconComp className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {item.badgeCount && (
                  <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {item.badgeCount}
                  </span>
                )}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 bg-emerald-500 text-white font-bold text-[8px] px-1 py-0.2 rounded-full shadow-sm animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.labelHi}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
