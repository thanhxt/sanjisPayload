// contexts/language-context.tsx
'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type LanguageContextType = {
  language: 'de' | 'en';
  setLanguage: (lang: 'de' | 'en') => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to safely access localStorage
const getStoredLanguage = (): 'de' | 'en' => {
  if (typeof window === 'undefined') return 'de';
  try {
    const stored = localStorage.getItem('language');
    if (stored === 'de' || stored === 'en') {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
  }
  return 'de';
};

// Helper function to safely set localStorage
const setStoredLanguage = (lang: 'de' | 'en') => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('language', lang);
  } catch (error) {
    console.warn('Failed to save language to localStorage:', error);
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with 'de' to avoid hydration mismatch, then update in useEffect
  const [language, setLanguageState] = useState<'de' | 'en'>('de');
  const [isMounted, setIsMounted] = useState(false);

  // Only access localStorage after component mounts (client-side)
  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = getStoredLanguage();
    setLanguageState(storedLanguage);
  }, []);

  const setLanguage = (lang: 'de' | 'en') => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}
