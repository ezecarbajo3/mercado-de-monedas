import React, { useState, useMemo } from 'react';
import { CoinListing, GradingGrade } from '../types/coin';
import { CoinCard } from '../components/CoinCard';
import { GRADING_ORDER, GRADING_SCALE } from '../data/gradingData';
import { useCurrency } from '../context/CurrencyContext';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  LayoutGrid,
  List,
  MapPin,
  Handshake,
  ChevronDown
} from 'lucide-react';
import { GradingBadge } from '../components/GradingBadge';

interface CatalogViewProps {
  listings: CoinListing[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCoin: (coin: CoinListing) => void;
  onOpenOffer: (coin: CoinListing) => void;
  onOpenGradingGuide: (grade?: any) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  listings,
  searchQuery,
  onSearchChange,
  onSelectCoin,
  onOpenOffer,
  onOpenGradingGuide
}) => {
  const { activeCurrency, convertAmount, formatDualPrice } = useCurrency();

  // Filter state
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedMetal, setSelectedMetal] = useState<string>('ALL');
  const [selectedMinGrade, setSelectedMinGrade] = useState<GradingGrade | 'ALL'>('ALL');
  const [onlyOffers, setOnlyOffers] = useState<boolean>(false);
  const [onlyParque, setOnlyParque] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'year_asc' | 'year_desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Dynamic filter lists from data
  const countries = useMemo(() => ['ALL', ...Array.from(new Set(listings.map(l => l.country)))], [listings]);
  const metals = useMemo(() => ['ALL', ...Array.from(new Set(listings.map(l => l.metal)))], [listings]);
  const provinces = useMemo(() => ['ALL', ...Array.from(new Set(listings.map(l => l.seller.province)))], [listings]);

  const handleResetFilters = () => {
    onSearchChange('');
    setSelectedCountry('ALL');
    setSelectedMetal('ALL');
    setSelectedMinGrade('ALL');
    setOnlyOffers(false);
    setOnlyParque(false);
    setSelectedProvince('ALL');
    setSortBy('newest');
  };

  // Filter logic
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const fullText = `${item.title} ${item.country} ${item.year} ${item.metal} ${item.kmReference || ''} ${item.publicComment}`.toLowerCase();
        if (!fullText.includes(q)) return false;
      }

      // Country
      if (selectedCountry !== 'ALL' && item.country !== selectedCountry) {
        return false;
      }

      // Metal
      if (selectedMetal !== 'ALL' && item.metal !== selectedMetal) {
        return false;
      }

      // Grade Min
      if (selectedMinGrade !== 'ALL') {
        const itemOrder = GRADING_SCALE[item.grade]?.order || 0;
        const minOrder = GRADING_SCALE[selectedMinGrade]?.order || 0;
        if (itemOrder < minOrder) return false;
      }

      // Offers
      if (onlyOffers && !item.acceptsOffers) {
        return false;
      }

      // Parque Rivadavia
      if (onlyParque && !item.allowsParqueRivadavia) {
        return false;
      }

      // Province
      if (selectedProvince !== 'ALL' && item.seller.province !== selectedProvince) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.baseCurrency === activeCurrency ? a.basePrice : convertAmount(a.basePrice, a.baseCurrency, activeCurrency);
      const priceB = b.baseCurrency === activeCurrency ? b.basePrice : convertAmount(b.basePrice, b.baseCurrency, activeCurrency);

      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'year_asc') return Number(a.year) - Number(b.year);
      if (sortBy === 'year_desc') return Number(b.year) - Number(a.year);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    listings,
    searchQuery,
    selectedCountry,
    selectedMetal,
    selectedMinGrade,
    onlyOffers,
    onlyParque,
    selectedProvince,
    sortBy,
    activeCurrency,
    convertAmount
  ]);

  return (
    <div className="space-y-6">
      {/* Header and Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Catálogo & Explorador Numismático
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Buscá monedas por metal, año, estado de conservación y opciones de retiro
          </p>
        </div>

        {/* View Switcher & Sorting */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 py-2 pl-3 pr-8 rounded-lg outline-none cursor-pointer focus:ring-1 focus:ring-zinc-400"
            >
              <option value="newest">Más recientes</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
              <option value="year_asc">Año: Más antiguo</option>
              <option value="year_desc">Año: Más moderno</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Vista en Grilla"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
              }`}
              title="Vista en Tabla"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 space-y-5 sticky top-24 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
              <span>Filtros</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          </div>

          {/* Search Term */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Búsqueda
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Denominación, KM#..."
                className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              País
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 outline-none"
            >
              <option value="ALL">Todos los países</option>
              {countries.filter(c => c !== 'ALL').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Metal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Metal / Composición
            </label>
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 outline-none"
            >
              <option value="ALL">Todos los metales</option>
              {metals.filter(m => m !== 'ALL').map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Min Conservation */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Conservación Mínima
              </label>
              <button
                type="button"
                onClick={() => onOpenGradingGuide()}
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline"
              >
                Guía (?)
              </button>
            </div>
            <select
              value={selectedMinGrade}
              onChange={(e: any) => setSelectedMinGrade(e.target.value)}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 outline-none"
            >
              <option value="ALL">Cualquier estado</option>
              {GRADING_ORDER.map(grade => (
                <option key={grade} value={grade}>
                  Desde {GRADING_SCALE[grade].codeEs} ({GRADING_SCALE[grade].nameEs})
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={onlyParque}
                onChange={(e) => setOnlyParque(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-900"
              />
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Retiro en Parque Rivadavia
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700 dark:text-zinc-300">
              <input
                type="checkbox"
                checked={onlyOffers}
                onChange={(e) => setOnlyOffers(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-900"
              />
              <span className="flex items-center gap-1">
                <Handshake className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Acepta ofertas
              </span>
            </label>
          </div>

          {/* Province */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Provincia del Vendedor
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs text-zinc-900 dark:text-zinc-100 outline-none"
            >
              <option value="ALL">Todas las provincias</option>
              {provinces.filter(p => p !== 'ALL').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {filteredListings.length} monedas encontradas
          </div>

          {filteredListings.length === 0 ? (
            <div className="py-12 text-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="text-2xl">🪙</div>
              <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No se encontraron monedas</h3>
              <p className="text-xs text-zinc-500">Prueba cambiando los filtros seleccionados.</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              >
                Limpiar filtros
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map(coin => (
                <CoinCard
                  key={coin.id}
                  listing={coin}
                  onSelect={onSelectCoin}
                  onOpenOffer={onOpenOffer}
                  onOpenGradingGuide={onOpenGradingGuide}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300">
                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 uppercase tracking-wider text-[11px] border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Moneda</th>
                    <th className="py-3 px-3">KM#</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3">Vendedor</th>
                    <th className="py-3 px-4 text-right">Precio ({activeCurrency})</th>
                    <th className="py-3 px-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredListings.map(coin => {
                    const price = formatDualPrice(coin.basePrice, coin.baseCurrency);
                    return (
                      <tr
                        key={coin.id}
                        onClick={() => onSelectCoin(coin)}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={coin.photos.obverse}
                            alt={coin.title}
                            className="w-10 h-10 object-contain rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{coin.title}</span>
                            <span className="text-xs text-zinc-500">
                              {coin.country} • {coin.year} • {coin.metal}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-zinc-600 dark:text-zinc-400">
                          {coin.kmReference || '—'}
                        </td>
                        <td className="py-3 px-3">
                          <GradingBadge grade={coin.grade} size="sm" />
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-zinc-800 dark:text-zinc-200 block">{coin.seller.username}</span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            {coin.allowsParqueRivadavia && <MapPin className="w-3 h-3 text-emerald-600" />}
                            {coin.seller.province}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                            {price.primaryText}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {price.secondaryText}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCoin(coin);
                            }}
                            className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold rounded text-xs"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
