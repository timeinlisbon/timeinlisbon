import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const languages = [
  { value: "en", label: "🇬🇧 English" },
  { value: "pt", label: "🇵🇹 Português" },
  { value: "fr", label: "🇫🇷 Français" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find(lang => lang.value === language);

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-[160px] bg-transparent border-gray-300 focus:ring-2 focus:ring-gray-500">
        <SelectValue placeholder={currentLanguage?.label || "🇬🇧 English"} />
      </SelectTrigger>
      <SelectContent>
        {languages.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
