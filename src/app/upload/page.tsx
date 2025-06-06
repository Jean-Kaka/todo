// src/app/upload/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Database, CloudUpload, Settings2, CheckCircle, PlugZap, Waypoints } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload / Connect" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

const sourceTypes = [
  { id: "file", name: "File", description: "Upload CSV, Excel, JSON, Parquet, etc.", icon: FileText, href: "/upload/file" },
  { id: "database", name: "Database", description: "Connect to SQL databases like PostgreSQL, MySQL.", icon: Database, href: "/upload/database" },
  { id: "api", name: "API", description: "Fetch data from REST or GraphQL APIs.", icon: Waypoints, href: "/upload/api" }, // Using Waypoints for API
  { id: "integration", name: "Integration", description: "Connect to services like Google Drive, S3, Shopify.", icon: PlugZap, href: "/upload/integration" },
];


export default function UploadSourcePage() {
  const router = useRouter();
  const [selectedSourceType, setSelectedSourceType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed

  const handleSourceSelect = (sourceTypeId: string, href: string) => {
    setSelectedSourceType(sourceTypeId);
    // For now, directly navigate. In a real app, might store this and go to a generic 'connect' step.
    router.push(href); 
  };

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={currentStep} />
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Choose Data Source Type</CardTitle>
          <CardDescription>Select how you want to import your data into AgentY.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sourceTypes.map((source) => (
              <Card
                key={source.id}
                onClick={() => handleSourceSelect(source.id, source.href)}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedSourceType === source.id ? "ring-2 ring-primary shadow-lg" : "ring-1 ring-border"
                )}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <source.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-1">{source.name}</h3>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* This button is illustrative; navigation happens on card click for this step */}
          {/* <Button 
            onClick={handleNext} 
            disabled={!selectedSourceType} 
            className="w-full mt-6"
          >
            Next: Connect Source
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
}

// Placeholder pages for subsequent steps (to be created)
// /upload/file, /upload/database, /upload/api, /upload/integration
// /upload/preview, /upload/clean, /upload/confirm
