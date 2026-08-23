import React, { useState } from 'react';
import { CoinListing } from '../types/coin';
import { useCurrency } from '../context/CurrencyContext';
import { GradingBadge } from './GradingBadge';
import { MapPin, Sparkles, Handshake, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [photoSide, setPhotoSide] = useState<'obverse' | 'reverse'>('obverse');

  const dualPrice = formatDualPrice(listing.basePrice, listing.baseCurrency);

  return (
    <div
      onClick={() => onSelect(listing)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPhotoSide('obverse');
      }}
      className="group relative flex flex-col rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-amber-500/40 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <GradingBadge
          grade={listing.grade}
          showHelpIcon
          onOpenGradingGuide={() => onOpenGradingGuide(listing.grade)}
          size="sm"
        />

        {listing.allowsParqueRivadavia && (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur"
            title={`Retiro en Parque Rivadavia: ${listing.seller.parqueFrequency}`}
          >
            <MapPin className="w-3 h-3" />
            <span>P. Rivadavia</span>
          </span>
        )}
      </div>

      {/* Image Container with Anverso / Reverso toggle */}
      <div className="relative w-full aspect-square bg-zinc-950/80 flex items-center justify-center p-4 overflow-hidden border-b border-zinc-800/60">
        <img
          src={photoSide === 'obverse' ? listing.photos.obverse : listing.photos.reverse}
          alt={listing.title}
          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Flip button overlay */}
        <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPhotoSide(prev => (prev === 'obverse' ? 'reverse' : 'obverse'));
            }}
            className="text-[11px] font-medium px-2 py-1 rounded-md bg-black/75 hover:bg-black text-zinc-200 backdrop-blur border border-zinc-700/60 transition-all shadow"
          >
            {photoSide === 'obverse' ? 'Ver Reverso ↺' : 'Ver Anverso ↻'}
          </button>
        </div>

        {listing.featured && (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur">
              <Sparkles className="w-3 h-3" /> Destacada
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-between p-4 space-y-3">
        <div>
          {/* Metadata chips */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span>{listing.country}</span>
            <span>•</span>
            <span className="font-semibold text-zinc-300">{listing.year}</span>
            <span>•</span>
            <span className="truncate">{listing.metal}</span>
          </div>

          <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-1 mt-1 font-numismatic">
            {listing.title}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {listing.publicComment}
          </p>
        </div>

        {/* Pricing & Logistics Info */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-amber-400 font-mono">
                {dualPrice.primaryText}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                {dualPrice.secondaryText}
              </div>
            </div>

            {/* Seller micro-badge */}
            <div className="text-right text-xs">
              <span className="text-zinc-400 block text-[11px]">Vendedor</span>
              <span className="font-medium text-zinc-200 hover:underline">
                {listing.seller.username} ★ {listing.seller.rating}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3 grid grid-cols-2 gap-2 pt-2">
            {listing.acceptsOffers ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOffer(listing);
                }}
                className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-all"
              >
                <Handshake className="w-3.5 h-3.5 text-amber-400" />
                <span>Ofertar</span>
              </button>
            ) : (
              <div className="inline-flex items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-medium bg-zinc-800/40 text-zinc-500">
                Precio Fijo
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(listing);
              }}
              className="inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-all shadow-sm shadow-amber-400/10"
            >
              <span>Ver Ficha</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
