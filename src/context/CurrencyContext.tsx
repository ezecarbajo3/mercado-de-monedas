import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '../types/coin';

interface CurrencyContextType {
  activeCurrency: Currency;
  setActiveCurrency: (curr: Currency) => void;
  toggleCurrency: () => void;
  dolarBlueRate: number;
  lastRateUpdate: string;
  isUpdatingRate: boolean;
  refreshRate: () => void;
  convertAmount: (amount: number, from: Currency, to: Currency) => number;
  formatAmount: (amount: number, currency: Currency) => string;
  formatDualPrice: (baseAmount: number, baseCurrency: Currency) => {
    primaryText: string;
    secondaryText: string;
    primaryAmount: number;
    secondaryAmount: number;
  };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCurrency, setActiveCurrency] = useState<Currency>('ARS');
  const [dolarBlueRate, setDolarBlueRate] = useState<number>(1350);
  const [lastRateUpdate, setLastRateUpdate] = useState<string>('Hace 12 min (DolarHoy.com)');
  const [isUpdatingRate, setIsUpdatingRate] = useState<boolean>(false);

  const toggleCurrency = () => {
    setActiveCurrency(prev => (prev === 'ARS' ? 'USD' : 'ARS'));
  };

  const refreshRate = () => {
    setIsUpdatingRate(true);
    setTimeout(() => {
      // Simula ligera oscilación realista del Dólar Blue
      const variations = [1345, 1350, 1355, 1360, 1340];
      const nextRate = variations[Math.floor(Math.random() * variations.length)];
      setDolarBlueRate(nextRate);
      setLastRateUpdate('Actualizado recién (DolarHoy)');
      setIsUpdatingRate(false);
    }, 600);
  };

  const convertAmount = (amount: number, from: Currency, to: Currency): number => {
    if (from === to) return amount;
    if (from === 'USD' && to === 'ARS') {
      return Math.round(amount * dolarBlueRate);
    }
    if (from === 'ARS' && to === 'USD') {
      return Number((amount / dolarBlueRate).toFixed(2));
    }
    return amount;
  };

  const formatAmount = (amount: number, currency: Currency): string => {
    if (currency === 'ARS') {
      return `$ ${amount.toLocaleString('es-AR')}`;
    }
    return `US$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDualPrice = (baseAmount: number, baseCurrency: Currency) => {
    if (activeCurrency === 'ARS') {
      const arsValue = baseCurrency === 'ARS' ? baseAmount : convertAmount(baseAmount, 'USD', 'ARS');
      const usdValue = baseCurrency === 'USD' ? baseAmount : convertAmount(baseAmount, 'ARS', 'USD');
      return {
        primaryText: `$ ${arsValue.toLocaleString('es-AR')}`,
        secondaryText: `≈ US$ ${usdValue.toFixed(2)}`,
        primaryAmount: arsValue,
        secondaryAmount: usdValue
      };
    } else {
      const usdValue = baseCurrency === 'USD' ? baseAmount : convertAmount(baseAmount, 'ARS', 'USD');
      const arsValue = baseCurrency === 'ARS' ? baseAmount : convertAmount(baseAmount, 'USD', 'ARS');
      return {
        primaryText: `US$ ${usdValue.toFixed(2)}`,
        secondaryText: `≈ $ ${arsValue.toLocaleString('es-AR')}`,
        primaryAmount: usdValue,
        secondaryAmount: arsValue
      };
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        activeCurrency,
        setActiveCurrency,
        toggleCurrency,
        dolarBlueRate,
        lastRateUpdate,
        isUpdatingRate,
        refreshRate,
        convertAmount,
        formatAmount,
        formatDualPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency debe ser usado dentro de un CurrencyProvider');
  }
  return context;
};
