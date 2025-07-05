// src/components/insights/ShareInsightDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import type { ReportCardProps } from "./ReportCard";

interface ShareInsightDialogProps {
  insight: ReportCardProps | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ShareInsightDialog({ insight, isOpen, onOpenChange }: ShareInsightDialogProps) {
  const { toast } = useToast();
  
  if (!insight) return null;

  const shareLink = `${window.location.origin}/insights/${insight.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied!",
      description: "The shareable link has been copied to your clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Insight</DialogTitle>
          <DialogDescription>
            Anyone with this link will be able to view this insight.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={shareLink}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopyLink}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
