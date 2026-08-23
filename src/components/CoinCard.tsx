import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { useCurrency } from '../context/CurrencyContext';
import { GradingBadge } from './GradingBadge';
import { MapPin } from 'lucide-react';

interface CoinCardProps {
  listing: CoinListing;
  onSelect: (listing: CoinListing) => void;
  onOpenOffer: (listing: CoinListing) => void;
  onOpenGradingGuide: (grade: any) => void;
}

export const CoinCard: React.FC<CoinCardProps> = ({
  listing,
  onSelect,
  onOpenOffer,
  onOpenGradingGuide
}) => {
  const { formatDualPrice } = useCurrency();
  const [photoSide, setPhotoSide] = useState<'obverse' | 'reverse'>('obverse');

  const dualPrice = formatDualPrice(listing.basePrice, listing.baseCurrency);

  return (
    <div
      onClick={() => onSelect(listing)}
      className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 border-b border-zinc-100 dark:border-zinc-800">
        <img
          src={photoSide === 'obverse' ? listing.photos.obverse : listing.photos.reverse}
          alt={listing.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <GradingBadge
            grade={listing.grade}
            showHelpIcon
            onOpenGradingGuide={() => onOpenGradingGuide(listing.grade)}
            size="sm"
          />

          {listing.allowsParqueRivadavia && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <MapPin className="w-3 h-3" />
              <span>Parque</span>
            </span>
          )}
        </div>

        {/* Photo Flip */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPhotoSide(prev => (prev === 'obverse' ? 'reverse' : 'obverse'));
            }}
            className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-xs"
          >
            {photoSide === 'obverse' ? 'Reverso' : 'Anverso'}
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="text-[11px] text-zinc-500 font-mono">
            {listing.country} • {listing.year} • {listing.metal}
          </div>

          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5 line-clamp-1">
            {listing.title}
          </h3>
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {dualPrice.primaryText}
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              {dualPrice.secondaryText}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {listing.acceptsOffers && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOffer(listing);
                }}
                className="px-2 py-1 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
              >
                Ofertar
              </button>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(listing);
              }}
              className="px-2.5 py-1 rounded text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800"
            >
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
