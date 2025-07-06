// src/components/onboarding/LabelDataStep.tsx
"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LabelDataStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function LabelDataStep({ onNext, onBack }: LabelDataStepProps) {
  const {
    datasetName,
    setDatasetName,
    datasetDescription,
    setDatasetDescription,
    datasetTags,
    addDatasetTag,
    removeDatasetTag,
    onboardingFiles
  } = useOnboardingStore();

  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = () => {
    if (currentTag.trim()) {
      addDatasetTag(currentTag.trim());
      setCurrentTag("");
    }
  };

  const handleNext = () => {
    // Validation can be added here if needed
    onNext();
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <Label htmlFor="datasetName" className="flex items-center gap-1 mb-1"><Info className="h-4 w-4 text-muted-foreground"/> Dataset Name</Label>
          <Input 
            id="datasetName" 
            value={datasetName} 
            onChange={(e) => setDatasetName(e.target.value)}
            placeholder="e.g., Q4 Sales Data" 
          />
        </div>
        
        <div>
          <Label htmlFor="description" className="flex items-center gap-1 mb-1"><Info className="h-4 w-4 text-muted-foreground"/> Description (Optional)</Label>
          <Textarea 
            id="description" 
            value={datasetDescription}
            onChange={(e) => setDatasetDescription(e.target.value)}
            placeholder="Briefly describe this dataset, its source, or purpose."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="tags" className="flex items-center gap-1 mb-1"><Tag className="h-4 w-4 text-muted-foreground"/> Tags (Optional)</Label>
          <div className="flex gap-2 items-center">
            <Input 
              id="tags" 
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add tags like 'finance', 'q4'" 
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag();}}}
            />
            <Button type="button" variant="outline" onClick={handleAddTag}>Add</Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {datasetTags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
                <button onClick={() => removeDatasetTag(tag)} className="ml-1.5 text-muted-foreground hover:text-foreground">
                  &times;
                </button>
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Upload Summary</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Files to upload: {onboardingFiles.length}</li>
              <li>Total size: { (onboardingFiles.reduce((acc, file) => acc + file.size, 0) / (1024*1024)).toFixed(2) } MB</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!datasetName.trim()} className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </>
  );
}
