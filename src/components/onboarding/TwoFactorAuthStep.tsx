"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

interface TwoFactorAuthStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TwoFactorAuthStep({ onNext, onBack }: TwoFactorAuthStepProps) {
  const { setTwoFactorEnabled } = useOnboardingStore();

  const handleNext = () => {
    setTwoFactorEnabled(true);
    onNext();
  };

  return (
    <>
      <div className="space-y-6 text-center flex flex-col items-center">
        <div className="flex justify-center p-4 bg-background rounded-lg border">
            <Image
                src="https://placehold.co/160x160.png"
                alt="QR Code for 2FA"
                width={160}
                height={160}
                className="rounded-md"
                data-ai-hint="security technology"
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
      <p className="text-center text-sm text-muted-foreground mt-6">
        Securing your account is important. You will need to complete this step to proceed.
      </p>
      <div className="flex justify-between items-center mt-8">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Verify & Continue
        </Button>
      </div>
    </>
  );
}
