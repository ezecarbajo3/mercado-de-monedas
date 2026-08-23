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
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5'
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border font-medium ${info.badgeBg} ${info.badgeColor} ${sizeClasses[size]}`}
        title={`${info.grade} / ${info.codeEs} (${info.nameEs}) - ${info.shortDesc}`}
      >
        <span className="font-bold">{info.codeEs || info.grade}</span>
        <span className="opacity-80 border-l border-current/20 pl-1.5">
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
          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-0.5"
          title="Ver Guía de Conservación (?)"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
