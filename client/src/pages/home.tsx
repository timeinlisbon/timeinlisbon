import { useRef } from "react";
import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { Logo } from "@/components/logo";
import { SubscriptionForm } from "@/components/subscription-form";
import { SocialMedia } from "@/components/social-media";
import { useLanguage } from "@/hooks/use-language";
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
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Logo */}
            <div className="mb-8 animate-fade-in flex justify-center">
              <Logo className="animate-fade-in" />
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up leading-tight text-gray-900">
              {t("hero-title")}
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up max-w-2xl mx-auto leading-relaxed">
              {t("hero-subtitle")}
            </p>
            
            {/* Subscription Form */}
            <div ref={subscriptionRef} className="mb-12">
              <SubscriptionForm />
            </div>
            
            {/* Social Media Cards */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">
                {t("follow-us")}
              </h2>
              <SocialMedia variant="cards" />
            </div>
            
            {/* Value Proposition */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {features.map(({ icon: Icon, title, description }, index) => (
                <div key={index} className="text-center animate-fade-in">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {title}
                  </h3>
                  <p className="text-gray-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
