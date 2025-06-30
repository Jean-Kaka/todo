// src/app/onboarding/two-factor-auth/page.tsx
"use client";

import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, ShieldCheck } from "lucide-react";
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
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
            <Image
                src="https://placehold.co/150x150.png"
                alt="QR Code for 2FA"
                width={150}
                height={150}
                className="rounded-lg border p-1"
                data-ai-hint="qr code"
            />
        </div>
        <p className="text-sm text-muted-foreground">
            Scan the QR code with your authenticator app (e.g., Google Authenticator, Authy).
        </p>
        <div>
            <Label htmlFor="2fa-code" className="sr-only">Authentication Code</Label>
            <Input
              id="2fa-code"
              placeholder="Enter 6-digit code"
              className="max-w-xs mx-auto text-center tracking-[0.5em]"
              maxLength={6}
            />
        </div>
      </div>
      <div className="flex gap-4 mt-8">
         <Button onClick={() => router.push("/onboarding/integrations")} variant="outline" className="w-full">
          Skip for now
        </Button>
        <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90">
          Verify & Continue
        </Button>
      </div>
    </OnboardingLayout>
  );
}
