import { ShieldCheck, KeyRound, EyeOff } from "lucide-react";
import { ReactNode } from "react";

export type SecurityFeatureType = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  trustScore: number;
  compliance?: string;
};

const securityFeatures: SecurityFeatureType[] = [
  {
    id: "encryption",
    title: "End-to-End Encryption",
    description:
      "All data is encrypted in transit and at rest using industry standards.",
    icon: <ShieldCheck className="h-12 w-12 text-green-600" />,
    trustScore: 98,
    compliance: "ISO 27001, SOC 2",
  },
  {
    id: "mfa",
    title: "Multi-Factor Authentication",
    description:
      "User accounts are protected with multi-factor authentication.",
    icon: <KeyRound className="h-12 w-12 text-blue-600" />,
    trustScore: 95,
    compliance: "GDPR, SOC 2",
  },
  {
    id: "threat-detection",
    title: "Real-Time Threat Detection",
    description: "Continuous monitoring and instant threat response.",
    icon: <EyeOff className="h-12 w-12 text-red-600" />,
    trustScore: 97,
    compliance: "ISO 27001",
  },
];

export default securityFeatures;
