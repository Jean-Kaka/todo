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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <TrendingUp className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold font-headline text-primary">AgentY</h1>
      </Link>
      <div className="w-full max-w-xl">
        <Progress value={progressValue} className="w-full mb-4 h-2" />
        <div className="bg-card p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold font-headline mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            {children}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">Step {currentStep} of {totalSteps}</p>
      </div>
    </div>
  );
}
