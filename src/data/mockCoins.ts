import { CoinListing, CatalogItem, Seller } from '../types/coin';

export const MOCK_SELLERS: Record<string, Seller> = {
  numis_mardel: {
    id: 's1',
    username: 'NumismaticaMardel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    province: 'Buenos Aires',
    city: 'Mar del Plata',
    rating: 4.9,
    reviewsCount: 142,
    memberSince: 'Marzo 2023',
    allowsParqueRivadavia: true,
    parqueFrequency: 'Mensual (1er domingo del mes)',
    verified: true,
    stats: {
      conservationAccuracy: 98,
      packagingQuality: 99,
      punctuality: 97
    }
  },
  caba_collector: {
    id: 's2',
    username: 'ColeccionistaCABA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    province: 'CABA',
    city: 'Caballito',
    rating: 5.0,
    reviewsCount: 310,
    memberSince: 'Enero 2022',
    allowsParqueRivadavia: true,
    parqueFrequency: 'Todos los domingos',
    verified: true,
    stats: {
      conservationAccuracy: 100,
      packagingQuality: 98,
      punctuality: 100
    }
  },
  salta_colonial: {
    id: 's3',
    username: 'TesorosDelNorte',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    province: 'Salta',
    city: 'Salta Capital',
    rating: 4.8,
    reviewsCount: 85,
    memberSince: 'Agosto 2023',
    allowsParqueRivadavia: false,
    parqueFrequency: 'No realiza entregas en Parque',
    verified: false,
    stats: {
      conservationAccuracy: 95,
      packagingQuality: 96,
      punctuality: 94
    }
  },
  rosario_oro: {
    id: 's4',
    username: 'NumisRosario',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    province: 'Santa Fe',
    city: 'Rosario',
    rating: 4.95,
    reviewsCount: 220,
    memberSince: 'Mayo 2022',
    allowsParqueRivadavia: true,
    parqueFrequency: 'Quincenal (1er y 3er domingo)',
    verified: true,
    stats: {
      conservationAccuracy: 99,
      packagingQuality: 100,
      punctuality: 98
    }
  }
};

export const MOCK_LISTINGS: CoinListing[] = [
  // 50 Centavos 1941 - Vendedor 1 (UNC)
  {
    id: 'coin-50c-1941-unc',
    catalogId: 'cat-50c-1941',
    title: '50 Centavos 1941 Libertad',
    country: 'Argentina',
    year: 1941,
    faceValue: '50 Centavos',
    metal: 'Cuproníquel',
    diameterMm: 25.0,
    weightG: 6.5,
    grade: 'UNC',
    basePrice: 12000,
    baseCurrency: 'ARS',
    acceptsOffers: true,
    kmReference: 'KM# 39',
    cjReference: 'CJ# 42.1',
    sku: 'B-12-ARG-50C',
    publicComment: 'Exemplar impecable sin circular. Conserva 100% del brillo de acuñación original (Mint Luster). Sin golpes en el canto.',
    privateComment: 'Adquirido en lote San Telmo. Caja 4, bandeja A.',
    photos: {
      obverse: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
      reverse: '/grading/748216107_27152987704401743_1830395168745860999_n.jpg',
      edge: '/grading/747881795_27152988001068380_8938265844010689342_n.jpg'
    },
    seller: MOCK_SELLERS.numis_mardel,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: true,
    viewsCount: 384,
    createdAt: '2026-08-20T10:00:00Z'
  },
  // 50 Centavos 1941 - Vendedor 2 (VF)
  {
    id: 'coin-50c-1941-vf',
    catalogId: 'cat-50c-1941',
    title: '50 Centavos 1941 - Muy Fina (VF)',
    country: 'Argentina',
    year: 1941,
    faceValue: '50 Centavos',
    metal: 'Cuproníquel',
    diameterMm: 25.0,
    weightG: 6.5,
    grade: 'VF',
    basePrice: 6500,
    baseCurrency: 'ARS',
    acceptsOffers: false,
    kmReference: 'KM# 39',
    cjReference: 'CJ# 42.1',
    sku: 'ALB-3-1941',
    publicComment: 'Muy buena definición en los rayos de la libertad y escudo. Desgaste leve uniforme.',
    photos: {
      obverse: '/grading/747235957_27152987717735075_1596405980242332744_n.jpg',
      reverse: '/grading/747903783_27152987411068439_3279205326141260011_n.jpg'
    },
    seller: MOCK_SELLERS.caba_collector,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: false,
    viewsCount: 192,
    createdAt: '2026-08-19T14:30:00Z'
  },
  // 50 Centavos 1941 - Vendedor 3 (G)
  {
    id: 'coin-50c-1941-g',
    catalogId: 'cat-50c-1941',
    title: '50 Centavos 1941 (Estado Regular G)',
    country: 'Argentina',
    year: 1941,
    faceValue: '50 Centavos',
    metal: 'Cuproníquel',
    diameterMm: 25.0,
    weightG: 6.4,
    grade: 'G',
    basePrice: 2500,
    baseCurrency: 'ARS',
    acceptsOffers: true,
    kmReference: 'KM# 39',
    cjReference: 'CJ# 42.1',
    sku: 'LOTE-DESG-01',
    publicComment: 'Ideal para principiantes o completar hueco de álbum. Fecha y leyendas legibles.',
    photos: {
      obverse: '/grading/746947225_27152979961069184_8086938722379093971_n.jpg',
      reverse: '/grading/746919749_27152980324402481_4554811840699140924_n.jpg'
    },
    seller: MOCK_SELLERS.salta_colonial,
    allowsParqueRivadavia: false,
    allowsShipping: true,
    featured: false,
    viewsCount: 95,
    createdAt: '2026-08-18T18:00:00Z'
  },
  // 8 Reales 1813 Provincias del Río de la Plata (Moneda Patria)
  {
    id: 'coin-8reales-1813',
    catalogId: 'cat-8reales-1813',
    title: '8 Reales 1813 Potosí J - Primera Moneda Patria',
    country: 'Argentina',
    year: 1813,
    faceValue: '8 Reales',
    metal: 'Plata (.900 / .925)',
    diameterMm: 39.0,
    weightG: 27.0,
    grade: 'VF',
    basePrice: 850,
    baseCurrency: 'USD',
    acceptsOffers: true,
    kmReference: 'KM# 14',
    cjReference: 'CJ# 1.1',
    sku: 'PATRIA-1813-01',
    publicComment: 'Extraordinaria pieza histórica de la Asamblea del Año XIII. Sol radiante de 32 rayos nítido, leyenda "EN UNION Y LIBERTAD" completa con hermosa pátina tornasolada.',
    photos: {
      obverse: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
      reverse: '/grading/748639825_27152987617735085_5386531957040200274_n.jpg'
    },
    seller: MOCK_SELLERS.rosario_oro,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: true,
    viewsCount: 1420,
    createdAt: '2026-08-21T09:15:00Z'
  },
  // 1 Patacón 1881 (1 Peso Plata)
  {
    id: 'coin-patacon-1881',
    catalogId: 'cat-patacon-1881',
    title: '1 Patacón 1881 (1 Peso Plata) Ley 1130',
    country: 'Argentina',
    year: 1881,
    faceValue: '1 Patacón / 1 Peso',
    metal: 'Plata (.900 / .925)',
    diameterMm: 37.0,
    weightG: 25.0,
    grade: 'XF',
    basePrice: 180,
    baseCurrency: 'USD',
    acceptsOffers: true,
    kmReference: 'KM# 29',
    cjReference: 'CJ# 12.1',
    sku: 'PATACON-81-XF',
    publicComment: 'Clásico indiscutido de la numismática argentina. Cabeza de la Libertad por Oudiné. Excelente conservación con casi todo su brillo original.',
    photos: {
      obverse: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
      reverse: '/grading/746761870_27152987977735049_4858162996151206616_n.jpg'
    },
    seller: MOCK_SELLERS.caba_collector,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: true,
    viewsCount: 890,
    createdAt: '2026-08-22T11:40:00Z'
  },
  // 5 Pesos Argentino Oro 1888
  {
    id: 'coin-oro-argentino-1888',
    catalogId: 'cat-oro-1888',
    title: '5 Pesos Argentino Oro 1888 (Medio Argentino)',
    country: 'Argentina',
    year: 1888,
    faceValue: '5 Pesos Oro',
    metal: 'Oro',
    diameterMm: 22.0,
    weightG: 8.06,
    grade: 'UNC',
    basePrice: 780,
    baseCurrency: 'USD',
    acceptsOffers: false,
    kmReference: 'KM# 31',
    cjReference: 'CJ# 15.3',
    sku: 'ORO-ARG-1888',
    publicComment: 'Pieza de oro nacional (.900 puro). Sin circular, estado flor de cuño inmaculado. Peso exacto 8.06 gramos.',
    photos: {
      obverse: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
      reverse: '/grading/748216107_27152987704401743_1830395168745860999_n.jpg'
    },
    seller: MOCK_SELLERS.rosario_oro,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: true,
    viewsCount: 2150,
    createdAt: '2026-08-22T16:20:00Z'
  },
  // Morgan Dollar 1881-S UNC
  {
    id: 'coin-morgan-1881s',
    catalogId: 'cat-morgan-1881',
    title: 'Morgan Silver Dollar 1881-S San Francisco',
    country: 'Estados Unidos',
    year: '1881-S',
    faceValue: '1 Dollar',
    metal: 'Plata (.900 / .925)',
    diameterMm: 38.1,
    weightG: 26.73,
    grade: 'UNC',
    basePrice: 95,
    baseCurrency: 'USD',
    acceptsOffers: true,
    kmReference: 'KM# 110',
    sku: 'USA-MORG-81S',
    publicComment: 'Acuñación ultra profunda característica de la ceca de San Francisco. Brillo satinado impecable.',
    photos: {
      obverse: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
      reverse: '/grading/748216107_27152987704401743_1830395168745860999_n.jpg'
    },
    seller: MOCK_SELLERS.numis_mardel,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: false,
    viewsCount: 460,
    createdAt: '2026-08-20T12:00:00Z'
  },
  // 1 Onza Silver Eagle 2006 PROOF
  {
    id: 'coin-eagle-proof-2006',
    catalogId: 'cat-eagle-2006',
    title: 'American Silver Eagle 2006-W PROOF (Fondo Espejo)',
    country: 'Estados Unidos',
    year: 2006,
    faceValue: '1 Dollar',
    metal: 'Plata (.900 / .925)',
    diameterMm: 40.6,
    weightG: 31.1,
    grade: 'PROOF',
    basePrice: 110,
    baseCurrency: 'USD',
    acceptsOffers: false,
    kmReference: 'KM# 273',
    sku: 'US-EAGLE-06-PRF',
    publicComment: '1 Onza troy de plata pura .999. Edición especial Proof acuñada en West Point con estuche y certificado original.',
    photos: {
      obverse: '/grading/748231437_27152987897735057_9034323197136443681_n.jpg',
      reverse: '/grading/747881795_27152988001068380_8938265844010689342_n.jpg'
    },
    seller: MOCK_SELLERS.caba_collector,
    allowsParqueRivadavia: true,
    allowsShipping: true,
    featured: true,
    viewsCount: 730,
    createdAt: '2026-08-21T18:50:00Z'
  }
];

export const MOCK_CATALOG: CatalogItem[] = [
  {
    id: 'cat-50c-1941',
    title: '50 Centavos - República Argentina',
    country: 'Argentina',
    year: 1941,
    faceValue: '50 Centavos',
    metal: 'Cuproníquel',
    diameterMm: 25.0,
    weightG: 6.5,
    kmReference: 'KM# 39',
    cjReference: 'CJ# 42.1',
    historyAndContext: 'Acuñada bajo la presidencia de Ramón S. Castillo. Presenta en el anverso la efigie clásica de la Libertad con gorro frigio hacia la izquierda y en el reverso el Escudo Nacional Argentino con la denominación.',
    mintMark: 'Buenos Aires',
    referenceImage: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
    listings: [
      MOCK_LISTINGS[0],
      MOCK_LISTINGS[1],
      MOCK_LISTINGS[2]
    ]
  },
  {
    id: 'cat-8reales-1813',
    title: '8 Reales 1813 - Provincias del Río de la Plata',
    country: 'Argentina',
    year: 1813,
    faceValue: '8 Reales',
    metal: 'Plata (.900 / .925)',
    diameterMm: 39.0,
    weightG: 27.0,
    kmReference: 'KM# 14',
    cjReference: 'CJ# 1.1',
    historyAndContext: 'La primera moneda patria ordenada por la Soberana Asamblea del Año XIII en la Ceca de Potosí. Reemplazó los símbolos de la monarquía española por el Sol de Mayo y el Escudo Patrio.',
    mintMark: 'Potosí (PTS)',
    referenceImage: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
    listings: [
      MOCK_LISTINGS[3]
    ]
  },
  {
    id: 'cat-patacon-1881',
    title: '1 Patacón / 1 Peso 1881',
    country: 'Argentina',
    year: 1881,
    faceValue: '1 Peso / 1 Patacón',
    metal: 'Plata (.900 / .925)',
    diameterMm: 37.0,
    weightG: 25.0,
    kmReference: 'KM# 29',
    cjReference: 'CJ# 12.1',
    historyAndContext: 'Creado bajo la Ley 1130 de Unificación Monetaria durante el gobierno de Julio A. Roca. Grabado por Eugène André Oudiné.',
    mintMark: 'Casa de Moneda Buenos Aires',
    referenceImage: '/grading/747723404_27152986841068496_3313306645566800214_n.jpg',
    listings: [
      MOCK_LISTINGS[4]
    ]
  }
];
