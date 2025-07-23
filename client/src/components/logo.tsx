import logoImage from "../assets/times-in-lisbon-logo.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`logo-container ${className}`} style={{ marginBottom: '-4.5rem' }}>
      <img 
        src={logoImage} 
        alt="Times in Lisbon Logo" 
        className="w-full h-auto max-w-[280px] sm:max-w-[360px] md:max-w-[440px] mx-auto"
      />
    </div>
  );
}
