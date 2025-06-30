// src/app/onboarding/integrations/page.tsx
"use client";

import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, DatabaseZap } from "lucide-react"; // Using generic icons for integrations
// Import specific icons if available and preferred, e.g. for Google Drive, AWS S3

const integrations = [
  { id: "google_drive", name: "Google Drive", description: "Connect your Google Drive files.", icon: Package },
  { id: "aws_s3", name: "AWS S3", description: "Link your S3 buckets.", icon: DatabaseZap },
  // Add more integrations here
];

export default function IntegrationsPage() {
  const router = useRouter();

  const handleFinish = () => {
    // Save integration preferences
    console.log("Integration preferences saved (mock).");
    router.push("/dashboard"); // Navigate to dashboard
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={6}
      title="Set Up Integrations (Optional)"
      description="Connect AgentY with your favorite tools and services."
    >
      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <integration.icon className="h-7 w-7 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </CardContent>
          </Card>
        ))}
      </div>
       <p className="text-sm text-muted-foreground mt-6 text-center">
        You can set up more integrations later from your account settings.
      </p>
      <Button onClick={handleFinish} className="w-full mt-8 bg-primary hover:bg-primary/90">
        Finish Setup & Go to Dashboard
      </Button>
    </OnboardingLayout>
  );
}
