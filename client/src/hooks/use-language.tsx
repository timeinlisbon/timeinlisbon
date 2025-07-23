import { useState, useEffect } from "react";
import { translations, type Language, type TranslationKey } from "@/lib/translations";

export type { Language };

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("timesInLisbonLanguage") as Language) || "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("timesInLisbonLanguage", language);
    }
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return {
    language,
    setLanguage,
    t,
  };
}
