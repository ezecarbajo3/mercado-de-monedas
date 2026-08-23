export type GradingGrade = 'PR' | 'G' | 'VG' | 'F' | 'VF' | 'XF' | 'UNC' | 'PROOF';

export type Currency = 'ARS' | 'USD';

export type MetalType = 
  | 'Oro' 
  | 'Plata (.900 / .925)' 
  | 'Cuproníquel' 
  | 'Cobre' 
  | 'Bronce' 
  | 'Aluminio' 
  | 'Bimetálica' 
  | 'Níquel' 
  | 'Otros';

export type ParqueRivadaviaFrequency = 
  | 'Todos los domingos'
  | 'Quincenal (1er y 3er domingo)'
  | 'Mensual (1er domingo del mes)'
  | 'Fecha puntual pactada'
  | 'No realiza entregas en Parque';

export interface SellerStats {
  conservationAccuracy: number; // Porcentaje o puntaje sobre 5
  packagingQuality: number;     // Protección y cápsulas
  punctuality: number;          // Cumplimiento de entregas
}

export interface Seller {
  id: string;
  username: string;
  avatar?: string;
  province: string;
  city: string;
  rating: number;
  reviewsCount: number;
  memberSince: string;
  allowsParqueRivadavia: boolean;
  parqueFrequency: ParqueRivadaviaFrequency;
  stats: SellerStats;
  verified: boolean;
}

export interface CoinListing {
  id: string;
  catalogId?: string;
  title: string;
  country: string;
  year: number | string;
  faceValue: string;
  metal: MetalType;
  diameterMm: number;
  weightG: number;
  grade: GradingGrade;
  basePrice: number;
  baseCurrency: Currency;
  acceptsOffers: boolean;
  kmReference?: string;
  cjReference?: string;
  sku?: string; // Privado para el vendedor
  publicComment: string;
  privateComment?: string; // Privado para el vendedor
  photos: {
    obverse: string; // Anverso
    reverse: string; // Reverso
    edge?: string;   // Canto
    extra?: string[];
  };
  seller: Seller;
  allowsParqueRivadavia: boolean;
  allowsShipping: boolean; // Correo Argentino / Andreani
  featured?: boolean;
  viewsCount: number;
  createdAt: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  country: string;
  year: number | string;
  faceValue: string;
  metal: MetalType;
  diameterMm: number;
  weightG: number;
  kmReference: string;
  cjReference?: string;
  historyAndContext: string;
  mintMark?: string;
  referenceImage: string;
  listings: CoinListing[];
}

export interface OfferRequest {
  id: string;
  listingId: string;
  coinTitle: string;
  buyerUsername: string;
  amount: number;
  currency: Currency;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  counterAmount?: number;
  attemptNumber: number; // 1, 2 o 3 (límite 3)
  createdAt: string;
  expiresAt: string; // 24hs tras aceptación
}

export interface ParqueRivadaviaTicket {
  ticketId: string;
  qrCodeUrl?: string;
  listingId: string;
  coinTitle: string;
  price: number;
  currency: Currency;
  buyerAlias: string;
  sellerAlias: string;
  sellerOrigin: string; // Ej: "Mar del Plata (Consolidado)" o "CABA (Puesto Local)"
  deliveryDate: string; // Ej: "Domingo 7 de Septiembre, 10:00 a 14:00 hs"
  standLocation: string; // Ej: "Puesto 14 / Sector Monumento Parque Rivadavia"
  status: 'generado' | 'en_viaje_a_caba' | 'listo_en_puesto' | 'entregado';
}

export interface FilterOptions {
  searchQuery: string;
  country: string;
  metal: string;
  minGrade: GradingGrade | 'ALL';
  minPrice: number;
  maxPrice: number;
  currency: Currency;
  acceptsOffersOnly: boolean;
  parqueRivadaviaOnly: boolean;
  sellerProvince: string;
  sortBy: 'price_asc' | 'price_desc' | 'year_asc' | 'year_desc' | 'rating' | 'newest';
}
