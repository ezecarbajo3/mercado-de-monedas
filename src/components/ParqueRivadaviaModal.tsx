import React, { useState } from 'react';
import { X, MapPin, QrCode, Calendar, CheckCircle2 } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-2.5 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Retiro en Parque Rivadavia (CABA)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Circuito dominical de entrega presencial sin costos de envío por correo
            </p>
          </div>
        </div>

        {!ticketGenerated ? (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <div className="font-bold text-zinc-800 dark:text-zinc-200">1. Compra en la web</div>
                <div className="text-zinc-500">Seleccionás la opción 'Retiro en Parque Rivadavia'.</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <div className="font-bold text-zinc-800 dark:text-zinc-200">2. Consolidación</div>
                <div className="text-zinc-500">El vendedor envía la pieza al comisionista del puesto.</div>
              </div>
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-1">
                <div className="font-bold text-zinc-800 dark:text-zinc-200">3. Retiro el domingo</div>
                <div className="text-zinc-500">Presentás tu código de retiro de 10:00 a 14:00 hs.</div>
              </div>
            </div>

            {listing && (
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-zinc-800 dark:text-zinc-200">{listing.title}</div>
                  <div className="text-zinc-500">Vendedor: {listing.seller.username} ({listing.seller.province})</div>
                </div>
                <div className="font-bold text-zinc-900 dark:text-zinc-100">
                  {formatDualPrice(listing.basePrice, listing.baseCurrency).primaryText}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => setTicketGenerated(true)}
                className="px-4 py-2 text-xs font-semibold text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded-lg"
              >
                Ver ejemplo de Ticket de Retiro
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase">Ticket #RIV-2026-9842</span>
                  <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                    {listing ? listing.title : '50 Centavos 1941 Libertad (UNC)'}
                  </div>
                </div>

                <div className="w-16 h-16 bg-white border border-zinc-300 dark:border-zinc-700 rounded-lg p-1 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-zinc-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-zinc-500 block">Horario de retiro</span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">Domingo 10:00 a 14:00 hs</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Puesto asignado</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">Puesto #14 (Monumento)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">PIN de seguridad</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">8492-RIV</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Estado</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Listo para entrega</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTicketGenerated(false)}
                className="px-3.5 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              >
                ← Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
