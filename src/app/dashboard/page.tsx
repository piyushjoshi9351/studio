import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Manage your documents and generate insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upload New Document</CardTitle>
              <FilePlus2 className="h-6 w-6 text-primary" />
            </div>
            <CardDescription>
              Start by uploading a PDF or DOCX file to analyze.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-end">
            <Button asChild className="w-full">
              <Link href="/dashboard/upload">Upload Document</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Documents</h2>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 text-center text-muted-foreground">
                <p>You have no recent documents.</p>
                <p className="text-sm">Upload a document to get started.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
