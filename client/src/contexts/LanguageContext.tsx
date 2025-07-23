import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Language, type TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem("timesInLisbonLanguage");
    return (stored as Language) || "en";
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("timesInLisbonLanguage", newLanguage);
    }
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timesInLisbonLanguage", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export type { Language };