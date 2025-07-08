// src/app/(dashboard)/layout.tsx
"use client";

import AppLayout from "@/components/layout/AppLayout";
import React, { useState, useEffect } from 'react';
import { Loader2, Briefcase } from "lucide-react";

function SplashScreen() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 text-center">
                <Briefcase className="h-16 w-16 text-primary animate-pulse" />
                <h2 className="text-3xl font-bold font-headline text-primary">AgentY</h2>
                <p className="text-muted-foreground">Your AI-Powered Data Hub</p>
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mt-4" />
            </div>
        </div>
    );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowSplash(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
      return <SplashScreen />;
  }

  return <AppLayout>{children}</AppLayout>;
}
