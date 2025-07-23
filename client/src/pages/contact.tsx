import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { ContactForm } from "@/components/contact-form";
import { SocialMedia } from "@/components/social-media";
import { useLanguage } from "@/hooks/use-language";

export default function Contact() {
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
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {t("contact-title")}
              </h1>
              <p className="text-xl text-gray-600">
                {t("contact-subtitle")}
              </p>
            </div>
            
            <ContactForm />
            
            {/* Social Media Icons */}
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">
                {t("follow-us")}
              </h3>
              <SocialMedia variant="icons" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
