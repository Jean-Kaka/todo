// src/app/insight-hub/page.tsx
"use client";

import AppLayout from "@/components/layout/AppLayout";
import ReportCard, { ReportCardProps } from "@/components/insights/ReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Tag, ListFilter, BarChart2, Folder, PlusCircle } from "lucide-react";
import { useState, useMemo } from "react";
import Link from 'next/link';

const mockInsights: ReportCardProps[] = [
  {
    id: "ih1",
    title: "Weekly Sales Performance",
    type: "chart",
    chartType: "bar",
    chartData: [
      { name: "W1", value: 400 },
      { name: "W2", value: 300 },
      { name: "W3", value: 500 },
      { name: "W4", value: 450 },
    ],
    chartConfig: { value: { label: "Sales", color: "hsl(var(--chart-1))" } },
    dataAiHint: "sales dashboard",
    tags: ["sales", "weekly", "performance"],
    folder: "Sales Reports",
    lastModified: "Oct 26, 2023",
    createdBy: "AI Assistant",
  },
  {
    id: "ih2",
    title: "Customer Segmentation Analysis",
    type: "summary",
    contentPreviewText:
      "Customers are primarily segmented into three groups based on purchasing behavior and demographics. Group A (High Value) shows strong loyalty and frequent, large purchases. Group B (Potential) are recent customers with high potential for growth. Group C (At-Risk) have not purchased in over 90 days.",
    tags: ["customers", "segmentation", "marketing"],
    folder: "Marketing Insights",
    lastModified: "Oct 24, 2023",
    createdBy: "Data Analyst",
  },
  {
    id: "ih3",
    title: "Top Performing Marketing Campaigns Q3",
    type: "table",
    chartType: "pie",
    chartData: [
      { name: "Social", value: 40, fill: "hsl(var(--chart-1))" },
      { name: "SEO", value: 25, fill: "hsl(var(--chart-2))" },
      { name: "Email", value: 35, fill: "hsl(var(--chart-3))" },
    ],
    chartConfig: {
      value: { label: "Leads" },
      Social: { label: "Social Media" },
      SEO: { label: "SEO" },
      Email: { label: "Email" },
    },
    dataAiHint: "marketing analytics",
    tags: ["marketing", "q3", "campaigns"],
    folder: "Marketing Insights",
    lastModified: "Oct 20, 2023",
    createdBy: "AI Assistant",
  },
  {
    id: "ih4",
    title: "Website Traffic Source Breakdown",
    type: "chart",
    chartType: "line",
    chartData: [
      { name: "Jan", value: 1200 },
      { name: "Feb", value: 1500 },
      { name: "Mar", value: 1300 },
      { name: "Apr", value: 1800 },
      { name: "May", value: 2100 },
      { name: "Jun", value: 2500 },
    ],
    chartConfig: {
      value: { label: "Visitors", color: "hsl(var(--chart-2))" },
    },
    dataAiHint: "traffic analytics",
    tags: ["website", "analytics", "traffic"],
    lastModified: "Oct 15, 2023",
    createdBy: "Jane Doe",
  },
  {
    id: "ih5",
    title: "Inventory Levels by Product Category",
    type: "summary",
    contentPreviewText: "Inventory levels for 'Electronics' are critically low (avg. 15 units/SKU), while 'Apparel' is overstocked (avg. 250 units/SKU). Recommend a flash sale for apparel and expediting electronics shipments.",
    tags: ["inventory", "operations", "alert"],
    folder: "Operations",
    lastModified: "Oct 12, 2023",
    createdBy: "AI Assistant",
  },
  {
    id: "ih6",
    title: "Regional Profitability Report",
    type: "chart",
    chartType: "bar",
    chartData: [
      { name: "North America", value: 120000 },
      { name: "Europe", value: 95000 },
      { name: "Asia", value: 78000 },
      { name: "South America", value: 45000 },
    ],
    chartConfig: { value: { label: "Profit", color: "hsl(var(--chart-3))" } },
    dataAiHint: "finance report",
    tags: ["finance", "profit", "regional"],
    folder: "Sales Reports",
    lastModified: "Oct 10, 2023",
    createdBy: "John Smith",
  },
];


const allTags = Array.from(new Set(mockInsights.flatMap(i => i.tags)));
const allFolders = Array.from(new Set(mockInsights.map(i => i.folder).filter(Boolean) as string[]));


export default function InsightHubPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string | "all">("all");
  const [filterFolder, setFilterFolder] = useState<string | "all">("all");
  const [filterType, setFilterType] = useState<string | "all">("all");

  const filteredInsights = useMemo(() => {
    return mockInsights.filter(insight => {
      const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (insight.description && insight.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = filterTag === "all" || (insight.tags && insight.tags.includes(filterTag));
      const matchesFolder = filterFolder === "all" || insight.folder === filterFolder;
      const matchesType = filterType === "all" || insight.type === filterType;
      return matchesSearch && matchesTag && matchesFolder && matchesType;
    });
  }, [searchTerm, filterTag, filterFolder, filterType]);

  return (
    <AppLayout>
      <div className="space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">Insight Hub</h1>
                <p className="text-muted-foreground mt-1">Browse, search, and manage all your saved insights and reports.</p>
            </div>
            <div className="flex gap-2">
                 <Button asChild><Link href="/ai-assistant"><PlusCircle className="mr-2 h-4 w-4" /> Generate Insight</Link></Button>
            </div>
        </header>
        
        <div className="p-4 border rounded-lg bg-card flex flex-col md:flex-row gap-4">
           <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search insights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-auto md:w-[150px]">
                <ListFilter className="h-4 w-4 mr-2 text-muted-foreground"/>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="chart">Chart</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="summary">Summary</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-full sm:w-auto md:w-[150px]">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground"/>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map(tag => <SelectItem key={tag} value={tag}>{tag}</SelectItem>)}
              </SelectContent>
            </Select>
             <Select value={filterFolder} onValueChange={setFilterFolder}>
              <SelectTrigger className="w-full sm:w-auto md:w-[180px]">
                <Folder className="h-4 w-4 mr-2 text-muted-foreground"/>
                <SelectValue placeholder="Filter by folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Folders</SelectItem>
                {allFolders.map(folder => <SelectItem key={folder} value={folder}>{folder}</SelectItem>)}
                 <SelectItem value="none">Uncategorized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
            <h2 className="text-xl font-semibold font-headline mb-4">
                {filteredInsights.length} {filteredInsights.length === 1 ? 'Insight' : 'Insights'} Found
            </h2>
            {filteredInsights.length === 0 ? (
               <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">No Insights Found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or generate a new insight from the AI Assistant.
                </p>
                <Button className="mt-6" asChild><Link href="/ai-assistant">Generate Insight</Link></Button>
              </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredInsights.map(insight => (
                    <ReportCard key={insight.id} {...insight} />
                  ))}
                </div>
            )}
        </div>
      </div>
    </AppLayout>
  );
}
