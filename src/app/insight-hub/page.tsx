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
import { Search, Filter, Tag, FolderPlus, ListFilter, BarChart2 } from "lucide-react";
import { useState, useMemo } from "react";

const mockInsights: ReportCardProps[] = [
  { id: "ih1", title: "Weekly Sales Performance", type: "chart", contentPreviewImage: "https://placehold.co/400x225.png", dataAiHint: "sales dashboard", tags: ["sales", "weekly", "performance"], folder: "Sales Reports", lastModified: "Oct 26, 2023", createdBy: "AI Assistant" },
  { id: "ih2", title: "Customer Segmentation Analysis", type: "summary", contentPreviewText: "Customers are primarily segmented into three groups based on purchasing behavior and demographics. Group A (High Value) shows strong loyalty...", tags: ["customers", "segmentation", "marketing"], lastModified: "Oct 24, 2023", createdBy: "Data Analyst" },
  { id: "ih3", title: "Top Performing Marketing Campaigns Q3", type: "table", contentPreviewImage: "https://placehold.co/400x225.png", dataAiHint: "marketing analytics", tags: ["marketing", "q3", "campaigns"], folder: "Marketing Insights", lastModified: "Oct 20, 2023", createdBy: "AI Assistant" },
  { id: "ih4", title: "Website Traffic Source Breakdown", type: "chart", contentPreviewImage: "https://placehold.co/400x225.png", dataAiHint: "traffic analytics", tags: ["website", "analytics", "traffic"], lastModified: "Oct 15, 2023", createdBy: "Jane Doe" },
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
      const matchesTag = filterTag === "all" || insight.tags.includes(filterTag);
      const matchesFolder = filterFolder === "all" || insight.folder === filterFolder;
      const matchesType = filterType === "all" || insight.type === filterType;
      return matchesSearch && matchesTag && matchesFolder && matchesType;
    });
  }, [searchTerm, filterTag, filterFolder, filterType]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
           <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search insights by title, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
                <FolderPlus className="h-4 w-4 mr-2 text-muted-foreground"/>
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
        
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold font-headline">Saved Insights & Reports</h2>
            <div>
                 <Button variant="outline"><FolderPlus className="mr-2 h-4 w-4" /> New Folder</Button>
                 {/* <Button className="ml-2"><PlusCircle className="mr-2 h-4 w-4" /> Create Report</Button> */}
            </div>
        </div>


        {filteredInsights.length === 0 && (
           <div className="text-center py-12">
            <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold">No Insights Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters or save insights from the AI Assistant.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map(insight => (
            <ReportCard key={insight.id} {...insight} />
          ))}
        </div>
         <div className="text-sm text-muted-foreground mt-4">
          Showing {filteredInsights.length} of {mockInsights.length} insights.
        </div>
      </div>
    </AppLayout>
  );
}
