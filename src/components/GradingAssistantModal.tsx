import React, { useState } from 'react';
import { GRADING_SCALE, GRADING_ORDER } from '../data/gradingData';
import { GradingGrade } from '../types/coin';
import { X, CheckCircle2, AlertCircle, Sparkles, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';

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

  const currentInfo = GRADING_SCALE[selectedGrade];
  const currentIndex = GRADING_ORDER.indexOf(selectedGrade);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 text-zinc-100 rounded-2xl border border-zinc-700/70 shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-50 font-numismatic">
                Asistente Didáctico de Conservación
              </h2>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Escala oficial numismática estandarizada (PR a UNC / PROOF) con referencias fotográficas reales.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grade Selector Slider / Pills */}
        <div className="my-6">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2 px-1">
            <span>Mayor Desgaste</span>
            <span>Máxima Calidad</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {GRADING_ORDER.map((grade) => {
              const item = GRADING_SCALE[grade];
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-center ${
                    isSelected
                      ? `${item.badgeBg} ${item.badgeColor} ring-2 ring-amber-400 font-bold scale-105 shadow-lg`
                      : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-sm sm:text-base font-mono">{grade}</span>
                  <span className="text-[10px] sm:text-xs truncate w-full mt-0.5 opacity-90">{item.nameEs}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Details View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Photo Preview */}
          <div className="flex flex-col rounded-xl bg-zinc-950/70 border border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
              <span className="font-medium">Ejemplo Fotográfico Real ({currentInfo.grade})</span>
              <span className="text-amber-400/90 font-mono">{currentInfo.exampleCoin}</span>
            </div>
            
            <div className="relative flex-1 min-h-[260px] rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-900 flex items-center justify-center">
              <img
                src={currentInfo.referenceImage}
                alt={`Estado ${currentInfo.grade} - ${currentInfo.nameEs}`}
                className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 backdrop-blur text-xs font-mono text-amber-300 border border-amber-500/20">
                Grado: {currentInfo.grade} - {currentInfo.nameEs}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Anterior ({GRADING_ORDER[Math.max(0, currentIndex - 1)]})
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === GRADING_ORDER.length - 1}
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                Siguiente ({GRADING_ORDER[Math.min(GRADING_ORDER.length - 1, currentIndex + 1)]}) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Technical Specs & Wear points */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-base font-bold font-mono border ${currentInfo.badgeBg} ${currentInfo.badgeColor}`}>
                  {currentInfo.grade} — {currentInfo.nameEs}
                </span>
                <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
                  {currentInfo.nameEn}
                </span>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed mt-2">
                {currentInfo.shortDesc}
              </p>

              <div className="mt-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Criterios Clave de Inspección
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                  {currentInfo.detailedAnalysis.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2">
                  Puntos de Desgaste Específicos
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentInfo.wearPoints.map((point, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700/50"
                    >
                      • {point}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all"
              >
                Cerrar Guía
              </button>
              {onSelectGrade && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectGrade(selectedGrade);
                    onClose();
                  }}
                  className="px-5 py-2 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/20"
                >
                  Seleccionar {selectedGrade} ({currentInfo.nameEs})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
