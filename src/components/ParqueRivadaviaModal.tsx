import React, { useState } from 'react';
import { X, MapPin, QrCode, Calendar, ShieldCheck, CheckCircle2, Package, Sparkles } from 'lucide-react';
import { CoinListing } from '../types/coin';
import { useCurrency } from '../context/CurrencyContext';

interface ParqueRivadaviaModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing?: CoinListing;
}

export const ParqueRivadaviaModal: React.FC<ParqueRivadaviaModalProps> = ({
  isOpen,
  onClose,
  listing
}) => {
  const { formatDualPrice } = useCurrency();
  const [ticketGenerated, setTicketGenerated] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateTicket = () => {
    setTicketGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-900 text-zinc-100 rounded-2xl border border-zinc-700/70 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 pb-4 border-b border-zinc-800">
          <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MapPin className="w-6 h-6" />
          </span>
          <div>
            <div className="inline-flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-100 font-numismatic">
                Hub Logístico "Parque Rivadavia"
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                0% Comisión de Correo
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              El corazón histórico de la numismática argentina integrado a la plataforma digital.
            </p>
          </div>
        </div>

        {!ticketGenerated ? (
          <div className="mt-6 space-y-6">
            {/* Explanatory cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wide">Consolidación</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Vendedores de todo el país consolidan paquetes con comisionistas hacia CABA.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wide">Domingos en el Parque</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Retiro directo en el puesto de confianza del Parque Rivadavia de 10 a 14 hs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wide">QR Seguro</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Presentas tu código en mano, revisas tu pieza numismática y confirmas la entrega.
                </p>
              </div>
            </div>

            {/* Listing context if present */}
            {listing && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={listing.photos.obverse}
                    alt={listing.title}
                    className="w-12 h-12 object-cover rounded-lg border border-zinc-700"
                  />
                  <div>
                    <h5 className="text-sm font-semibold text-zinc-200">{listing.title}</h5>
                    <p className="text-xs text-zinc-400">
                      Vendedor: <strong>{listing.seller.username}</strong> ({listing.seller.province}) — Frecuencia: <span className="text-emerald-400">{listing.seller.parqueFrequency}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Total a retirar</div>
                  <div className="text-sm font-bold text-amber-400">
                    {formatDualPrice(listing.basePrice, listing.baseCurrency).primaryText}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 bg-zinc-800 rounded-xl"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={handleGenerateTicket}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-400/20 transition-all"
              >
                <QrCode className="w-4 h-4" />
                Simular Emisión de Ticket de Retiro
              </button>
            </div>
          </div>
        ) : (
          /* Ticket View */
          <div className="mt-6 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border-2 border-dashed border-emerald-500/40 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                    TICKET DE RETIRO OFICIAL #RIV-2026-9842
                  </div>
                  <h4 className="text-xl font-bold text-zinc-100 font-numismatic mt-1">
                    {listing ? listing.title : '50 Centavos 1941 Libertad (UNC)'}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Próximo Domingo: <strong>10:00 a 14:00 hs</strong></span>
                  </div>
                </div>

                {/* Simulated QR Code Box */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-lg shrink-0">
                  <div className="w-24 h-24 bg-zinc-900 rounded-lg p-2 flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-white" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-900 font-bold mt-1">
                    PIN: 8492-RIV
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Comprador</span>
                  <span className="font-semibold text-zinc-200">ColeccionistaDemo</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Vendedor Origen</span>
                  <span className="font-semibold text-zinc-200">{listing ? listing.seller.username : 'NumismaticaMardel'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Puesto Designado</span>
                  <span className="font-semibold text-emerald-400">Puesto #14 (Monumento)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Estado del Envío</span>
                  <span className="font-semibold text-blue-400 flex items-center gap-1">
                    <Package className="w-3 h-3" /> Consolidado en Camino
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Entrega protegida por Mercado de Monedas
              </span>
              <button
                type="button"
                onClick={() => setTicketGenerated(false)}
                className="text-xs text-amber-400 hover:underline"
              >
                ← Volver a información general
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
