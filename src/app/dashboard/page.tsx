// src/app/dashboard/page.tsx
"use client";

import AppLayout from "@/components/layout/AppLayout";
import DataSourceCard, { DataSourceCardProps } from "@/components/dashboard/DataSourceCard";
import InsightCard, { InsightCardProps } from "@/components/dashboard/InsightCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlusCircle, MessageCircle, BarChartHorizontalBig, AlertTriangle, CalendarClock, Bell, Lightbulb, Database, Users, Timer } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";

const mockDataSources: DataSourceCardProps[] = [
  { id: "ds1", name: "Sales Q3 Data", type: "File", freshness: "Updated 5 mins ago", rowCount: 150234, schemaSummary: "12 columns, 3 indexed", status: "ok" },
  { id: "ds2", name: "Customer Database", type: "Database", freshness: "Syncing...", rowCount: 87650, schemaSummary: "25 columns, 8 indexed", status: "syncing" },
  { id: "ds3", name: "Marketing API", type: "API", freshness: "Last checked 1 day ago", rowCount: 500000, schemaSummary: "8 fields", status: "error" },
  { id: "ds4", name: "Website Analytics", type: "Integration", freshness: "Live", rowCount: 1200000, schemaSummary: "30+ metrics", status: "ok" },
];

const mockInsights: InsightCardProps[] = [
  { id: "in1", title: "Sales up 18% this week", description: "Compared to last week, overall sales have increased significantly.", chartImage: "https://placehold.co/400x225.png", dataAiHint: "bar chart sales" },
  { id: "in2", title: "New User Sign-ups Peaked on Wednesday", description: "Identified a mid-week surge in new user registrations.", chartImage: "https://placehold.co/400x225.png", dataAiHint: "line chart users" },
  { id: "in3", title: "Product Category C has highest engagement", description: "Users spend more time on average with products in Category C.", chartImage: "https://placehold.co/400x225.png", dataAiHint: "pie chart engagement" },
];

const mockStats = [
  { title: "Insights Generated", value: "1,254", icon: Lightbulb, change: "+20.1%", changeType: "increase" as const },
  { title: "Data Sources", value: "12", icon: Database, change: "+2", changeType: "increase" as const },
  { title: "Active Users", value: "23", icon: Users, change: "-1.5%", changeType: "decrease" as const },
  { title: "Avg. Query Time", value: "2.1s", icon: Timer, change: "+0.2s", changeType: "decrease" as const },
];


export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Key Statistics */}
        <section>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mockStats.map(stat => <StatCard key={stat.title} {...stat} />)}
           </div>
        </section>

        {/* Analytics Charts */}
        <section>
          <AnalyticsCharts />
        </section>
        
        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-headline">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" size="lg" className="flex flex-col h-auto py-6 items-center justify-center gap-2 text-lg hover:bg-primary/5 hover:border-primary" asChild>
              <Link href="/upload">
                <PlusCircle className="h-8 w-8 text-primary" />
                Upload New Data
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="flex flex-col h-auto py-6 items-center justify-center gap-2 text-lg hover:bg-primary/5 hover:border-primary" asChild>
              <Link href="/ai-assistant">
                <MessageCircle className="h-8 w-8 text-primary" />
                Ask AI Assistant
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="flex flex-col h-auto py-6 items-center justify-center gap-2 text-lg hover:bg-primary/5 hover:border-primary" asChild>
              <Link href="/insight-hub">
                <BarChartHorizontalBig className="h-8 w-8 text-primary" />
                View Reports
              </Link>
            </Button>
          </div>
        </section>

        {/* Data Source Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-headline">Your Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockDataSources.map(ds => <DataSourceCard key={ds.id} {...ds} />)}
          </div>
        </section>

        {/* AI-Generated Insight Cards */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-headline">Latest Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInsights.map(insight => <InsightCard key={insight.id} {...insight} />)}
          </div>
        </section>

        {/* Alerts & Notifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-headline">Alerts & Notifications</h2>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Data Sync Failed for Marketing API!</AlertTitle>
              <AlertDescription>
                The Marketing API failed to sync at 3:00 AM. Please check credentials or API status.
                <Button variant="link" size="sm" className="p-0 h-auto ml-2 text-destructive-foreground/80 hover:text-destructive-foreground">View Details</Button>
              </AlertDescription>
            </Alert>
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertTitle>New Insight Available: User Churn Risk</AlertTitle>
              <AlertDescription>
                AI has identified a potential increase in user churn risk for segment B.
                 <Button variant="link" size="sm" className="p-0 h-auto ml-2">Explore Insight</Button>
              </AlertDescription>
            </Alert>
             <Alert>
              <CalendarClock className="h-4 w-4" />
              <AlertTitle>Upcoming Report: Weekly Sales Summary</AlertTitle>
              <AlertDescription>
                Your "Weekly Sales Summary" report is scheduled to be generated tomorrow at 9:00 AM.
                <Button variant="link" size="sm" className="p-0 h-auto ml-2">Manage Schedules</Button>
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
