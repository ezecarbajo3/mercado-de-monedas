import React, { useState } from 'react';
import { User, ShieldCheck, MapPin, Globe, Award, CheckCircle2, Sliders, Sparkles, Lock, Package } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [marketScope, setMarketScope] = useState<'national' | 'international'>('national');
  const [parqueOption, setParqueOption] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Profile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 text-2xl font-bold">
            👤
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-100 font-numismatic">
                ColeccionistaDemo
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Cuenta Unificada (Comprador / Vendedor)
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>CABA (Caballito), Buenos Aires, Argentina • Miembro desde 2024</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-zinc-500 block">Reputación Global</span>
            <span className="text-lg font-bold text-amber-400">★ 4.98 / 5.0</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span><strong>¡Preferencias actualizadas con éxito!</strong> El filtro del catálogo se adaptó a tu configuración.</span>
        </div>
      )}

      {/* Onboarding Bipolar Selector (Section 2.B of LOGICA_DEL_PROYECTO.md) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Globe className="w-5 h-5 text-amber-400" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-100 font-numismatic">
              Alcance de Mercado y Preferencias de Onboarding
            </h2>
            <p className="text-xs text-zinc-400">
              ¿Qué monedas te interesa ver y comprar de manera predeterminada?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMarketScope('national')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              marketScope === 'national'
                ? 'bg-amber-950/30 border-amber-400 text-zinc-100 ring-2 ring-amber-400/30'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🇦🇷</span>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${marketScope === 'national' ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-700'}`}>
                {marketScope === 'national' && '✓'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-100">Solo Vendedores de Argentina (Nacional)</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Oculta publicaciones extranjeras para priorizar transacciones en ARS/USD locales y entrega en Parque Rivadavia.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMarketScope('international')}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              marketScope === 'international'
                ? 'bg-amber-950/30 border-amber-400 text-zinc-100 ring-2 ring-amber-400/30'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🌎</span>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${marketScope === 'international' ? 'border-amber-400 bg-amber-400 text-zinc-950' : 'border-zinc-700'}`}>
                {marketScope === 'international' && '✓'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-100">Vendedores de Argentina e Internacionales</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Muestra piezas de subastas y coleccionistas del resto del mundo (EE.UU., España, Europa).
            </p>
          </button>
        </div>
      </section>

      {/* Community Numismatic Reputation (Section 11.B) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
          <Award className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-100 font-numismatic">
              Métricas de Reputación Numismática Específica
            </h2>
            <p className="text-xs text-zinc-400">
              Evaluación comunitaria obligatoria para garantizar transparencia y rigor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 font-semibold block">1. Exactitud de Conservación</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono">100%</div>
            <p className="text-[11px] text-zinc-500">
              El estado de la pieza coincidió exactamente con el grado declarado (PR-UNC).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 font-semibold block">2. Embalaje Numismático</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono">99.4%</div>
            <p className="text-[11px] text-zinc-500">
              Piezas protegidas en cartones o cápsulas sin riesgo de rayaduras.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <span className="text-xs text-zinc-400 font-semibold block">3. Puntualidad y Entrega</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono">98.8%</div>
            <p className="text-[11px] text-zinc-500">
              Cumplimiento estricto en puestos de Parque Rivadavia y despachos de correo.
            </p>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="px-8 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02]"
        >
          Guardar Cambios de Perfil
        </button>
      </div>
    </div>
  );
};
