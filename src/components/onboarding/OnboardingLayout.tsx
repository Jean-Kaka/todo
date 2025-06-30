// src/components/onboarding/OnboardingLayout.tsx
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
}

export default function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  description
}: OnboardingLayoutProps) {
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-secondary/30 to-background -z-10"></div>
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>
      
      <Link href="/" className="flex items-center gap-2 mb-8 z-10">
        <TrendingUp className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary">AgentY</h1>
      </Link>
      <div className="w-full max-w-xl z-10">
        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl border">
            <h2 className="text-3xl font-bold font-headline mb-2 text-center">{title}</h2>
            <p className="text-muted-foreground mb-6 text-center">{description}</p>
            <Progress value={progressValue} className="w-full mb-8 h-2" />
            {children}
            <p className="text-center text-xs text-muted-foreground mt-8">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>
    </div>
  );
}
