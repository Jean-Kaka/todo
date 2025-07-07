// src/components/onboarding/LabelDataStep.tsx
"use client";

import * as React from "react";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LabelDataStepProps {
  onNext: () => void;
  onBack: () => void;
}

// Sub-component for the form for a single file to optimize re-renders
const FileLabelForm = ({ fileIndex }: { fileIndex: number }) => {
  const { onboardingFiles, updateUploadedFile } = useOnboardingStore();
  const fileData = onboardingFiles[fileIndex];
  
  const [currentTag, setCurrentTag] = React.useState("");

  const handleAddTag = () => {
    if (currentTag.trim() && !fileData.tags.includes(currentTag.trim())) {
        updateUploadedFile(fileIndex, { tags: [...fileData.tags, currentTag.trim()] });
        setCurrentTag("");
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    updateUploadedFile(fileIndex, { tags: fileData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateUploadedFile(fileIndex, { [e.target.name]: e.target.value });
  };

  if (!fileData) return null;

  return (
    <div className="space-y-4 pt-2">
      <div>
        <Label htmlFor={`name-${fileIndex}`}>Dataset Name</Label>
        <Input 
          id={`name-${fileIndex}`}
          name="name"
          value={fileData.name}
          onChange={handleInputChange}
          placeholder="e.g., Q4 Sales Data"
        />
      </div>
      <div>
        <Label htmlFor={`description-${fileIndex}`}>Description (Optional)</Label>
        <Textarea 
          id={`description-${fileIndex}`}
          name="description"
          value={fileData.description}
          onChange={handleInputChange}
          rows={2}
          placeholder="Briefly describe this dataset..."
        />
      </div>
      <div>
        <Label htmlFor={`tags-${fileIndex}`}>Tags (Optional)</Label>
        <div className="flex gap-2 items-center">
            <Input 
              id={`tags-${fileIndex}`} 
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag and press Enter" 
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag();}}}
            />
            <Button type="button" variant="outline" size="sm" onClick={handleAddTag}>Add</Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
            {fileData.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1.5 text-muted-foreground hover:text-foreground text-lg leading-none p-0 focus:outline-none" aria-label={`Remove ${tag} tag`}>
                    &times;
                </button>
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};


export default function LabelDataStep({ onNext, onBack }: LabelDataStepProps) {
  const { onboardingFiles } = useOnboardingStore();

  const isNextDisabled = onboardingFiles.some(f => !f.name.trim());

  return (
    <>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Add details for each of your uploaded files.</p>
        <Accordion type="single" collapsible className="w-full max-h-96 overflow-y-auto pr-2" defaultValue="item-0">
          {onboardingFiles.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={`${item.file.name}-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2 truncate">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate font-medium">{item.name || item.file.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <FileLabelForm fileIndex={index} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={isNextDisabled} className="bg-primary hover:bg-primary/90">
          Next
        </Button>
      </div>
    </>
  );
}
