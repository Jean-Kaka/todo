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
import AppLayout from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = (section: string) => {
    toast({
      title: `${section} Settings Saved`,
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AppLayout>
        <div className="space-y-8">
        <header>
            <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <p className="text-muted-foreground mt-1">
            Manage your account settings, profile, and preferences.
            </p>
        </header>

        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-xl">
            <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profile</TabsTrigger>
            <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4" />Security</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
            <TabsTrigger value="billing"><CreditCard className="mr-2 h-4 w-4" />Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://placehold.co/80x80.png" alt="User Avatar" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <Button>Change Picture</Button>
                            <Button variant="outline">Remove</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="Jane Doe" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" defaultValue="Data Analyst" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled />
                        <p className="text-[0.8rem] text-muted-foreground">
                            Email address cannot be changed.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => handleSaveChanges("Profile")}>Save Changes</Button>
                </CardFooter>
            </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6 space-y-6">
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
                    <Button onClick={() => handleSaveChanges("Password")}>Update Password</Button>
                    </CardFooter>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>Add an extra layer of security to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                            <div className="flex flex-col">
                                <Label htmlFor="2fa-switch" className="font-medium">Enable 2FA</Label>
                                <span className="text-xs text-muted-foreground">You will be prompted for a code from your authenticator app when you log in.</span>
                            </div>
                            <Switch id="2fa-switch" defaultChecked />
                        </div>
                    </CardContent>
                     <CardFooter className="border-t px-6 py-4">
                        <Button onClick={() => handleSaveChanges("2FA")}>Save 2FA Settings</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications from AgentY.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                            <p className="text-xs text-muted-foreground">Receive important updates and summaries via email.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                        <div>
                            <Label htmlFor="insight-alerts" className="font-medium">New Insight Alerts</Label>
                            <p className="text-xs text-muted-foreground">Get notified when the AI generates a new insight.</p>
                        </div>
                        <Switch id="insight-alerts" defaultChecked/>
                    </div>
                    <Separator />
                    <div className="flex items-start justify-between">
                        <div>
                            <Label htmlFor="security-alerts" className="font-medium">Security Alerts</Label>
                            <p className="text-xs text-muted-foreground">Receive alerts for important security updates.</p>
                        </div>
                        <Switch id="security-alerts" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={() => handleSaveChanges("Notification")}>Save Preferences</Button>
                </CardFooter>
            </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Subscription & Billing</CardTitle>
                        <CardDescription>Manage your plan, view usage, and billing history.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg border p-4 space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">Current Plan: Pro</h3>
                                <p className="text-sm text-muted-foreground">Renews on November 30, 2024</p>
                                <Button className="mt-2">Manage Subscription</Button>
                            </div>
                            <Separator/>
                            <div>
                                <h4 className="font-medium mb-3">Usage This Cycle</h4>
                                <div className="space-y-4 text-sm">
                                    <div className="grid gap-1">
                                        <div className="flex justify-between"><span>AI Queries</span><span>1,234 / 5,000</span></div>
                                        <Progress value={(1234/5000)*100} className="h-2"/>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="flex justify-between"><span>Data Sources</span><span>8 / 10</span></div>
                                        <Progress value={(8/10)*100} className="h-2"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card>
                            <CardHeader>
                                <h4 className="font-medium">Billing History</h4>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">No billing history available yet.</p>
                            </CardContent>
                        </Card>
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
    </AppLayout>
  );
}
