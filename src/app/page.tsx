import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeHolderImages } from "@/lib/placeholder-images";
import {
  BrainCircuit,
  FileText,
  MessagesSquare,
  Share2,
  PenTool,
  UploadCloud,
  Zap,
  Sparkles,
  ArrowRight,
  GitCompareArrows,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DemoButton } from "@/components/home/DemoButton";

export default function Home() {
  const heroImage = placeHolderImages.find((p) => p.id === "hero");

  const features = [
    {
      icon: BrainCircuit,
      title: "Audience-Specific Summaries",
      description: "Generate summaries tailored to any reader, from a high-school student to a legal expert, in multiple languages.",
    },
    {
      icon: MessagesSquare,
      title: "Conversational Chat",
      description: "Ask complex questions and get cited, context-aware answers directly from your document's content.",
    },
    {
      icon: Share2,
      title: "Mind Map Generation",
      description: "Instantly visualize key concepts, topics, and their connections with automatically generated mind maps.",
    },
    {
      icon: PenTool,
      title: "Tone & Style Analysis",
      description: "Go beyond the words. Analyze the writing style, underlying sentiment, and emotional tone of your documents.",
    },
    {
      icon: FileText,
      title: "Secure & Private",
      description: "Your data is encrypted and private. We never train our models on your documents, ensuring total confidentiality.",
    },
    {
      icon: GitCompareArrows,
      title: "Compare Documents",
      description: "Analyze two documents side-by-side to find key similarities and crucial differences in seconds.",
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              SummarAIze
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tighter">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transform Documents
              </span>{" "}
              into Actionable Intelligence
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Go beyond simple summarization. SummarAIze is your AI-powered
              suite to analyze, compare, chat with, and visualize insights
              from any document.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/register">Start for Free</Link>
              </Button>
              <DemoButton />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="relative rounded-xl shadow-2xl overflow-hidden border border-primary/20 bg-primary/5">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={600}
                className="w-full h-auto object-cover opacity-70"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                An Arsenal of AI Document Tools
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Unlock unparalleled understanding of your documents with a
                single upload.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-2 flex flex-col"
                >
                  <CardHeader className="flex-row items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3 w-fit">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-0 text-xl leading-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 sm:py-28 bg-secondary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Get Insights in 3 Simple Steps</h2>
                    <p className="mt-4 text-lg text-muted-foreground">From a dense document to clear understanding in under a minute.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block"></div>
                    <div className="absolute top-0 left-1/2 w-px h-full bg-border -translate-x-1/2 md:hidden"></div>
                    {[
                        {icon: UploadCloud, title: "Upload Your Document", description: "Securely upload any PDF or DOCX file. Your data remains private."},
                        {icon: Zap, title: "Choose Your Tool", description: "Select from a suite of AI tools: summarize, chat, compare, and more."},
                        {icon: Sparkles, title: "Receive Instant Insights", description: "Get AI-generated analysis, summaries, and visualizations in seconds."}
                    ].map((step, index) => (
                        <div key={step.title} className="relative bg-background p-8 rounded-xl border border-border/50">
                             <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <step.icon className="w-8 h-8"/>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Ready to Unlock Your Document's Potential?</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Stop reading, start understanding. Get started for free, no credit card required.</p>
                <div className="mt-8">
                    <Button size="lg" asChild>
                        <Link href="/register">Get Started Free <ArrowRight className="ml-2 h-5 w-5"/></Link>
                    </Button>
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
