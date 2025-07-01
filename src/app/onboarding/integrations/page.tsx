// src/app/onboarding/integrations/page.tsx
"use client";

import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Plus, Package, DatabaseZap, PartyPopper } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
// Import specific icons if available and preferred, e.g. for Google Drive, AWS S3

const integrations = [
  { id: "google_drive", name: "Google Drive", description: "Connect Google Drive files.", icon: Package },
  { id: "aws_s3", name: "AWS S3", description: "Link your S3 buckets.", icon: DatabaseZap },
  // Add more integrations here
];

export default function IntegrationsPage() {
  const router = useRouter();
  const [connected, setConnected] = useState<string[]>([]);

  const toggleConnection = (id: string) => {
    setConnected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleFinish = () => {
    // Save integration preferences
    console.log("Integration preferences saved (mock).");
    router.push("/dashboard"); // Navigate to dashboard
  };

  return (
    <OnboardingLayout
      currentStep={7}
      totalSteps={7}
      title="Almost There!"
      description="Optionally connect your favorite tools. You can always do this later."
    >
      <div className="space-y-4">
        {integrations.map((integration) => {
          const isConnected = connected.includes(integration.id);
          return (
            <Card key={integration.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <integration.icon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <Button variant={isConnected ? "secondary" : "outline"} size="sm" onClick={() => toggleConnection(integration.id)}>
                  {isConnected ? <Check className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                  {isConnected ? "Connected" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
       <p className="text-sm text-muted-foreground mt-6 text-center">
        You can set up more integrations later from your account settings.
      </p>
      <Button onClick={handleFinish} className="w-full mt-8 bg-primary hover:bg-primary/90 text-lg py-6">
        <PartyPopper className="mr-2 h-5 w-5" />
        Complete Setup & Go to Dashboard
      </Button>
    </OnboardingLayout>
  );
}
