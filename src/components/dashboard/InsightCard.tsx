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
        <div className="flex items-start gap-3">
          <div className="bg-accent/10 p-2 rounded-full mt-1">
            <Lightbulb className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-headline">{title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2 mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6 pb-6 pt-0">
        {chartImage ? (
          <div className="aspect-video bg-muted rounded-md overflow-hidden border">
            <Image
              src={chartImage}
              alt={title || "Insight chart"}
              width={400}
              height={225}
              className="w-full h-full object-cover"
              data-ai-hint={dataAiHint}
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-md w-full border-l-4 border-accent">
             <p className="text-sm font-medium">Text-based Insight</p>
             <p className="text-xs mt-1">Ask the AI Assistant to generate a chart for more details.</p>
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
