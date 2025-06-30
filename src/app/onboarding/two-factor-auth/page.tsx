// src/app/onboarding/two-factor-auth/page.tsx
"use client";

import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function TwoFactorAuthPage() {
  const router = useRouter();

  const handleNext = () => {
    // Logic to verify 2FA code
    console.log("2FA setup complete (mock).");
    router.push("/onboarding/integrations");
  };

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={6}
      title="Secure Your Account"
      description="Set up two-factor authentication (2FA) for an extra layer of security."
    >
      <div className="space-y-6 text-center flex flex-col items-center">
        <div className="flex justify-center p-4 bg-background rounded-lg border">
            <Image
                src="https://placehold.co/160x160.png"
                alt="QR Code for 2FA"
                width={160}
                height={160}
                className="rounded-md"
                data-ai-hint="qr code"
            />
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
            Scan the QR code with your authenticator app, then enter the 6-digit code below.
        </p>
        <div className="w-full max-w-xs">
            <Label htmlFor="2fa-code" className="sr-only">Authentication Code</Label>
            <Input
              id="2fa-code"
              placeholder="123456"
              className="text-center text-2xl tracking-[0.3em] font-mono"
              maxLength={6}
            />
        </div>
      </div>
      <div className="flex gap-4 mt-8">
         <Button onClick={() => router.push("/onboarding/integrations")} variant="ghost" className="w-full">
          Skip for now
        </Button>
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Verify & Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
}
