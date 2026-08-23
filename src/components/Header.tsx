import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Sun, Moon, Plus, User } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'catalog' | 'detail' | 'publish' | 'profile';
  onNavigate: (view: 'home' | 'catalog' | 'publish' | 'profile') => void;
  onOpenGradingGuide: () => void;
  onOpenParqueModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenGradingGuide,
  onOpenParqueModal,
  searchQuery,
  onSearchChange
}) => {
  const { activeCurrency, toggleCurrency, dolarBlueRate, refreshRate, isUpdatingRate } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      {/* Top micro bar */}
      <div className="w-full border-b border-zinc-100 dark:border-zinc-800/80 px-4 py-1 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Dólar Blue:</span>
            <button
              onClick={refreshRate}
              className="font-mono font-medium text-zinc-800 dark:text-zinc-200 hover:underline cursor-pointer"
              title="Actualizar cotización"
            >
              ${dolarBlueRate.toLocaleString('es-AR')} ARS
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenParqueModal}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Parque Rivadavia
            </button>
            <button
              onClick={onOpenGradingGuide}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Escala de Conservación
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <span className="text-xl">🪙</span>
          <span className="font-semibold text-base text-zinc-900 dark:text-zinc-100 tracking-tight">
            Mercado de Monedas
          </span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'catalog' && e.target.value.trim() !== '') {
                  onNavigate('catalog');
                }
              }}
              placeholder="Buscar por país, año, metal o KM#..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md p-0.5 text-xs font-medium">
            <button
              onClick={() => toggleCurrency()}
              className={`px-2 py-0.5 rounded transition-all ${
                activeCurrency === 'ARS'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              ARS
            </button>
            <button
              onClick={() => toggleCurrency()}
              className={`px-2 py-0.5 rounded transition-all ${
                activeCurrency === 'USD'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              USD
            </button>
          </div>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Links */}
          <button
            onClick={() => onNavigate('catalog')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              currentView === 'catalog'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
            }`}
          >
            Catálogo
          </button>

          <button
            onClick={() => onNavigate('publish')}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publicar</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`p-1.5 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${
              currentView === 'profile' ? 'bg-zinc-100 dark:bg-zinc-800' : ''
            }`}
            title="Perfil"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
