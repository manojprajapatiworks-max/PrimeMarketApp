import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/CustomerApp/HomeScreen';
import { CategoryScreen } from './components/CustomerApp/CategoryScreen';
import { ServicesScreen } from './components/CustomerApp/ServicesScreen';
import { GovtServicesScreen } from './components/CustomerApp/GovtServicesScreen';
import { OrderTrackingScreen } from './components/CustomerApp/OrderTrackingScreen';
import { CartScreen } from './components/CustomerApp/CartScreen';
import { ProfileScreen } from './components/CustomerApp/ProfileScreen';
import { ProductDetailModal } from './components/CustomerApp/ProductDetailModal';
import { KisanAIAssistantModal } from './components/CustomerApp/KisanAIAssistantModal';
import { SellerDashboard } from './components/SellerApp/SellerDashboard';
import { DeliveryDashboard } from './components/DeliveryApp/DeliveryDashboard';
import { ProviderDashboard } from './components/ProviderApp/ProviderDashboard';
import { AdminDashboard } from './components/AdminPortal/AdminDashboard';
import { Smartphone, Monitor } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { appRole, activeTab, viewport, setViewport } = useApp();

  const renderActiveScreen = () => {
    if (appRole === 'seller') return <SellerDashboard />;
    if (appRole === 'delivery') return <DeliveryDashboard />;
    if (appRole === 'provider') return <ProviderDashboard />;
    if (appRole === 'admin') return <AdminDashboard />;

    // Customer App screens
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'categories': return <CategoryScreen />;
      case 'services': return <ServicesScreen />;
      case 'csc': return <GovtServicesScreen />;
      case 'orders': return <OrderTrackingScreen />;
      case 'cart': return <CartScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      <Header />

      {/* Viewport Frame Wrapper */}
      <main className="flex-1 flex justify-center py-2 sm:py-6 px-2 sm:px-6 mb-16 sm:mb-20">
        {viewport === 'mobile' ? (
          /* Realistic Mobile Phone Device Frame */
          <div className="w-full max-w-[440px] bg-slate-50 border-4 border-slate-300 rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative my-auto ring-1 ring-slate-200">
            {/* Speaker / Notch Bar */}
            <div className="w-32 h-4 bg-slate-900 rounded-b-xl mx-auto flex items-center justify-center space-x-2 z-20">
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>

            {/* Content View inside Phone Frame */}
            <div className="flex-1 overflow-y-auto pb-14 bg-[#F8FAFC]">
              {renderActiveScreen()}
            </div>
          </div>
        ) : (
          /* Full Desktop Expanded View */
          <div className="w-full max-w-7xl">
            {renderActiveScreen()}
          </div>
        )}
      </main>

      {/* Bottom Bar Navigation for Customer Mobile View */}
      <Navigation />

      {/* Global Modals */}
      <ProductDetailModal />
      <KisanAIAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
