"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Plus, Package, DatabaseZap, PartyPopper, Users } from "lucide-react";
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
  const { integrations, toggleIntegration, invitedFriends, addInvitedFriend, getState } = useOnboardingStore();
  const [inviteEmail, setInviteEmail] = useState("");

  const handleFinish = () => {
    const finalState = getState();
    // Sanitize file objects for logging
    const loggedState = {
      ...finalState,
      onboardingFiles: finalState.onboardingFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    };
    console.log("Onboarding complete. Final state:", loggedState);
    router.push("/onboarding/constructing-dashboard");
  };
  
  const handleSendInvite = () => {
    // simple email regex for validation
    if (inviteEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) {
        addInvitedFriend(inviteEmail);
        setInviteEmail(""); // clear input
    }
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
      
      <Separator className="my-8" />

      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2 text-lg"><Users className="h-5 w-5 text-muted-foreground" /> Invite Your Team</h3>
        <p className="text-sm text-muted-foreground">
            Get your team on board from day one. You can send multiple invites.
        </p>
        <div className="flex gap-2">
            <Input 
                type="email"
                placeholder="friend@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendInvite(); }}}
            />
            <Button type="button" variant="outline" onClick={handleSendInvite}>Send Invite</Button>
        </div>
        {invitedFriends.length > 0 && (
            <div className="space-y-2 pt-2">
                <h4 className="text-xs font-medium text-muted-foreground">Invited:</h4>
                <div className="flex flex-wrap gap-2">
                    {invitedFriends.map((email, index) => (
                        <Badge key={index} variant="secondary">{email}</Badge>
                    ))}
                </div>
            </div>
        )}
      </div>

       <p className="text-sm text-muted-foreground mt-8 text-center">
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
