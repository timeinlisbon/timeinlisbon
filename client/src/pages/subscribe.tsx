import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Logo } from "@/components/logo";
import { SubscriptionForm } from "@/components/subscription-form";
import { SocialMedia } from "@/components/social-media";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Subscribe() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onSubscribeClick={scrollToTop} />
      
      <main>
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <Logo className="animate-fade-in" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {t("subscribe-title")}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t("subscribe-subtitle")}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <SubscriptionForm />
            </div>
            
            {/* Follow us Social Media */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">
                {t("follow-us")}
              </h3>
              <SocialMedia variant="cards" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}