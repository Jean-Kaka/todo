// src/app/onboarding/role/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ShieldCheck, Code, Megaphone, ClipboardList, GraduationCap, Crown, UserSquare, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  { id: "ceo", name: "CEO", icon: Crown, description: "High-level business overview and strategic decision making." },
  { id: "general_manager", name: "General Manager", icon: UserSquare, description: "Manage overall business operations and performance." },
  { id: "manager", name: "Manager", icon: ShieldCheck, description: "Oversee team performance and strategic insights." },
  { id: "operations_manager", name: "Operations Manager", icon: Cog, description: "Optimize processes, supply chain, and daily operations." },
  { id: "product_manager", name: "Product Manager", icon: ClipboardList, description: "Track feature adoption and user engagement metrics." },
  { id: "engineer", name: "Engineer", icon: Code, description: "Integrate data sources and manage infrastructure." },
  { id: "data_analyst", name: "Data Analyst", icon: Briefcase, description: "Focus on data exploration and visualization." },
  { id: "marketing_specialist", name: "Marketing Specialist", icon: Megaphone, description: "Analyze campaign performance and customer behavior." },
  { id: "student", name: "Student / Researcher", icon: GraduationCap, description: "Explore datasets for academic or personal projects." },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedRole) {
      // Save selectedRole to localStorage or state management
      console.log("Selected role:", selectedRole);
      router.push("/onboarding/company-details");
    }
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={6}
      title="What's your role?"
      description="This helps us personalize your AgentY experience."
    >
      <div className="space-y-4">
        {roles.map((role) => (
          <Card
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedRole === role.id ? "ring-2 ring-primary shadow-md" : "ring-1 ring-border"
            )}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <role.icon className={cn("h-8 w-8", selectedRole === role.id ? "text-primary" : "text-muted-foreground")} />
              <div>
                <h3 className="font-medium">{role.name}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={handleNext} disabled={!selectedRole} className="w-full mt-8 bg-primary hover:bg-primary/90">
        Next
      </Button>
    </OnboardingLayout>
  );
}
