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
  Sparkles,
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
      // Search query fuzzy
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
      // Calculate normalized price in active currency
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
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 font-numismatic">
            Explorador & Catálogo Numismático
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Filtros facetados con rigor técnico: Ceca, Metal, Escala PR-UNC y logística comunitaria.
          </p>
        </div>

        {/* View Switcher & Sorting */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Sorting */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="appearance-none bg-zinc-900 border border-zinc-700 text-xs sm:text-sm text-zinc-200 py-2 pl-3 pr-8 rounded-xl outline-none cursor-pointer hover:border-zinc-600 focus:border-amber-400"
            >
              <option value="newest">Más recientes primero</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
              <option value="year_asc">Año: Más antiguo</option>
              <option value="year_desc">Año: Más moderno</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-zinc-800 text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Vista en Grilla"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-zinc-800 text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Vista en Tabla Catálogo"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 bg-zinc-900/90 rounded-2xl border border-zinc-800 p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Filtros Facetados</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          </div>

          {/* Search Term in Sidebar */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Búsqueda por texto
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="KM#, denominación..."
                className="w-full pl-8 pr-3 py-1.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Country Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              País Emisor
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 outline-none focus:border-amber-400"
            >
              <option value="ALL">Todos los países</option>
              {countries.filter(c => c !== 'ALL').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Metal / Composition */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Metal / Composición
            </label>
            <select
              value={selectedMetal}
              onChange={(e) => setSelectedMetal(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 outline-none focus:border-amber-400"
            >
              <option value="ALL">Todos los metales</option>
              {metals.filter(m => m !== 'ALL').map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Conservation Grade Min */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Conservación Mínima
              </label>
              <button
                type="button"
                onClick={() => onOpenGradingGuide()}
                className="text-[11px] text-amber-400 hover:underline"
              >
                Guía (?)
              </button>
            </div>
            <select
              value={selectedMinGrade}
              onChange={(e: any) => setSelectedMinGrade(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 outline-none focus:border-amber-400"
            >
              <option value="ALL">Cualquier estado</option>
              {GRADING_ORDER.map(grade => (
                <option key={grade} value={grade}>
                  Desde {grade} ({GRADING_SCALE[grade].nameEs}) en adelante
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes: Parque Rivadavia & Acepta Ofertas */}
          <div className="space-y-2.5 pt-2 border-t border-zinc-800">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-200">
              <input
                type="checkbox"
                checked={onlyParque}
                onChange={(e) => setOnlyParque(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-400 bg-zinc-950 border-zinc-700 focus:ring-0 focus:ring-offset-0"
              />
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Solo con retiro en Parque Rivadavia
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-200">
              <input
                type="checkbox"
                checked={onlyOffers}
                onChange={(e) => setOnlyOffers(e.target.checked)}
                className="w-4 h-4 rounded text-amber-400 bg-zinc-950 border-zinc-700 focus:ring-0 focus:ring-offset-0"
              />
              <span className="flex items-center gap-1 font-medium">
                <Handshake className="w-3.5 h-3.5 text-amber-400" />
                Solo publicaciones que aceptan ofertas
              </span>
            </label>
          </div>

          {/* Seller Province */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Provincia del Vendedor
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-2 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-100 outline-none focus:border-amber-400"
            >
              <option value="ALL">Todo el país</option>
              {provinces.filter(p => p !== 'ALL').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Results Grid / Table */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>
              Mostrando <strong className="text-zinc-200">{filteredListings.length}</strong> publicaciones activas
            </span>
          </div>

          {filteredListings.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
              <div className="text-3xl">🪙</div>
              <h3 className="text-lg font-bold text-zinc-200">No encontramos monedas con esos filtros</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Prueba relajando los criterios de conservación o seleccionando 'Todos los países'.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-amber-400 rounded-xl transition-all"
              >
                Restablecer todos los filtros
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
            /* Table Catalog View */
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/90 shadow">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Pieza Numismática</th>
                    <th className="py-3 px-3">Catálogo</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3">Vendedor & Ubicación</th>
                    <th className="py-3 px-4 text-right">Precio ({activeCurrency})</th>
                    <th className="py-3 px-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-sans">
                  {filteredListings.map(coin => {
                    const price = formatDualPrice(coin.basePrice, coin.baseCurrency);
                    return (
                      <tr
                        key={coin.id}
                        onClick={() => onSelectCoin(coin)}
                        className="hover:bg-zinc-800/60 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={coin.photos.obverse}
                            alt={coin.title}
                            className="w-10 h-10 object-contain rounded bg-zinc-950 border border-zinc-800 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-zinc-100 block font-numismatic">{coin.title}</span>
                            <span className="text-[11px] text-zinc-400 font-mono">
                              {coin.country} • {coin.year} • {coin.metal}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-zinc-300">
                          {coin.kmReference || '—'}
                        </td>
                        <td className="py-3 px-3">
                          <GradingBadge grade={coin.grade} size="sm" />
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-zinc-200 block">{coin.seller.username}</span>
                          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                            {coin.allowsParqueRivadavia && <MapPin className="w-3 h-3 text-emerald-400" />}
                            {coin.seller.province}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="font-extrabold text-amber-400 font-mono text-sm">
                            {price.primaryText}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            {price.secondaryText}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCoin(coin);
                            }}
                            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-lg text-xs transition-all"
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
