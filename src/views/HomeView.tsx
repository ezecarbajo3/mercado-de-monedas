import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { CoinCard } from '../components/CoinCard';
import { ArrowRight } from 'lucide-react';

interface HomeViewProps {
  listings: CoinListing[];
  onSelectCoin: (coin: CoinListing) => void;
  onOpenOffer: (coin: CoinListing) => void;
  onOpenGradingGuide: (grade?: any) => void;
  onOpenParqueModal: () => void;
  onNavigate: (view: 'home' | 'catalog' | 'publish' | 'profile') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  listings,
  onSelectCoin,
  onOpenOffer,
  onOpenGradingGuide,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', name: 'Todas' },
    { id: 'PATRIA', name: 'Monedas Patrias (1813)' },
    { id: 'PATACON', name: 'Patacones y Siglo XIX' },
    { id: 'ORO_PLATA', name: 'Oro y Plata Fina' },
    { id: 'COLONIAL', name: 'Coloniales' },
    { id: 'SIGLO_XX', name: 'Siglo XX' },
    { id: 'MUNDO', name: 'Internacionales' }
  ];

  const filteredListings = listings.filter(item => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'PATRIA') return item.year === 1813 || item.title.includes('Patria');
    if (activeCategory === 'PATACON') return item.title.includes('Patacón') || item.year === 1881;
    if (activeCategory === 'ORO_PLATA') return item.metal.includes('Oro') || item.metal.includes('Plata');
    if (activeCategory === 'COLONIAL') return Number(item.year) < 1810;
    if (activeCategory === 'SIGLO_XX') return Number(item.year) >= 1900 && Number(item.year) < 2000;
    if (activeCategory === 'MUNDO') return item.country !== 'Argentina';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-zinc-200 dark:border-zinc-800 text-xs">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Listings Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{filteredListings.length} publicaciones disponibles</span>
          <button
            onClick={() => onNavigate('catalog')}
            className="font-medium text-zinc-800 dark:text-zinc-200 hover:underline inline-flex items-center gap-1"
          >
            <span>Ver con filtros avanzados</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredListings.map(coin => (
            <CoinCard
              key={coin.id}
              listing={coin}
              onSelect={onSelectCoin}
              onOpenOffer={onOpenOffer}
              onOpenGradingGuide={onOpenGradingGuide}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
