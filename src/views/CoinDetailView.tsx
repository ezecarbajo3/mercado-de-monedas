import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { GradingBadge } from '../components/GradingBadge';
import { useCurrency } from '../context/CurrencyContext';
import {
  MapPin,
  Handshake,
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
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

  const otherSellersListings = allListings.filter(
    l => l.id !== coin.id && (l.catalogId === coin.catalogId || l.faceValue === coin.faceValue)
  );

  const handleDirectBuy = () => {
    setBuySuccess(true);
    setTimeout(() => setBuySuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <span>{coin.country}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{coin.year}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{coin.kmReference || 'Ref'}</span>
        </div>
      </div>

      {/* Main Grid: Gallery & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative aspect-square w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-center overflow-hidden shadow-xs">
            <img
              src={
                activePhoto === 'obverse'
                  ? coin.photos.obverse
                  : activePhoto === 'reverse'
                  ? coin.photos.reverse
                  : coin.photos.edge || coin.photos.obverse
              }
              alt={coin.title}
              className="w-full h-full object-contain filter drop-shadow-sm"
            />

            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium">
              {activePhoto === 'obverse' ? 'Anverso' : activePhoto === 'reverse' ? 'Reverso' : 'Canto'}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setActivePhoto('obverse')}
              className={`p-2 rounded-xl bg-white dark:bg-zinc-900 border text-center transition-all ${
                activePhoto === 'obverse' ? 'border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100' : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <img src={coin.photos.obverse} alt="Anverso" className="w-12 h-12 object-contain mx-auto rounded" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mt-1">Anverso</span>
            </button>

            <button
              onClick={() => setActivePhoto('reverse')}
              className={`p-2 rounded-xl bg-white dark:bg-zinc-900 border text-center transition-all ${
                activePhoto === 'reverse' ? 'border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100' : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <img src={coin.photos.reverse} alt="Reverso" className="w-12 h-12 object-contain mx-auto rounded" />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mt-1">Reverso</span>
            </button>

            {coin.photos.edge ? (
              <button
                onClick={() => setActivePhoto('edge')}
                className={`p-2 rounded-xl bg-white dark:bg-zinc-900 border text-center transition-all ${
                  activePhoto === 'edge' ? 'border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100' : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <img src={coin.photos.edge} alt="Canto" className="w-12 h-12 object-contain mx-auto rounded" />
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mt-1">Canto</span>
              </button>
            ) : (
              <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                Sin foto de canto
              </div>
            )}
          </div>
        </div>

        {/* Purchase Box */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GradingBadge
                grade={coin.grade}
                showHelpIcon
                onOpenGradingGuide={() => onOpenGradingGuide(coin.grade)}
                size="md"
              />
              {coin.kmReference && (
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {coin.kmReference}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {coin.title}
            </h1>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {coin.publicComment}
            </p>
          </div>

          {/* Pricing Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">Precio Publicado</span>
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                  {dualPrice.primaryText}
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  {dualPrice.secondaryText}
                </div>
              </div>

              {coin.acceptsOffers && (
                <span className="px-2.5 py-1 rounded text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Acepta Ofertas
                </span>
              )}
            </div>

            {/* Delivery Selection */}
            <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                Forma de Entrega
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {coin.allowsParqueRivadavia && (
                  <button
                    type="button"
                    onClick={() => setSelectedDelivery('parque')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedDelivery === 'parque'
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-emerald-700 dark:text-emerald-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Parque Rivadavia</span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      {coin.seller.parqueFrequency} (Gratis)
                    </div>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedDelivery('correo')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDelivery === 'correo'
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-xs text-zinc-800 dark:text-zinc-200">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Envío por Correo</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Andreani / Correo Argentino
                  </div>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDirectBuy}
                className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Comprar Ahora</span>
              </button>

              {coin.acceptsOffers && (
                <button
                  type="button"
                  onClick={() => onOpenOffer(coin)}
                  className="w-full py-2.5 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Handshake className="w-4 h-4" />
                  <span>Hacer una Oferta</span>
                </button>
              )}
            </div>

            {buySuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs text-center font-medium">
                ¡Orden iniciada! Se reservó la pieza durante 24 horas.
              </div>
            )}
          </div>

          {/* Seller Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {coin.seller.username}
                </div>
                <div className="text-xs text-zinc-500">
                  {coin.seller.city}, {coin.seller.province}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  ★ {coin.seller.rating}
                </div>
                <div className="text-xs text-zinc-500">
                  {coin.seller.reviewsCount} ventas
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs">
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-zinc-500 block text-[11px]">Conservación</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.seller.stats.conservationAccuracy}%</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-zinc-500 block text-[11px]">Embalaje</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.seller.stats.packagingQuality}%</span>
              </div>
              <div className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-zinc-500 block text-[11px]">Puntualidad</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.seller.stats.punctuality}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <section className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-zinc-500" />
          <span>Ficha Técnica Oficial</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">País</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{coin.country}</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Año</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{coin.year}</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Denominación</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{coin.faceValue}</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Metal</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{coin.metal}</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Diámetro</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block font-mono">{coin.diameterMm} mm</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Peso</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block font-mono">{coin.weightG} g</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Referencia</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block font-mono">{coin.kmReference || '—'}</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-zinc-500 block">Conservación</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5 block">{coin.grade}</span>
          </div>
        </div>
      </section>

      {/* Multivendor Comparison */}
      {otherSellersListings.length > 0 && (
        <section className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Award className="w-4 h-4 text-zinc-600" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Otros vendedores disponibles para esta misma moneda ({otherSellersListings.length + 1})
            </h3>
          </div>

          <div className="space-y-2">
            {otherSellersListings.map(other => {
              const otherPrice = formatDualPrice(other.basePrice, other.baseCurrency);
              return (
                <div
                  key={other.id}
                  onClick={() => onSelectCoin(other)}
                  className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={other.photos.obverse} alt="" className="w-10 h-10 object-contain rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <GradingBadge grade={other.grade} size="sm" />
                        {other.allowsParqueRivadavia && (
                          <span className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3" /> Parque Rivadavia
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {other.seller.username} ({other.seller.province}) • ★ {other.seller.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {otherPrice.primaryText}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {otherPrice.secondaryText}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCoin(other);
                      }}
                      className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded text-xs"
                    >
                      Ver
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
