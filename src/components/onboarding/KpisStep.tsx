"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingDown, Users, Smile, MoreHorizontal, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KpiOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const kpiOptions: KpiOption[] = [
  { id: "sales_revenue", label: "Sales Revenue", description: "Track revenue, profit margins, and sales growth.", icon: DollarSign },
  { id: "churn_rate", label: "Customer Churn Rate", description: "Analyze the rate at which customers stop doing business with you.", icon: TrendingDown },
  { id: "user_engagement", label: "User Engagement", description: "Measure active users, session duration, and feature adoption.", icon: Users },
  { id: "marketing_performance", label: "Marketing Performance", description: "Analyze campaign effectiveness, attribution, and ROI.", icon: Megaphone },
  { id: "csat", label: "Customer Satisfaction", description: "Measure satisfaction with surveys like CSAT and NPS.", icon: Smile },
  { id: "other", label: "Other KPIs", description: "Define your own custom key performance indicators.", icon: MoreHorizontal },
];

interface KpisStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function KpisStep({ onNext, onBack }: KpisStepProps) {
  const { kpis, toggleKpi } = useOnboardingStore();

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpiOptions.map((kpi) => (
          <Card
            key={kpi.id}
            onClick={() => toggleKpi(kpi.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              kpis.includes(kpi.id) ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <kpi.icon className={cn("h-8 w-8", kpis.includes(kpi.id) ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{kpi.label}</h3>
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={kpis.length === 0} className="bg-primary hover:bg-primary/90">
                Next
            </Button>
      </div>
    </>
  );
}
