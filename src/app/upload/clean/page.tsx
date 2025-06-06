// src/app/upload/clean/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ListChecks, Sparkles } from "lucide-react"; // Sparkles for AI cleaning

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload / Connect" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

const cleaningOptions = [
  { id: "remove_duplicates", label: "Remove Duplicate Rows" },
  { id: "handle_missing_values_remove", label: "Handle Missing Values: Remove Rows" },
  { id: "handle_missing_values_impute_mean", label: "Handle Missing Values: Impute with Mean (Numeric)" },
  { id: "trim_whitespace", label: "Trim Whitespace from Text Fields" },
  { id: "standardize_date_formats", label: "Standardize Date Formats (e.g., to YYYY-MM-DD)" },
];

export default function UploadCleanPage() {
  const router = useRouter();
  const [selectedCleaningOptions, setSelectedCleaningOptions] = useState<string[]>([]);

  const handleCheckboxChange = (optionId: string) => {
    setSelectedCleaningOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleNext = () => {
    console.log("Selected Cleaning Options:", selectedCleaningOptions);
    router.push("/upload/confirm");
  };
  
  const handleBack = () => {
    router.push("/upload/preview"); 
  };

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={3} onStepClick={(step) => router.push(step < 3 ? "/upload/preview" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListChecks className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Data Cleaning (Optional)</CardTitle>
          </div>
          <CardDescription>Apply common data cleaning operations. You can skip this step.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {cleaningOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-secondary/50 transition-colors">
                <Checkbox
                  id={option.id}
                  checked={selectedCleaningOptions.includes(option.id)}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
                <Label htmlFor={option.id} className="font-normal cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full flex items-center gap-2 text-primary border-primary hover:bg-primary/10">
            <Sparkles className="h-4 w-4" />
            Try AI-Powered Cleaning Suggestions (Beta)
          </Button>

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={handleBack}>
              Back to Preview
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              Next: Confirm & Finish
            </Button>
          </div>
           <Button variant="link" onClick={() => router.push("/upload/confirm")} className="w-full mt-2">
              Skip Cleaning
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
