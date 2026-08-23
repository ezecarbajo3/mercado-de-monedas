import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Plus, ArrowRight, ShieldCheck, MapPin, Scale } from 'lucide-react';

interface HeroCinematicProps {
  onExploreClick: () => void;
  onPublishClick: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onExploreClick,
  onPublishClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse tilt tracking state for 3D coin perspective
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<'obverse' | 'reverse'>('obverse');
  const [manualRotation, setManualRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const currentRotation = useRef<number>(0);

  // Handle smooth mouse move parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Drag-to-spin interaction for 3D coin
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    currentRotation.current += deltaX * 0.8;
    setManualRotation(currentRotation.current);
    dragStartX.current = e.clientX;
  };

  const handleGlobalMouseUp = () => {
    if (isDragging) setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Canvas background for ambient floating particles & light motes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw floating light motes
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 150, 100, ${currentOpacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 text-white border border-zinc-800 shadow-2xl p-6 sm:p-10 lg:p-14 mb-8"
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full opacity-60"
      />

      {/* Ambient Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-zinc-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Narrative & Typography */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 text-xs tracking-wider uppercase font-medium backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Revolución Numismática</span>
            <span className="text-zinc-500">•</span>
            <span className="text-amber-400/90 font-semibold">Ecosistema Federal</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100 leading-tight">
            Una nueva forma de percibir, comprar y vender numismática.
          </h1>

          {/* Subtitle / Philosophy */}
          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-2xl">
            El nuevo espacio que unifica a coleccionistas, comerciantes y apasionados de todo el país. 
            Acceso libre para catalogar y vender piezas históricas con escala de conservación transparente, 
            cotizaciones en tiempo real y logística presencial en Parque Rivadavia o envíos a todo el territorio nacional.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-100 text-zinc-900 font-semibold text-xs sm:text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer group"
            >
              <span>Explorar Publicaciones</span>
              <ArrowDown className="w-4 h-4 text-zinc-900 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onPublishClick}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-200 font-medium text-xs sm:text-sm border border-zinc-700/80 hover:border-zinc-600 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Publicar Moneda</span>
            </button>
          </div>

          {/* Key Value Points */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Escala PR a SC (+ / -)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Punto Parque Rivadavia</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Comunidad Verificada</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Rotating Coin Stage */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center select-none">
          <div
            className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-grab active:cursor-grabbing perspective-1000"
            onMouseDown={handleMouseDown}
            style={{
              perspective: '1000px'
            }}
          >
            {/* 3D Rotating Coin Cylinder */}
            <div
              className="w-full h-full relative transition-transform duration-100 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${manualRotation + tilt.x * 25}deg) rotateX(${-tilt.y * 20}deg)`
              }}
            >
              {/* Coin Obverse (Front) */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden p-2 bg-gradient-to-tr from-zinc-800 via-amber-900/30 to-zinc-700 border-2 border-amber-400/40 shadow-2xl flex items-center justify-center backdrop-blur-sm"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <img
                  src="/grading/746119962_27152987804401733_5967603319989396481_n.jpg"
                  alt="Anverso Numismático"
                  className="w-full h-full object-contain rounded-full drop-shadow-lg"
                  draggable={false}
                />
                {/* Dynamic Specular Metallic Gleam Reflection */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    background: `linear-gradient(${135 + tilt.x * 60}deg, rgba(255,255,255,0.8) 0%, transparent 60%)`
                  }}
                />
              </div>

              {/* Coin Reverse (Back) */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden p-2 bg-gradient-to-tr from-zinc-800 via-amber-900/30 to-zinc-700 border-2 border-amber-400/40 shadow-2xl flex items-center justify-center backdrop-blur-sm"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <img
                  src="/grading/748216107_27152987704401743_1830395168745860999_n.jpg"
                  alt="Reverso Numismático"
                  className="w-full h-full object-contain rounded-full drop-shadow-lg"
                  draggable={false}
                />
                {/* Dynamic Specular Metallic Gleam Reflection */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    background: `linear-gradient(${135 - tilt.x * 60}deg, rgba(255,255,255,0.8) 0%, transparent 60%)`
                  }}
                />
              </div>
            </div>

            {/* Orbiting Subtle Secondary Floating Coin (Patacón) */}
            <div
              className="absolute -top-3 -right-3 w-16 h-16 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/90 p-1 shadow-lg pointer-events-none animate-bounce"
              style={{
                animationDuration: '4s',
                transform: `translate(${tilt.x * -12}px, ${tilt.y * -12}px)`
              }}
            >
              <img
                src="/grading/747723404_27152986841068496_3313306645566800214_n.jpg"
                alt=""
                className="w-full h-full object-contain rounded-full opacity-85"
              />
            </div>

            {/* Orbiting Subtle Secondary Floating Coin (8 Reales) */}
            <div
              className="absolute -bottom-2 -left-2 w-14 h-14 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/90 p-1 shadow-lg pointer-events-none animate-bounce"
              style={{
                animationDuration: '5s',
                animationDelay: '1s',
                transform: `translate(${tilt.x * 10}px, ${tilt.y * 10}px)`
              }}
            >
              <img
                src="/grading/748639825_27152987617735085_5386531957040200274_n.jpg"
                alt=""
                className="w-full h-full object-contain rounded-full opacity-80"
              />
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="mt-3 text-[11px] text-zinc-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Arrastrá la pieza para girar en 3D o mové el cursor</span>
          </div>
        </div>
      </div>
    </section>
  );
};
