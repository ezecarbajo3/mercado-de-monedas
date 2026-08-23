import React from 'react';
import { Coins, ShieldCheck, MapPin, Handshake, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenGradingGuide: () => void;
  onOpenParqueModal: () => void;
  onNavigate: (view: 'home' | 'catalog' | 'publish' | 'profile') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGradingGuide,
  onOpenParqueModal,
  onNavigate
}) => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-sm mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-zinc-950 font-bold">
                🪙
              </div>
              <span className="text-lg font-black text-zinc-100 font-numismatic">
                Mercado de Monedas
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              El marketplace numismático creado por y para coleccionistas. Comisiones justas (3-6%), rigor técnico absoluto y logística comunitaria.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Protección Antielusión y Reputación</span>
            </div>
          </div>

          {/* Col 2: Exploración */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-numismatic">
              Catálogo & Filtros
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  Monedas Patrias Argentinas (1813)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  Patacones y Siglo XIX (Ley 1130)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  Oro & Plata de Inversión (Onzas Troy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  Monedas Coloniales de Potosí y Lima
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  Series Conmemorativas y Bimetálicas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Herramientas & Logística */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-numismatic">
              Ecosistema Numismático
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenGradingGuide} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Guía Didáctica de Conservación (PR - UNC)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenParqueModal} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hub Logístico Parque Rivadavia</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('publish')} className="hover:text-amber-400 transition-colors">
                  Carga Masiva vía Excel (.xlsx / .csv)
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Integración con Catálogo Numista (KM#)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparencia & Monetización */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-numismatic">
              Monetización Transparente
            </h4>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-300">
                <span>Comisión por Venta:</span>
                <strong className="text-emerald-400 font-mono">3% - 6%</strong>
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Contra el 15%-25% de plataformas tradicionales. Las piezas caras pagan proporcionalmente y las económicas centavos.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 Mercado de Monedas — Arquitectura v1.1.0. Desarrollado para la numismática argentina.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidad de Datos</span>
            <span>Términos del Coleccionista</span>
            <span>API Dólar Blue (dolarhoy.com)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
