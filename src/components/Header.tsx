import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import {
  Coins,
  Search,
  Sun,
  Moon,
  TrendingUp,
  PlusCircle,
  MapPin,
  HelpCircle,
  User,
  Menu,
  X,
  RefreshCw,
  Sparkles,
  SlidersHorizontal
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 transition-colors">
      {/* Top micro-bar: Dolar Blue Live + Hub Parque Rivadavia + Escala Link */}
      <div className="w-full bg-zinc-900/90 border-b border-zinc-800/80 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Dolar Blue live rate widget */}
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="flex items-center gap-1 font-semibold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              Dólar Blue (dolarhoy.com):
            </span>
            <span className="font-mono font-bold text-zinc-100 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
              ${dolarBlueRate.toLocaleString('es-AR')} ARS
            </span>
            <button
              onClick={refreshRate}
              title="Refrescar cotización horaria"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isUpdatingRate ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <span className="hidden md:inline text-zinc-500 text-[11px]">
              • {lastRateUpdate}
            </span>
          </div>

          {/* Quick utility links */}
          <div className="flex items-center gap-4 text-zinc-400">
            <button
              onClick={onOpenParqueModal}
              className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Hub Parque Rivadavia (Domingos)</span>
            </button>
            <button
              onClick={onOpenGradingGuide}
              className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">Escala de Conservación (PR - UNC)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-xl">
              🪙
            </div>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-zinc-100 tracking-tight font-numismatic group-hover:text-amber-400 transition-colors">
              Mercado de Monedas
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 -mt-1">
              Plataforma Numismática
            </div>
          </div>
        </div>

        {/* Smart Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
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
              placeholder="Buscar por denominación, año, metal o KM# (Ej: 8 Reales 1813 Potosí Plata)..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-900/80 border border-zinc-700/80 hover:border-zinc-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 transition-all outline-none"
            />
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dual Currency Switcher [ ARS | USD ] */}
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => toggleCurrency()}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                activeCurrency === 'ARS'
                  ? 'bg-amber-400 text-zinc-950 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ARS ($)
            </button>
            <button
              onClick={() => toggleCurrency()}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                activeCurrency === 'USD'
                  ? 'bg-amber-400 text-zinc-950 shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              USD (US$)
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-amber-400 transition-colors"
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Nav Items */}
          <button
            onClick={() => onNavigate('catalog')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              currentView === 'catalog'
                ? 'bg-zinc-800 text-amber-400 border border-zinc-700'
                : 'text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Explorador</span>
          </button>

          <button
            onClick={() => onNavigate('publish')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-all shadow-md shadow-amber-400/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Publicar Moneda</span>
            <span className="sm:hidden">Publicar</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`p-2 rounded-xl border transition-all ${
              currentView === 'profile'
                ? 'bg-zinc-800 text-amber-400 border-amber-400/50'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300'
            }`}
            title="Mi Cuenta & Onboarding"
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
            placeholder="Buscar por KM#, país, metal o año..."
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 outline-none"
          />
        </div>
      </div>
    </header>
  );
};
