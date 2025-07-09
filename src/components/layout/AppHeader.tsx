// src/components/layout/AppHeader.tsx
"use client";

import type { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, UserCircle, Settings, Bell, Zap, PlusCircle, MessageCircle, BarChartBig, HelpCircle, AlertTriangle } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  title?: string;
  Icon?: LucideIcon;
}

export function AppHeader({ title, Icon }: AppHeaderProps) {
  // const { setTheme, theme } = useTheme(); // If next-themes is used

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      {Icon && <Icon className="h-6 w-6 text-primary hidden md:block" />}
      {title && <h1 className="text-xl font-semibold hidden md:block">{title}</h1>}
      <div className="ml-auto flex items-center gap-2">
        
        {/* Quick Links Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Quick Links">
              <Zap className="h-5 w-5"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
             <DropdownMenuLabel>Quick Links</DropdownMenuLabel>
             <DropdownMenuSeparator/>
             <DropdownMenuItem asChild>
                <Link href="/upload"><PlusCircle className="mr-2 h-4 w-4"/>Upload New Data</Link>
             </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href="/ai-assistant"><MessageCircle className="mr-2 h-4 w-4"/>Ask AI Assistant</Link>
             </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href="/insight-hub"><BarChartBig className="mr-2 h-4 w-4"/>View Reports</Link>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Dropdown */}
        <DropdownMenu>
           <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-5 w-5"/>
              <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0" variant="destructive">2</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="flex-col items-start gap-1 whitespace-normal">
              <div className="flex items-center gap-2 font-semibold text-destructive">
                <AlertTriangle className="h-4 w-4"/> Data Sync Failed
              </div>
              <p className="text-xs text-muted-foreground">The 'Marketing API' failed to sync 1 hour ago.</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
             <DropdownMenuItem className="flex-col items-start gap-1 whitespace-normal">
              <div className="flex items-center gap-2 font-semibold text-primary">
                <HelpCircle className="h-4 w-4"/> New Insight Available
              </div>
              <p className="text-xs text-muted-foreground">AI identified a new trend in user churn risk.</p>
            </DropdownMenuItem>
             <DropdownMenuSeparator/>
             <DropdownMenuItem asChild>
                <Link href="/notifications" className="justify-center text-sm text-primary">View All Notifications</Link>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="user profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
             <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
