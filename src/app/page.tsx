import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { placeHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, FileText, MessagesSquare, Lightbulb, Share2, PenTool } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DemoButton } from "@/components/home/DemoButton";

export default function Home() {
  const heroImage = placeHolderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tighter">
              Transform Documents into Actionable Intelligence
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Go beyond summarization. SummarAIze is an AI-powered suite to analyze, chat with, and visualize insights from any document.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/register">Start for Free</Link>
              </Button>
              <DemoButton />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
          <div className="relative rounded-xl shadow-2xl overflow-hidden border border-primary/20">
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          </div>
        </section>

        <section className="bg-secondary/50 py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">An Arsenal of AI Document Tools</h2>
              <p className="mt-4 text-lg text-muted-foreground">Unlock unparalleled understanding of your documents.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BrainCircuit, title: "AI Summaries", description: "Tailored summaries for any audience: from a high-school student to a legal expert." },
                { icon: MessagesSquare, title: "Document Chat", description: "Ask complex questions and get cited answers directly from your document's content." },
                { icon: Share2, title: "Mind Map Generation", description: "Visualize key concepts and connections with automatically generated mind maps." },
                { icon: PenTool, title: "Tone & Style Analysis", description: "Analyze the writing style, sentiment, and tone of your documents." },
                { icon: FileText, title: "Secure & Private", description: "Your data is encrypted and private. We never train our models on your documents." },
                { icon: Lightbulb, title: "Insight Extraction", description: "Automatically pull key terms, dates, and named entities from your text." },
              ].map(feature => (
                <Card key={feature.title} className="text-center bg-card/80 backdrop-blur-sm border-border/50 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-2">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
