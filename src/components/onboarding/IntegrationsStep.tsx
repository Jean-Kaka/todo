"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Plus, Package, DatabaseZap, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const integrationsOptions = [
  { id: "google_drive", name: "Google Drive", description: "Connect Google Drive files.", icon: Package },
  { id: "aws_s3", name: "AWS S3", description: "Link your S3 buckets.", icon: DatabaseZap },
];

interface IntegrationsStepProps {
  onBack: () => void;
}

export default function IntegrationsStep({ onBack }: IntegrationsStepProps) {
  const router = useRouter();
  const { integrations, toggleIntegration, getState } = useOnboardingStore();

  const handleFinish = () => {
    const finalState = getState();
    console.log("Onboarding complete. Final state:", finalState);
    router.push("/onboarding/constructing-dashboard");
  };

  return (
    <>
      <div className="space-y-4">
        {integrationsOptions.map((integration) => {
          const isConnected = integrations.includes(integration.id);
          return (
            <Card key={integration.id} onClick={() => toggleIntegration(integration.id)} className="cursor-pointer overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <integration.icon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className={cn("flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium", isConnected ? "bg-secondary text-secondary-foreground" : "border border-input")}>
                    {isConnected ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                    {isConnected ? "Connected" : "Connect"}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
       <p className="text-sm text-muted-foreground mt-6 text-center">
        You can set up more integrations later from your account settings.
      </p>
      <div className="flex justify-between items-center mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
            Back
        </Button>
        <Button onClick={handleFinish} className="bg-primary hover:bg-primary/90 text-lg py-6">
            <PartyPopper className="mr-2 h-5 w-5" />
            Complete Setup & Go to Dashboard
        </Button>
      </div>
    </>
  );
}
