// src/app/upload/confirm/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Tag, Info, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload / Connect" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

export default function UploadConfirmPage() {
  const router = useRouter();
  const [datasetName, setDatasetName] = useState("My New Dataset"); // Default or derive from filename/source
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFinishUpload = () => {
    setIsProcessing(true);
    console.log("Dataset Name:", datasetName);
    console.log("Description:", description);
    console.log("Tags:", tags);
    // Simulate final processing and saving
    setTimeout(() => {
      setIsProcessing(false);
      // Add toast message for success
      router.push("/dashboard"); // Or to knowledge base page for the new dataset
    }, 2500);
  };
  
  const handleBack = () => {
    router.push("/upload/clean");
  };

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={4} onStepClick={(step) => router.push(step < 4 ? "/upload/clean" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Confirm & Finish Upload</CardTitle>
          </div>
          <CardDescription>Provide final details for your new dataset.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="datasetName" className="flex items-center gap-1 mb-1"><Info className="h-4 w-4 text-muted-foreground"/> Dataset Name</Label>
            <Input 
              id="datasetName" 
              value={datasetName} 
              onChange={(e) => setDatasetName(e.target.value)}
              placeholder="e.g., Q4 Sales Data, Customer Churn Analysis" 
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="flex items-center gap-1 mb-1"><Info className="h-4 w-4 text-muted-foreground"/> Description (Optional)</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                placeholder="Add tags like 'finance', 'marketing', 'q4'" 
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag();}}}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>Add Tag</Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="ml-1.5 text-muted-foreground hover:text-foreground">
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Upload Summary (Mock)</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Source Type: File (CSV)</li>
                <li>Original Rows: 10,050</li>
                <li>Columns Mapped: 8</li>
                <li>Cleaning Steps Applied: Removed Duplicates, Trimmed Whitespace</li>
                <li>Estimated Final Rows: 9,875</li>
            </ul>
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
              Back to Cleaning
            </Button>
            <Button onClick={handleFinishUpload} disabled={isProcessing || !datasetName.trim()} className="bg-primary hover:bg-primary/90">
              {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Finish Upload & View Dataset"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
