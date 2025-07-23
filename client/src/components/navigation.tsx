import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/hooks/use-language";

interface NavigationProps {
  onSubscribeClick: () => void;
}

export function Navigation({ onSubscribeClick }: NavigationProps) {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Button
            onClick={onSubscribeClick}
            className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            {t("subscribe")}
          </Button>
          
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
