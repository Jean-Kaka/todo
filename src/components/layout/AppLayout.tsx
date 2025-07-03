// src/components/layout/AppLayout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  MessageCircle,
  Database,
  BarChartBig,
  UploadCloud,
  LogOut,
  Briefcase, // Placeholder for AgentY logo
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  headerTitle?: string;
  headerIcon?: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, headerTitle: "Dashboard Overview", headerIcon: LayoutDashboard },
  { href: "/ai-assistant", label: "AI Assistant", icon: MessageCircle, headerTitle: "AI Assistant", headerIcon: MessageCircle },
  { href: "/knowledge-base", label: "Knowledge Base", icon: Database, headerTitle: "Knowledge Base", headerIcon: Database },
  { href: "/insight-hub", label: "Insight Hub", icon: BarChartBig, headerTitle: "Insight Hub & Reports", headerIcon: BarChartBig },
  { href: "/upload", label: "Upload Data", icon: UploadCloud, headerTitle: "Upload New Data", headerIcon: UploadCloud },
];

const bottomNavItems: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help & Support", icon: HelpCircle },
  { href: "/super-admin", label: "Super Admin", icon: Shield, headerTitle: "Super Admin Dashboard", headerIcon: Shield },
];


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const currentNavItem = [...navItems, ...bottomNavItems].find(item => pathname.startsWith(item.href));

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Briefcase className="h-7 w-7 text-primary group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
            <span className="text-xl font-semibold font-headline group-data-[collapsible=icon]:hidden">AgentY</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} asChild>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon /> <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto">
           <Separator className="my-2 group-data-[collapsible=icon]:hidden" />
           <SidebarMenu>
            {bottomNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} asChild>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon /> <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Separator className="my-2" />
          <div className="p-2">
            <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
              <LogOut className="mr-2 group-data-[collapsible=icon]:mr-0" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
        <AppHeader title={currentNavItem?.headerTitle} Icon={currentNavItem?.headerIcon} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
