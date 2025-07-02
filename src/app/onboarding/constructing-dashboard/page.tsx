// src/app/onboarding/constructing-dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const steps = [
    "Analyzing your objectives...",
    "Selecting relevant KPIs...",
    "Designing dashboard layout...",
    "Generating initial insights...",
    "Finalizing setup..."
];

export default function ConstructingDashboardPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 30000) {
                clearInterval(progressInterval);
                return 30000;
            }
            return prev + 1;
        });
    }, 40); // 4 seconds total for progress

    const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
            if (prev >= steps.length - 1) {
                clearInterval(stepInterval);
                return prev;
            }
            return prev + 1;
        });
    }, 800); // 4 seconds total for steps

    const redirectTimeout = setTimeout(() => {
      router.push("/dashboard");
    }, 5000); // Redirect after 5 seconds

    return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-secondary/30 to-background -z-10"></div>
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>
        
        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl border w-full max-w-xl">
            <div className="flex justify-center mb-4">
                <Sparkles className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-bold font-headline mb-4">
                We're constructing your personalized dashboard!
            </h1>
            <p className="text-muted-foreground mb-8">
                Based on your selections, we're tailoring the perfect starting point for your data journey.
            </p>

            <Progress value={progress} className="w-full mb-6 h-2" />

            <div className="space-y-3 text-left max-w-md mx-auto">
                {steps.map((step, index) => (
                    <div key={index} className={`flex items-center gap-3 transition-opacity duration-500 ${index <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                        {index < currentStep ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : index === currentStep ? (
                            <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                        ) : (
                            <div className="h-5 w-5 border-2 border-muted-foreground rounded-full flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium">{step}</span>
                    </div>
                ))}
            </div>

            <p className="text-xs text-muted-foreground mt-8">
                You will be redirected automatically in a few moments...
            </p>
        </div>
    </div>
  );
}
