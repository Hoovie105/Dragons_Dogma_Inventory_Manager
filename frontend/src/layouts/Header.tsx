import React from 'react';

type TabType = 'browse' | 'equipped';
type Tab = {
  id: TabType;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function Header({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: Tab[];
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
}) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl gold-text tracking-wider">
              Dragon's Dogma
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Equipment Manager — Dark Arisen
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                        flex items-center gap-2 px-4 py-2 font-display text-sm uppercase tracking-wider
                        border-2 rounded-sm transition-all duration-200
                        ${activeTab === tab.id
                          ? 'border-primary text-primary bg-primary/10'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                        }
                      `}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
