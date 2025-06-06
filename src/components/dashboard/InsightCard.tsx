// src/components/dashboard/InsightCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Share2, Bookmark } from "lucide-react";
import Image from "next/image"; // For placeholder charts

export interface InsightCardProps {
  id: string;
  title: string;
  description: string;
  chartType?: "line" | "bar" | "pie" | "table"; // Or use actual chart component
  chartData?: any; // For actual chart component
  chartImage?: string; // For placeholder
  dataAiHint?: string;
}

export default function InsightCard({ title, description, chartImage, dataAiHint, id }: InsightCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="h-5 w-5 text-accent" />
          <CardTitle className="text-md font-headline">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {chartImage && (
          <div className="aspect-video bg-muted rounded-md overflow-hidden my-2">
            <Image
              src={chartImage}
              alt={title || "Insight chart"}
              width={400}
              height={225}
              className="w-full h-full object-cover"
              data-ai-hint={dataAiHint}
            />
          </div>
        )}
        {/* Placeholder for actual chart component */}
        {/* {chartType && chartData && <ActualChartComponent type={chartType} data={chartData} />} */}
      </CardContent>
      <CardFooter className="gap-2">
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
