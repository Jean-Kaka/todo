// src/app/onboarding/page.tsx
"use client";

import { useState, useMemo } from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { useOnboardingStore } from "@/lib/onboarding-store";

// Import step components
import RoleStep from "@/components/onboarding/RoleStep";
import CompanyDetailsStep from "@/components/onboarding/CompanyDetailsStep";
import ObjectivesStep from "@/components/onboarding/ObjectivesStep";
import KpisStep from "@/components/onboarding/KpisStep";
import DataSourcesStep from "@/components/onboarding/DataSourcesStep";
import SampleDataStep from "@/components/onboarding/SampleDataStep";
import FileUploadStep from "@/components/onboarding/FileUploadStep";
import LabelDataStep from "@/components/onboarding/LabelDataStep";
import TwoFactorAuthStep from "@/components/onboarding/TwoFactorAuthStep";
import IntegrationsStep from "@/components/onboarding/IntegrationsStep";

// Define all possible steps
const stepDefinitions = [
  { id: 'role', component: RoleStep, title: "What's your role?", description: "This helps us personalize your AgentY experience." },
  { id: 'company-details', component: CompanyDetailsStep, title: "Tell us about your company", description: "This information helps us tailor AgentY to your specific needs." },
  { id: 'objectives', component: ObjectivesStep, title: "What are your company's main objectives?", description: "Select your primary goals. This helps us suggest relevant insights for your business." },
  { id: 'kpis', component: KpisStep, title: "Identify Your Key Performance Indicators", description: "Select the metrics that matter most to your business. This helps us customize your dashboards." },
  { id: 'data-sources', component: DataSourcesStep, title: "Connect Your Data", description: "Select all the types of data you plan to work with." },
  { id: 'sample-data', component: SampleDataStep, title: "Ready to Explore?", description: "We can add a sample dataset or you can upload your own." },
  { id: 'file-upload', component: FileUploadStep, title: "Upload Your Data", description: "Get a head start by uploading your first dataset.", conditional: true },
  { id: 'label-data', component: LabelDataStep, title: "Describe Your Dataset", description: "Provide final details for your new dataset.", conditional: true },
  { id: 'two-factor-auth', component: TwoFactorAuthStep, title: "Secure Your Account", description: "Set up two-factor authentication (2FA) for an extra layer of security." },
  { id: 'integrations', component: IntegrationsStep, title: "Almost There!", description: "Optionally connect your favorite tools and invite your team." },
];

export default function OnboardingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { importSampleData } = useOnboardingStore();

  // Filter steps based on the `importSampleData` flag
  const activeSteps = useMemo(() => {
    if (importSampleData) {
      return stepDefinitions.filter(step => !step.conditional);
    }
    return stepDefinitions;
  }, [importSampleData]);

  // Adjust index if it becomes out of bounds after filtering
  if (currentStepIndex >= activeSteps.length) {
      setCurrentStepIndex(activeSteps.length - 1);
  }

  const handleNext = () => {
    if (currentStepIndex < activeSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const currentStepData = activeSteps[currentStepIndex];
  const CurrentStepComponent = currentStepData.component;

  return (
    <OnboardingLayout
      currentStep={currentStepIndex + 1}
      totalSteps={activeSteps.length}
      title={currentStepData.title}
      description={currentStepData.description}
    >
      <CurrentStepComponent onNext={handleNext} onBack={handleBack} />
    </OnboardingLayout>
  );
}
