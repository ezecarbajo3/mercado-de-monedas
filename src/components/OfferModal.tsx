import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { useCurrency } from '../context/CurrencyContext';
import { X, Handshake, CheckCircle } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: CoinListing;
}

export const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  listing
}) => {
  const { activeCurrency, convertAmount, formatAmount, formatDualPrice } = useCurrency();
  const [offerAmount, setOfferAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [offerSubmitted, setOfferSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentListedPrice = activeCurrency === listing.baseCurrency
    ? listing.basePrice
    : convertAmount(listing.basePrice, listing.baseCurrency, activeCurrency);

  const numericOffer = parseFloat(offerAmount) || 0;
  const discountPercent = currentListedPrice > 0 && numericOffer > 0
    ? Math.round(((currentListedPrice - numericOffer) / currentListedPrice) * 100)
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericOffer <= 0 || numericOffer >= currentListedPrice) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOfferSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setOfferSubmitted(false);
    setOfferAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {!offerSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <Handshake className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Enviar Oferta al Vendedor
                </h3>
                <p className="text-xs text-zinc-500">
                  Propuesta directa de compra
                </p>
              </div>
            </div>

            {/* Coin Summary */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <img
                src={listing.photos.obverse}
                alt={listing.title}
                className="w-12 h-12 object-contain rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100">{listing.title}</h4>
                <div className="text-xs text-zinc-500 mt-0.5">
                  Publicado: <strong className="text-zinc-800 dark:text-zinc-200">{formatDualPrice(listing.basePrice, listing.baseCurrency).primaryText}</strong>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Tu Oferta en {activeCurrency}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">
                  {activeCurrency === 'ARS' ? '$' : 'US$'}
                </span>
                <input
                  type="number"
                  step={activeCurrency === 'ARS' ? '100' : '1'}
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder={`Ej: ${Math.round(currentListedPrice * 0.9)}`}
                  className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  required
                />
              </div>

              {numericOffer > 0 && (
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Descuento sugerido: <strong>{discountPercent}%</strong></span>
                  {numericOffer >= currentListedPrice && (
                    <span className="text-rose-600">Debe ser menor al precio publicado</span>
                  )}
                </div>
              )}
            </div>

            {/* Rules */}
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <div>• Límite de <strong>3 ofertas por comprador</strong> en esta publicación.</div>
              <div>• Si el vendedor acepta, tendrás <strong>24 horas</strong> para abonar.</div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || numericOffer <= 0 || numericOffer >= currentListedPrice}
                className="px-4 py-2 text-xs font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg disabled:opacity-40"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Oferta (1 de 3)'}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="w-10 h-10 mx-auto text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Oferta Enviada</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Se notificó tu oferta de <strong>{formatAmount(numericOffer, activeCurrency)}</strong> a {listing.seller.username}.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
