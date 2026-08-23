import React from 'react';

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
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-zinc-100">
              <span>🪙</span>
              <span>Mercado de Monedas</span>
            </div>
            <p className="text-zinc-500 leading-relaxed">
              Plataforma y catálogo numismático para coleccionistas. Comisiones reducidas (3% al 6%), rigor técnico y retiro dominical en Parque Rivadavia.
            </p>
          </div>

          {/* Catálogo */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wider">
              Explorar Catálogo
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Monedas Patrias (1813)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Patacones y Siglo XIX
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Oro y Plata de Inversión
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Coloniales de Potosí
                </button>
              </li>
            </ul>
          </div>

          {/* Guías & Logística */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wider">
              Herramientas
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenGradingGuide} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Guía de Conservación (PR - UNC)
                </button>
              </li>
              <li>
                <button onClick={onOpenParqueModal} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Hub Parque Rivadavia
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('publish')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Publicador de Monedas
                </button>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs uppercase tracking-wider">
              Transparencia
            </h4>
            <p className="text-zinc-500 leading-relaxed">
              Cotización de referencia tomada de DolarHoy. Precios en pesos con conversión transparente.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400">
          <div>© 2026 Mercado de Monedas. Todos los derechos reservados.</div>
          <div>Numismática Argentina</div>
        </div>
      </div>
    </footer>
  );
};
