import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

  // Mock data, in a real app this would be fetched from Firestore
const mockHistory = [
    // The history is empty by default. Add items here to see the table.
    // Example:
    // {
    //   id: "1",
    //   documentName: "AI Research Paper.pdf",
    //   audience: "Researcher",
    //   date: "2023-10-26",
    //   summary: "AI advancements in NLP have been significant...",
    // },
  ];
  
  export default function HistoryPage() {
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
                    Here are all the summaries you have saved.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {mockHistory.length > 0 ? (
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Document Name</TableHead>
                            <TableHead>Audience</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Summary</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {mockHistory.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.documentName}</TableCell>
                            <TableCell>{item.audience}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell className="max-w-sm truncate">{item.summary}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-lg font-semibold">No History Found</h3>
                        <p className="text-muted-foreground mt-2">
                            You haven&apos;t saved any summaries yet.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    );
  }
  