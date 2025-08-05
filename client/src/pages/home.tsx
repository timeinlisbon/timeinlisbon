import { useRef } from "react";
import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Logo } from "@/components/logo";
import { SubscriptionForm } from "@/components/subscription-form";
import { SocialMedia } from "@/components/social-media";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, BookOpen, FileText } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const subscriptionRef = useRef<HTMLDivElement>(null);

  const scrollToSubscription = () => {
    subscriptionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const features = [
    {
      icon: MessageCircle,
      title: t("feature-interviews"),
      description: t("feature-interviews-desc"),
    },
    {
      icon: BookOpen,
      title: t("feature-restaurants"),
      description: t("feature-restaurants-desc"),
    },
    {
      icon: FileText,
      title: t("feature-content"),
      description: t("feature-content-desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation onSubscribeClick={scrollToSubscription} />
      
      <main>
        {/* Hero Section */}
        <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Logo and Title - positioned close together */}
            <div className="mb-8 animate-fade-in flex flex-col items-center">
              <Logo className="animate-fade-in mb-2" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-up leading-tight text-gray-900 text-center">
                Only locals know,<br />
                now you do too...
              </h1>
            </div>
            
            
            {/* Social Media Cards */}
            <div ref={subscriptionRef} className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">
                {t("follow-us")}
              </h2>
              <SocialMedia variant="cards" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
