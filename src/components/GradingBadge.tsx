import React from 'react';
import { GradingGrade } from '../types/coin';
import { GRADING_SCALE } from '../data/gradingData';
import { HelpCircle } from 'lucide-react';

interface GradingBadgeProps {
  grade: GradingGrade;
  showHelpIcon?: boolean;
  onOpenGradingGuide?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const GradingBadge: React.FC<GradingBadgeProps> = ({
  grade,
  showHelpIcon = false,
  onOpenGradingGuide,
  size = 'md'
}) => {
  const info = GRADING_SCALE[grade] || GRADING_SCALE.VF;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs sm:text-sm px-2.5 py-1 font-semibold',
    lg: 'text-sm sm:text-base px-3 py-1.5 font-bold'
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1 rounded-full border shadow-sm transition-all ${info.badgeBg} ${info.badgeColor} ${sizeClasses[size]}`}
        title={`${info.grade} (${info.nameEs}) - ${info.shortDesc}`}
      >
        <span className="font-mono tracking-tight font-extrabold">{info.grade}</span>
        <span className="hidden sm:inline opacity-85 text-[11px] font-medium border-l border-current/20 pl-1">
          {info.nameEs}
        </span>
      </span>

      {showHelpIcon && onOpenGradingGuide && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenGradingGuide();
          }}
          className="text-zinc-400 hover:text-amber-400 dark:hover:text-amber-300 transition-colors p-0.5 rounded-full hover:bg-zinc-800/50"
          title="Ver Guía y Fotos del Grado de Conservación (?)"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
