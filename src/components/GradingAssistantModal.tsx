import React, { useState } from 'react';
import { GRADING_SCALE, GRADING_ORDER } from '../data/gradingData';
import { GradingGrade } from '../types/coin';
import { X, CheckCircle2, ChevronRight, ChevronLeft, Shield } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Escala Oficial de Conservación Numismática
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Guía técnica estandarizada (PR a UNC / PROOF) con referencias fotográficas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grade Selector Pills */}
        <div className="my-5">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span>Mayor desgaste</span>
            <span>Máxima conservación</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {GRADING_ORDER.map((grade) => {
              const item = GRADING_SCALE[grade];
              const isSelected = selectedGrade === grade;
              return (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 font-bold shadow-xs'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  <div className="text-xs font-bold">{grade}</div>
                  <div className="text-[11px] truncate">{item.nameEs}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Photo */}
          <div className="rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 space-y-3">
            <div className="text-xs text-zinc-500 flex justify-between">
              <span>Referencia real ({currentInfo.grade})</span>
              <span>{currentInfo.exampleCoin}</span>
            </div>

            <div className="aspect-square w-full rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-2">
              <img
                src={currentInfo.referenceImage}
                alt={`Grado ${currentInfo.grade}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="text-xs px-2.5 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 disabled:opacity-30"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === GRADING_ORDER.length - 1}
                className="text-xs px-2.5 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 disabled:opacity-30"
              >
                Siguiente →
              </button>
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-md text-sm font-bold border ${currentInfo.badgeBg} ${currentInfo.badgeColor}`}>
                {currentInfo.grade} — {currentInfo.nameEs} ({currentInfo.nameEn})
              </span>

              <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3 leading-relaxed">
                {currentInfo.shortDesc}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                Detalles del Grado:
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                {currentInfo.detailedAnalysis.map((line, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mb-1.5">
                Puntos de Desgaste:
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
                  Usar {selectedGrade}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
