import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const languages = [
  { value: "en", flag: "🇬🇧", label: "English" },
  { value: "pt", flag: "🇵🇹", label: "Português" },
  { value: "fr", flag: "🇫🇷", label: "Français" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      {languages.map(({ value, flag, label }) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(value)}
          className={`p-2 h-auto rounded-full hover:bg-gray-100 transition-all duration-200 ${
            language === value 
              ? 'ring-2 ring-gray-400 bg-gray-50' 
              : 'opacity-70 hover:opacity-100'
          }`}
          title={label}
          aria-label={`Switch to ${label}`}
        >
          <span className="text-lg">{flag}</span>
        </Button>
      ))}
    </div>
  );
}
