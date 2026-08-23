import React, { useState } from 'react';
import { GradingGrade, MetalType, Currency, ParqueRivadaviaFrequency, CoinListing } from '../types/coin';
import { GRADING_ORDER, GRADING_SCALE } from '../data/gradingData';
import { useCurrency } from '../context/CurrencyContext';
import {
  UploadCloud,
  FileSpreadsheet,
  PlusCircle,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  DollarSign,
  MapPin,
  Lock,
  Layers,
  FileText,
  AlertCircle
} from 'lucide-react';

interface PublishViewProps {
  onPublishSuccess: (newCoin: Partial<CoinListing>) => void;
  onOpenGradingGuide: (grade?: any) => void;
}

export const PublishView: React.FC<PublishViewProps> = ({
  onPublishSuccess,
  onOpenGradingGuide
}) => {
  const { dolarBlueRate, convertAmount, activeCurrency } = useCurrency();
  const [publishMode, setPublishMode] = useState<'single' | 'bulk'>('single');

  // Form State
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [year, setYear] = useState('1941');
  const [faceValue, setFaceValue] = useState('50 Centavos');
  const [metal, setMetal] = useState<MetalType>('Cuproníquel');
  const [diameterMm, setDiameterMm] = useState('25.0');
  const [weightG, setWeightG] = useState('6.5');
  const [grade, setGrade] = useState<GradingGrade>('UNC');
  const [basePrice, setBasePrice] = useState('15000');
  const [baseCurrency, setBaseCurrency] = useState<Currency>('ARS');
  const [acceptsOffers, setAcceptsOffers] = useState(true);
  const [kmReference, setKmReference] = useState('KM# 39');
  const [cjReference, setCjReference] = useState('');
  const [sku, setSku] = useState('ALB-1-A');
  const [publicComment, setPublicComment] = useState('Excelente brillo original de acuñación, sin golpes ni rayas.');
  const [privateComment, setPrivateComment] = useState('Comprada en lote San Telmo por $8.000');
  const [allowsParque, setAllowsParque] = useState(true);
  const [parqueFrequency, setParqueFrequency] = useState<ParqueRivadaviaFrequency>('Todos los domingos');
  const [allowsShipping, setAllowsShipping] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Auto-conversion calculation
  const numericPrice = parseFloat(basePrice) || 0;
  const calculatedOtherCurrency = baseCurrency === 'ARS'
    ? `≈ US$ ${(numericPrice / dolarBlueRate).toFixed(2)}`
    : `≈ $ ${(numericPrice * dolarBlueRate).toLocaleString('es-AR')} ARS`;

  const handleSubmitSingle = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);

      onPublishSuccess({
        id: `coin-custom-${Date.now()}`,
        title,
        country,
        year,
        faceValue,
        metal,
        diameterMm: parseFloat(diameterMm) || 25,
        weightG: parseFloat(weightG) || 6.5,
        grade,
        basePrice: numericPrice,
        baseCurrency,
        acceptsOffers,
        kmReference,
        cjReference,
        sku,
        publicComment,
        privateComment,
        photos: {
          obverse: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
          reverse: '/grading/748216107_27152987704401743_1830395168745860999_n.jpg'
        },
        allowsParqueRivadavia: allowsParque,
        allowsShipping
      });

      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header and Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 font-numismatic">
            Publicar Moneda en el Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Comisión baja del 3% al 6% por venta concretada. Rigor técnico numismático y control total.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-2xl p-1 shrink-0">
          <button
            type="button"
            onClick={() => setPublishMode('single')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              publishMode === 'single'
                ? 'bg-amber-400 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Individual Asistida</span>
          </button>

          <button
            type="button"
            onClick={() => setPublishMode('bulk')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              publishMode === 'bulk'
                ? 'bg-amber-400 text-zinc-950 shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Masivo (Excel / CSV)</span>
          </button>
        </div>
      </div>

      {showSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-sm flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span><strong>¡Moneda publicada exitosamente!</strong> Ya está disponible en el explorador con conversión de divisas en tiempo real.</span>
        </div>
      )}

      {publishMode === 'single' ? (
        /* Single Assisted Form */
        <form onSubmit={handleSubmitSingle} className="space-y-8">
          {/* Section 1: Photos */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-100 font-numismatic flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-amber-400" />
                <span>1. Fotos de la Moneda (Mínimo Anverso y Reverso)</span>
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Hasta 8 fotos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Photo 1: Obverse */}
              <div className="border-2 border-dashed border-zinc-700 hover:border-amber-400/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-zinc-950/60 cursor-pointer transition-colors group h-40">
                <img
                  src="/grading/746119962_27152987804401733_5967603319989396481_n.jpg"
                  alt="Anverso"
                  className="w-16 h-16 object-contain rounded mb-1"
                />
                <span className="text-xs font-bold text-amber-400">Anverso Cargado ✓</span>
                <span className="text-[10px] text-zinc-500">Click para cambiar</span>
              </div>

              {/* Photo 2: Reverse */}
              <div className="border-2 border-dashed border-zinc-700 hover:border-amber-400/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-zinc-950/60 cursor-pointer transition-colors group h-40">
                <img
                  src="/grading/748216107_27152987704401743_1830395168745860999_n.jpg"
                  alt="Reverso"
                  className="w-16 h-16 object-contain rounded mb-1"
                />
                <span className="text-xs font-bold text-amber-400">Reverso Cargado ✓</span>
                <span className="text-[10px] text-zinc-500">Click para cambiar</span>
              </div>

              {/* Photo 3: Edge or Macro */}
              <div className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-zinc-950/30 cursor-pointer transition-colors h-40">
                <PlusCircle className="w-8 h-8 text-zinc-600 mb-1" />
                <span className="text-xs font-semibold text-zinc-400">+ Canto / Macro</span>
                <span className="text-[10px] text-zinc-600">Opcional pero recomendado</span>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specifications */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <h3 className="text-base font-bold text-zinc-100 font-numismatic flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>2. Datos Numismáticos y Clasificación</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Título / Denominación
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: 50 Centavos 1941 Libertad"
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  País Emisor
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Año de Acuñación
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Ej: 1941 o 1881-O"
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Valor Facial
                </label>
                <input
                  type="text"
                  value={faceValue}
                  onChange={(e) => setFaceValue(e.target.value)}
                  placeholder="Ej: 50 Centavos, 8 Reales, 1 Peso"
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Composición / Metal
                </label>
                <select
                  value={metal}
                  onChange={(e: any) => setMetal(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 outline-none focus:border-amber-400"
                >
                  <option value="Cuproníquel">Cuproníquel</option>
                  <option value="Plata (.900 / .925)">Plata (.900 / .925)</option>
                  <option value="Oro">Oro</option>
                  <option value="Cobre">Cobre</option>
                  <option value="Bronce">Bronce</option>
                  <option value="Aluminio">Aluminio</option>
                  <option value="Bimetálica">Bimetálica</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Diámetro (\(mm\))
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={diameterMm}
                  onChange={(e) => setDiameterMm(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 font-mono outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Peso Real (\(g\))
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={weightG}
                  onChange={(e) => setWeightG(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 font-mono outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Referencia Catálogo (KM#)
                </label>
                <input
                  type="text"
                  value={kmReference}
                  onChange={(e) => setKmReference(e.target.value)}
                  placeholder="Ej: KM# 39"
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-zinc-100 font-mono outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Interactive Grading Slider Bar */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    3. Estado de Conservación Oficial
                  </label>
                  <button
                    type="button"
                    onClick={() => onOpenGradingGuide(grade)}
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Abrir Asistente Didáctico con Fotos (?)</span>
                  </button>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${GRADING_SCALE[grade].badgeBg} ${GRADING_SCALE[grade].badgeColor}`}>
                  {grade} ({GRADING_SCALE[grade].nameEs})
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                {GRADING_ORDER.map((g) => {
                  const isSelected = grade === g;
                  const item = GRADING_SCALE[g];
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGrade(g)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        isSelected
                          ? `${item.badgeBg} ${item.badgeColor} ring-2 ring-amber-400 font-bold scale-105 shadow`
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="text-sm font-mono">{g}</div>
                      <div className="text-[10px] truncate">{item.nameEs}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Pricing and Offers */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <h3 className="text-base font-bold text-zinc-100 font-numismatic flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>4. Fijación de Precios, Divisa y Ofertas</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Moneda Base de Cobro
                </label>
                <div className="flex bg-zinc-950 border border-zinc-700 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setBaseCurrency('ARS')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      baseCurrency === 'ARS' ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    ARS ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBaseCurrency('USD')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                      baseCurrency === 'USD' ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    USD (US$)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Monto Fijo
                </label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-lg font-bold font-mono text-zinc-100 outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[11px] text-zinc-500 block">Conversión según Dólar Blue</span>
                <span className="text-sm font-bold text-amber-400 font-mono block mt-1">
                  {calculatedOtherCurrency}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-zinc-200">
                <input
                  type="checkbox"
                  checked={acceptsOffers}
                  onChange={(e) => setAcceptsOffers(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-400 bg-zinc-950 border-zinc-700 focus:ring-0 focus:ring-offset-0"
                />
                <span>¿Acepta negociación de ofertas de compradores? (Límite 3 ofertas)</span>
              </label>
            </div>
          </div>

          {/* Section 4: Logistics & Private SKU */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <h3 className="text-base font-bold text-zinc-100 font-numismatic flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>5. Logística Parque Rivadavia y Control Privado</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-emerald-400">
                  <input
                    type="checkbox"
                    checked={allowsParque}
                    onChange={(e) => setAllowsParque(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-400 bg-zinc-950 border-zinc-700"
                  />
                  <span>Habilitar entrega dominical en Parque Rivadavia</span>
                </label>

                {allowsParque && (
                  <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                    <span className="text-[11px] text-zinc-400 block">Frecuencia de entrega en puesto:</span>
                    <select
                      value={parqueFrequency}
                      onChange={(e: any) => setParqueFrequency(e.target.value)}
                      className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-zinc-200 outline-none"
                    >
                      <option value="Todos los domingos">Todos los domingos (Vendedores CABA / GBA)</option>
                      <option value="Quincenal (1er y 3er domingo)">Quincenal (1er y 3er domingo)</option>
                      <option value="Mensual (1er domingo del mes)">Mensual (1er domingo del mes - Envíos consolidados)</option>
                      <option value="Fecha puntual pactada">Fecha puntual pactada</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Private SKU and Notes for Seller */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Control Privado del Vendedor (Sólo tú lo ves)</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">SKU / Ubicación Fichero</span>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="Ej: BANDEJA-B12"
                      className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-200 font-mono mt-0.5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Costo de compra interno</span>
                    <input
                      type="text"
                      value={privateComment}
                      onChange={(e) => setPrivateComment(e.target.value)}
                      placeholder="Ej: $8.000 lote San Telmo"
                      className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-zinc-200 mt-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Public Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Descripción Pública para Coleccionistas
              </label>
              <textarea
                value={publicComment}
                onChange={(e) => setPublicComment(e.target.value)}
                rows={3}
                placeholder="Detalla pátina, golpes de canto, brillo original o procedencia..."
                className="w-full p-3 bg-zinc-950 border border-zinc-700 rounded-xl text-xs sm:text-sm text-zinc-100 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-sm sm:text-base shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? 'Validando y Publicando...' : 'Publicar Moneda en Mercado de Monedas'}
            </button>
          </div>
        </form>
      ) : (
        /* Bulk Excel Mode (Section 7.B) */
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <FileSpreadsheet className="w-8 h-8" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-xl font-bold text-zinc-100 font-numismatic">
                Carga Masiva vía Archivo Excel (.xlsx / .csv)
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Publica cientos de monedas en un solo paso. Descarga nuestra plantilla oficial con listas desplegables validadas y vincula tus fotos automáticamente mediante tu código <strong>SKU</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => alert('Descargando plantilla oficial MercadoDeMonedas_Template.xlsx')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-bold border border-zinc-700 transition-all"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Descargar Plantilla Excel (.xlsx)</span>
              </button>
            </div>
          </div>

          {/* Drag and Drop Box */}
          <div className="p-8 rounded-3xl bg-zinc-950 border-2 border-dashed border-zinc-700 hover:border-amber-400/60 transition-colors text-center space-y-4 cursor-pointer">
            <UploadCloud className="w-12 h-12 mx-auto text-zinc-500" />
            <div>
              <h4 className="text-sm font-bold text-zinc-200">
                Arrastra tu archivo Excel y la carpeta de fotos aquí
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Las fotos nombradas como <code className="text-amber-400 font-mono">SKU120_1.jpg</code> y <code className="text-amber-400 font-mono">SKU120_2.jpg</code> se asociarán automáticamente a la fila correspondiente.
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
            >
              Seleccionar Archivos desde PC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
