// src/components/dashboard/DataSourceCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Database, PlugZap, AlertCircle, CheckCircle } from "lucide-react"; // Using PlugZap for API/Integration
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface DataSourceCardProps {
  id: string;
  name: string;
  type: "File" | "Database" | "API" | "Integration";
  freshness: string; // e.g., "Updated 2 hours ago" or "Syncing..."
  rowCount: number;
  schemaSummary: string; // e.g., "5 columns, 2 indexed"
  status?: "ok" | "error" | "syncing";
}

const typeIcons: Record<DataSourceCardProps["type"], LucideIcon> = {
  File: FileText,
  Database: Database,
  API: PlugZap,
  Integration: PlugZap,
};

export default function DataSourceCard({ name, type, freshness, rowCount, schemaSummary, status = "ok", id }: DataSourceCardProps) {
  const Icon = typeIcons[type];
  const statusIcon = status === "ok" ? <CheckCircle className="h-4 w-4 text-green-500" /> :
                     status === "error" ? <AlertCircle className="h-4 w-4 text-red-500" /> :
                     null; // Add syncing icon if needed

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <Icon className="h-8 w-8 text-primary mb-2" />
          {statusIcon}
        </div>
        <CardTitle className="text-lg font-headline">{name}</CardTitle>
        <CardDescription>{type} Source</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Freshness:</strong> {freshness}</p>
          <p><strong>Rows:</strong> {rowCount.toLocaleString()}</p>
          <p><strong>Schema:</strong> {schemaSummary}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/knowledge-base/${id}`}>Explore</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
