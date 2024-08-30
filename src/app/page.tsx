"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [filePath, setFilePath] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const router = useRouter();

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      const response = await fetch("/api/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_paths: [filePath] }),
      });

      if (response.ok) {
        router.push("/qa");
      } else {
        const error = await response.json();
        alert(`Error initializing QA system: ${error.error}`);
      }
    } catch (error) {
      alert(`Error initializing QA system: ${error}`);
    }
    setIsInitializing(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Initialize QA System</h2>
      <input
        type="text"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        placeholder="Enter file path"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleInitialize}
        disabled={isInitializing}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isInitializing ? "Initializing..." : "Initialize"}
      </button>
    </div>
  );
}
