import { Facebook, Instagram, Youtube } from "lucide-react";

// TikTok icon component (since it's not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04.57z"/>
  </svg>
);

const socialLinks = [
  {
    href: "https://facebook.com/timesinlisbon",
    icon: Facebook,
    label: "Follow us on Facebook",
    name: "Facebook",
    color: "hover:bg-blue-600",
  },
  {
    href: "https://instagram.com/timesinlisbon",
    icon: Instagram,
    label: "Follow us on Instagram", 
    name: "Instagram",
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
  },
  {
    href: "https://tiktok.com/@timesinlisbon",
    icon: TikTokIcon,
    label: "Follow us on TikTok",
    name: "TikTok",
    color: "hover:bg-black",
  },
  {
    href: "https://youtube.com/@timesinlisbon",
    icon: Youtube,
    label: "Subscribe to our YouTube channel",
    name: "YouTube",
    color: "hover:bg-red-600",
  },
];

interface SocialMediaProps {
  variant?: "icons" | "cards";
}

export function SocialMedia({ variant = "icons" }: SocialMediaProps) {
  if (variant === "cards") {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {socialLinks.map(({ href, icon: Icon, label, name, color }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white ${color} p-6 rounded-xl text-gray-800 hover:text-white text-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl border border-gray-200 hover:border-transparent group`}
              aria-label={label}
            >
              <Icon className="w-10 h-10 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <p className="font-semibold text-sm">{name}</p>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Default icons variant
  return (
    <div className="flex justify-center space-x-6">
      {socialLinks.map(({ href, icon: Icon, label, color }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-14 h-14 bg-gray-800 ${color} rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group`}
          aria-label={label}
        >
          <Icon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
}
