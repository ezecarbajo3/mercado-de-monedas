import React, { useState } from 'react';
import { GRADING_SCALE, GRADING_ORDER } from '../data/gradingData';
import { GradingGrade } from '../types/coin';
import { X, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface GradingAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGrade?: GradingGrade;
  onSelectGrade?: (grade: GradingGrade) => void;
}

export const GradingAssistantModal: React.FC<GradingAssistantModalProps> = ({
  isOpen,
  onClose,
  initialGrade = 'VF',
  onSelectGrade
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradingGrade>(initialGrade);

  if (!isOpen) return null;

  const currentInfo = GRADING_SCALE[selectedGrade] || GRADING_SCALE.VF;
  const currentIndex = GRADING_ORDER.indexOf(selectedGrade) !== -1 ? GRADING_ORDER.indexOf(selectedGrade) : 10;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    const newGrade = GRADING_ORDER[idx];
    if (newGrade) {
      setSelectedGrade(newGrade);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedGrade(GRADING_ORDER[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < GRADING_ORDER.length - 1) {
      setSelectedGrade(GRADING_ORDER[currentIndex + 1]);
    }
  };

  const progressPercent = (currentIndex / (GRADING_ORDER.length - 1)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Escala de Conservación Numismática (con Grados + / -)
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Deslizá la barra con el mouse o con el dedo en tu celular para ver cada estado
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Draggable Slider Section */}
        <div className="my-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Mover Barra de Conservación:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className={`px-3 py-1 rounded-md text-xs font-bold border ${currentInfo.badgeBg} ${currentInfo.badgeColor}`}>
                {currentInfo.codeEs} — {currentInfo.nameEs} ({currentInfo.grade})
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === GRADING_ORDER.length - 1}
                className="p-1 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 disabled:opacity-30"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Range Input */}
          <div className="py-2 select-none">
            <input
              type="range"
              min="0"
              max={GRADING_ORDER.length - 1}
              step="1"
              value={currentIndex}
              onChange={handleSliderChange}
              className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100"
              style={{
                background: `linear-gradient(to right, #18181b ${progressPercent}%, #e4e4e7 ${progressPercent}%)`
              }}
            />

            <div className="flex justify-between text-[11px] text-zinc-500 font-medium pt-1 px-1">
              <span>Mala (PR)</span>
              <span>Buena (B)</span>
              <span>Muy Buena (MB)</span>
              <span>Muy Fina (MF)</span>
              <span>Excelente (EX)</span>
              <span>Sin Circular (SC)</span>
              <span>PROOF</span>
            </div>
          </div>
        </div>

        {/* Details & Photo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Photo */}
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
            <div className="text-xs text-zinc-500 flex justify-between">
              <span>Referencia real</span>
              <span>{currentInfo.exampleCoin}</span>
            </div>

            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-2">
              <img
                src={currentInfo.referenceImage}
                alt={`Grado ${currentInfo.grade}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-4">
            <div>
              <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {currentInfo.codeEs} / {currentInfo.grade} — {currentInfo.nameEs}
              </div>
              <div className="text-xs text-zinc-500 font-mono">
                Denominación Internacional: {currentInfo.nameEn} (Escala Sheldon)
              </div>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed">
                {currentInfo.shortDesc}
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                Criterios de este grado:
              </h4>
              <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                {currentInfo.detailedAnalysis.map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mb-1">
                Puntos Clave de Inspección:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentInfo.wearPoints.map((point, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
              >
                Cerrar
              </button>
              {onSelectGrade && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectGrade(selectedGrade);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg"
                >
                  Seleccionar {currentInfo.codeEs} ({currentInfo.nameEs})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
