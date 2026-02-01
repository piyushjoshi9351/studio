'use server';

/**
 * @fileOverview This flow saves the summary history to Firestore.
 *
 * - saveSummaryHistory - A function that saves the summary history.
 * - SaveSummaryHistoryInput - The input type for the saveSummaryHistory function.
 * - SaveSummaryHistoryOutput - The return type for the saveSummaryHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {firestore} from 'firebase-admin';

const SaveSummaryHistoryInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  documentId: z.string().describe('The ID of the document.'),
  audience: z.string().describe('The intended audience of the summary.'),
  summary: z.string().describe('The generated summary.'),
  citationData: z.array(z.object({
    pageNumber: z.number().optional().describe('The page number of the citation.'),
    paragraphNumber: z.number().optional().describe('The paragraph number of the citation.'),
    text: z.string().describe('The text of the citation.'),
  })).describe('Citation data for the summary.'),
});
export type SaveSummaryHistoryInput = z.infer<typeof SaveSummaryHistoryInputSchema>;

const SaveSummaryHistoryOutputSchema = z.object({
  success: z.boolean().describe('Whether the summary history was saved successfully.'),
});
export type SaveSummaryHistoryOutput = z.infer<typeof SaveSummaryHistoryOutputSchema>;

export async function saveSummaryHistory(input: SaveSummaryHistoryInput): Promise<SaveSummaryHistoryOutput> {
  return saveSummaryHistoryFlow(input);
}

const saveSummaryHistoryFlow = ai.defineFlow(
  {
    name: 'saveSummaryHistoryFlow',
    inputSchema: SaveSummaryHistoryInputSchema,
    outputSchema: SaveSummaryHistoryOutputSchema,
  },
  async input => {
    try {
      const db = firestore();
      const summaryHistoryCollection = db.collection('users').doc(input.userId).collection('summaryHistory');

      await summaryHistoryCollection.add({
        documentId: input.documentId,
        audience: input.audience,
        summary: input.summary,
        citationData: input.citationData,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      console.error('Error saving summary history:', error);
      return { success: false };
    }
  }
);
