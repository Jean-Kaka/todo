// src/app/onboarding/data-sources/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Database, PlugZap, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface DataSourceOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const dataSourceOptions: DataSourceOption[] = [
  { id: "csv", label: "Files", description: "CSV, Excel, JSON", icon: FileText },
  { id: "sql", label: "SQL Databases", description: "PostgreSQL, MySQL", icon: Database },
  { id: "api", label: "APIs", description: "REST, GraphQL", icon: PlugZap },
  { id: "integrations", label: "Cloud Services", description: "Google Drive, AWS S3", icon: Cloud },
];

export default function DataSourcesPage() {
  const router = useRouter();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleNext = () => {
    console.log("Selected data sources:", selectedSources);
    router.push("/onboarding/sample-data");
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={6}
      title="Connect Your Data"
      description="Select all the types of data you plan to work with."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataSourceOptions.map((source) => (
          <Card
            key={source.id}
            onClick={() => toggleSource(source.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedSources.includes(source.id) ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <source.icon className={cn("h-8 w-8", selectedSources.includes(source.id) ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{source.label}</h3>
                <p className="text-sm text-muted-foreground">{source.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleNext} disabled={selectedSources.length === 0} className="w-full mt-8 bg-primary hover:bg-primary/90">
        Next
      </Button>
    </OnboardingLayout>
  );
}
