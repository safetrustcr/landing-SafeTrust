const badges = [
    {
        src: "/styles/iso27001.svg",
        title: "ISO 27001",
        description:
            "International standard for information security management.",
    },
    {
        src: "/styles/soc2.svg",
        title: "SOC 2",
        description:
            "Audited controls for security, availability, and privacy.",
    },
    {
        src: "/styles/gdpr.svg",
        title: "GDPR",
        description:
            "Compliant with EU data protection and privacy regulations.",
    },
];

export default function TrustBadges() {
    return (
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {badges.map((badge) => (
                <div
                    key={badge.title}
                    className="flex flex-col items-center text-center p-5 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
                >
                    <img
                        src={badge.src}
                        alt={badge.title}
                        className="h-12 mb-3"
                    />

                    <h4 className="font-semibold text-gray-900 dark:text-white">
                        {badge.title}
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {badge.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
