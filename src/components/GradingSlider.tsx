import React from 'react';
import { GradingGrade } from '../types/coin';
import { GRADING_ORDER, GRADING_SCALE } from '../data/gradingData';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface GradingSliderProps {
  value: GradingGrade;
  onChange: (grade: GradingGrade) => void;
  onOpenGuide?: () => void;
  showHelperLink?: boolean;
}

export const GradingSlider: React.FC<GradingSliderProps> = ({
  value,
  onChange,
  onOpenGuide,
  showHelperLink = true
}) => {
  const currentIndex = GRADING_ORDER.indexOf(value) !== -1 ? GRADING_ORDER.indexOf(value) : 7; // default F / MB
  const currentInfo = GRADING_SCALE[value] || GRADING_SCALE.F;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    const newGrade = GRADING_ORDER[idx];
    if (newGrade) {
      onChange(newGrade);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onChange(GRADING_ORDER[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < GRADING_ORDER.length - 1) {
      onChange(GRADING_ORDER[currentIndex + 1]);
    }
  };

  // Percentage for the slider track fill
  const progressPercent = (currentIndex / (GRADING_ORDER.length - 1)) * 100;

  return (
    <div className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/80">
      {/* Top Header info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Deslizar Estado de Conservación:
          </span>
          {showHelperLink && onOpenGuide && (
            <button
              type="button"
              onClick={onOpenGuide}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ver Fotos Guía (?)</span>
            </button>
          )}
        </div>

        {/* Current Grade Badge Display */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-1 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 disabled:opacity-30 text-zinc-700 dark:text-zinc-200"
            title="Grado anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span
            className={`px-3 py-1 rounded-md text-xs font-bold border ${currentInfo.badgeBg} ${currentInfo.badgeColor}`}
          >
            {currentInfo.codeEs} ({currentInfo.nameEs})
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === GRADING_ORDER.length - 1}
            className="p-1 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 disabled:opacity-30 text-zinc-700 dark:text-zinc-200"
            title="Siguiente grado"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Draggable Range Slider Bar */}
      <div className="relative py-2 select-none">
        <input
          type="range"
          min="0"
          max={GRADING_ORDER.length - 1}
          step="1"
          value={currentIndex}
          onChange={handleSliderChange}
          className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100 focus:outline-none"
          style={{
            background: `linear-gradient(to right, #18181b ${progressPercent}%, #e4e4e7 ${progressPercent}%)`
          }}
        />

        {/* Step Ticks / Key Labels */}
        <div className="flex justify-between text-[11px] text-zinc-500 font-medium pt-1 px-1">
          <span>PR (Mala)</span>
          <span>B (VG)</span>
          <span>MB (F)</span>
          <span>MF (VF)</span>
          <span>EX (XF)</span>
          <span>SC (UNC)</span>
          <span>PROOF</span>
        </div>
      </div>

      {/* Dynamic description of current selected grade */}
      <div className="text-xs text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60">
        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
          Nomenclatura: {currentInfo.grade} / {currentInfo.codeEs} — {currentInfo.nameEs}
        </div>
        <p className="mt-0.5 text-zinc-500">{currentInfo.shortDesc}</p>
      </div>
    </div>
  );
};
