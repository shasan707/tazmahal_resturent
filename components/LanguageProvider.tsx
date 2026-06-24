'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, type Lang, type Dict } from '../lib/translations';

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'taj-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default Polish on the server so SSR is deterministic.
  const [lang, setLangState] = useState<Lang>('pl');

  // On the client: honour a saved choice, else the visitor's browser locale.
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved === 'pl' || saved === 'en') {
      setLangState(saved);
      return;
    }
    const pref = (navigator.languages?.[0] || navigator.language || 'pl').toLowerCase();
    if (!pref.startsWith('pl')) setLangState('en');
  }, []);

  // Keep <html lang> in sync for accessibility / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  };
  const toggle = () => setLang(lang === 'pl' ? 'en' : 'pl');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within <LanguageProvider>');
  return ctx;
}
