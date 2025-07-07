// src/app/upload/integration/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlugZap } from "lucide-react";
// Import specific icons for integrations if available
// e.g. GoogleDriveIcon, AwsS3Icon from a library or custom SVGs

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Connect Integration" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

const availableIntegrations = [
    { id: "google_drive", name: "Google Drive", description: "Connect and sync files from your Google Drive.", icon: PlugZap /* Replace with actual icon */ },
    { id: "aws_s3", name: "Amazon S3", description: "Access data stored in your S3 buckets.", icon: PlugZap /* Replace with actual icon */ },
    { id: "shopify", name: "Shopify", description: "Import your e-commerce data directly.", icon: PlugZap /* Replace with actual icon */ },
    { id: "salesforce", name: "Salesforce", description: "Connect to your Salesforce CRM data.", icon: PlugZap /* Replace with actual icon */ },
];

export default function UploadIntegrationPage() {
  const router = useRouter();
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    setIsConnecting(true);
    console.log(`Attempting to connect to ${integrationId}...`);
    // Simulate OAuth flow or API key input leading to connection
    setTimeout(() => {
      setIsConnecting(false);
      // On successful connection, this would typically store tokens/credentials
      // and then proceed to a screen where user can select specific files/folders/objects from the integration.
      // For this wireframe, we'll just go to preview.
      router.push("/upload/preview"); 
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={1} onStepClick={(step) => router.push(step === 0 ? "/upload" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlugZap className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Connect an Integration</CardTitle>
          </div>
          <CardDescription>Select a service to integrate with AgentY.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {availableIntegrations.map(integration => (
                 <Card key={integration.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <integration.icon className="h-8 w-8 text-muted-foreground" />
                            <div>
                                <h3 className="font-semibold">{integration.name}</h3>
                                <p className="text-sm text-muted-foreground">{integration.description}</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={() => handleConnect(integration.id)}
                            disabled={isConnecting && selectedIntegration === integration.id}
                        >
                           {isConnecting && selectedIntegration === integration.id ? "Connecting..." : "Connect"}
                        </Button>
                    </CardContent>
                 </Card>
            ))}
          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={() => router.push("/upload")}>
              Back to Source Selection
            </Button>
            {/* Next button might be removed if connection directly leads to next step */}
            {/* <Button onClick={() => { if(selectedIntegration) router.push("/upload/preview");}} disabled={!selectedIntegration || isConnecting}>
              Next: Preview Data
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
