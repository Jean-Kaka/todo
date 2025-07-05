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

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload File" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

export default function UploadFilePage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleNext = () => {
    if (files.length === 0) return;
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      console.log("Files selected:", files.map(f => f.name));
      // Store file or upload and then navigate
      router.push("/upload/preview");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={1} onStepClick={(step) => router.push(step === 0 ? "/upload" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Upload a File</CardTitle>
          </div>
          <CardDescription>Supported formats: CSV, Excel (XLSX), JSON, Parquet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="file-upload" className="block text-sm font-medium text-foreground mb-2">
              Choose file(s) to upload
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="flex text-sm text-muted-foreground">
                  <Label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                  >
                    <span>Upload a file</span>
                    <Input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv,.xlsx,.xls,.json,.parquet" multiple />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground">Max file size: 500MB</p>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-4 text-sm">
                <h4 className="font-medium text-foreground">Selected Files:</h4>
                <ul className="mt-2 list-disc list-inside space-y-1 rounded-md border p-3 bg-muted/50">
                  {files.map((file) => (
                    <li key={file.name} className="text-muted-foreground">
                      <span className="text-foreground">{file.name}</span> ({ (file.size / (1024*1024)).toFixed(2) } MB)
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
              {isUploading ? "Uploading..." : "Next: Preview Data"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
