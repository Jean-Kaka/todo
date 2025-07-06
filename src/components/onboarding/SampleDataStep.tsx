"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Sparkles, UploadCloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SampleDataStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SampleDataStep({ onNext, onBack }: SampleDataStepProps) {
  const { setImportSampleData } = useOnboardingStore();

  const handleSelectSample = () => {
    setImportSampleData(true);
    onNext();
  };
  
  const handleSelectOwn = () => {
    setImportSampleData(false);
    onNext();
  }

  return (
    <>
      <div className="space-y-4">
        <Button onClick={handleSelectSample} variant="outline" className="w-full h-auto py-4 text-left justify-start gap-4">
          <Sparkles className="h-8 w-8 text-accent flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Load Sample Dataset</h3>
            <p className="text-sm text-muted-foreground font-normal">Explore features immediately with a pre-configured dataset.</p>
          </div>
        </Button>

        <Button onClick={handleSelectOwn} variant="outline" className="w-full h-auto py-4 text-left justify-start gap-4">
          <UploadCloud className="h-8 w-8 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-semibold">I'll Upload My Own Data</h3>
            <p className="text-sm text-muted-foreground font-normal">Continue setup and upload data from the dashboard.</p>
          </div>
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mt-6 text-center">
        You can always add or remove data sources later.
      </p>

      <div className="flex justify-start mt-8">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      </div>
    </>
  );
}
