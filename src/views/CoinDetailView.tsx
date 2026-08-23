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
  const { formatDualPrice } = useCurrency();
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
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo</span>
        </button>

        <div className="flex items-center gap-1 font-mono">
          <span>{coin.country}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{coin.year}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{coin.kmReference || 'Ref'}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative aspect-square w-full rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex items-center justify-center overflow-hidden">
            <img
              src={
                activePhoto === 'obverse'
                  ? coin.photos.obverse
                  : activePhoto === 'reverse'
                  ? coin.photos.reverse
                  : coin.photos.edge || coin.photos.obverse
              }
              alt={coin.title}
              className="w-full h-full object-contain"
            />

            <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-mono">
              {activePhoto === 'obverse' ? 'Anverso' : activePhoto === 'reverse' ? 'Reverso' : 'Canto'}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActivePhoto('obverse')}
              className={`p-1.5 rounded-md bg-white dark:bg-zinc-900 border text-center transition-all ${
                activePhoto === 'obverse' ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <img src={coin.photos.obverse} alt="Anverso" className="w-10 h-10 object-contain mx-auto rounded" />
              <span className="text-xs text-zinc-600 dark:text-zinc-400 block mt-1">Anverso</span>
            </button>

            <button
              onClick={() => setActivePhoto('reverse')}
              className={`p-1.5 rounded-md bg-white dark:bg-zinc-900 border text-center transition-all ${
                activePhoto === 'reverse' ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <img src={coin.photos.reverse} alt="Reverso" className="w-10 h-10 object-contain mx-auto rounded" />
              <span className="text-xs text-zinc-600 dark:text-zinc-400 block mt-1">Reverso</span>
            </button>

            {coin.photos.edge ? (
              <button
                onClick={() => setActivePhoto('edge')}
                className={`p-1.5 rounded-md bg-white dark:bg-zinc-900 border text-center transition-all ${
                  activePhoto === 'edge' ? 'border-zinc-900 dark:border-zinc-100' : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <img src={coin.photos.edge} alt="Canto" className="w-10 h-10 object-contain mx-auto rounded" />
                <span className="text-xs text-zinc-600 dark:text-zinc-400 block mt-1">Canto</span>
              </button>
            ) : (
              <div className="p-1.5 rounded-md bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                Sin canto
              </div>
            )}
          </div>
        </div>

        {/* Info & Buy Box */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <GradingBadge
                grade={coin.grade}
                showHelpIcon
                onOpenGradingGuide={() => onOpenGradingGuide(coin.grade)}
                size="md"
              />
              {coin.kmReference && (
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  {coin.kmReference}
                </span>
              )}
            </div>

            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {coin.title}
            </h1>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
              {coin.publicComment}
            </p>
          </div>

          {/* Pricing & Buy */}
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-500 block">Precio</span>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                  {dualPrice.primaryText}
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  {dualPrice.secondaryText}
                </div>
              </div>

              {coin.acceptsOffers && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  Acepta Ofertas
                </span>
              )}
            </div>

            {/* Delivery Methods */}
            <div className="space-y-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                Forma de entrega disponible:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {coin.allowsParqueRivadavia ? (
                  <button
                    type="button"
                    onClick={() => setSelectedDelivery('parque')}
                    className={`p-2.5 rounded-md border text-left text-xs transition-all ${
                      selectedDelivery === 'parque'
                        ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800 font-medium'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Parque Rivadavia</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      {coin.parqueTiming || coin.seller.parqueFrequency} (Gratis)
                    </div>
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={() => setSelectedDelivery('correo')}
                  className={`p-2.5 rounded-md border text-left text-xs transition-all ${
                    selectedDelivery === 'correo'
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800 font-medium'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                    <Truck className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Envío por Correo</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    Andreani / Correo Argentino
                  </div>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleDirectBuy}
                className="w-full py-2 px-3 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-zinc-800 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Comprar</span>
              </button>

              {coin.acceptsOffers && (
                <button
                  type="button"
                  onClick={() => onOpenOffer(coin)}
                  className="w-full py-2 px-3 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium text-xs flex items-center justify-center gap-1.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 transition-colors"
                >
                  <Handshake className="w-3.5 h-3.5" />
                  <span>Hacer Oferta</span>
                </button>
              )}
            </div>

            {buySuccess && (
              <div className="p-2.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs text-center font-medium">
                Compra iniciada. Reserva activa por 24 horas.
              </div>
            )}
          </div>

          {/* Seller info */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{coin.seller.username}</span>
                <span className="text-zinc-500 block">{coin.seller.city}, {coin.seller.province}</span>
              </div>
              <div className="text-right">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">★ {coin.seller.rating}</span>
                <span className="text-[11px] text-zinc-500 block">{coin.seller.reviewsCount} ventas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Data Table */}
      <section className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Ficha Técnica
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">País</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.country}</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Año</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.year}</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Denominación</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.faceValue}</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Metal</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.metal}</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Diámetro</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">{coin.diameterMm} mm</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Peso</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">{coin.weightG} g</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Referencia</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono">{coin.kmReference || '—'}</span>
          </div>
          <div className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/40">
            <span className="text-zinc-500 block">Conservación</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{coin.grade}</span>
          </div>
        </div>
      </section>

      {/* Multivendor Comparator */}
      {otherSellersListings.length > 0 && (
        <section className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
            Otros ejemplares disponibles ({otherSellersListings.length})
          </h3>

          <div className="space-y-2">
            {otherSellersListings.map(other => {
              const otherPrice = formatDualPrice(other.basePrice, other.baseCurrency);
              return (
                <div
                  key={other.id}
                  onClick={() => onSelectCoin(other)}
                  className="p-2.5 rounded bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 cursor-pointer transition-all flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img src={other.photos.obverse} alt="" className="w-9 h-9 object-contain rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <GradingBadge grade={other.grade} size="sm" />
                        {other.allowsParqueRivadavia && (
                          <span className="text-zinc-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-600" /> Parque Rivadavia
                          </span>
                        )}
                      </div>
                      <div className="text-zinc-500 mt-0.5">
                        {other.seller.username} ({other.seller.province}) • ★ {other.seller.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {otherPrice.primaryText}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCoin(other);
                      }}
                      className="px-2.5 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded text-xs"
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
