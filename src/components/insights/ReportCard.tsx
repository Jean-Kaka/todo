// src/components/insights/ReportCard.tsx
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart2, FileText, Download, Share2, CalendarPlus, Edit2, Trash2, Tag, FolderOpen, MoreVertical } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface ReportCardProps {
  id: string;
  title: string;
  description?: string;
  type: "chart" | "table" | "summary";
  chartType?: "line" | "bar" | "pie";
  chartData?: any[];
  chartConfig?: ChartConfig;
  contentPreviewText?: string;
  dataAiHint?: string;
  tags: string[];
  folder?: string;
  lastModified: string;
  createdBy: string;
}

const typeIcons: Record<ReportCardProps["type"], LucideIcon> = {
  chart: BarChart2,
  table: FileText,
  summary: FileText,
};

const renderChart = (
  chartType: ReportCardProps["chartType"],
  chartData: ReportCardProps["chartData"],
  chartConfig: ReportCardProps["chartConfig"]
) => {
  if (!chartData || !chartConfig) return null;

  switch (chartType) {
    case "bar":
      return (
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      );
    case "line":
      return (
        <ChartContainer config={chartConfig} className="h-full w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      );
    case "pie":
      return (
        <ChartContainer config={chartConfig} className="h-full w-full">
           <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={30} outerRadius={50} strokeWidth={2}>
              {(chartData as any[]).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      );
    default:
      return null;
  }
};

export default function ReportCard({
  id,
  title,
  description,
  type,
  chartType,
  chartData,
  chartConfig,
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
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Icon className="h-6 w-6 text-primary flex-shrink-0" />
            <CardTitle className="text-lg font-headline truncate">{title}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Edit2 className="mr-2 h-4 w-4" /> Edit Details</DropdownMenuItem>
              <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
              <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Export</DropdownMenuItem>
              <DropdownMenuItem><CalendarPlus className="mr-2 h-4 w-4" /> Schedule</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><FolderOpen className="mr-2 h-4 w-4" /> Move to Folder</DropdownMenuItem>
              <DropdownMenuItem><Tag className="mr-2 h-4 w-4" /> Manage Tags</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Insight
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {description && <CardDescription className="text-xs mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-2">
         <div className="aspect-video w-full bg-muted/50 rounded-md my-2 border flex items-center justify-center" data-ai-hint={dataAiHint}>
          {(type === 'chart' || type === 'table') && chartType && chartData ? (
             renderChart(chartType, chartData, chartConfig)
          ) : contentPreviewText ? (
             <p className="text-sm text-muted-foreground p-4 text-left leading-relaxed">{contentPreviewText}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No preview available</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 pt-4 border-t">
        <div className="space-y-1 text-xs text-muted-foreground w-full">
            <div className="flex justify-between"><span>Last Modified</span><span className="font-medium">{lastModified}</span></div>
            <div className="flex justify-between"><span>Created By</span><span className="font-medium">{createdBy}</span></div>
            {folder && <div className="flex justify-between items-center"><span>Folder</span><Badge variant="outline">{folder}</Badge></div>}
        </div>
        <div className="flex flex-wrap gap-1 w-full pt-3 mt-3 border-t">
            {tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
        </div>
      </CardFooter>
    </Card>
  );
}
