import { useState } from "react";

const demos = [
  {
    title: "End-to-End Encryption",
    description: "See how your data is protected in transit and at rest.",
    demo: () => (
      <div className="p-4 bg-green-100 text-green-500 rounded">
        🔒 Data Encrypted!
      </div>
    ),
  },
  {
    title: "Multi-Factor Authentication",
    description: "Experience a secure login process.",
    demo: () => (
      <div className="p-4 bg-blue-100 text-blue-500 rounded">
        🔑 MFA Verified!
      </div>
    ),
  },
  {
    title: "Real-Time Threat Detection",
    description: "Watch our system block threats instantly.",
    demo: () => (
      <div className="p-4 bg-red-100 text-red-500 rounded">
        🛡️ Threat Blocked!
      </div>
    ),
  },
];

export default function SecurityDemo() {
  const [active, setActive] = useState(0);
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center gap-2 mb-4">
        {demos.map((d, i) => (
          <button
            key={d.title}
            className={`px-3 py-1 rounded ${
              active === i
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActive(i)}
          >
            {d.title}
          </button>
        ))}
      </div>
      <div className="transition-all duration-300 ease-in-out">
        <div className="text-center mb-2 text-lg font-medium">
          {demos[active].description}
        </div>
        {demos[active].demo()}
      </div>
    </div>
  );
}
