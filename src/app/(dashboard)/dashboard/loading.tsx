// src/app/(dashboard)/dashboard/loading.tsx
import { Loader2, LayoutDashboard } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-10rem)] w-full items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <LayoutDashboard className="h-12 w-12 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold font-headline">Loading your dashboard...</h2>
        <p className="text-muted-foreground">Please wait while we fetch your latest data and insights.</p>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mt-4" />
      </div>
    </div>
  );
}
