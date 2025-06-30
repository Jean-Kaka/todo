// src/components/dashboard/AnalyticsCharts.tsx
"use client"

import { Bar, Pie, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, PieChart, CartesianGrid, XAxis, YAxis } from "recharts"


const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const salesChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const salesByRegionData = [
  { region: 'North America', sales: 4000, fill: "hsl(var(--chart-1))" },
  { region: 'Europe', sales: 3000, fill: "hsl(var(--chart-2))" },
  { region: 'Asia', sales: 2000, fill: "hsl(var(--chart-3))" },
  { region: 'South America', sales: 1500, fill: "hsl(var(--chart-4))" },
];

const regionChartConfig = {
    sales: {
      label: "Sales",
    },
    "North America": {
      label: "North America",
      color: "hsl(var(--chart-1))",
    },
    Europe: {
      label: "Europe",
      color: "hsl(var(--chart-2))",
    },
    Asia: {
      label: "Asia",
      color: "hsl(var(--chart-3))",
    },
    "South America": {
      label: "South America",
      color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trends</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={salesChartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sales by Region</CardTitle>
          <CardDescription>Current Fiscal Year</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-0 pb-6">
            <ChartContainer config={regionChartConfig} className="h-[250px] w-full">
                <PieChart accessibilityLayer>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={salesByRegionData}
                        dataKey="sales"
                        nameKey="region"
                        innerRadius={50}
                        strokeWidth={5}
                        outerRadius={80}
                    >
                         {salesByRegionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"/>
                        ))}
                    </Pie>
                    <ChartLegend
                        content={<ChartLegendContent nameKey="region" />}
                        className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                    />
                </PieChart>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
