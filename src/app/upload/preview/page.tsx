// src/app/upload/preview/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings2, ChevronDown } from "lucide-react"; // Settings2 for Map

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Upload / Connect" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

// Mock data for preview
const mockPreviewData = {
  headers: ["OrderID", "Product Name", "Category", "Sale Amount", "Order Date", "Customer ID"],
  rows: [
    ["1001", "Laptop Pro X", "Electronics", "1200.00", "2023-10-01", "CUST001"],
    ["1002", "Organic Coffee Beans", "Groceries", "22.50", "2023-10-01", "CUST002"],
    ["1003", "Designer T-Shirt", "Apparel", "49.99", "2023-10-02", "CUST001"],
    ["1004", "Smart Thermostat", "Home Goods", "199.00", "2023-10-03", "CUST003"],
    ["1005", "Yoga Mat Premium", "Sports", "35.00", "2023-10-03", "CUST004"],
  ],
};

const availableDataTypes = ["Text", "Number", "Date", "Boolean", "Category", "Currency"];

export default function UploadPreviewPage() {
  const router = useRouter();
  // Initialize column types based on mock data headers
  const initialColumnTypes = mockPreviewData.headers.reduce((acc, header) => {
    acc[header] = "Text"; // Default to Text
    return acc;
  }, {} as Record<string, string>);
  
  const [columnTypes, setColumnTypes] = useState<Record<string, string>>(initialColumnTypes);

  const handleTypeChange = (columnName: string, newType: string) => {
    setColumnTypes(prev => ({ ...prev, [columnName]: newType }));
  };

  const handleNext = () => {
    console.log("Column Mappings:", columnTypes);
    router.push("/upload/clean");
  };
  
  const handleBack = () => {
    // This logic is simplified. In a real app, you'd know the previous step.
    // For now, just go back to the generic upload start page.
    router.push("/upload"); 
  };


  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={2} onStepClick={(step) => router.push(step < 2 ? "/upload" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings2 className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Map & Preview Data</CardTitle>
          </div>
          <CardDescription>Review a sample of your data and map column types. AgentY will try to auto-detect types.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">Showing first {mockPreviewData.rows.length} rows of your data.</p>
          <div className="overflow-x-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  {mockPreviewData.headers.map((header, index) => (
                    <TableHead key={index}>
                      <div className="flex flex-col gap-1">
                        <span>{header}</span>
                        <Select value={columnTypes[header]} onValueChange={(value) => handleTypeChange(header, value)}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableDataTypes.map(type => (
                              <SelectItem key={type} value={type} className="text-xs">{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPreviewData.rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="text-xs whitespace-nowrap">{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
              Next: Clean Data (Optional)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
