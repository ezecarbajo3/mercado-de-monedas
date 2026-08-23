import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { useCurrency } from '../context/CurrencyContext';
import { GradingBadge } from './GradingBadge';
import { MapPin, ArrowRight } from 'lucide-react';

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
      className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-5 border-b border-zinc-100 dark:border-zinc-800">
        <img
          src={photoSide === 'obverse' ? listing.photos.obverse : listing.photos.reverse}
          alt={listing.title}
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-102 transition-transform duration-200"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <GradingBadge
            grade={listing.grade}
            showHelpIcon
            onOpenGradingGuide={() => onOpenGradingGuide(listing.grade)}
            size="sm"
          />

          {listing.allowsParqueRivadavia && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <MapPin className="w-3 h-3" />
              <span>Parque Rivadavia</span>
            </span>
          )}
        </div>

        {/* Flip Button */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPhotoSide(prev => (prev === 'obverse' ? 'reverse' : 'obverse'));
            }}
            className="text-xs font-medium px-2.5 py-1 rounded bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-xs hover:bg-white"
          >
            {photoSide === 'obverse' ? 'Ver Reverso' : 'Ver Anverso'}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {listing.country} • {listing.year} • {listing.metal}
          </div>

          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1 line-clamp-1">
            {listing.title}
          </h3>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {listing.publicComment}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {dualPrice.primaryText}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {dualPrice.secondaryText}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {listing.acceptsOffers && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOffer(listing);
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
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
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1"
            >
              <span>Ver</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
