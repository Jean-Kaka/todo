// src/app/dashboard/page.tsx
import DashboardClient, { type Activity } from "@/components/dashboard/DashboardClient";

// Import the service functions
import { 
  getDashboardStats,
  getRecentActivity,
  getLatestInsights,
  getDataSourcesSummary
} from "@/services/metricsService";

// This page is now a Server Component by default (no "use client")
export default async function DashboardPage() {
  // Fetch data on the server, concurrently.
  const [stats, activity, insights, dataSources] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(),
    getLatestInsights(),
    getDataSourcesSummary()
  ]);

  // Pass the fetched data as props to the client component.
  return (
    <DashboardClient 
      stats={stats}
      activity={activity as Activity[]}
      insights={insights}
      dataSources={dataSources}
    />
  );
}
