import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { SubscriptionForm } from "@/components/subscription-form";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Subscribe() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation onSubscribeClick={scrollToTop} />
      
      <main>
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight">
                {t("subscribe-title")}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {t("subscribe-subtitle")}
              </p>
            </div>
            
            {/* Highlighted Subscription Form */}
            <div className="bg-white rounded-3xl p-12 sm:p-16 shadow-2xl border border-gray-100 transform hover:scale-[1.01] transition-all duration-300 max-w-2xl mx-auto">
              <SubscriptionForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}