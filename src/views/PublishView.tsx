import React, { useState } from 'react';
import { GradingGrade, MetalType, Currency, ParqueRivadaviaFrequency, CoinListing } from '../types/coin';
import { GRADING_ORDER, GRADING_SCALE } from '../data/gradingData';
import { useCurrency } from '../context/CurrencyContext';
import {
  UploadCloud,
  FileSpreadsheet,
  Plus,
  HelpCircle,
  CheckCircle2,
  Lock,
  FileText
} from 'lucide-react';
import { GradingSlider } from '../components/GradingSlider';

interface PublishViewProps {
  onPublishSuccess: (newCoin: Partial<CoinListing>) => void;
  onOpenGradingGuide: (grade?: any) => void;
}

export const PublishView: React.FC<PublishViewProps> = ({
  onPublishSuccess,
  onOpenGradingGuide
}) => {
  const { dolarBlueRate } = useCurrency();
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
  const [publicComment, setPublicComment] = useState('Excelente estado de conservación, sin golpes ni marcas.');
  const [privateComment, setPrivateComment] = useState('Costo de compra: $8.000');
  const [allowsShipping, setAllowsShipping] = useState(true);
  const [allowsLocalPickup, setAllowsLocalPickup] = useState(false);
  const [allowsParque, setAllowsParque] = useState(false);
  const [parqueTimingOption, setParqueTimingOption] = useState<'sundays' | '2_weeks' | '1_month' | 'custom_date'>('sundays');
  const [parqueCustomDate, setParqueCustomDate] = useState('2026-09-20');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const numericPrice = parseFloat(basePrice) || 0;
  const calculatedOtherCurrency = baseCurrency === 'ARS'
    ? `≈ US$ ${(numericPrice / dolarBlueRate).toFixed(2)}`
    : `≈ $ ${(numericPrice * dolarBlueRate).toLocaleString('es-AR')} ARS`;

  const getParqueTimingText = () => {
    if (!allowsParque) return undefined;
    if (parqueTimingOption === 'sundays') return 'Todos los domingos';
    if (parqueTimingOption === '2_weeks') return 'En las próximas 2 semanas';
    if (parqueTimingOption === '1_month') return 'En 1 mes (primer domingo del mes)';
    return `Fecha puntual: ${parqueCustomDate}`;
  };

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
        parqueTiming: getParqueTimingText(),
        allowsShipping,
        allowsLocalPickup
      });

      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header and Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Publicar Moneda
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Comisión reducida de 3% a 6% por venta concretada
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setPublishMode('single')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              publishMode === 'single'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Individual
          </button>

          <button
            type="button"
            onClick={() => setPublishMode('bulk')}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
              publishMode === 'bulk'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Masivo (Excel)
          </button>
        </div>
      </div>

      {showSuccessToast && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>¡Moneda publicada!</strong> Ya está disponible en el catálogo.</span>
        </div>
      )}

      {publishMode === 'single' ? (
        <form onSubmit={handleSubmitSingle} className="space-y-6">
          {/* Photos */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-zinc-500" />
              <span>1. Fotos de la Moneda</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-center bg-zinc-50 dark:bg-zinc-800/40">
                <img
                  src="/grading/746119962_27152987804401733_5967603319989396481_n.jpg"
                  alt="Anverso"
                  className="w-14 h-14 object-contain mx-auto rounded"
                />
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mt-1">Anverso ✓</span>
              </div>

              <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 text-center bg-zinc-50 dark:bg-zinc-800/40">
                <img
                  src="/grading/748216107_27152987704401743_1830395168745860999_n.jpg"
                  alt="Reverso"
                  className="w-14 h-14 object-contain mx-auto rounded"
                />
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mt-1">Reverso ✓</span>
              </div>

              <div className="border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-3 flex flex-col items-center justify-center text-center text-zinc-500 bg-zinc-50 dark:bg-zinc-800/20">
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-xs">+ Foto de Canto</span>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              2. Datos de la Moneda
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Título / Denominación
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: 50 Centavos 1941 Libertad"
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  País
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Año
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Valor Facial
                </label>
                <input
                  type="text"
                  value={faceValue}
                  onChange={(e) => setFaceValue(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Metal / Composición
                </label>
                <select
                  value={metal}
                  onChange={(e: any) => setMetal(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none"
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

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Diámetro (\(mm\))
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={diameterMm}
                  onChange={(e) => setDiameterMm(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-mono outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Peso (\(g\))
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={weightG}
                  onChange={(e) => setWeightG(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-mono outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Referencia (KM#)
                </label>
                <input
                  type="text"
                  value={kmReference}
                  onChange={(e) => setKmReference(e.target.value)}
                  placeholder="Ej: KM# 39"
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-mono outline-none"
                />
              </div>
            </div>

            {/* Conservation Grade with Draggable Slider */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <GradingSlider
                value={grade}
                onChange={setGrade}
                onOpenGuide={() => onOpenGradingGuide(grade)}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              4. Precio y Ofertas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Moneda
                </label>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setBaseCurrency('ARS')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold ${
                      baseCurrency === 'ARS' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
                    }`}
                  >
                    ARS ($)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBaseCurrency('USD')}
                    className={`flex-1 py-1.5 rounded text-xs font-semibold ${
                      baseCurrency === 'USD' ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500'
                    }`}
                  >
                    USD (US$)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Monto
                </label>
                <input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 outline-none"
                  required
                />
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-xs">
                <span className="text-zinc-500 block text-[11px]">Conversión estimada</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block font-mono">
                  {calculatedOtherCurrency}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={acceptsOffers}
                  onChange={(e) => setAcceptsOffers(e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900"
                />
                <span>Aceptar ofertas de compradores (límite 3 por comprador)</span>
              </label>
            </div>
          </div>

          {/* Logistics Checklist & Private SKU */}
          <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              5. Opciones de Entrega y Envío
            </h3>

            <div className="space-y-3">
              {/* Delivery Methods Checklist */}
              <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-3">
                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Seleccioná los métodos de entrega que ofrecés:
                </div>

                {/* Option 1: Shipping */}
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={allowsShipping}
                    onChange={(e) => setAllowsShipping(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900"
                  />
                  <span>Envío por Correo (Correo Argentino / Andreani a todo el país)</span>
                </label>

                {/* Option 2: Local Pickup */}
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-800 dark:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={allowsLocalPickup}
                    onChange={(e) => setAllowsLocalPickup(e.target.checked)}
                    className="w-4 h-4 rounded text-zinc-900"
                  />
                  <span>Retiro en mano / domicilio del vendedor</span>
                </label>

                {/* Option 3: Parque Rivadavia */}
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700/60 space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    <input
                      type="checkbox"
                      checked={allowsParque}
                      onChange={(e) => setAllowsParque(e.target.checked)}
                      className="w-4 h-4 rounded text-zinc-900"
                    />
                    <span>¿Realizás entrega presencial en Parque Rivadavia (CABA)?</span>
                  </label>

                  {/* Expanded Timing Configuration when Parque Rivadavia is checked */}
                  {allowsParque && (
                    <div className="ml-6 p-3 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 space-y-2.5">
                      <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        ¿Cuándo realizarás la entrega en el puesto?
                      </div>

                      <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="parqueTiming"
                            value="sundays"
                            checked={parqueTimingOption === 'sundays'}
                            onChange={() => setParqueTimingOption('sundays')}
                            className="text-zinc-900"
                          />
                          <span>Todos los domingos (10:00 a 14:00 hs - Vendedores CABA/GBA)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="parqueTiming"
                            value="2_weeks"
                            checked={parqueTimingOption === '2_weeks'}
                            onChange={() => setParqueTimingOption('2_weeks')}
                            className="text-zinc-900"
                          />
                          <span>En las próximas 2 semanas (primer domingo disponible)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="parqueTiming"
                            value="1_month"
                            checked={parqueTimingOption === '1_month'}
                            onChange={() => setParqueTimingOption('1_month')}
                            className="text-zinc-900"
                          />
                          <span>En 1 mes (primer domingo del próximo mes)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="parqueTiming"
                            value="custom_date"
                            checked={parqueTimingOption === 'custom_date'}
                            onChange={() => setParqueTimingOption('custom_date')}
                            className="text-zinc-900"
                          />
                          <span>Fecha puntual específica:</span>
                        </label>
                      </div>

                      {parqueTimingOption === 'custom_date' && (
                        <div className="pt-1 pl-5">
                          <input
                            type="date"
                            value={parqueCustomDate}
                            onChange={(e) => setParqueCustomDate(e.target.value)}
                            className="p-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-xs text-zinc-900 dark:text-zinc-100 outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Private SKU and Notes */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <Lock className="w-3.5 h-3.5" />
                  <span>SKU Privado (solo para tu control interno)</span>
                </div>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Ej: BANDEJA-B12 o ALBUM-3"
                  className="w-full p-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded text-xs text-zinc-800 dark:text-zinc-200 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Comentarios públicos sobre la moneda
              </label>
              <textarea
                value={publicComment}
                onChange={(e) => setPublicComment(e.target.value)}
                rows={2}
                placeholder="Detalla pátina, golpes, brillo o procedencia..."
                className="w-full p-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Moneda'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-4 shadow-xs">
            <FileSpreadsheet className="w-10 h-10 mx-auto text-zinc-500" />
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Publicación Masiva con Planilla Excel
              </h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
                Descarga la plantilla con columnas oficiales (País, Año, KM#, Estado, Precio, SKU) y asocia las fotos por nombre de SKU.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Descargando plantilla')}
              className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold border border-zinc-300 dark:border-zinc-700"
            >
              Descargar Plantilla Excel (.xlsx)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
