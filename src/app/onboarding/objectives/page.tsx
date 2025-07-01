// src/app/onboarding/objectives/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Zap, Users, Megaphone, Target, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ObjectiveOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const objectiveOptions: ObjectiveOption[] = [
  { id: "revenue", label: "Increase Revenue", description: "Analyze sales trends and identify growth opportunities.", icon: TrendingUp },
  { id: "efficiency", label: "Improve Efficiency", description: "Optimize operations and resource allocation.", icon: Zap },
  { id: "customers", label: "Understand Customers", description: "Gain insights into customer behavior and satisfaction.", icon: Users },
  { id: "marketing", label: "Monitor Marketing", description: "Track campaign performance and ROI.", icon: Megaphone },
  { id: "strategy", label: "Strategic Planning", description: "Inform long-term strategy with data-driven forecasts.", icon: Target },
  { id: "other", label: "Other", description: "Customize your goals and KPIs.", icon: MoreHorizontal },
];

export default function ObjectivesPage() {
  const router = useRouter();
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  const toggleObjective = (objectiveId: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(objectiveId)
        ? prev.filter((id) => id !== objectiveId)
        : [...prev, objectiveId]
    );
  };

  const handleNext = () => {
    console.log("Selected objectives:", selectedObjectives);
    router.push("/onboarding/kpis");
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={8}
      title="What are your company's main objectives?"
      description="Select your primary goals. This helps us suggest relevant insights for your business."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectiveOptions.map((objective) => (
          <Card
            key={objective.id}
            onClick={() => toggleObjective(objective.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedObjectives.includes(objective.id) ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <objective.icon className={cn("h-8 w-8", selectedObjectives.includes(objective.id) ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{objective.label}</h3>
                <p className="text-sm text-muted-foreground">{objective.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleNext} disabled={selectedObjectives.length === 0} className="w-full mt-8 bg-primary hover:bg-primary/90">
        Next
      </Button>
    </OnboardingLayout>
  );
}
