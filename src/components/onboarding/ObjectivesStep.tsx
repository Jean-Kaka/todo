"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
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

interface ObjectivesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ObjectivesStep({ onNext, onBack }: ObjectivesStepProps) {
  const { objectives, toggleObjective } = useOnboardingStore();

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectiveOptions.map((objective) => (
          <Card
            key={objective.id}
            onClick={() => toggleObjective(objective.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              objectives.includes(objective.id) ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <objective.icon className={cn("h-8 w-8", objectives.includes(objective.id) ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{objective.label}</h3>
                <p className="text-sm text-muted-foreground">{objective.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={objectives.length === 0} className="bg-primary hover:bg-primary/90">
              Next
            </Button>
        </div>
    </>
  );
}
