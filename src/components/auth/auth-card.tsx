import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthTabs } from "./auth-tabs";

interface AuthCardProps {
  onLoginSuccess: (email: string) => void;
}

export function AuthCard({ onLoginSuccess }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline tracking-tight">
          Node Genesis
        </CardTitle>
        <CardDescription>
          Your secure authentication portal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthTabs onLoginSuccess={onLoginSuccess} />
      </CardContent>
    </Card>
  );
}
