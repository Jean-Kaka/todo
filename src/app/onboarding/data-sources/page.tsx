// src/app/onboarding/data-sources/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText, Database, PlugZap, Cloud } from "lucide-react"; // Using PlugZap for integrations

const dataSourceOptions = [
  { id: "csv", label: "CSV / Excel Files", icon: FileText },
  { id: "sql", label: "SQL Databases", icon: Database },
  { id: "api", label: "APIs", icon: PlugZap },
  // { id: "google_drive", label: "Google Drive", icon: Cloud }, // Covered by integrations
  // { id: "aws_s3", label: "AWS S3", icon: Cloud }, // Covered by integrations
];

export default function DataSourcesPage() {
  const router = useRouter();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const handleCheckboxChange = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleNext = () => {
    // Save selectedSources
    console.log("Selected data sources:", selectedSources);
    router.push("/onboarding/sample-data");
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title="Preferred Data Sources"
      description="Let us know what types of data you primarily work with."
    >
      <div className="space-y-4">
        {dataSourceOptions.map((source) => (
          <div key={source.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-secondary/50 transition-colors">
            <Checkbox
              id={source.id}
              checked={selectedSources.includes(source.id)}
              onCheckedChange={() => handleCheckboxChange(source.id)}
            />
            <source.icon className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor={source.id} className="font-normal cursor-pointer flex-1">
              {source.label}
            </Label>
          </div>
        ))}
      </div>
      <Button onClick={handleNext} className="w-full mt-8 bg-primary hover:bg-primary/90">
        Next
      </Button>
    </OnboardingLayout>
  );
}
