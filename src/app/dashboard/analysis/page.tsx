import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool } from "lucide-react";

export default function AnalysisPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tone & Style Analysis</h1>
        <p className="text-muted-foreground">
          Understand the author's voice, sentiment, and writing style.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-16">
                <PenTool className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mt-4">Document Analysis</h3>
                <p className="text-muted-foreground mt-2">
                    Soon you'll be able to analyze the sentiment, tone, and style of your documents.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
