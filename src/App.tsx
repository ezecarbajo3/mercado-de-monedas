import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { CoinDetailView } from './views/CoinDetailView';
import { PublishView } from './views/PublishView';
import { ProfileView } from './views/ProfileView';
import { GradingAssistantModal } from './components/GradingAssistantModal';
import { OfferModal } from './components/OfferModal';
import { ParqueRivadaviaModal } from './components/ParqueRivadaviaModal';
import { MOCK_LISTINGS, MOCK_SELLERS } from './data/mockCoins';
import { CoinListing, GradingGrade } from './types/coin';

export const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'detail' | 'publish' | 'profile'>('home');
  const [listings, setListings] = useState<CoinListing[]>(MOCK_LISTINGS);
  const [selectedCoin, setSelectedCoin] = useState<CoinListing | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [gradingModalOpen, setGradingModalOpen] = useState<boolean>(false);
  const [gradingModalGrade, setGradingModalGrade] = useState<GradingGrade>('VF');
  const [offerModalOpen, setOfferModalOpen] = useState<boolean>(false);
  const [offerListing, setOfferListing] = useState<CoinListing | null>(null);
  const [parqueModalOpen, setParqueModalOpen] = useState<boolean>(false);
  const [parqueListing, setParqueListing] = useState<CoinListing | undefined>(undefined);

  const handleSelectCoin = (coin: CoinListing) => {
    setSelectedCoin(coin);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOffer = (coin: CoinListing) => {
    setOfferListing(coin);
    setOfferModalOpen(true);
  };

  const handleOpenGradingGuide = (initialGrade?: GradingGrade) => {
    if (initialGrade) setGradingModalGrade(initialGrade);
    setGradingModalOpen(true);
  };

  const handleOpenParqueModal = (coin?: CoinListing) => {
    setParqueListing(coin);
    setParqueModalOpen(true);
  };

  const handlePublishSuccess = (newCoinData: Partial<CoinListing>) => {
    const fullNewCoin: CoinListing = {
      id: newCoinData.id || `coin-${Date.now()}`,
      title: newCoinData.title || 'Moneda sin título',
      country: newCoinData.country || 'Argentina',
      year: newCoinData.year || 2024,
      faceValue: newCoinData.faceValue || '1 Peso',
      metal: newCoinData.metal || 'Cuproníquel',
      diameterMm: newCoinData.diameterMm || 25,
      weightG: newCoinData.weightG || 6.5,
      grade: newCoinData.grade || 'UNC',
      basePrice: newCoinData.basePrice || 10000,
      baseCurrency: newCoinData.baseCurrency || 'ARS',
      acceptsOffers: newCoinData.acceptsOffers ?? true,
      kmReference: newCoinData.kmReference || 'KM# Spec',
      sku: newCoinData.sku || 'SKU-001',
      publicComment: newCoinData.publicComment || 'Moneda en excelente estado numismático.',
      privateComment: newCoinData.privateComment || '',
      photos: newCoinData.photos || {
        obverse: '/grading/746119962_27152987804401733_5967603319989396481_n.jpg',
        reverse: '/grading/748216107_27152987704401743_1830395168745860999_n.jpg'
      },
      seller: MOCK_SELLERS.numis_mardel,
      allowsParqueRivadavia: newCoinData.allowsParqueRivadavia ?? true,
      allowsShipping: newCoinData.allowsShipping ?? true,
      viewsCount: 1,
      createdAt: new Date().toISOString()
    };

    setListings(prev => [fullNewCoin, ...prev]);
    setSelectedCoin(fullNewCoin);
    setCurrentView('detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGradingGuide={() => handleOpenGradingGuide('VF')}
        onOpenParqueModal={() => handleOpenParqueModal()}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <HomeView
            listings={listings}
            onSelectCoin={handleSelectCoin}
            onOpenOffer={handleOpenOffer}
            onOpenGradingGuide={handleOpenGradingGuide}
            onOpenParqueModal={handleOpenParqueModal}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogView
            listings={listings}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectCoin={handleSelectCoin}
            onOpenOffer={handleOpenOffer}
            onOpenGradingGuide={handleOpenGradingGuide}
          />
        )}

        {currentView === 'detail' && selectedCoin && (
          <CoinDetailView
            coin={selectedCoin}
            allListings={listings}
            onBack={() => setCurrentView('catalog')}
            onSelectCoin={handleSelectCoin}
            onOpenOffer={handleOpenOffer}
            onOpenGradingGuide={handleOpenGradingGuide}
            onOpenParqueModal={() => handleOpenParqueModal(selectedCoin)}
          />
        )}

        {currentView === 'publish' && (
          <PublishView
            onPublishSuccess={handlePublishSuccess}
            onOpenGradingGuide={handleOpenGradingGuide}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView />
        )}
      </main>

      <Footer
        onOpenGradingGuide={() => handleOpenGradingGuide('VF')}
        onOpenParqueModal={() => handleOpenParqueModal()}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <GradingAssistantModal
        isOpen={gradingModalOpen}
        onClose={() => setGradingModalOpen(false)}
        initialGrade={gradingModalGrade}
      />

      {offerListing && (
        <OfferModal
          isOpen={offerModalOpen}
          onClose={() => {
            setOfferModalOpen(false);
            setOfferListing(null);
          }}
          listing={offerListing}
        />
      )}

      <ParqueRivadaviaModal
        isOpen={parqueModalOpen}
        onClose={() => setParqueModalOpen(false)}
        listing={parqueListing}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </ThemeProvider>
  );
}
