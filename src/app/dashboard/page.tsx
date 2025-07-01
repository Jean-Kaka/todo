// src/app/dashboard/page.tsx
"use client";

import AppLayout from "@/components/layout/AppLayout";
import DataSourceCard, { DataSourceCardProps } from "@/components/dashboard/DataSourceCard";
import InsightCard, { InsightCardProps } from "@/components/dashboard/InsightCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  PlusCircle, 
  MessageCircle, 
  BarChartHorizontalBig, 
  AlertTriangle, 
  Bell, 
  Database, 
  DollarSign, 
  UserPlus, 
  Repeat,
  ArrowRight,
  FileUp,
  Lightbulb,
  FilePlus2,
  Users
} from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mockDataSources: DataSourceCardProps[] = [
  { id: "ds1", name: "Sales Q3 Data", type: "File", freshness: "Updated 5 mins ago", rowCount: 150234, schemaSummary: "12 columns, 3 indexed", status: "ok" },
  { id: "ds2", name: "Customer Database", type: "Database", freshness: "Syncing...", rowCount: 87650, schemaSummary: "25 columns, 8 indexed", status: "syncing" },
  { id: "ds3", name: "Marketing API", type: "API", freshness: "Last checked 1 day ago", rowCount: 500000, schemaSummary: "8 fields", status: "error" },
];

const mockInsights: InsightCardProps[] = [
  { id: "in1", title: "Sales up 18% this week", description: "Compared to last week, overall sales have increased significantly.", chartImage: "https://placehold.co/400x225.png", dataAiHint: "bar chart sales" },
  { id: "in2", title: "New User Sign-ups Peaked", description: "Identified a mid-week surge in new user registrations.", chartImage: "https://placehold.co/400x225.png", dataAiHint: "line chart users" },
  { id: "in3", title: "Category C has highest engagement", description: "Users spend more time with products in Category C.", chartImage: "https://placehold.co/400x225.png", dataAiHint: "pie chart engagement" },
];

const mockStats = [
  { title: "Monthly Sales", value: "$45,231.89", icon: DollarSign, change: "+20.1%", changeType: "increase" as const },
  { title: "New Users", value: "+1,234", icon: UserPlus, change: "+15.2%", changeType: "increase" as const },
  { title: "Recurring Users", value: "8,765", icon: Repeat, change: "+5.7%", changeType: "increase" as const },
  { title: "Data Sources", value: "12", icon: Database, change: "+2", changeType: "increase" as const },
];

const mockActivity = [
  {
    id: "act1",
    user: { name: "Alice" },
    action: "uploaded a new data source",
    target: "Q4 Sales Report.csv",
    time: "5m ago",
    icon: FileUp,
  },
  {
    id: "act2",
    user: { name: "AI Assistant" },
    action: "generated a new insight about",
    target: "User Engagement Trends",
    time: "30m ago",
    icon: Lightbulb,
  },
  {
    id: "act3",
    user: { name: "Bob" },
    action: "created a new report",
    target: "Weekly Marketing KPIs",
    time: "2h ago",
    icon: FilePlus2,
  },
  {
    id: "act4",
    user: { name: "Alice" },
    action: "added 3 new team members",
    target: "",
    time: "1d ago",
    icon: Users,
  },
];


export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        
        {/* Top Row: Key Statistics */}
        <section>
           <h2 className="text-2xl font-semibold mb-4 font-headline">Overview</h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mockStats.map(stat => <StatCard key={stat.title} {...stat} />)}
           </div>
        </section>

        {/* Second Row: Analytics Charts */}
        <section>
          <AnalyticsCharts />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (takes up 2/3 space on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-headline">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            
            <section>
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold font-headline">Your Data Sources</h2>
                  <Button variant="ghost" asChild>
                      <Link href="/knowledge-base">View All <ArrowRight className="ml-2 h-4 w-4"/></Link>
                  </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockDataSources.map(ds => <DataSourceCard key={ds.id} {...ds} />)}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold font-headline">Latest Insights</h2>
                <Button variant="ghost" asChild>
                  <Link href="/insight-hub">View All <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockInsights.slice(0, 2).map(insight => <InsightCard key={insight.id} {...insight} />)}
              </div>
            </section>

          </div>
          
          {/* Right Column (takes up 1/3 space on large screens) */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 font-headline">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-4 p-4">
                    {mockActivity.map((activity, index) => (
                      <div key={activity.id}>
                        <div className="flex items-start gap-3">
                           <div className="bg-muted rounded-full p-2 mt-1">
                             <activity.icon className="h-5 w-5 text-muted-foreground" />
                           </div>
                          <div className="text-sm flex-1">
                            <p className="leading-snug">
                              <span className="font-semibold">{activity.user.name}</span> {activity.action} {activity.target && <span className="font-semibold text-primary">{activity.target}</span>}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                          </div>
                        </div>
                         {index < mockActivity.length - 1 && <Separator className="mt-4"/>}
                      </div>
                    ))}
                   </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 font-headline">Alerts & Notifications</h2>
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Data Sync Failed!</AlertTitle>
                  <AlertDescription>
                    The Marketing API failed to sync. 
                    <Button variant="link" size="sm" className="p-0 h-auto ml-2 text-destructive-foreground/80 hover:text-destructive-foreground">Details</Button>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertTitle>New Insight: User Churn</AlertTitle>
                  <AlertDescription>
                    AI identified an increase in user churn risk.
                     <Button variant="link" size="sm" className="p-0 h-auto ml-2">Explore</Button>
                  </AlertDescription>
                </Alert>
              </div>
            </section>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
