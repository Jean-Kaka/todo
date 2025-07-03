// src/app/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, CreditCard, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings, profile, and preferences.
        </p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-lg">
          <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4" />Security</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="mr-2 h-4 w-4" />Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Jane Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled />
                 <p className="text-[0.8rem] text-muted-foreground">
                    Email address cannot be changed.
                </p>
              </div>
               <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Data Analyst" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="current_password">Current Password</Label>
                <Input id="current_password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new_password">New Password</Label>
                <Input id="new_password" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <Input id="confirm_password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveChanges}>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications from AgentY.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="flex flex-col">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <span className="text-xs text-muted-foreground">Receive important updates and summaries via email.</span>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="flex flex-col">
                        <Label htmlFor="insight-alerts">New Insight Alerts</Label>
                        <span className="text-xs text-muted-foreground">Get notified when the AI generates a new insight from your data.</span>
                    </div>
                    <Switch id="insight-alerts" defaultChecked/>
                </div>
                 <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="flex flex-col">
                        <Label htmlFor="security-alerts">Security Alerts</Label>
                        <span className="text-xs text-muted-foreground">Receive alerts for suspicious activity or important security updates.</span>
                    </div>
                    <Switch id="security-alerts" />
                </div>
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleSaveChanges}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subscription & Billing</CardTitle>
                    <CardDescription>Manage your subscription plan and view billing history.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Current Plan: Pro</h3>
                        <p className="text-sm text-muted-foreground">Renews on November 30, 2024</p>
                    </div>
                    <div>
                         <Button>Manage Subscription</Button>
                    </div>
                    <Separator />
                     <div>
                        <h4 className="font-medium mb-2">Billing History</h4>
                        <p className="text-sm text-muted-foreground">No billing history available yet.</p>
                     </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/> Danger Zone</CardTitle>
            <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="destructive" onClick={() => alert("This would open a confirmation dialog to delete the account.")}>
                <Trash2 className="mr-2 h-4 w-4"/> Delete My Account
            </Button>
          </CardContent>
      </Card>
    </div>
  );
}
