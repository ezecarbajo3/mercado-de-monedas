import React, { useState } from 'react';
import { User, MapPin, Globe, Award, CheckCircle2 } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [marketScope, setMarketScope] = useState<'national' | 'international'>('national');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Profile */}
      <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-lg">
            👤
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                ColeccionistaDemo
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                Comprador / Vendedor
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              CABA (Caballito), Buenos Aires • Miembro desde 2024
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-zinc-500 block">Calificación</span>
          <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">★ 4.98 / 5.0</span>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Preferencias guardadas con éxito.</span>
        </div>
      )}

      {/* Onboarding Scope */}
      <section className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Preferencia de Catálogo y Origen
          </h2>
          <p className="text-xs text-zinc-500">
            ¿Qué publicaciones te interesa priorizar en la búsqueda?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMarketScope('national')}
            className={`p-4 rounded-xl border text-left transition-all ${
              marketScope === 'national'
                ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 ring-1 ring-zinc-900 dark:ring-zinc-100'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Solo Vendedores de Argentina (Nacional)</div>
            <p className="text-xs text-zinc-500 mt-1">
              Prioriza compras en ARS/USD locales y entregas en Parque Rivadavia.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMarketScope('international')}
            className={`p-4 rounded-xl border text-left transition-all ${
              marketScope === 'international'
                ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 ring-1 ring-zinc-900 dark:ring-zinc-100'
                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Nacional e Internacional</div>
            <p className="text-xs text-zinc-500 mt-1">
              Muestra piezas de coleccionistas y subastas del resto del mundo.
            </p>
          </button>
        </div>
      </section>

      {/* Numismatic Reputation */}
      <section className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Reputación Comunitaria
          </h2>
          <p className="text-xs text-zinc-500">
            Métricas registradas por compradores tras las entregas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
            <span className="text-zinc-500 block">Exactitud del Grado</span>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">100%</div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Sin discrepancias de conservación</p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
            <span className="text-zinc-500 block">Calidad de Embalaje</span>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">99.4%</div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Cápsulas y cartones protectores</p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
            <span className="text-zinc-500 block">Puntualidad</span>
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">98.8%</div>
            <p className="text-[11px] text-zinc-500 mt-0.5">Entregas en fecha pactada</p>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};
