// src/app/upload/layout.tsx
"use client";
import AppLayout from "@/components/layout/AppLayout";

export default function UploadDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </AppLayout>
  );
}
