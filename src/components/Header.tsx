import React, { useState } from 'react';
import {
  ShoppingBag,
  Bell,
  Search,
  Sparkles,
  Smartphone,
  Monitor,
  UserCheck,
  Store,
  Truck,
  Wrench,
  ShieldCheck,
  ChevronDown,
  Globe,
  MapPin,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppRole, Language } from '../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    appRole,
    setAppRole,
    viewport,
    setViewport,
    cart,
    notifications,
    setActiveTab,
    setIsAIAssistantOpen,
    searchQuery,
    setSearchQuery,
    markNotificationRead,
    user
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const roles: { id: AppRole; nameHi: string; nameEn: string; icon: any }[] = [
    { id: 'customer', nameHi: 'ग्राहक ऐप (Customer)', nameEn: 'Customer App', icon: UserCheck },
    { id: 'seller', nameHi: 'दुकानदार पोर्टल (Seller)', nameEn: 'Seller Portal', icon: Store },
    { id: 'delivery', nameHi: 'डिलीवरी पार्टनर (Rider)', nameEn: 'Delivery App', icon: Truck },
    { id: 'provider', nameHi: 'सेवा प्रदाता (Provider)', nameEn: 'Service Provider', icon: Wrench },
    { id: 'admin', nameHi: 'मास्टर एडमिन (Admin)', nameEn: 'Admin Portal', icon: ShieldCheck },
  ];

  const languages: { id: Language; name: string; native: string }[] = [
    { id: 'hi', name: 'Hindi', native: 'हिंदी (हिंदी)' },
    { id: 'en', name: 'English', native: 'English' },
    { id: 'awa', name: 'Awadhi', native: 'अवधी' },
    { id: 'bho', name: 'Bhojpuri', native: 'भोजपुरी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-sm border-b border-slate-200">
      {/* Top Bar - Brand, Applet Role Selector, Viewport Switcher & Language */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2 border-b border-slate-100 text-xs sm:text-sm">
        {/* Brand Title */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-sm">
            P
          </div>
          <div>
            <div className="font-bold tracking-tight text-slate-800 text-base sm:text-lg leading-tight flex items-center gap-1.5">
              <span>प्राइममार्केट</span>
              <span className="text-indigo-600 font-semibold text-xs bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">PrimeMarket</span>
            </div>
            <div className="text-[10px] text-slate-500 hidden sm:block">
              ग्रामीण डिजिटल ई-कॉमर्स एवं सेवा प्लेटफॉर्म (UP)
            </div>
          </div>
        </div>

        {/* Right Tools - Viewport, App Role & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Assistant Quick Trigger */}
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm hover:scale-105 transition-all cursor-pointer"
            title="Kisan AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
            <span className="hidden xs:inline">किसान मित्र AI</span>
          </button>

          {/* Viewport Frame Mode Toggle */}
          <button
            onClick={() => setViewport(viewport === 'mobile' ? 'desktop' : 'mobile')}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              viewport === 'mobile'
                ? 'bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Switch App Viewport Mode"
          >
            {viewport === 'mobile' ? (
              <>
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>मोबाइल फ्रेम</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-slate-500" />
                <span>डेस्कटॉप व्यू</span>
              </>
            )}
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-indigo-600" />
              <span className="max-w-[80px] sm:max-w-none truncate">
                {roles.find(r => r.id === appRole)?.nameHi.split(' ')[0]}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1 text-slate-800">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  एप मोड बदलें (Switch Role)
                </div>
                {roles.map(r => {
                  const IconComp = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setAppRole(r.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        appRole === r.id ? 'bg-indigo-50 font-bold text-indigo-700' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-indigo-600" />
                        <span>{r.nameHi}</span>
                      </div>
                      {appRole === r.id && <span className="w-2 h-2 rounded-full bg-indigo-600"></span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsRoleDropdownOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{languages.find(l => l.id === language)?.native.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1 text-slate-800">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  भाषा का चयन करें
                </div>
                {languages.map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setLanguage(l.id);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === l.id ? 'bg-indigo-50 font-bold text-indigo-700' : 'text-slate-700'
                    }`}
                  >
                    <span>{l.native}</span>
                    {language === l.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Row - Location, Search bar, Notifications & Cart */}
      {appRole === 'customer' && (
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center gap-3">
          {/* Location Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs cursor-pointer hover:bg-slate-200 transition-colors">
            <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div className="text-left leading-tight">
              <div className="text-[10px] text-slate-500 font-medium">डिलीवरी का स्थान</div>
              <div className="font-bold text-slate-800 max-w-[120px] truncate">{user.village}, {user.district}</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'खाद, गेहूं बीज, किराने का सामान, बिजली मिस्त्री खोजें...'
                  : 'Search seeds, fertilizer, grocery, electrician...'
              }
              className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-24 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-indigo-200" />
              <span className="hidden xs:inline">बोलकर खोजें</span>
            </button>
          </div>

          {/* Action Buttons: Notifications & Cart */}
          <div className="flex items-center gap-2">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 relative text-slate-600 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 flex items-center justify-between border-b border-slate-200">
                    <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600" />
                      <span>सूचनाएं (Notifications)</span>
                    </div>
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
                    >
                      बंद करें
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">कोई नई सूचना नहीं है।</div>
                    ) : (
                      notifications.map((n, idx) => (
                        <div
                          key={n.id ? `${n.id}-${idx}` : `notif-${idx}`}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 cursor-pointer transition-colors ${
                            n.read ? 'bg-white text-slate-600' : 'bg-indigo-50/60 text-slate-900 font-medium border-l-4 border-indigo-600'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-1">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setActiveTab('cart')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden xs:inline">कार्ट</span>
              {cartCount > 0 && (
                <span className="bg-white text-indigo-600 text-[11px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
