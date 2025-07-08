// src/app/upload/file/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUploadStore } from "@/lib/upload-store";

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload File" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

export default function UploadFilePage() {
  const router = useRouter();
  const { files, addFiles, removeFile } = useUploadStore();
  const [isUploading, setIsUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      addFiles(Array.from(newFiles));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    // Reset the input value to allow selecting the same file again
    if (event.target) {
        event.target.value = '';
    }
  };

  const handleNext = () => {
    if (files.length === 0) return;
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      console.log("Files selected:", files.map(f => f.file.name));
      // Store file or upload and then navigate
      router.push("/upload/preview");
    }, 1500);
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

  const handleRemoveFile = (fileIndexToRemove: number) => {
    removeFile(fileIndexToRemove);
  };


  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={1} onStepClick={(step) => router.push(step === 0 ? "/upload" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Upload Files</CardTitle>
          </div>
          <CardDescription>Supported formats: CSV, Excel (XLSX), JSON, Parquet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="file-upload" className="block text-sm font-medium text-foreground mb-2">
              Choose files to upload
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
            {files.length > 0 && (
              <div className="mt-4 text-sm">
                <h4 className="font-medium text-foreground">Selected Files:</h4>
                <ul className="mt-2 space-y-2">
                  {files.map((uploadedFile, index) => (
                    <li key={`${uploadedFile.file.name}-${index}`} className="flex items-center justify-between rounded-md border p-2 bg-muted/50 text-muted-foreground">
                      <div className="truncate pr-2">
                        <span className="text-foreground font-medium truncate">{uploadedFile.file.name}</span>
                        <span className="ml-2">({ (uploadedFile.file.size / (1024*1024)).toFixed(2) } MB)</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)} className="text-destructive hover:text-destructive shrink-0">
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={() => router.push("/upload")}>
              Back to Source Selection
            </Button>
            <Button onClick={handleNext} disabled={files.length === 0 || isUploading} className="bg-primary hover:bg-primary/90">
              {isUploading ? `Uploading ${files.length} file(s)...` : `Next: Preview Data (${files.length})`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
