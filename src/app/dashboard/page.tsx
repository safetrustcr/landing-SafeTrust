import { TransactionDashboard } from "@/components/dashboard/TransactionDashboard";
import Navbar from "@/components/navigation/Navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden">
      <Navbar />
      <TransactionDashboard />
    </div>
  );
}
