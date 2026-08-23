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
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-zinc-500 text-xs mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>🪙</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Mercado de Monedas</span>
          <span>— Catálogo y compraventa numismática</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('catalog')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Catálogo
          </button>
          <button onClick={onOpenGradingGuide} className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Escala de Conservación
          </button>
          <button onClick={onOpenParqueModal} className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Parque Rivadavia
          </button>
          <button onClick={() => onNavigate('publish')} className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Publicar
          </button>
        </div>
      </div>
    </footer>
  );
};
