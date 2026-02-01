import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, FileText, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = placeHolderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">SummarAIze</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
              Unlock Insights from Your Documents, Instantly
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
              SummarAIze uses advanced AI to generate audience-specific summaries and allows you to chat with your documents. Go from lengthy text to key insights in seconds.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Start for Free</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="relative rounded-xl shadow-2xl overflow-hidden">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="w-full object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        </section>

        <section className="bg-secondary py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Powerful Features, Simplified</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need to understand documents faster.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center bg-background/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">AI-Powered Summaries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get summaries tailored for different audiences like students, lawyers, or researchers.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center bg-background/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <MessagesSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Chat With Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ask questions and get answers directly from your document content, with source citations.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center bg-background/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Secure & Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your documents are yours. We ensure your data is handled securely and privately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SummarAIze. All rights reserved.</p>
      </footer>
    </div>
  );
}
