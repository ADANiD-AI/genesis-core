"use client";

import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardProps {
  email: string;
  onLogout: () => void;
}

export function Dashboard({ email, onLogout }: DashboardProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl">
      <CardHeader className="items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User size={40} />
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
        <CardDescription>You are logged in as:</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="font-mono text-lg text-primary">{email}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onLogout}>
          <LogOut className="mr-2" />
          Log Out
        </Button>
      </CardFooter>
    </Card>
  );
}
