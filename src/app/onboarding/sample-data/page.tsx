// src/app/onboarding/sample-data/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SampleDataPage() {
  const router = useRouter();
  const [importSampleData, setImportSampleData] = useState(true);

  const handleNext = () => {
    // Save preference
    console.log("Import sample data:", importSampleData);
    router.push("/onboarding/two-factor-auth");
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={8}
      title="Ready to Explore?"
      description="We can add a sample dataset to get you started right away."
    >
      <Card className="bg-secondary/50 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-7 w-7 text-accent" />
              <div>
                <Label htmlFor="sample-data-switch" className="text-base font-medium">
                  Load Sample Dataset
                </Label>
                <p className="text-sm text-muted-foreground">Explore features immediately.</p>
              </div>
            </div>
            <Switch
              id="sample-data-switch"
              checked={importSampleData}
              onCheckedChange={setImportSampleData}
              className="data-[state=checked]:bg-accent"
            />
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        This adds a pre-configured dataset so you can test features like AI Assistant and Insight Hub. You can remove it later.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button onClick={() => {
            console.log("Import sample data: false");
            router.push("/onboarding/two-factor-auth");
        }} variant="outline" className="w-full">
          Skip
        </Button>
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
          {importSampleData ? "Import & Continue" : "Continue without Sample Data"}
        </Button>
      </div>
    </OnboardingLayout>
  );
}
