import { Facebook, Instagram, Youtube, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";

const socialLinks = [
  {
    href: "https://facebook.com/timesinlisbon",
    icon: Facebook,
    label: "Follow us on Facebook",
  },
  {
    href: "https://instagram.com/timesinlisbon",
    icon: Instagram,
    label: "Follow us on Instagram",
  },
  {
    href: "https://tiktok.com/@timesinlisbon",
    icon: SiTiktok,
    label: "Follow us on TikTok",
    isReactIcon: true,
  },
  {
    href: "https://youtube.com/@timesinlisbon",
    icon: Youtube,
    label: "Subscribe to our YouTube channel",
  },
  {
    href: "mailto:hello@timesinlisbon.com",
    icon: Mail,
    label: "Send us an email",
  },
];

interface SocialMediaProps {
  size?: "sm" | "md" | "lg";
}

export function SocialMedia({ size = "md" }: SocialMediaProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  return (
    <div className="flex justify-center space-x-4">
      {socialLinks.map(({ href, icon: Icon, label, isReactIcon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${sizeClasses[size]} bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 transform hover:scale-110`}
          aria-label={label}
        >
          {isReactIcon ? (
            <Icon className={`${iconSizes[size]} text-white`} />
          ) : (
            <Icon className={`${iconSizes[size]} text-white`} />
          )}
        </a>
      ))}
    </div>
  );
}
