import { useState } from 'react';
import { EquipmentProvider } from '@/context/EquipmentContext';
import { BrowseTab } from '@/components/equipment/BrowseTab';
import { EquippedTab } from '@/components/equipment/EquippedTab';
import { ItemDetailPanel } from '@/components/equipment/ItemDetailPanel';
import parchmentBg from '@/assets/parchment-bg.jpg';
import { BookOpen, Shield } from 'lucide-react';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';

type TabType = 'browse' | 'equipped';

const tabs = [
  { id: 'browse' as TabType, label: 'Armory', icon: BookOpen },
  { id: 'equipped' as TabType, label: 'Equipped', icon: Shield },
];

export default function EquipmentManager() {
  const [activeTab, setActiveTab] = useState<TabType>('browse');

  return (
    <EquipmentProvider>
      <div 
        className="min-h-screen bg-background"
        style={{
          backgroundImage: `url(${parchmentBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay for readability */}
        <div className="min-h-screen bg-background/90">
          <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Mobile Navigation */}
          <nav className="md:hidden sticky top-[73px] z-10 bg-card/80 backdrop-blur-sm border-b border-border">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-3 font-display text-xs uppercase tracking-wider
                    border-b-2 transition-all duration-200
                    ${activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent text-muted-foreground'
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Panel - Browse/Equipped */}
              <div className="lg:col-span-2">
                <div className="medieval-border bg-card/90 backdrop-blur-sm p-4 md:p-6 rounded-sm">
                  {activeTab === 'browse' ? (
                    <BrowseTab />
                  ) : (
                    <EquippedTab />
                  )}
                </div>
              </div>

              {/* Right Panel - Item Details */}
              <div className="hidden lg:block">
                <div className="medieval-border bg-card/90 backdrop-blur-sm p-4 md:p-6 rounded-sm lg:sticky lg:top-[120px]">
                  <ItemDetailPanel />
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </EquipmentProvider>
  );
}
