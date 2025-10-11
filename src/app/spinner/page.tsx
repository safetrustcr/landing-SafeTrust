import Spinner from "@/components/ui/Spinner";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen">
      <Spinner variant="circle" size="sm" />
      <Spinner variant="dots" size="md" color="text-red-500" />
      <Spinner variant="bars" size="lg" color="text-green-500" />
      <Spinner variant="pulse" size="md" />
    </div>
  );
}
