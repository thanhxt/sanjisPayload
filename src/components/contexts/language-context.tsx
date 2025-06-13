// contexts/language-context.tsx
'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: 'de' | 'en';
  setLanguage: (lang: 'de' | 'en') => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'de' | 'en'>('de');
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
