import React, { useState } from 'react';
import { CoinListing, Currency } from '../types/coin';
import { useCurrency } from '../context/CurrencyContext';
import { X, Handshake, AlertCircle, Clock, CheckCircle, ArrowRight } from 'lucide-react';

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
    }, 800);
  };

  const handleReset = () => {
    setOfferSubmitted(false);
    setOfferAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-zinc-900 text-zinc-100 rounded-2xl border border-zinc-700/70 shadow-2xl p-6 sm:p-7">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!offerSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Handshake className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-numismatic">
                  Enviar Oferta Directa
                </h3>
                <p className="text-xs text-zinc-400">
                  Negociación ágil sin intermediarios ni comisiones abusivas.
                </p>
              </div>
            </div>

            {/* Coin Summary */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
              <img
                src={listing.photos.obverse}
                alt={listing.title}
                className="w-14 h-14 object-cover rounded-lg border border-zinc-700/50"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate text-zinc-200">{listing.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                  <span>Precio publicado:</span>
                  <span className="font-bold text-zinc-100">
                    {formatDualPrice(listing.basePrice, listing.baseCurrency).primaryText}
                  </span>
                </div>
              </div>
            </div>

            {/* Offer Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Tu Oferta en {activeCurrency}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-sm">
                  {activeCurrency === 'ARS' ? '$' : 'US$'}
                </span>
                <input
                  type="number"
                  step={activeCurrency === 'ARS' ? '100' : '1'}
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder={`Ej: ${Math.round(currentListedPrice * 0.85)}`}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-zinc-100 text-lg font-bold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  required
                />
              </div>

              {numericOffer > 0 && (
                <div className="flex items-center justify-between text-xs px-1 text-zinc-400">
                  <span>
                    Descuento propuesto:{' '}
                    <strong className={discountPercent > 0 ? 'text-amber-400' : 'text-rose-400'}>
                      {discountPercent}%
                    </strong>
                  </span>
                  {numericOffer >= currentListedPrice && (
                    <span className="text-rose-400 font-medium">La oferta debe ser menor al precio publicado</span>
                  )}
                </div>
              )}
            </div>

            {/* Rules and Limits */}
            <div className="space-y-2 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-zinc-300">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Condiciones de Negociación (Lógica Numismática)</span>
              </div>
              <ul className="space-y-1 text-zinc-400 pl-6 list-disc">
                <li>Límite de <strong>3 ofertas por comprador</strong> en esta publicación.</li>
                <li>Si el vendedor acepta, tienes <strong>24 horas de reserva exclusiva</strong> para pagar.</li>
                <li>El vendedor puede Aceptar, Contraofertar o Rechazar.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-xl transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || numericOffer <= 0 || numericOffer >= currentListedPrice}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:pointer-events-none rounded-xl transition-all shadow-lg shadow-amber-400/20"
              >
                {isSubmitting ? 'Enviando oferta...' : 'Enviar Oferta (Intento 1 de 3)'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100 font-numismatic">¡Oferta Enviada al Vendedor!</h3>
              <p className="mt-1 text-sm text-zinc-400 max-w-sm mx-auto">
                Tu oferta de <strong>{formatAmount(numericOffer, activeCurrency)}</strong> fue notificada a <strong>{listing.seller.username}</strong>.
              </p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-400 max-w-xs mx-auto">
              Te notificaremos por email y en la campana de alertas en cuanto responda.
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-sm font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
