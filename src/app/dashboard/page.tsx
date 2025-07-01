// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
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
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import StatCard, { StatCardProps } from "@/components/dashboard/StatCard";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Import the new service functions
import { 
  getDashboardStats,
  getRecentActivity,
  getLatestInsights,
  getDataSourcesSummary
} from "@/services/metricsService";

// Define a type for activity items
type Activity = {
    id: string;
    user: { name: string; };
    action: string;
    target: string;
    time: string;
    icon: React.ElementType;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCardProps[]>([]);
  const [dataSources, setDataSources] = useState<DataSourceCardProps[]>([]);
  const [insights, setInsights] = useState<InsightCardProps[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Use Promise.allSettled to handle potential errors in individual fetches
        const results = await Promise.allSettled([
          getDashboardStats(),
          getRecentActivity(),
          getLatestInsights(),
          getDataSourcesSummary()
        ]);

        if (results[0].status === 'fulfilled') {
          setStats(results[0].value);
        } else {
          console.error("Failed to fetch dashboard stats:", results[0].reason);
        }

        if (results[1].status === 'fulfilled') {
          setActivity(results[1].value as Activity[]);
        } else {
          console.error("Failed to fetch recent activity:", results[1].reason);
        }

        if (results[2].status === 'fulfilled') {
          setInsights(results[2].value);
        } else {
          console.error("Failed to fetch latest insights:", results[2].reason);
        }
        
        if (results[3].status === 'fulfilled') {
          setDataSources(results[3].value);
        } else {
          console.error("Failed to fetch data sources:", results[3].reason);
        }

      } catch (error) {
        // This catch block is less likely to be hit with Promise.allSettled, but good practice
        console.error("An unexpected error occurred while fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        
        {/* Top Row: Key Statistics */}
        <section>
           <h2 className="text-2xl font-semibold mb-4 font-headline">Overview</h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
              <>
                <Skeleton className="h-[126px]" />
                <Skeleton className="h-[126px]" />
                <Skeleton className="h-[126px]" />
                <Skeleton className="h-[126px]" />
              </>
            ) : (
              stats.map(stat => <StatCard key={stat.title} {...stat} />)
            )}
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
                {isLoading ? (
                  <>
                    <Skeleton className="h-[268px]" />
                    <Skeleton className="h-[268px]" />
                    <Skeleton className="h-[268px]" />
                  </>
                ) : (
                  dataSources.map(ds => <DataSourceCard key={ds.id} {...ds} />)
                )}
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
                {isLoading ? (
                    <>
                      <Skeleton className="h-[370px]" />
                      <Skeleton className="h-[370px]" />
                      <Skeleton className="h-[370px]" />
                      <Skeleton className="h-[370px]" />
                    </>
                ) : (
                  insights.slice(0, 4).map(insight => <InsightCard key={insight.id} {...insight} />)
                )}
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
                    {isLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ) : (
                      activity.map((activityItem, index) => (
                        <div key={activityItem.id}>
                          <div className="flex items-start gap-3">
                            <div className="bg-muted rounded-full p-2 mt-1">
                              <activityItem.icon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="text-sm flex-1">
                              <p className="leading-snug">
                                <span className="font-semibold">{activityItem.user.name}</span> {activityItem.action} {activityItem.target && <span className="font-semibold text-primary">{activityItem.target}</span>}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{activityItem.time}</p>
                            </div>
                          </div>
                          {index < activity.length - 1 && <Separator className="mt-4"/>}
                        </div>
                      ))
                    )}
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
