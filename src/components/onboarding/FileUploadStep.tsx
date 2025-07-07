// src/components/onboarding/FileUploadStep.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/lib/onboarding-store";

interface FileUploadStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function FileUploadStep({ onNext, onBack }: FileUploadStepProps) {
  const { onboardingFiles, addUploadedFiles, removeUploadedFile } = useOnboardingStore();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      addUploadedFiles(Array.from(newFiles));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    if (event.target) {
        event.target.value = '';
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <>
      <div>
        <Label htmlFor="file-upload" className="block text-sm font-medium text-foreground mb-2">
          Upload files to get started
        </Label>
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors",
            isDraggingOver ? "border-primary bg-primary/10" : "border-border"
          )}
        >
          <div className="space-y-1 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="flex text-sm text-muted-foreground">
              <Label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
              >
                <span>Upload files</span>
                <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv,.xlsx,.xls,.json,.parquet" multiple />
              </Label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-muted-foreground">Max file size per file: 500MB</p>
          </div>
        </div>
        {onboardingFiles.length > 0 && (
          <div className="mt-4 text-sm max-h-40 overflow-y-auto">
            <h4 className="font-medium text-foreground">Selected Files:</h4>
            <ul className="mt-2 space-y-2">
              {onboardingFiles.map((onboardingFile, index) => (
                <li key={`${onboardingFile.file.name}-${index}`} className="flex items-center justify-between rounded-md border p-2 bg-muted/50 text-muted-foreground">
                  <div className="truncate pr-2">
                    <span className="text-foreground font-medium truncate">{onboardingFile.file.name}</span>
                    <span className="ml-2">({ (onboardingFile.file.size / (1024*1024)).toFixed(2) } MB)</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeUploadedFile(index)} className="text-destructive hover:text-destructive shrink-0">
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={onboardingFiles.length === 0} className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </>
  );
}
