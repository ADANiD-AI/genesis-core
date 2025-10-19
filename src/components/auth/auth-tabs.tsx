"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

interface AuthTabsProps {
  onLoginSuccess: (email: string) => void;
}

export function AuthTabs({ onLoginSuccess }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const handleRegisterSuccess = () => {
    toast({
      title: "Registration Successful",
      description: "You can now log in with your credentials.",
    });
    setActiveTab("login");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </TabsContent>
    </Tabs>
  );
}
