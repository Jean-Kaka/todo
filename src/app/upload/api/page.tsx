// src/app/upload/api/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Waypoints, KeyRound, Link2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Connect API" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

const formSchema = z.object({
  apiType: z.string().min(1, "API type is required."),
  baseUrl: z.string().url("Must be a valid URL."),
  endpoint: z.string().startsWith("/", "Endpoint must start with /").min(1, "Endpoint is required."),
  authType: z.string().min(1, "Authentication type is required."),
  apiKey: z.string().optional(),
  bearerToken: z.string().optional(),
  // Add more fields for other auth types like OAuth
  headers: z.string().optional().refine(val => {
    if (!val) return true;
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: "Headers must be valid JSON string if provided."}),
  params: z.string().optional().refine(val => {
    if (!val) return true;
    try { JSON.parse(val); return true; } catch { return false; }
  }, { message: "Query parameters must be valid JSON string if provided."}),
});

export default function UploadApiPage() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiType: "rest", baseUrl: "", endpoint: "/", authType: "none", apiKey: "", bearerToken: "", headers: "", params: ""
    },
  });
  
  const authType = form.watch("authType");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConnecting(true);
    console.log("API Connection details:", values);
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      router.push("/upload/preview");
    }, 2000);
  }

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={1} onStepClick={(step) => router.push(step === 0 ? "/upload" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Waypoints className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Connect to API</CardTitle>
          </div>
          <CardDescription>Configure your API connection details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="apiType" render={({ field }) => (
                  <FormItem><FormLabel>API Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select API type" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="rest">REST</SelectItem><SelectItem value="graphql">GraphQL</SelectItem></SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="baseUrl" render={({ field }) => (
                  <FormItem><FormLabel>Base URL</FormLabel><FormControl><Input placeholder="https://api.example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="endpoint" render={({ field }) => (
                <FormItem><FormLabel>Endpoint</FormLabel><FormControl><Input placeholder="/data" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField control={form.control} name="authType" render={({ field }) => (
                  <FormItem><FormLabel>Authentication Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select auth type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="apiKey">API Key</SelectItem>
                        <SelectItem value="bearerToken">Bearer Token</SelectItem>
                        {/* <SelectItem value="oauth2">OAuth 2.0</SelectItem> */}
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
              )} />

              {authType === "apiKey" && (
                <FormField control={form.control} name="apiKey" render={({ field }) => (
                  <FormItem><FormLabel><KeyRound className="inline h-4 w-4 mr-1"/> API Key</FormLabel><FormControl><Input placeholder="Your API Key" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              )}
              {authType === "bearerToken" && (
                 <FormField control={form.control} name="bearerToken" render={({ field }) => (
                  <FormItem><FormLabel><KeyRound className="inline h-4 w-4 mr-1"/> Bearer Token</FormLabel><FormControl><Input placeholder="Your Bearer Token" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              )}

              <FormField control={form.control} name="headers" render={({ field }) => (
                <FormItem><FormLabel>Headers (JSON)</FormLabel><FormControl><Textarea placeholder='{ "X-Custom-Header": "value" }' {...field} rows={2}/></FormControl><FormDescription>Enter as a JSON object.</FormDescription><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="params" render={({ field }) => (
                <FormItem><FormLabel>Query Parameters (JSON)</FormLabel><FormControl><Textarea placeholder='{ "limit": 100, "page": 1 }' {...field} rows={2}/></FormControl><FormDescription>Enter as a JSON object.</FormDescription><FormMessage /></FormItem>
              )} />
              
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" type="button" onClick={() => router.push("/upload")}>
                  Back to Source Selection
                </Button>
                <Button type="submit" disabled={isConnecting} className="bg-primary hover:bg-primary/90">
                  {isConnecting ? "Testing Connection..." : "Next: Preview Data"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
