import dynamic from "next/dynamic";
import Navbar from "@/components/navigation/Navbar";

const FeaturesSection = dynamic(
  () => import("@/components/Features/FeaturesSection"),
  { ssr: true }
);

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <FeaturesSection />
    </div>
  );
}
