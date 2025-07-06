// src/app/onboarding/page.tsx
"use client";

import { useState } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";

// Import step components
import RoleStep from "@/components/onboarding/RoleStep";
import CompanyDetailsStep from "@/components/onboarding/CompanyDetailsStep";
import ObjectivesStep from "@/components/onboarding/ObjectivesStep";
import KpisStep from "@/components/onboarding/KpisStep";
import DataSourcesStep from "@/components/onboarding/DataSourcesStep";
import SampleDataStep from "@/components/onboarding/SampleDataStep";
import TwoFactorAuthStep from "@/components/onboarding/TwoFactorAuthStep";
import IntegrationsStep from "@/components/onboarding/IntegrationsStep";

const steps = [
  { component: RoleStep, title: "What's your role?", description: "This helps us personalize your AgentY experience." },
  { component: CompanyDetailsStep, title: "Tell us about your company", description: "This information helps us tailor AgentY to your specific needs." },
  { component: ObjectivesStep, title: "What are your company's main objectives?", description: "Select your primary goals. This helps us suggest relevant insights for your business." },
  { component: KpisStep, title: "Identify Your Key Performance Indicators", description: "Select the metrics that matter most to your business. This helps us customize your dashboards." },
  { component: DataSourcesStep, title: "Connect Your Data", description: "Select all the types of data you plan to work with." },
  { component: SampleDataStep, title: "Ready to Explore?", description: "We can add a sample dataset to get you started right away." },
  { component: TwoFactorAuthStep, title: "Secure Your Account", description: "Set up two-factor authentication (2FA) for an extra layer of security." },
  { component: IntegrationsStep, title: "Almost There!", description: "Optionally connect your favorite tools. You can always do this later." },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <OnboardingLayout
      currentStep={currentStep + 1}
      totalSteps={steps.length}
      title={steps[currentStep].title}
      description={steps[currentStep].description}
    >
      <CurrentStepComponent onNext={handleNext} onBack={handleBack} />
    </OnboardingLayout>
  );
}
