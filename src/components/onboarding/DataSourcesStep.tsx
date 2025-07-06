"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
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

interface DataSourcesStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function DataSourcesStep({ onNext, onBack }: DataSourcesStepProps) {
  const { dataSources, toggleDataSource } = useOnboardingStore();

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataSourceOptions.map((source) => (
          <Card
            key={source.id}
            onClick={() => toggleDataSource(source.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              dataSources.includes(source.id) ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <source.icon className={cn("h-8 w-8", dataSources.includes(source.id) ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{source.label}</h3>
                <p className="text-sm text-muted-foreground">{source.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={dataSources.length === 0} className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </>
  );
}
