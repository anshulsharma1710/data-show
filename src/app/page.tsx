// pages/index.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Import your UI components
import { Input } from "@/components/ui/input";
import AdminDashboard from "@/components/admin/dashboard";

export default function HomePage() {
  const [code, setCode] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the code matches your criteria
    if (code === "MTx20") {
      setShowDashboard(true); // Show dashboard
    } else {
      alert("Invalid code. Please try again.");
    }
  };

  return showDashboard ? (
    <AdminDashboard />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter your code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
        <Button type="submit" className="bg-blue-500 text-white rounded p-2">
          Submit
        </Button>
      </form>
    </div>
  );
}
