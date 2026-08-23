import React from 'react';
import { ArrowDown, Plus, Sparkles, Scale, MapPin, ShieldCheck, Award } from 'lucide-react';

interface HeroCinematicProps {
  onExploreClick: () => void;
  onPublishClick: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onExploreClick,
  onPublishClick
}) => {
  const showcaseCoins = [
    {
      title: '8 Reales 1813 Potosí J',
      category: 'Primera Moneda Patria',
      image: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
      metal: 'Plata .900',
      grade: 'VF+'
    },
    {
      title: '1 Patacón 1881 Oudiné',
      category: 'Ley 1130 Nacional',
      image: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
      metal: 'Plata .900',
      grade: 'XF+'
    },
    {
      title: '5 Pesos Argentino 1888',
      category: 'Medio Argentino de Oro',
      image: '/grading/748231437_27152987897735057_9034323197136443681_n.jpg',
      metal: 'Oro .900',
      grade: 'UNC'
    },
    {
      title: '50 Centavos 1941 Libertad',
      category: 'Numismática Siglo XX',
      image: '/grading/747235957_27152987717735075_1596405980242332744_n.jpg',
      metal: 'Cuproníquel',
      grade: 'VF+'
    }
  ];

  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-zinc-950 text-white border border-zinc-800/80 shadow-2xl mb-8">
      {/* Background Video Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 filter brightness-90 contrast-125 scale-105"
          poster="/grading/746119962_27152987804401733_5967603319989396481_n.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-gold-coins-falling-on-a-table-42360-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-turning-a-gold-coin-around-42359-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Film Vignette & Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 space-y-10">
        {/* Top Header & Manifesto */}
        <div className="max-w-3xl space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 text-xs tracking-wider uppercase font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Revolución Numismática</span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-400 font-semibold">Mercado Federal</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.15]">
            Una nueva forma de percibir, comprar y vender numismática.
          </h1>

          {/* Core Manifesto Text */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            El nuevo espacio que unifica a coleccionistas, comercios y apasionados de todo el país. 
            Acceso libre para catalogar y comercializar piezas históricas con escala de conservación transparente, 
            cotizaciones actualizadas al instante y la posibilidad de coordinar entregas seguras en Parque Rivadavia o envíos a toda la Argentina.
          </p>

          {/* Direct CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-100 hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Explorar Publicaciones</span>
              <ArrowDown className="w-4 h-4 text-zinc-900 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onPublishClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 font-medium text-xs sm:text-sm border border-zinc-700 hover:border-zinc-500 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Publicar Moneda</span>
            </button>
          </div>
        </div>

        {/* Curated Historical Coin Reel (Showcase de piezas emblemáticas) */}
        <div className="space-y-3 pt-4 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Piezas emblemáticas en circulación</span>
            </div>
            <span className="hidden sm:inline text-zinc-500">Autenticidad & Grados Numismáticos</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {showcaseCoins.map((coin, idx) => (
              <div
                key={idx}
                className="group p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/70 border border-zinc-800 hover:border-zinc-600 transition-all backdrop-blur-xs flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-lg bg-black/40 border border-zinc-700/60 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={coin.image}
                    alt={coin.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-amber-400/90 block truncate">
                    {coin.category}
                  </span>
                  <h4 className="text-xs font-semibold text-zinc-100 truncate">
                    {coin.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400 font-mono">
                    <span>{coin.metal}</span>
                    <span>•</span>
                    <span className="text-zinc-300 font-semibold">{coin.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Marketplace Tape / Marquee */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Escala Numismática (PR a SC con + y -)</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Punto de Encuentro Parque Rivadavia (Domingos)</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Compra Directa & Sistema de Ofertas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
