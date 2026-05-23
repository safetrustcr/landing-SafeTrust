import { useState } from "react";
import { ShieldCheck, KeyRound, Radar } from "lucide-react";

const demos = [
    {
        title: "Encryption",
        icon: ShieldCheck,
        description: "End-to-end encryption protects your data at all times.",
        demo: () => (
            <div className="flex items-center justify-center h-32 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <span className="text-green-600 font-semibold">
                    Secure Channel Established
                </span>
            </div>
        ),
    },
    {
        title: "MFA",
        icon: KeyRound,
        description:
            "Multi-factor authentication ensures only verified access.",
        demo: () => (
            <div className="flex items-center justify-center h-32 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <span className="text-blue-600 font-semibold">
                    Identity Verified
                </span>
            </div>
        ),
    },
    {
        title: "Threat Detection",
        icon: Radar,
        description: "AI-powered monitoring blocks threats in real time.",
        demo: () => (
            <div className="flex items-center justify-center h-32 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <span className="text-red-600 font-semibold">
                    Threat Neutralized
                </span>
            </div>
        ),
    },
];

export default function SecurityDemo() {
    const [active, setActive] = useState(0);

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
                {demos.map((d, i) => {
                    const Icon = d.icon;
                    const isActive = active === i;

                    return (
                        <button
                            key={d.title}
                            onClick={() => setActive(i)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition
                ${
                    isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-transparent hover:bg-gray-200"
                }`}
                        >
                            <Icon size={16} />
                            {d.title}
                        </button>
                    );
                })}
            </div>

            <div className="p-6 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm text-center transition-all">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {demos[active].description}
                </p>

                {demos[active].demo()}
            </div>
        </div>
    );
}
