"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useUser,
  useFirestore,
  useCollection,
  collectionGroup,
  query,
  where,
  useMemoFirebase,
} from "@/firebase";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const summariesQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collectionGroup(firestore, "summaries"),
      where("userId", "==", user.uid)
    );
  }, [firestore, user]);

  const { data: history, isLoading } = useCollection(summariesQuery);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Summary History</h1>
        <p className="text-muted-foreground">
          Review your previously generated summaries.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Summaries</CardTitle>
          <CardDescription>
            Here are all the summaries you have saved across all your documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : history && history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50%]">Summary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.documentName}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.audience}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.generationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="max-w-sm truncate">
                      {item.summaryText}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold">No History Found</h3>
              <p className="text-muted-foreground mt-2">
                You haven&apos;t saved any summaries yet. Generate a summary and
                save it to see it here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
