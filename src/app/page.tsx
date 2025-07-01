// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, TrendingUp, DatabaseZap, Share, Lightbulb, BarChart2, SearchCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const benefits = [
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Unlock hidden patterns and trends in your data with our intelligent assistant.",
    },
    {
      icon: DatabaseZap,
      title: "Centralized Data",
      description: "Connect and manage all your data sources (CSV, SQL, APIs) in one place.",
    },
    {
      icon: BarChart2,
      title: "Interactive Visualizations",
      description: "Understand your data better with dynamic charts and tables generated on the fly.",
    },
    {
      icon: SearchCode,
      title: "Searchable Knowledge Base",
      description: "Build a comprehensive repository of your data insights, easily searchable.",
    },
    {
      icon: Share,
      title: "Seamless Collaboration",
      description: "Share reports and insights with your team effortlessly.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">AgentY</h1>
        </Link>
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="#how-it-works">How it Works</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#benefits">Benefits</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline mb-6">
            Transform Your Data into <span className="text-primary">Actionable Insights</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            AgentY empowers you to upload your data, ask questions in plain English, and receive AI-generated answers with stunning visualizations. Build your knowledge hub and share reports seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/register">Register for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
              Watch Demo
            </Button>
          </div>
        </section>

        {/* Visual Explainer Section */}
        <section className="py-16 sm:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold font-headline text-center mb-4">Upload Data &rarr; Get AI Insights</h3>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our intuitive platform makes it easy to connect your data sources and start discovering valuable insights in minutes.
            </p>
            <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/1200x675.png"
                alt="AgentY platform visual explainer"
                fill
                className="object-cover"
                data-ai-hint="data dashboard"
              />
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section id="benefits" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h3 className="text-3xl font-bold font-headline text-center mb-12">Why Choose AgentY?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <benefit.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl font-headline">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
         <section id="how-it-works" className="py-16 sm:py-24 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold font-headline text-center mb-12">Simple Steps to Data Mastery</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h4 className="text-xl font-semibold mb-2">Connect Your Data</h4>
                <p className="text-muted-foreground">Easily upload files (CSV, Excel), connect to databases (SQL), or integrate with APIs and cloud services.</p>
              </div>
              <div className="p-6">
                <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h4 className="text-xl font-semibold mb-2">Ask Questions</h4>
                <p className="text-muted-foreground">Use our natural language AI assistant to query your data. No complex coding required.</p>
              </div>
              <div className="p-6">
                 <div className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h4 className="text-xl font-semibold mb-2">Discover & Share</h4>
                <p className="text-muted-foreground">Get instant insights with charts and summaries. Save, organize, and share reports with your team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h3 className="text-3xl font-bold font-headline mb-6">Ready to Unlock Your Data's Potential?</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join hundreds of businesses transforming their operations with AgentY. Start your free trial today.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/register">Sign Up Now</Link>
          </Button>
        </section>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AgentY. All rights reserved.</p>
           <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
