import React from 'react';
import { CoinListing } from '../types/coin';
import { CoinCard } from '../components/CoinCard';
import { useCurrency } from '../context/CurrencyContext';
import {
  Sparkles,
  ShieldCheck,
  Percent,
  MapPin,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Coins,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

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
  const { formatDualPrice, activeCurrency } = useCurrency();

  const categories = [
    { title: 'Monedas Patrias', desc: '1813 - 1880', icon: '☀️', tag: 'Patria' },
    { title: 'Patacones y Siglo XIX', desc: 'Ley 1130 Oudiné', icon: '🏛️', tag: 'Siglo XIX' },
    { title: 'Oro y Plata Fina', desc: 'Onzas Troy & Bullion', icon: '✨', tag: 'Metales Nobles' },
    { title: 'Coloniales de Potosí', desc: 'Macuquinas y Reales', icon: '👑', tag: 'Colonial' },
    { title: 'Siglo XX & Bimetálicas', desc: 'Centavos y Series', icon: '🌿', tag: 'Siglo XX' },
    { title: 'Mundo & Conmemorativas', desc: 'Morgan Dollars & Proof', icon: '🌎', tag: 'Internacional' }
  ];

  const featuredListings = listings.filter(l => l.featured).slice(0, 4);
  const recentListings = listings.slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-12 lg:p-16 shadow-2xl">
        {/* Glow decorative orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>El Primer Marketplace Dedicado a la Numismática Argentina</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-100 font-numismatic tracking-tight leading-tight">
            Comprá, Vendé y Catalogá con <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Rigor Numismático</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            Olvidate de comisiones destructivas del 20% y descripciones ambiguas. Encontrá monedas clasificadas por <strong>KM#</strong>, <strong>Metal</strong>, <strong>Ceca</strong> y la <strong>Escala Oficial PR-UNC</strong> con retiro dominical en <strong>Parque Rivadavia</strong>.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Explorar Catálogo</span>
            </button>

            <button
              onClick={() => onNavigate('publish')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-sm sm:text-base border border-zinc-700 transition-all"
            >
              <span>Publicar Moneda (3-6% Comisión)</span>
            </button>
          </div>

          {/* 3 Core Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Percent className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Comisión Justa (3-6%)</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Sin márgenes abusivos ni recargos ocultos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Escala Didáctica PR-UNC</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Asistente visual con fotos de desgaste real.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">Hub Parque Rivadavia</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Retiro dominical consolidado sin costo postal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Badges */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-numismatic">
              Colecciones y Épocas
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Navegá rápidamente por los períodos numismáticos más buscados.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigate('catalog')}
              className="p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-amber-500/40 cursor-pointer transition-all hover:scale-[1.03] group space-y-1.5"
            >
              <div className="text-2xl">{cat.icon}</div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-amber-400 transition-colors font-numismatic">
                {cat.title}
              </h3>
              <p className="text-[11px] text-zinc-400">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selección de la Semana</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-numismatic mt-0.5">
              Piezas Destacadas & Rarezas
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>Explorar catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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

      {/* Interactive Logistics Feature Banner: Parque Rivadavia */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-500/30 p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>Logística Numismática Especializada</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-100 font-numismatic">
              Hub Parque Rivadavia: Retiro de Compras los Domingos
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
              ¿Comprás una moneda de $5.000 y el envío por correo te cuesta $8.000? Los vendedores de todo el país consolidan sus paquetes con comisionistas en CABA. Comprás en la web y retirás en mano en el Parque Rivadavia con tu código QR seguro.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenParqueModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-400/20 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>¿Cómo funciona el Retiro? (Simular Ticket)</span>
              </button>
              <button
                onClick={onOpenGradingGuide}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs sm:text-sm border border-zinc-700 transition-all"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Ver Asistente Didáctico de Calificación</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-zinc-950/80 rounded-2xl border border-zinc-800 p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Próxima Entrega en Parque
            </div>
            <div className="text-lg font-bold text-zinc-100 font-numismatic">
              Domingo, 10:00 a 14:00 hs
            </div>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Puestos habilitados en sector Monumento</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Inspección de la pieza en mano</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>0% sobrecosto de correo tradicional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Recent Listings Feed */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-numismatic">
              Últimas Publicaciones en la Comunidad
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Monedas recién incorporadas por vendedores verificados de todo el país.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>Ver todas las monedas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
