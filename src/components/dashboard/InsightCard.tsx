// src/components/dashboard/InsightCard.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Share2, Bookmark } from "lucide-react";
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

export interface InsightCardProps {
  id: string;
  title: string;
  description: string;
  chartType?: "line" | "bar" | "pie";
  chartData?: any[];
  chartConfig?: ChartConfig;
}

const renderChart = (
  chartType: InsightCardProps["chartType"],
  chartData: InsightCardProps["chartData"],
  chartConfig: InsightCardProps["chartConfig"]
) => {
  if (!chartData || !chartConfig) return null;

  switch (chartType) {
    case "bar":
      return (
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      );
    case "line":
      return (
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
          <LineChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
             <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={10}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      );
    case "pie":
      return (
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
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


export default function InsightCard({
  id,
  title,
  description,
  chartType,
  chartData,
  chartConfig
}: InsightCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="bg-accent/10 p-2 rounded-full mt-1">
            <Lightbulb className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-headline">{title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2 mt-1">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6 pb-6 pt-0">
        {chartType && chartData ? (
          <div className="aspect-video bg-muted/50 rounded-md overflow-hidden border flex items-center justify-center">
            {renderChart(chartType, chartData, chartConfig)}
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-md w-full border-l-4 border-accent">
            <p className="text-sm font-medium">Text-based Insight</p>
            <p className="text-xs mt-1">
              Ask the AI Assistant to generate a chart for more details.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-2 border-t px-6 py-3">
        <Button variant="ghost" size="sm" className="text-xs">
          <Bookmark className="mr-1 h-3 w-3" /> Bookmark
        </Button>
        <Button variant="ghost" size="sm" className="text-xs ml-auto">
          <Share2 className="mr-1 h-3 w-3" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
