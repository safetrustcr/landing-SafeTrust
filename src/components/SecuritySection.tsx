import SecurityFeature from "@/components/security/SecurityFeature";
import TrustBadges from "@/components/security/TrustBadges";
import SecurityDemo from "@/components/security/SecurityDemo";
import securityFeatures from "@/data/security-features";

export default function SecuritySection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          SafeTrust Security Features
        </h2>
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {securityFeatures.map((feature) => (
            <SecurityFeature key={feature.id} feature={feature} />
          ))}
        </div>
        <div className="mb-8 flex flex-col items-center">
          <SecurityDemo />
        </div>
        <div className="mb-8 flex flex-col items-center">
          <TrustBadges />
        </div>
        <div className="mt-8 text-center">
          <a
            href="/docs/security-audit-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Security Audit Reports
          </a>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Compliant with ISO 27001, SOC 2, GDPR
          </div>
        </div>
      </div>
    </section>
  );
}
