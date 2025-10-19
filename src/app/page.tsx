"use client";

import { useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { Dashboard } from "@/components/auth/dashboard";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleLoginSuccess = (email: string) => {
    setLoggedInUser(email);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      {loggedInUser ? (
        <Dashboard email={loggedInUser} onLogout={handleLogout} />
      ) : (
        <AuthCard onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  );
}
