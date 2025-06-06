// src/app/upload/database/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadStepper from "@/components/upload/UploadStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database as DatabaseIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const uploadSteps = [
  { id: "source", name: "Choose Source" },
  { id: "connect", name: "Connect Database" },
  { id: "preview", name: "Map & Preview" },
  { id: "clean", name: "Clean Data (Optional)" },
  { id: "confirm", name: "Confirm & Finish" },
];

const formSchema = z.object({
  dbType: z.string().min(1, "Database type is required."),
  host: z.string().min(1, "Host is required."),
  port: z.coerce.number().min(1, "Port is required.").max(65535),
  username: z.string().min(1, "Username is required."),
  password: z.string().optional(),
  databaseName: z.string().min(1, "Database name is required."),
});

export default function UploadDatabasePage() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dbType: "", host: "", port: 5432, username: "", password: "", databaseName: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsConnecting(true);
    console.log("Connection details:", values);
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      router.push("/upload/preview"); // Pass connection details or session ID
    }, 2000);
  }

  return (
    <div className="space-y-8">
      <UploadStepper steps={uploadSteps} currentStep={1} onStepClick={(step) => router.push(step === 0 ? "/upload" : "#")} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DatabaseIcon className="h-6 w-6 text-primary"/>
            <CardTitle className="text-2xl font-headline">Connect to Database</CardTitle>
          </div>
          <CardDescription>Enter your database connection details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dbType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Database Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select database type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="sqlserver">SQL Server</SelectItem>
                        <SelectItem value="other">Other (Specify Generic JDBC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="host" render={({ field }) => (
                  <FormItem><FormLabel>Host</FormLabel><FormControl><Input placeholder="your-db.host.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="port" render={({ field }) => (
                  <FormItem><FormLabel>Port</FormLabel><FormControl><Input type="number" placeholder="5432" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="databaseName" render={({ field }) => (
                <FormItem><FormLabel>Database Name</FormLabel><FormControl><Input placeholder="mydatabase" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="username" render={({ field }) => (
                  <FormItem><FormLabel>Username</FormLabel><FormControl><Input placeholder="db_user" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password (Optional)</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              
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
