import { getDocument } from "@/actions/documents";
import { ChatView } from "@/components/dashboard/ChatView";
import { SummaryView } from "@/components/dashboard/SummaryView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";

export default async function DocumentPage({
  params,
}: {
  params: { id: string };
}) {
  const document = await getDocument(params.id);

  if (!document) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{document.name}</h1>
            <p className="text-sm text-muted-foreground">
                Uploaded on {new Date(document.createdAt).toLocaleDateString()}
            </p>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">AI Summary</TabsTrigger>
          <TabsTrigger value="chat">Chat with Document</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
            <SummaryView document={document} />
        </TabsContent>
        <TabsContent value="chat">
            <ChatView document={document} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
