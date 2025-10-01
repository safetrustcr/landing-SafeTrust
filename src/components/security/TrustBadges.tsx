const badges = [
  { src: "/styles/iso27001.svg", alt: "ISO 27001" },
  { src: "/styles/soc2.svg", alt: "SOC 2" },
  { src: "/styles/gdpr.svg", alt: "GDPR" },
];

export default function TrustBadges() {
  return (
    <div className="flex gap-4">
      {badges.map((badge) => (
        <img
          key={badge.alt}
          src={badge.src}
          alt={badge.alt}
          className="h-10 w-auto drop-shadow-md animate-pulse"
        />
      ))}
    </div>
  );
}
