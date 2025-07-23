import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "https://facebook.com/timesinlisbon",
    icon: Facebook,
    label: "Follow us on Facebook",
    name: "Facebook",
    bgColor: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
  },
  {
    href: "https://instagram.com/timesinlisbon",
    icon: Instagram,
    label: "Follow us on Instagram", 
    name: "Instagram",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    hoverColor: "hover:from-purple-600 hover:to-pink-600",
  },
  {
    href: "https://youtube.com/@timesinlisbon",
    icon: Youtube,
    label: "Subscribe to our YouTube channel",
    name: "YouTube",
    bgColor: "bg-red-600",
    hoverColor: "hover:bg-red-700",
  },
  {
    href: "mailto:hello@timesinlisbon.com",
    icon: Mail,
    label: "Send us an email",
    name: "Gmail",
    bgColor: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
];

interface SocialMediaProps {
  variant?: "icons" | "cards";
}

export function SocialMedia({ variant = "icons" }: SocialMediaProps) {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {socialLinks.map(({ href, icon: Icon, label, name, bgColor, hoverColor }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bgColor} ${hoverColor} p-6 rounded-xl text-white text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            aria-label={label}
          >
            <Icon className="w-8 h-8 mx-auto mb-3" />
            <p className="font-semibold text-sm">{name}</p>
          </a>
        ))}
      </div>
    );
  }

  // Default icons variant
  return (
    <div className="flex justify-center space-x-4">
      {socialLinks.map(({ href, icon: Icon, label, bgColor, hoverColor }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-12 h-12 ${bgColor} ${hoverColor} rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
          aria-label={label}
        >
          <Icon className="w-6 h-6 text-white" />
        </a>
      ))}
    </div>
  );
}
