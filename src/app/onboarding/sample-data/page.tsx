// src/app/onboarding/sample-data/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToyBrick } from "lucide-react";

export default function SampleDataPage() {
  const router = useRouter();
  const [importSampleData, setImportSampleData] = useState(true);

  const handleNext = () => {
    // Save preference
    console.log("Import sample data:", importSampleData);
    router.push("/onboarding/integrations");
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      title="Try AgentY with Sample Data?"
      description="Import a sample dataset to explore AgentY's features right away."
    >
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div className="flex items-center gap-3">
          <ToyBrick className="h-6 w-6 text-primary" />
          <Label htmlFor="sample-data-switch" className="text-base">
            Import Sample Dataset
          </Label>
        </div>
        <Switch
          id="sample-data-switch"
          checked={importSampleData}
          onCheckedChange={setImportSampleData}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-3">
        This will add a pre-configured dataset to your account so you can test features like AI Assistant and Insight Hub immediately. You can remove it later.
      </p>
      <div className="flex gap-4 mt-8">
        <Button onClick={() => router.push("/onboarding/integrations")} variant="outline" className="w-full">
          Skip
        </Button>
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
          {importSampleData ? "Import & Continue" : "Continue"}
        </Button>
      </div>
    </OnboardingLayout>
  );
}
