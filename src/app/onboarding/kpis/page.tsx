// src/app/onboarding/kpis/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingDown, MousePointerClick, Users, Smile, MoreHorizontal } from "lucide-react";
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
  { id: "conversion_rate", label: "Website Traffic & Conversion", description: "Analyze visitor traffic and conversion rates.", icon: MousePointerClick },
  { id: "csat", label: "Customer Satisfaction", description: "Measure satisfaction with surveys like CSAT and NPS.", icon: Smile },
  { id: "other", label: "Other KPIs", description: "Define your own custom key performance indicators.", icon: MoreHorizontal },
];

export default function KpisPage() {
  const router = useRouter();
  const [selectedKpis, setSelectedKpis] = useState<string[]>([]);

  const toggleKpi = (kpiId: string) => {
    setSelectedKpis((prev) =>
      prev.includes(kpiId)
        ? prev.filter((id) => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const handleNext = () => {
    console.log("Selected KPIs:", selectedKpis);
    router.push("/onboarding/data-sources");
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={8}
      title="Identify Your Key Performance Indicators"
      description="Select the metrics that matter most to your business. This helps us customize your dashboards."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kpiOptions.map((kpi) => (
          <Card
            key={kpi.id}
            onClick={() => toggleKpi(kpi.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedKpis.includes(kpi.id) ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <kpi.icon className={cn("h-8 w-8", selectedKpis.includes(kpi.id) ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{kpi.label}</h3>
                <p className="text-sm text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleNext} disabled={selectedKpis.length === 0} className="w-full mt-8 bg-primary hover:bg-primary/90">
        Next
      </Button>
    </OnboardingLayout>
  );
}
