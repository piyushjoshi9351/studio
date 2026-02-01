import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

export default function MindMapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mind Map</h1>
        <p className="text-muted-foreground">
          Visualize the key concepts and connections in your documents.
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
                <Share2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold mt-4">Mind Map Generation</h3>
                <p className="text-muted-foreground mt-2">
                    Soon you'll be able to automatically generate and interact with mind maps.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
