"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SampleDataStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SampleDataStep({ onNext, onBack }: SampleDataStepProps) {
  const { importSampleData, setImportSampleData } = useOnboardingStore();

  const handleContinue = () => {
    onNext();
  };

  const handleSkip = () => {
    setImportSampleData(false);
    onNext();
  }

  return (
    <>
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
        <Button onClick={onBack} variant="outline" className="w-full">
            Back
        </Button>
        <Button onClick={handleContinue} className="w-full bg-primary hover:bg-primary/90">
          {importSampleData ? "Import & Continue" : "Continue without Sample Data"}
        </Button>
      </div>
    </>
  );
}
