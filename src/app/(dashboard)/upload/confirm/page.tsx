// src/app/upload/confirm/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Tag, Loader2, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUploadStore } from "@/lib/upload-store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload / Connect" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

// Sub-component for the form for a single file
const FileLabelForm = ({ fileIndex }: { fileIndex: number }) => {
    const { files, updateFile } = useUploadStore();
    const fileData = files[fileIndex];
    const [currentTag, setCurrentTag] = useState("");

    const handleAddTag = () => {
        if (currentTag.trim() && !fileData.tags.includes(currentTag.trim())) {
            updateFile(fileIndex, { tags: [...fileData.tags, currentTag.trim()] });
            setCurrentTag("");
        }
    };
    
    const handleRemoveTag = (tagToRemove: string) => {
        updateFile(fileIndex, { tags: fileData.tags.filter(tag => tag !== tagToRemove) });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateFile(fileIndex, { [e.target.name]: e.target.value });
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

export default function UploadConfirmPage() {
  const router = useRouter();
  const { files, clearFiles } = useUploadStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFinishUpload = () => {
    setIsProcessing(true);
    console.log("Finalizing upload for these files:", files.map(f => ({
        name: f.name,
        description: f.description,
        tags: f.tags,
        originalFileName: f.file.name,
        size: f.file.size
    })));
    // Simulate final processing and saving
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Upload Successful!",
        description: `${files.length} file(s) have been added to your Knowledge Base.`,
      });
      clearFiles();
      router.push("/knowledge-base");
    }, 2500);
  };
  
  const handleBack = () => {
    router.push("/upload/clean");
  };

  const isFinishDisabled = files.some(f => !f.name.trim()) || files.length === 0 || isProcessing;

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={4} onStepClick={(step) => router.push(step < 4 ? "/upload/clean" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Confirm & Finish Upload</CardTitle>
          </div>
          <CardDescription>Provide final details for your new dataset(s). A name is required for each.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Uploaded Datasets ({files.length})</h3>
            {files.length === 0 ? (
                <p className="text-sm text-muted-foreground">No files were uploaded. Please go back to the upload step.</p>
            ) : (
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {files.map((item, index) => (
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
            )}
          </div>
          
          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
              Back to Cleaning
            </Button>
            <Button onClick={handleFinishUpload} disabled={isFinishDisabled} className="bg-primary hover:bg-primary/90">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : `Finish Upload (${files.length})`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
