// src/app/(dashboard)/upload/layout.tsx
export default function UploadDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  );
}
