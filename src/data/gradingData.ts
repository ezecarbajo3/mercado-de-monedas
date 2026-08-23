import { GradingGrade } from '../types/coin';

export interface GradingInfo {
  grade: GradingGrade;
  codeEs: string;       // Ej: MB, MB+, EX-, EX, SC
  nameEs: string;       // Ej: Muy Buena +
  nameEn: string;       // Ej: Fine +
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
    codeEs: 'M',
    nameEs: 'Mala',
    nameEn: 'Poor',
    badgeColor: 'text-zinc-700 dark:text-zinc-300',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700',
    order: 1,
    shortDesc: 'Pérdida severa de relieve. Leyendas y fecha casi ilegibles.',
    detailedAnalysis: [
      'Superficie prácticamente lisa por desgaste extremo.',
      'El diseño apenas se intuye por la silueta general.'
    ],
    wearPoints: ['Relieve 95% desgastado', 'Borde plano', 'Leyenda borrada'],
    referenceImage: '/grading/746919749_27152980324402481_4554811840699140924_n.jpg',
    exampleCoin: 'Morgan Dollar 1901 liso'
  },
  G: {
    grade: 'G',
    codeEs: 'R',
    nameEs: 'Regular',
    nameEn: 'Good',
    badgeColor: 'text-amber-800 dark:text-amber-400',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
    order: 2,
    shortDesc: 'Muy desgastada. Siluetas aplanadas pero leyendas y contornos identificables.',
    detailedAnalysis: [
      'Desgaste generalizado en anverso y reverso.',
      'Bordes parcialmente fusionados con el campo.'
    ],
    wearPoints: ['Bordes desgastados', 'Pelo y coronas planos', 'Fecha visible'],
    referenceImage: '/grading/746947225_27152979961069184_8086938722379093971_n.jpg',
    exampleCoin: 'Morgan Dollar 1887 gastada'
  },
  'G+': {
    grade: 'G+',
    codeEs: 'R+',
    nameEs: 'Regular +',
    nameEn: 'Good +',
    badgeColor: 'text-amber-800 dark:text-amber-400',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60',
    order: 3,
    shortDesc: 'Ligeramente superior a Regular. Fecha más nítida.',
    detailedAnalysis: ['Mayor nitidez en los contornos principales que un Regular típico.'],
    wearPoints: ['Fecha clara', 'Silueta definida'],
    referenceImage: '/grading/746947225_27152979961069184_8086938722379093971_n.jpg',
    exampleCoin: 'Morgan Dollar 1887'
  },
  'VG-': {
    grade: 'VG-',
    codeEs: 'B-',
    nameEs: 'Buena -',
    nameEn: 'Very Good -',
    badgeColor: 'text-orange-800 dark:text-orange-400',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/60',
    order: 4,
    shortDesc: 'Transición entre Regular y Buena. Borde exterior comienza a definirse.',
    detailedAnalysis: ['Mayor relieve que G+, bordes completos en casi toda la circunferencia.'],
    wearPoints: ['Borde casi completo', 'Leyenda legible'],
    referenceImage: '/grading/747761100_27152980361069144_1954682246178741865_n.jpg',
    exampleCoin: 'Morgan Dollar 1900'
  },
  VG: {
    grade: 'VG',
    codeEs: 'B',
    nameEs: 'Buena',
    nameEn: 'Very Good',
    badgeColor: 'text-orange-800 dark:text-orange-400',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/60',
    order: 5,
    shortDesc: 'Relieves gastados pero con contornos y leyendas completas.',
    detailedAnalysis: [
      'Relieves centrales planos pero todos los textos son legibles.',
      'Borde exterior completo y separado del campo.'
    ],
    wearPoints: ['Detalles finos borrados', 'Leyendas 100% legibles', 'Borde nítido'],
    referenceImage: '/grading/747761100_27152980361069144_1954682246178741865_n.jpg',
    exampleCoin: 'Morgan Dollar 1900 con pátina'
  },
  'VG+': {
    grade: 'VG+',
    codeEs: 'B+',
    nameEs: 'Buena +',
    nameEn: 'Very Good +',
    badgeColor: 'text-orange-800 dark:text-orange-400',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/60',
    order: 6,
    shortDesc: 'Buena destacada. Comienzan a asomar líneas internas del diseño.',
    detailedAnalysis: ['Excelente lectura de leyendas con leves trazos de detalle secundario.'],
    wearPoints: ['Borde impecable', 'Textos limpios'],
    referenceImage: '/grading/747761100_27152980361069144_1954682246178741865_n.jpg',
    exampleCoin: 'Morgan Dollar 1900'
  },
  'F-': {
    grade: 'F-',
    codeEs: 'MB-',
    nameEs: 'Muy Buena -',
    nameEn: 'Fine -',
    badgeColor: 'text-yellow-800 dark:text-yellow-400',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/60',
    order: 7,
    shortDesc: 'Casi Muy Buena. Alrededor del 40% del detalle original visible.',
    detailedAnalysis: ['Relieves con desgaste moderado pero superior a VG+.'],
    wearPoints: ['Detalles intermedios visibles', 'Sin marcas graves'],
    referenceImage: '/grading/748811511_27152980067735840_3592264745012705270_n.jpg',
    exampleCoin: 'Morgan Dollar 1900'
  },
  F: {
    grade: 'F',
    codeEs: 'MB',
    nameEs: 'Muy Buena',
    nameEn: 'Fine',
    badgeColor: 'text-yellow-800 dark:text-yellow-400',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/60',
    order: 8,
    shortDesc: 'Desgaste moderado pero uniforme. Alrededor del 50% de detalles finos visibles.',
    detailedAnalysis: [
      'En efigies se distinguen mechones de cabello principales.',
      'En escudos, ramas y cintas muestran relieve definido.'
    ],
    wearPoints: ['50% de detalle visible', 'Relieve medio intacto', 'Desgaste uniforme'],
    referenceImage: '/grading/748811511_27152980067735840_3592264745012705270_n.jpg',
    exampleCoin: 'Morgan Dollar 1900'
  },
  'F+': {
    grade: 'F+',
    codeEs: 'MB+',
    nameEs: 'Muy Buena +',
    nameEn: 'Fine +',
    badgeColor: 'text-yellow-800 dark:text-yellow-400',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/60',
    order: 9,
    shortDesc: 'Muy Buena superior (MB+). Casi el 60-65% de detalles finos presentes.',
    detailedAnalysis: ['Mayor nitidez en los relieves secundarios y leyendas perfectas.'],
    wearPoints: ['60% de detalle', 'Pátina limpia', 'Relieve alto'],
    referenceImage: '/grading/748811511_27152980067735840_3592264745012705270_n.jpg',
    exampleCoin: 'Morgan Dollar 1900'
  },
  'VF-': {
    grade: 'VF-',
    codeEs: 'MF-',
    nameEs: 'Muy Fina -',
    nameEn: 'Very Fine -',
    badgeColor: 'text-teal-800 dark:text-teal-400',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60',
    order: 10,
    shortDesc: 'Transición a Muy Fina. Relieves nítidos con desgaste leve en zonas salientes.',
    detailedAnalysis: ['Alrededor del 70% de todo el detalle original visible.'],
    wearPoints: ['Desgaste sólo en puntos altos', 'Excelente presencia'],
    referenceImage: '/grading/747235957_27152987717735075_1596405980242332744_n.jpg',
    exampleCoin: 'Morgan Dollar 1903'
  },
  VF: {
    grade: 'VF',
    codeEs: 'MF',
    nameEs: 'Muy Fina',
    nameEn: 'Very Fine',
    badgeColor: 'text-teal-800 dark:text-teal-400',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60',
    order: 11,
    shortDesc: 'Ligero desgaste únicamente en los puntos más altos. 75%+ de detalle.',
    detailedAnalysis: [
      'Desgaste leve sobre la oreja o puntos salientes del relieve.',
      'Mantiene gran nitidez general.'
    ],
    wearPoints: ['Desgaste sólo en puntos salientes', 'Gran nitidez'],
    referenceImage: '/grading/747235957_27152987717735075_1596405980242332744_n.jpg',
    exampleCoin: 'Morgan Dollar 1903'
  },
  'VF+': {
    grade: 'VF+',
    codeEs: 'MF+',
    nameEs: 'Muy Fina +',
    nameEn: 'Very Fine +',
    badgeColor: 'text-teal-800 dark:text-teal-400',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60',
    order: 12,
    shortDesc: 'Muy Fina destacada (MF+). Más del 80% de detalle y trazas de brillo.',
    detailedAnalysis: ['Excelente nitidez con desgaste mínimo concentrado en micro-relieves.'],
    wearPoints: ['80%+ de detalle', 'Trazas de brillo'],
    referenceImage: '/grading/747235957_27152987717735075_1596405980242332744_n.jpg',
    exampleCoin: 'Morgan Dollar 1903'
  },
  'XF-': {
    grade: 'XF-',
    codeEs: 'EX-',
    nameEs: 'Excelente -',
    nameEn: 'Extra Fine -',
    badgeColor: 'text-blue-800 dark:text-blue-400',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60',
    order: 13,
    shortDesc: 'Excelente inicial (EX-). Alrededor del 85-90% de detalle original.',
    detailedAnalysis: ['Poco uso. Todos los campos y leyendas en óptimo estado.'],
    wearPoints: ['Circulación mínima', 'Campos limpios'],
    referenceImage: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
    exampleCoin: 'Morgan Dollar 1881'
  },
  XF: {
    grade: 'XF',
    codeEs: 'EX',
    nameEs: 'Excelente',
    nameEn: 'Extra Fine',
    badgeColor: 'text-blue-800 dark:text-blue-400',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60',
    order: 14,
    shortDesc: 'Moneda casi nueva. Circulación mínima, sin golpes visibles. 90-95% de cuño.',
    detailedAnalysis: [
      'Pérdida leve de brillo por manipulación breve.',
      'Detalles microscópicos claramente apreciables.'
    ],
    wearPoints: ['Micro-desgaste casi imperceptible', 'Contorno perfecto'],
    referenceImage: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
    exampleCoin: 'Morgan Dollar 1881'
  },
  'XF+': {
    grade: 'XF+',
    codeEs: 'EX+',
    nameEs: 'Excelente +',
    nameEn: 'Extra Fine +',
    badgeColor: 'text-blue-800 dark:text-blue-400',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60',
    order: 15,
    shortDesc: 'Excelente superior (EX+). Conserva gran parte del brillo original de ceca.',
    detailedAnalysis: ['Prácticamente sin circular salvo por leve roce de almacenaje.'],
    wearPoints: ['Brillo abundante', 'Detalle 95%+'],
    referenceImage: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
    exampleCoin: 'Morgan Dollar 1881'
  },
  'UNC-': {
    grade: 'UNC-',
    codeEs: 'SC-',
    nameEs: 'Sin Circular - (Casi SC)',
    nameEn: 'About Uncirculated',
    badgeColor: 'text-emerald-800 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
    order: 16,
    shortDesc: 'Casi Sin Circular. Roce mínimo de bolsa en los puntos más prominentes.',
    detailedAnalysis: ['Conserva más del 90% de su brillo original (Mint Luster).'],
    wearPoints: ['Brillo de ceca predominante', 'Sin desgaste de circulación'],
    referenceImage: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
    exampleCoin: 'Morgan Dollar 1881'
  },
  UNC: {
    grade: 'UNC',
    codeEs: 'SC',
    nameEs: 'Sin Circular',
    nameEn: 'Uncirculated',
    badgeColor: 'text-emerald-800 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
    order: 17,
    shortDesc: 'Nueva de ceca. Jamás circuló. Conserva su brillo original completo.',
    detailedAnalysis: [
      'Cero desgaste por fricción o circulación.',
      'Campos inmaculados con brillo de acuñación de fábrica (Mint Luster).'
    ],
    wearPoints: ['100% Mint Luster', 'Sin desgaste', 'Cuño intacto'],
    referenceImage: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
    exampleCoin: 'Morgan Dollar 1881 brillante'
  },
  'UNC+': {
    grade: 'UNC+',
    codeEs: 'SC+',
    nameEs: 'Sin Circular + (Gem UNC)',
    nameEn: 'Gem Uncirculated',
    badgeColor: 'text-emerald-800 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60',
    order: 18,
    shortDesc: 'Flor de Cuño inmaculada. Acuñación perfecta sin marcas de bolsa.',
    detailedAnalysis: ['Ejemplar de calidad excepcional, campos relucientes.'],
    wearPoints: ['Flor de Cuño', 'Calidad superior de ceca'],
    referenceImage: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
    exampleCoin: 'Morgan Dollar 1881 Gem'
  },
  PROOF: {
    grade: 'PROOF',
    codeEs: 'PROOF',
    nameEs: 'Prueba / Fondo Espejo',
    nameEn: 'Proof',
    badgeColor: 'text-purple-800 dark:text-purple-400',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60',
    order: 19,
    shortDesc: 'Acuñación especial. Cuños pulidos a espejo y figuras satinadas.',
    detailedAnalysis: [
      'Acuñación especial para coleccionistas.',
      'Campos pulidos a espejo que reflejan la luz intensamente.',
      'Figuras satinadas con relieve nítido.'
    ],
    wearPoints: ['Fondo espejo perfecto', 'Relieve satinado', 'Doble golpe de cuño'],
    referenceImage: '/grading/748231437_27152987897735057_9034323197136443681_n.jpg',
    exampleCoin: 'Silver Eagle 2006 Proof'
  }
};

export const GRADING_ORDER: GradingGrade[] = [
  'PR',
  'G', 'G+',
  'VG-', 'VG', 'VG+',
  'F-', 'F', 'F+',
  'VF-', 'VF', 'VF+',
  'XF-', 'XF', 'XF+',
  'UNC-', 'UNC', 'UNC+',
  'PROOF'
];
