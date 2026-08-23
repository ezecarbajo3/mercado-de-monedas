import React from 'react';
import { CoinListing } from '../types/coin';
import { CoinCard } from '../components/CoinCard';
import { ArrowRight, MapPin, HelpCircle, Shield, Coins, Percent } from 'lucide-react';

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
  onOpenParqueModal,
  onNavigate
}) => {
  const categories = [
    { title: 'Monedas Patrias', desc: '1813 - 1880' },
    { title: 'Patacones y Siglo XIX', desc: 'Ley 1130 Oudiné' },
    { title: 'Oro y Plata Fina', desc: 'Onzas Troy & Bullion' },
    { title: 'Coloniales de Potosí', desc: 'Macuquinas y Reales' },
    { title: 'Siglo XX & Bimetálicas', desc: 'Centavos y Series' },
    { title: 'Monedas del Mundo', desc: 'Morgan Dollars y Proof' }
  ];

  const featuredListings = listings.filter(l => l.featured).slice(0, 4);
  const recentListings = listings.slice(0, 8);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Hero Section */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
            <span>Numismática Argentina & Internacional</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
            El marketplace especializado para coleccionistas de monedas
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Publicá y comprá piezas clasificadas con precisión técnica (KM#, Ceca, Metal y la escala oficial PR a UNC), con comisiones justas (3% al 6%) y retiro dominical en Parque Rivadavia.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('catalog')}
              className="px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
            >
              Explorar Catálogo
            </button>
            <button
              onClick={() => onNavigate('publish')}
              className="px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-colors"
            >
              Publicar Moneda
            </button>
          </div>

          {/* 3 Core Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Comisión de 3% a 6%</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Escala Oficial PR - UNC</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Retiro en Parque Rivadavia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Categorías Numismáticas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Explorá por períodos históricos y tipos de piezas
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1"
          >
            <span>Ver todo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('catalog')}
              className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer transition-all hover:shadow-xs"
            >
              <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {cat.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Piezas Destacadas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Selección de ejemplares destacados de la comunidad
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1"
          >
            <span>Ver catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map((coin) => (
            <CoinCard
              key={coin.id}
              listing={coin}
              onSelect={onSelectCoin}
              onOpenOffer={onOpenOffer}
              onOpenGradingGuide={onOpenGradingGuide}
            />
          ))}
        </div>
      </section>

      {/* Parque Rivadavia Hub Info */}
      <section className="bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
              <span>Logística Numismática</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Retiro Dominical en Parque Rivadavia (CABA)
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Vendedores de todo el país consolidan envíos hacia puestos de confianza en el Parque Rivadavia. Comprás en la plataforma y retirás en mano los domingos de 10:00 a 14:00 hs sin pagar envíos caros de correo.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenParqueModal}
                className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Ver cómo funciona el ticket de retiro
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="font-bold text-zinc-900 dark:text-zinc-100">Próxima Entrega</div>
            <div>Domingo de 10:00 a 14:00 hs</div>
            <div className="text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              Sector Monumento • Puestos habilitados
            </div>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Últimas Publicaciones
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Monedas publicadas recientemente por vendedores verificados
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 inline-flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentListings.map((coin) => (
            <CoinCard
              key={coin.id}
              listing={coin}
              onSelect={onSelectCoin}
              onOpenOffer={onOpenOffer}
              onOpenGradingGuide={onOpenGradingGuide}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
