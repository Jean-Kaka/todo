"use client";

import { useOnboardingStore } from "@/lib/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Building, Users, Factory, Briefcase, Globe, Link2 } from "lucide-react";

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  companySize: z.string().min(1, "Please select a company size."),
  industry: z.string().min(1, "Please select an industry."),
  location: z.string().optional(),
  department: z.string().optional(),
  website: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
});

interface CompanyDetailsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function CompanyDetailsStep({ onNext, onBack }: CompanyDetailsStepProps) {
  const { companyDetails, setCompanyDetails } = useOnboardingStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: companyDetails || {
      companyName: "",
      companySize: "",
      industry: "",
      location: "",
      department: "",
      website: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCompanyDetails(values);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Building className="h-4 w-4"/>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Users className="h-4 w-4"/>Company Size</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select a size" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                  <SelectItem value="1000+">1,000+ employees</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Factory className="h-4 w-4"/>Industry</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Select an industry" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Globe className="h-4 w-4"/>Location (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>Department (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Marketing, Sales, Engineering" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Link2 className="h-4 w-4"/>Company Website (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://yourcompany.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center mt-8">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Next
            </Button>
        </div>
      </form>
    </Form>
  );
}
