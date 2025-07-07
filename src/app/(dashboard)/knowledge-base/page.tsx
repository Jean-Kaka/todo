// src/app/knowledge-base/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Database, PlugZap, Search, Filter, Edit3, Trash2, MessageSquarePlus, Bot, PlusCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

interface DataSource {
  id: string;
  name: string;
  type: "File" | "Database" | "API" | "Integration";
  metadata: string; // e.g., file size, connection string hint
  schema: string; // e.g., "15 columns", or short list
  tags: string[];
  ownership: string; // e.g., "Marketing Team" or "John Doe"
  freshness: string; // e.g., "Updated 2h ago" or "Live"
  notes?: string;
}

const mockDataSources: DataSource[] = [
  { id: "ds_kb_1", name: "Q3 Sales Report", type: "File", metadata: "CSV, 2.5MB", schema: "Date, Product, Amount, Region...", tags: ["sales", "q3", "finance"], ownership: "Alice Smith", freshness: "Uploaded Sep 30" },
  { id: "ds_kb_2", name: "Production DB (Read Replica)", type: "Database", metadata: "PostgreSQL, read-only", schema: "Users, Orders, Products...", tags: ["production", "customerdata"], ownership: "Engineering", freshness: "Syncs hourly" },
  { id: "ds_kb_3", name: "Social Media Analytics", type: "API", metadata: "XYZ Platform API v2", schema: "PostID, Likes, Comments, Shares...", tags: ["marketing", "social"], ownership: "Marketing Team", freshness: "Updated 5m ago" },
  { id: "ds_kb_4", name: "Inventory System", type: "Integration", metadata: "Shopify Sync", schema: "SKU, Stock, Price...", tags: ["inventory", "ecommerce"], ownership: "Operations", freshness: "Live" },
  { id: "ds_kb_5", name: "Archived User Data 2022", type: "File", metadata: "Parquet, 15GB", schema: "UserID, ProfileData, ActivityLog...", tags: ["archive", "gdpr"], ownership: "Legal Dept", freshness: "Uploaded Jan 15, 2023" },
  { id: "ds_kb_6", name: "Google Analytics", type: "Integration", metadata: "GA4 Property ID: 12345", schema: "Sessions, Pageviews, Events...", tags: ["marketing", "website", "analytics"], ownership: "Marketing Team", freshness: "Live" },
  { id: "ds_kb_7", name: "Q4 Marketing Spend", type: "File", metadata: "XLSX, 500KB", schema: "Date, Campaign, Channel, Spend...", tags: ["marketing", "q4", "finance"], ownership: "Marketing Team", freshness: "Uploaded Oct 5" },
  { id: "ds_kb_8", name: "User Feedback Survey", type: "File", metadata: "JSON, 1.2MB", schema: "UserID, Rating, Comment, Date...", tags: ["customer", "feedback", "product"], ownership: "Product Team", freshness: "Uploaded Sep 20" },
];

const typeIcons: Record<DataSource["type"], LucideIcon> = {
  File: FileText,
  Database: Database,
  API: PlugZap,
  Integration: PlugZap,
};


export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | "all">("all");
  const [filterTag, setFilterTag] = useState<string | "all">("all");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockDataSources.forEach(ds => ds.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredDataSources = useMemo(() => {
    return mockDataSources.filter(ds => {
      const matchesSearch = ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ds.metadata.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ds.schema.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ds.ownership.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || ds.type === filterType;
      const matchesTag = filterTag === "all" || ds.tags.includes(filterTag);
      return matchesSearch && matchesType && matchesTag;
    });
  }, [searchTerm, filterType, filterTag]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
              <h1 className="text-3xl font-bold font-headline">Knowledge Base</h1>
              <p className="text-muted-foreground mt-1">Manage and explore all your connected data sources.</p>
          </div>
          <Button asChild>
              <Link href="/upload">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Data Source
              </Link>
          </Button>
      </header>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground"/>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="File">File</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="API">API</SelectItem>
              <SelectItem value="Integration">Integration</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground"/>
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => <SelectItem key={tag} value={tag}>{tag}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Metadata</TableHead>
              <TableHead>Schema Summary</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Ownership</TableHead>
              <TableHead>Freshness</TableHead>
              <TableHead className="text-right w-[170px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDataSources.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No data sources found. Try adjusting your filters or <Link href="/upload" className="text-primary hover:underline">upload a new source</Link>.
                </TableCell>
              </TableRow>
            )}
            {filteredDataSources.map((ds) => {
              const Icon = typeIcons[ds.type];
              return (
                <TableRow key={ds.id}>
                  <TableCell>
                    <Icon className="h-5 w-5 text-primary" title={ds.type}/>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/knowledge-base/${ds.id}`} className="hover:underline text-primary">
                        {ds.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ds.metadata}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ds.schema}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ds.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ds.ownership}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ds.freshness}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button asChild variant="ghost" size="icon" className="h-7 w-7" title={`Ask AI about the ${ds.name} source`}>
                          <Link href={`/ai-assistant?query=Tell me about the ${ds.name} data source`}>
                              <Bot className="h-4 w-4" />
                          </Link>
                      </Button>
                       <Button variant="ghost" size="icon" className="h-7 w-7" title="Add Note/Comment">
                         <MessageSquarePlus className="h-4 w-4" />
                       </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground mt-4">
        Showing {filteredDataSources.length} of {mockDataSources.length} data sources.
      </div>
    </div>
  );
}
