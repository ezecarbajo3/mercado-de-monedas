import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { GradingBadge } from '../components/GradingBadge';
import { useCurrency } from '../context/CurrencyContext';
import {
  MapPin,
  ShieldCheck,
  Handshake,
  ShoppingBag,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Package,
  Clock,
  Calendar,
  Share2,
  Lock,
  Layers,
  Award,
  Truck
} from 'lucide-react';

interface CoinDetailViewProps {
  coin: CoinListing;
  allListings: CoinListing[];
  onBack: () => void;
  onSelectCoin: (coin: CoinListing) => void;
  onOpenOffer: (coin: CoinListing) => void;
  onOpenGradingGuide: (grade?: any) => void;
  onOpenParqueModal: () => void;
}

export const CoinDetailView: React.FC<CoinDetailViewProps> = ({
  coin,
  allListings,
  onBack,
  onSelectCoin,
  onOpenOffer,
  onOpenGradingGuide,
  onOpenParqueModal
}) => {
  const { formatDualPrice, activeCurrency } = useCurrency();
  const [activePhoto, setActivePhoto] = useState<'obverse' | 'reverse' | 'edge'>('obverse');
  const [selectedDelivery, setSelectedDelivery] = useState<'parque' | 'correo'>('parque');
  const [buySuccess, setBuySuccess] = useState<boolean>(false);

  const dualPrice = formatDualPrice(coin.basePrice, coin.baseCurrency);

  // Other sellers for the same coin catalog or similar title
  const otherSellersListings = allListings.filter(
    l => l.id !== coin.id && (l.catalogId === coin.catalogId || l.faceValue === coin.faceValue)
  );

  const handleDirectBuy = () => {
    setBuySuccess(true);
    setTimeout(() => setBuySuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span>{coin.country}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{coin.year}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-300">{coin.kmReference || 'Ref'}</span>
        </div>
      </div>

      {/* Main Grid: Left Photos & Right Purchase Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: HD Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-zinc-950/90 border border-zinc-800 p-6 flex items-center justify-center overflow-hidden shadow-xl group">
            <img
              src={
                activePhoto === 'obverse'
                  ? coin.photos.obverse
                  : activePhoto === 'reverse'
                  ? coin.photos.reverse
                  : coin.photos.edge || coin.photos.obverse
              }
              alt={coin.title}
              className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-110 transition-transform duration-500"
            />

            {/* Photo Type Indicator */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur text-xs font-mono text-amber-300 border border-amber-500/20">
              {activePhoto === 'obverse' ? 'Vista: Anverso' : activePhoto === 'reverse' ? 'Vista: Reverso' : 'Vista: Canto'}
            </div>

            {/* Anti-fraud macro watermark */}
            <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-mono uppercase tracking-widest pointer-events-none">
              Mercado de Monedas • Ficha Verificada
            </div>
          </div>

          {/* Photo Selector Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setActivePhoto('obverse')}
              className={`p-2 rounded-2xl bg-zinc-900 border flex flex-col items-center gap-1 transition-all ${
                activePhoto === 'obverse' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <img src={coin.photos.obverse} alt="Anverso" className="w-12 h-12 object-contain rounded" />
              <span className="text-[11px] font-semibold text-zinc-300">Anverso</span>
            </button>

            <button
              onClick={() => setActivePhoto('reverse')}
              className={`p-2 rounded-2xl bg-zinc-900 border flex flex-col items-center gap-1 transition-all ${
                activePhoto === 'reverse' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <img src={coin.photos.reverse} alt="Reverso" className="w-12 h-12 object-contain rounded" />
              <span className="text-[11px] font-semibold text-zinc-300">Reverso</span>
            </button>

            {coin.photos.edge ? (
              <button
                onClick={() => setActivePhoto('edge')}
                className={`p-2 rounded-2xl bg-zinc-900 border flex flex-col items-center gap-1 transition-all ${
                  activePhoto === 'edge' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <img src={coin.photos.edge} alt="Canto" className="w-12 h-12 object-contain rounded" />
                <span className="text-[11px] font-semibold text-zinc-300">Canto</span>
              </button>
            ) : (
              <div className="p-2 rounded-2xl bg-zinc-900/40 border border-zinc-800/40 flex flex-col items-center justify-center text-zinc-600 text-[11px]">
                Sin foto de canto
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing, Specs, Seller & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GradingBadge
                grade={coin.grade}
                showHelpIcon
                onOpenGradingGuide={() => onOpenGradingGuide(coin.grade)}
                size="lg"
              />
              {coin.kmReference && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {coin.kmReference}
                </span>
              )}
              {coin.cjReference && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {coin.cjReference}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 font-numismatic">
              {coin.title}
            </h1>

            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              {coin.publicComment}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">Precio de Publicación</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                  {dualPrice.primaryText}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-mono">
                  {dualPrice.secondaryText}
                </div>
              </div>

              {coin.acceptsOffers && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Acepta Ofertas
                </span>
              )}
            </div>

            {/* Delivery Option Selector */}
            <div className="space-y-2 pt-3 border-t border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Método de Entrega / Retiro
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {coin.allowsParqueRivadavia && (
                  <button
                    type="button"
                    onClick={() => setSelectedDelivery('parque')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedDelivery === 'parque'
                        ? 'bg-emerald-950/40 border-emerald-500 text-zinc-100 ring-1 ring-emerald-500/50'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-emerald-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Retiro en Parque Rivadavia</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      {coin.seller.parqueFrequency} (Costo $0)
                    </div>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedDelivery('correo')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedDelivery === 'correo'
                      ? 'bg-amber-950/40 border-amber-500 text-zinc-100 ring-1 ring-amber-500/50'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-400">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Envío por Correo</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    Andreani / Correo Argentino a todo el país
                  </div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDirectBuy}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Comprar Ahora</span>
              </button>

              {coin.acceptsOffers && (
                <button
                  type="button"
                  onClick={() => onOpenOffer(coin)}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-sm flex items-center justify-center gap-2 border border-zinc-700 transition-all"
                >
                  <Handshake className="w-4 h-4 text-amber-400" />
                  <span>Hacer una Oferta</span>
                </button>
              )}
            </div>

            {buySuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs text-center font-bold animate-pulse">
                ¡Orden iniciada con éxito! Se reservó la pieza durante 24 horas.
              </div>
            )}
          </div>

          {/* Seller Profile & Anti-Elusion Protection */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={coin.seller.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={coin.seller.username}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-zinc-100 text-sm">{coin.seller.username}</span>
                    {coin.seller.verified && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {coin.seller.city}, {coin.seller.province} • Miembro desde {coin.seller.memberSince}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">
                  ★ {coin.seller.rating}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {coin.seller.reviewsCount} ventas
                </div>
              </div>
            </div>

            {/* Reputación Numismática Obligatoria (Sección 11.B) */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
              <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Exactitud Estado</span>
                <span className="text-xs font-bold text-emerald-400">{coin.seller.stats.conservationAccuracy}%</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Embalaje Seguro</span>
                <span className="text-xs font-bold text-emerald-400">{coin.seller.stats.packagingQuality}%</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Puntualidad</span>
                <span className="text-xs font-bold text-emerald-400">{coin.seller.stats.punctuality}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
              <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>Protección Antielusión: Los datos de contacto se liberan tras confirmar la compra.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      <section className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-zinc-100 font-numismatic">
            Ficha Técnica Numismática Oficial
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">País Emisor</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{coin.country}</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Año de Acuñación</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{coin.year}</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Valor Facial</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{coin.faceValue}</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Composición / Metal</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{coin.metal}</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Diámetro Oficial</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block font-mono">{coin.diameterMm} mm</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Peso Real</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block font-mono">{coin.weightG} g</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Referencia Catálogo</span>
            <span className="font-bold text-amber-400 text-sm mt-0.5 block font-mono">{coin.kmReference || 'Standard'}</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
            <span className="text-zinc-500 block">Grado de Conservación</span>
            <span className="font-bold text-zinc-200 text-sm mt-0.5 block">{coin.grade} (Oficial)</span>
          </div>
        </div>
      </section>

      {/* Multivendor Comparator (Section 9.C of LOGICA_DEL_PROYECTO.md) */}
      {otherSellersListings.length > 0 && (
        <section className="p-6 rounded-3xl bg-zinc-900 border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-numismatic">
                  Comparador Multivendedor: {otherSellersListings.length + 1} Vendedores Disponibles
                </h3>
                <p className="text-xs text-zinc-400">
                  Compara estados de conservación, precios y logística para esta misma moneda.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Active Listing Row */}
            <div className="p-4 rounded-2xl bg-zinc-950 border-2 border-amber-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={coin.photos.obverse} alt="" className="w-12 h-12 object-contain rounded-lg bg-zinc-900 border border-zinc-800" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-400 text-zinc-950 font-bold">Viendo Ahora</span>
                    <GradingBadge grade={coin.grade} size="sm" />
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Vendedor: <strong className="text-zinc-200">{coin.seller.username}</strong> ({coin.seller.province}) • ★ {coin.seller.rating}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <div className="text-base font-extrabold text-amber-400 font-mono">
                    {dualPrice.primaryText}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono">
                    {dualPrice.secondaryText}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Sellers Rows */}
            {otherSellersListings.map(other => {
              const otherPrice = formatDualPrice(other.basePrice, other.baseCurrency);
              return (
                <div
                  key={other.id}
                  onClick={() => onSelectCoin(other)}
                  className="p-4 rounded-2xl bg-zinc-950/70 hover:bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3">
                    <img src={other.photos.obverse} alt="" className="w-12 h-12 object-contain rounded-lg bg-zinc-900 border border-zinc-800" />
                    <div>
                      <div className="flex items-center gap-2">
                        <GradingBadge grade={other.grade} size="sm" />
                        {other.allowsParqueRivadavia && (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Parque Rivadavia
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Vendedor: <strong className="text-zinc-200 group-hover:text-amber-400 transition-colors">{other.seller.username}</strong> ({other.seller.province}) • ★ {other.seller.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-base font-extrabold text-zinc-200 group-hover:text-amber-400 font-mono transition-colors">
                        {otherPrice.primaryText}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        {otherPrice.secondaryText}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCoin(other);
                      }}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 font-bold rounded-xl text-xs transition-all"
                    >
                      Ver Ficha
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
