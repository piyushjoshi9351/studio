import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, MessageSquare, Share2, PenTool, ArrowRight } from "lucide-react";
import Link from "next/link";
import { UserNav } from "@/components/dashboard/UserNav";

const actionCards = [
    {
        title: "Upload & Summarize",
        description: "Generate a summary for any audience.",
        icon: FileUp,
        href: "/dashboard/upload",
        color: "text-primary",
        cta: "Go to Upload"
    },
    {
        title: "Chat with Document",
        description: "Ask questions and get answers.",
        icon: MessageSquare,
        href: "/dashboard/upload",
        color: "text-accent",
        cta: "Go to Upload"
    },
    {
        title: "Generate Mind Map",
        description: "Visualize key concepts.",
        icon: Share2,
        href: "/dashboard/mind-map",
        color: "text-green-500",
        cta: "Explore Feature"
    },
    {
        title: "Analyze Tone & Style",
        description: "Understand the author's voice.",
        icon: PenTool,
        href: "/dashboard/analysis",
        color: "text-yellow-500",
        cta: "Explore Feature"
    },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome back! Let's turn your documents into insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {actionCards.map(card => (
             <Card key={card.title} className="group relative transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10 hover:shadow-lg hover:-translate-y-1">
                <Link href={card.href} className="absolute inset-0 z-10" />
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className={`rounded-lg p-3 bg-secondary ${card.color}`}>
                        <card.icon className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">{card.title}</CardTitle>
                        <CardDescription>
                            {card.description}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

       <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Documents</h2>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-10 text-center text-muted-foreground">
                <p className="font-medium">You have no recent documents.</p>
                <p className="text-sm mt-2">Upload a document using one of the actions above to get started.</p>
                 <Button asChild className="mt-6">
                    <Link href="/dashboard/upload">Upload Document</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
