// src/components/insights/ReportCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart2, PieChart, FileText, Download, Share2, CalendarPlus, Edit2, Trash2, Tag, FolderOpen, MoreVertical } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ReportCardProps {
  id: string;
  title: string;
  description?: string;
  type: "chart" | "table" | "summary";
  contentPreviewImage?: string; // for charts/tables
  contentPreviewText?: string; // for summaries
  dataAiHint?: string;
  tags: string[];
  folder?: string;
  lastModified: string;
  createdBy: string;
}

const typeIcons: Record<ReportCardProps["type"], LucideIcon> = {
  chart: BarChart2, // Generic chart, could be more specific if type is refined
  table: FileText, // Using FileText as table icon might not be ideal, consider `Table` icon from lucide if available or custom
  summary: FileText,
};

export default function ReportCard({
  id,
  title,
  description,
  type,
  contentPreviewImage,
  contentPreviewText,
  dataAiHint,
  tags,
  folder,
  lastModified,
  createdBy
}: ReportCardProps) {
  const Icon = typeIcons[type];

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg font-headline">{title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem><FolderOpen className="mr-2 h-4 w-4" /> Move to Folder</DropdownMenuItem>
              <DropdownMenuItem><Tag className="mr-2 h-4 w-4" /> Manage Tags</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {description && <CardDescription className="text-xs mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        {contentPreviewImage && (
          <div className="aspect-video bg-muted rounded-md overflow-hidden my-2 border">
            <Image
              src={contentPreviewImage}
              alt={title || "Insight preview"}
              width={400}
              height={225}
              className="w-full h-full object-cover"
              data-ai-hint={dataAiHint}
            />
          </div>
        )}
        {contentPreviewText && (
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md my-2 leading-relaxed line-clamp-4">
            {contentPreviewText}
          </p>
        )}
        {!contentPreviewImage && !contentPreviewText && (
          <div className="aspect-video bg-muted rounded-md my-2 flex items-center justify-center text-muted-foreground">
            <p>No preview available</p>
          </div>
        )}
         <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <p>Last modified: {lastModified} by {createdBy}</p>
            {folder && <p>Folder: <Badge variant="outline">{folder}</Badge></p>}
         </div>

      </CardContent>
      <CardFooter className="flex-col items-start gap-3 pt-4 border-t">
        <div className="flex flex-wrap gap-1 mb-2">
            {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
        </div>
        <div className="flex w-full gap-2 justify-end">
          <Button variant="outline" size="sm"><Download className="mr-1 h-4 w-4" /> Export</Button>
          <Button variant="outline" size="sm"><Share2 className="mr-1 h-4 w-4" /> Share</Button>
          <Button variant="outline" size="sm"><CalendarPlus className="mr-1 h-4 w-4" /> Schedule</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
