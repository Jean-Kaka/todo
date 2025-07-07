// src/app/super-admin/page.tsx
"use client";

import StatCard from "@/components/dashboard/StatCard";
import { 
  Users, 
  Database, 
  Lightbulb, 
  Bot, 
  CheckCircle,
  AlertTriangle,
  Server,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, PieChart, LineChart, CartesianGrid, XAxis, YAxis, Bar, Pie, Line, Cell } from "recharts";
import { cn } from "@/lib/utils";

// Mock Data for Super Admin Dashboard

const mockSuperAdminStats = [
  { title: "Total Users", value: "1,482", icon: Users, change: "+52 this week", changeType: "increase" as const },
  { title: "Total Data Sources", value: "876", icon: Database, change: "+15 this week", changeType: "increase" as const },
  { title: "Insights Generated", value: "12,345", icon: Lightbulb, change: "+1,200 this week", changeType: "increase" as const },
  { title: "AI Queries Today", value: "3,456", icon: Bot, change: "-5% from yesterday", changeType: "decrease" as const },
];

const userGrowthData = [
  { month: "Jan", users: 150 }, { month: "Feb", users: 220 }, { month: "Mar", users: 350 },
  { month: "Apr", users: 480 }, { month: "May", users: 600 }, { month: "Jun", users: 800 },
];
const userGrowthChartConfig = { users: { label: "New Users", color: "hsl(var(--chart-1))" } } satisfies ChartConfig;

const aiUsageData = [
  { day: "Mon", queries: 2200 }, { day: "Tue", queries: 2500 }, { day: "Wed", queries: 1800 },
  { day: "Thu", queries: 3100 }, { day: "Fri", queries: 2900 }, { day: "Sat", queries: 3500 },
  { day: "Sun", queries: 3200 },
];
const aiUsageChartConfig = { queries: { label: "AI Queries", color: "hsl(var(--chart-2))" } } satisfies ChartConfig;


const dataSourceTypesData = [
  { type: "File", count: 450, fill: "hsl(var(--chart-1))" },
  { type: "Database", count: 250, fill: "hsl(var(--chart-2))" },
  { type: "API", count: 150, fill: "hsl(var(--chart-3))" },
  { type: "Integration", count: 26, fill: "hsl(var(--chart-4))" },
];
const dataSourceChartConfig = {
  count: { label: "Count" },
  File: { label: "File", color: "hsl(var(--chart-1))" },
  Database: { label: "Database", color: "hsl(var(--chart-2))" },
  API: { label: "API", color: "hsl(var(--chart-3))" },
  Integration: { label: "Integration", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

const recentUsers = [
  { id: "usr_1", name: "Olivia Martin", email: "olivia.martin@email.com", role: "Data Analyst", joined: "2 hours ago" },
  { id: "usr_2", name: "Jackson Lee", email: "jackson.lee@email.com", role: "Manager", joined: "5 hours ago" },
  { id: "usr_3", name: "Isabella Nguyen", email: "isabella.nguyen@email.com", role: "Engineer", joined: "1 day ago" },
  { id: "usr_4", name: "William Kim", email: "will@email.com", role: "Data Analyst", joined: "2 days ago" },
  { id: "usr_5", name: "Sophia Davis", email: "sophia.davis@email.com", role: "Manager", joined: "3 days ago" },
];

const systemStatus = [
    { service: "Authentication", status: "Operational", icon: CheckCircle, color: "text-green-500" },
    { service: "AI Processing API", status: "Operational", icon: CheckCircle, color: "text-green-500" },
    { service: "Database Services", status: "Operational", icon: CheckCircle, color: "text-green-500" },
    { service: "Data Upload Service", status: "Degraded Performance", icon: AlertTriangle, color: "text-yellow-500" },
    { service: "Real-time Sync", status: "Operational", icon: CheckCircle, color: "text-green-500" },
];

const onboardingFunnelData = [
    { name: 'Register', value: 1482 },
    { name: 'Role', value: 1401 },
    { name: 'Company', value: 1310 },
    { name: 'Data Source', value: 1250 },
    { name: '2FA Setup', value: 1050 },
    { name: 'Dashboard', value: 975 },
];
const funnelChartConfig = { value: { label: "Users", color: "hsl(var(--chart-3))" } } satisfies ChartConfig;

export default function SuperAdminDashboardPage() {
  return (
    <div className="space-y-8">
      
      <section>
         <h2 className="text-3xl font-bold mb-1 font-headline">Super Admin Dashboard</h2>
         <p className="text-muted-foreground">Platform-wide overview and metrics.</p>
      </section>

      {/* Top Row: Key Metrics */}
      <section>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockSuperAdminStats.map(stat => <StatCard key={stat.title} {...stat} />)}
         </div>
      </section>

      {/* Second Row: Main Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user sign-ups over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={userGrowthChartConfig} className="h-[250px] w-full">
              <LineChart accessibilityLayer data={userGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, 'dataMax + 100']} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Line dataKey="users" type="monotone" stroke="var(--color-users)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Usage</CardTitle>
            <CardDescription>Total AI queries processed in the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={aiUsageChartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={aiUsageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="queries" fill="var(--color-queries)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Third Row: Detailed Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="lg:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
            <CardDescription>A list of the newest users on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                    <TableCell className="text-right text-muted-foreground">{user.joined}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 xl:col-span-1">
          <CardHeader>
            <CardTitle>Data Source Types</CardTitle>
            <CardDescription>Distribution of all connected data sources.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-0 pb-6">
            <ChartContainer config={dataSourceChartConfig} className="h-[250px] w-full">
              <PieChart accessibilityLayer>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={dataSourceTypesData} dataKey="count" nameKey="type" innerRadius={50} strokeWidth={5}>
                  {dataSourceTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"/>
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="type" />} className="-translate-y-[1rem] flex-wrap gap-2 [&>*]:basis-1/2 [&>*]:justify-center" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5"/> Onboarding Funnel</CardTitle>
            <CardDescription>User progression through sign-up steps.</CardDescription>
          </CardHeader>
          <CardContent>
              <ChartContainer config={funnelChartConfig} className="h-[250px] w-full">
                  <BarChart
                      accessibilityLayer
                      data={onboardingFunnelData}
                      layout="vertical"
                      margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                  >
                      <CartesianGrid horizontal={false} />
                      <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      width={80}
                      className="text-xs"
                      />
                      <XAxis dataKey="value" type="number" hide />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                      <Bar dataKey="value" layout="vertical" fill="var(--color-value)" radius={4} />
                  </BarChart>
              </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Fourth Row: System Status */}
      <section>
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Server className="h-5 w-5"/> System Status</CardTitle>
                  <CardDescription>Live status of core application services.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                  {systemStatus.map(service => (
                      <div key={service.service} className="flex items-center gap-3 rounded-lg border p-3">
                          <service.icon className={cn("h-6 w-6", service.color)} />
                          <div>
                              <p className="text-sm font-medium">{service.service}</p>
                              <p className={cn("text-xs", service.color)}>{service.status}</p>
                          </div>
                      </div>
                  ))}
              </CardContent>
          </Card>
      </section>

    </div>
  );
}
