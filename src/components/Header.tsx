import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  Sun,
  Moon,
  Plus,
  MapPin,
  HelpCircle,
  User,
  RefreshCw
} from 'lucide-react';

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
  const { activeCurrency, toggleCurrency, dolarBlueRate, lastRateUpdate, isUpdatingRate, refreshRate } = useCurrency();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-xs">
      {/* Top Utility Bar */}
      <div className="w-full bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-1.5 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Dolar Blue live rate */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Dólar Blue:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              ${dolarBlueRate.toLocaleString('es-AR')}
            </span>
            <button
              onClick={refreshRate}
              title="Actualizar cotización"
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isUpdatingRate ? 'animate-spin text-zinc-800 dark:text-zinc-200' : ''}`} />
            </button>
            <span className="hidden sm:inline text-zinc-400">• {lastRateUpdate}</span>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenParqueModal}
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Retiro en Parque Rivadavia</span>
            </button>
            <button
              onClick={onOpenGradingGuide}
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Escala de Conservación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <span className="text-2xl">🪙</span>
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              Mercado de Monedas
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Coleccionismo & Numismática
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== 'catalog' && e.target.value.trim() !== '') {
                  onNavigate('catalog');
                }
              }}
              placeholder="Buscar por nombre, país, metal, año o KM#..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle [ ARS | USD ] */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1">
            <button
              onClick={() => toggleCurrency()}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                activeCurrency === 'ARS'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              ARS ($)
            </button>
            <button
              onClick={() => toggleCurrency()}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                activeCurrency === 'USD'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              USD (US$)
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Navigation Links */}
          <button
            onClick={() => onNavigate('catalog')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
              currentView === 'catalog'
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Explorar
          </button>

          <button
            onClick={() => onNavigate('publish')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Publicar</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`p-2 rounded-lg border transition-colors ${
              currentView === 'profile'
                ? 'bg-zinc-200 dark:bg-zinc-800 border-zinc-400 text-zinc-900 dark:text-zinc-100'
                : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'
            }`}
            title="Mi Perfil"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
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
            placeholder="Buscar monedas..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 outline-none"
          />
        </div>
      </div>
    </header>
  );
};
