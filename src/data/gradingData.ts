import { GradingGrade } from '../types/coin';

export interface GradingInfo {
  grade: GradingGrade;
  nameEs: string;
  nameEn: string;
  badgeColor: string;
  badgeBg: string;
  order: number;
  shortDesc: string;
  detailedAnalysis: string[];
  wearPoints: string[];
  referenceImage: string;
  exampleCoin: string;
}

export const GRADING_SCALE: Record<GradingGrade, GradingInfo> = {
  PR: {
    grade: 'PR',
    nameEs: 'Mala',
    nameEn: 'Poor',
    badgeColor: 'text-zinc-400',
    badgeBg: 'bg-zinc-800/80 border-zinc-700',
    order: 1,
    shortDesc: 'Pérdida severa de relieve. Leyendas y fecha casi ilegibles.',
    detailedAnalysis: [
      'Superficie prácticamente lisa por desgaste extremo.',
      'El diseño apenas se intuye por la silueta general.',
      'Puede presentar golpes severos, corrosión o perforaciones de época.',
      'Solo coleccionable por extrema rareza histórica.'
    ],
    wearPoints: ['Relieve 95% desgastado', 'Borde plano', 'Leyenda borrada'],
    referenceImage: '/grading/746919749_27152980324402481_4554811840699140924_n.jpg',
    exampleCoin: 'Morgan Dollar 1901 liso'
  },
  G: {
    grade: 'G',
    nameEs: 'Regular',
    nameEn: 'Good',
    badgeColor: 'text-amber-600 dark:text-amber-500',
    badgeBg: 'bg-amber-950/40 border-amber-800/50',
    order: 2,
    shortDesc: 'Muy desgastada. Siluetas aplanadas pero leyendas y contornos identificables.',
    detailedAnalysis: [
      'Desgaste generalizado en anverso y reverso.',
      'Los bordes pueden estar parcialmente fusionados con el campo.',
      'Fecha legible aunque con números debilitados.',
      'Sin brillo original.'
    ],
    wearPoints: ['Bordes desgastados', 'Pelo y coronas planos', 'Fecha visible'],
    referenceImage: '/grading/746947225_27152979961069184_8086938722379093971_n.jpg',
    exampleCoin: 'Morgan Dollar 1887 gastada'
  },
  VG: {
    grade: 'VG',
    nameEs: 'Buena',
    nameEn: 'Very Good',
    badgeColor: 'text-orange-500',
    badgeBg: 'bg-orange-950/40 border-orange-800/50',
    order: 3,
    shortDesc: 'Relieves muy gastados con contornos poco definidos. Leyendas y fecha completas.',
    detailedAnalysis: [
      'Relieves centrales planos pero todos los textos e inscripciones son legibles.',
      'Borde exterior completo y separado del campo de la moneda.',
      'Marcas de circulación visibles sin afectar la estructura básica.'
    ],
    wearPoints: ['Detalles finos borrados', 'Leyendas 100% legibles', 'Borde nítido'],
    referenceImage: '/grading/747761100_27152980361069144_1954682246178741865_n.jpg',
    exampleCoin: 'Morgan Dollar 1900 con pátina'
  },
  F: {
    grade: 'F',
    nameEs: 'Muy Buena',
    nameEn: 'Fine',
    badgeColor: 'text-yellow-500',
    badgeBg: 'bg-yellow-950/40 border-yellow-800/50',
    order: 4,
    shortDesc: 'Desgaste moderado pero uniforme. Se distinguen detalles altos del diseño.',
    detailedAnalysis: [
      'Alrededor del 50% de los detalles finos son visibles.',
      'En efigies, se distinguen mechones de cabello y líneas de ropa.',
      'En escudos, las ramas y cintas muestran relieve definido.'
    ],
    wearPoints: ['50% de detalle visible', 'Relieve medio intacto', 'Desgaste uniforme'],
    referenceImage: '/grading/748811511_27152980067735840_3592264745012705270_n.jpg',
    exampleCoin: 'Morgan Dollar 1900'
  },
  VF: {
    grade: 'VF',
    nameEs: 'Muy Fina',
    nameEn: 'Very Fine',
    badgeColor: 'text-teal-400',
    badgeBg: 'bg-teal-950/40 border-teal-800/50',
    order: 5,
    shortDesc: 'Ligero desgaste únicamente en los puntos más altos. Mantiene gran atractivo.',
    detailedAnalysis: [
      'Aproximadamente 75% o más del detalle original presente.',
      'Desgaste leve sobre la oreja, mejilla o plumas de águilas.',
      'Puede conservar rastros de brillo original en las zonas protegidas.'
    ],
    wearPoints: ['Desgaste sólo en puntos salientes', 'Brillo remanente', 'Excelente nitidez'],
    referenceImage: '/grading/747235957_27152987717735075_1596405980242332744_n.jpg',
    exampleCoin: 'Morgan Dollar 1903'
  },
  XF: {
    grade: 'XF',
    nameEs: 'Excelente',
    nameEn: 'Extra Fine',
    badgeColor: 'text-blue-400',
    badgeBg: 'bg-blue-950/40 border-blue-800/50',
    order: 6,
    shortDesc: 'Moneda casi nueva. Circulación mínima, sin golpes ni rayas a simple vista.',
    detailedAnalysis: [
      '90-95% del diseño y cuño original en perfecto estado.',
      'Pérdida leve de brillo por manipulación muy breve.',
      'Todos los detalles microscópicos son claramente apreciables.'
    ],
    wearPoints: ['Micro-desgaste casi imperceptible', 'Campos limpios', 'Contorno perfecto'],
    referenceImage: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
    exampleCoin: 'Morgan Dollar 1881'
  },
  UNC: {
    grade: 'UNC',
    nameEs: 'Sin Circular (Flor de Cuño)',
    nameEn: 'Uncirculated',
    badgeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/40 border-emerald-800/50',
    order: 7,
    shortDesc: 'Nueva de ceca. Jamás circuló. Conserva 100% de brillo original (Mint Luster).',
    detailedAnalysis: [
      'Cero desgaste por fricción o circulación.',
      'Campos inmaculados con efecto rueda de carro (cartwheel luster).',
      'Estado máximo de preservación para monedas estándar.'
    ],
    wearPoints: ['100% Mint Luster', 'Sin desgaste', 'Cuño de fábrica intacto'],
    referenceImage: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
    exampleCoin: 'Morgan Dollar 1881 brillante'
  },
  PROOF: {
    grade: 'PROOF',
    nameEs: 'Prueba / Fondo Espejo',
    nameEn: 'Proof',
    badgeColor: 'text-purple-400',
    badgeBg: 'bg-purple-950/40 border-purple-800/50',
    order: 8,
    shortDesc: 'Acuñación especial de colección. Cuños pulidos, fondo espejo y figuras mate.',
    detailedAnalysis: [
      'No es un grado de desgaste, sino un método de fabricación premium.',
      'Campos pulidos a espejo que reflejan la luz intensamente.',
      'Figuras satinadas con efecto camafeo (Cam / DCam).',
      'Habitualmente presentada en cápsulas selladas de origen.'
    ],
    wearPoints: ['Fondo espejo perfecto', 'Relieve mate satinado', 'Acuñación doble golpe'],
    referenceImage: '/grading/748231437_27152987897735057_9034323197136443681_n.jpg',
    exampleCoin: 'Silver Eagle 2006 Proof'
  }
};

export const GRADING_ORDER: GradingGrade[] = ['PR', 'G', 'VG', 'F', 'VF', 'XF', 'UNC', 'PROOF'];
