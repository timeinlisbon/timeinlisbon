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
              <SocialMedia size="sm" />
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4">
            {t("footer-text")}
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/" className="hover:text-gray-300 transition-colors duration-200">
              {t("home")}
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors duration-200">
              {t("contact")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
