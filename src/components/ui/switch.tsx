import * as React from "react";

export function Switch({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (checked: boolean) => void }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 ${checked ? "bg-[#2F2F31]" : "bg-[#2F2F31]"}`}
    >
      <div className={`w-4 h-4 bg-[#121212] rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${checked ? "translate-x-6" : "translate-x-0"}`}></div>
    </button>
  );
}
