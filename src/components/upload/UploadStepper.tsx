// src/components/upload/UploadStepper.tsx
"use client";

import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface UploadStep {
  id: string;
  name: string;
}

interface UploadStepperProps {
  steps: UploadStep[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
}

export default function UploadStepper({ steps, currentStep, onStepClick }: UploadStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 flex-1" : "")}>
            {stepIdx < currentStep ? (
              // Completed step
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => onStepClick?.(stepIdx)}
                  className="flex items-center text-sm font-medium"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckCircle className="h-5 w-5" />
                  </span>
                  <span className="ml-3 hidden sm:inline text-sm font-medium text-primary">{step.name}</span>
                </button>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute inset-0 top-[calc(50%-1px)] left-auto right-0 z-[-1] hidden h-[2px] w-full bg-primary md:block" />
                ) : null}
              </div>
            ) : stepIdx === currentStep ? (
              // Current step
               <div className="flex items-center" aria-current="step">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">
                  <span className="text-sm font-semibold">{stepIdx + 1}</span>
                </span>
                <span className="ml-3 hidden sm:inline text-sm font-medium text-primary">{step.name}</span>
                {stepIdx !== steps.length - 1 ? (
                 <div className="absolute inset-0 top-[calc(50%-1px)] left-auto right-0 z-[-1] hidden h-[2px] w-full bg-border md:block" />
                ) : null}
              </div>
            ) : (
              // Upcoming step
              <div className="flex items-center">
                 <button
                  type="button"
                  onClick={() => onStepClick?.(stepIdx)}
                  className="flex items-center text-sm font-medium group"
                  disabled={!onStepClick} // Disable if no click handler (meaning linear flow)
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-card group-hover:border-muted-foreground">
                    <span className="text-sm font-medium text-muted-foreground">{stepIdx + 1}</span>
                  </span>
                  <span className="ml-3 hidden sm:inline text-sm font-medium text-muted-foreground group-hover:text-foreground">{step.name}</span>
                </button>
                {stepIdx !== steps.length - 1 ? (
                   <div className="absolute inset-0 top-[calc(50%-1px)] left-auto right-0 z-[-1] hidden h-[2px] w-full bg-border md:block" />
                ) : null}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
