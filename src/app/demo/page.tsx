"use client";

import React from "react";
import useToast from "../../hooks/use-toast";

export default function DemoPage() {
  const toast = useToast();

  return (
    <div className="p-10 flex max-w-[300px] mx-auto flex-col gap-4">
      <button
        onClick={() =>
          toast.success({
            type: "success",
            description: "This is a success toast!",
          })
        }
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Show Success Toast
      </button>

      <button
        onClick={() =>
          toast.error({ type: "error", description: "This is an error toast!" })
        }
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Show Error Toast
      </button>
    </div>
  );
}
