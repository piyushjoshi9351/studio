'use server';

/**
 * @fileOverview This file defines a Genkit flow for chatting with a document.
 *
 * - chatWithDocument - A function that allows users to ask questions about an uploaded document and receive answers with source citations.
 * - ChatWithDocumentInput - The input type for the chatWithDocument function.
 * - ChatWithDocumentOutput - The return type for the chatWithDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithDocumentInputSchema = z.object({
  documentText: z.string().describe('The extracted text content of the document.'),
  userQuestion: z.string().describe('The user question about the document.'),
});

export type ChatWithDocumentInput = z.infer<typeof ChatWithDocumentInputSchema>;

const ChatWithDocumentOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, with citations.'),
});

export type ChatWithDocumentOutput = z.infer<typeof ChatWithDocumentOutputSchema>;

export async function chatWithDocument(input: ChatWithDocumentInput): Promise<ChatWithDocumentOutput> {
  return chatWithDocumentFlow(input);
}

const chatWithDocumentPrompt = ai.definePrompt({
  name: 'chatWithDocumentPrompt',
  input: {schema: ChatWithDocumentInputSchema},
  output: {schema: ChatWithDocumentOutputSchema},
  prompt: `You are a helpful assistant that answers questions about a document.  You will be given the document text and a user question.  You must answer the question using only the information in the document.  If you cannot answer the question from the document alone, say that you cannot answer the question.  Provide citations to the page or paragraph numbers in the document where you found the information to answer the question.

Document Text:
{{{documentText}}}

User Question:
{{{userQuestion}}}`,
});

const chatWithDocumentFlow = ai.defineFlow(
  {
    name: 'chatWithDocumentFlow',
    inputSchema: ChatWithDocumentInputSchema,
    outputSchema: ChatWithDocumentOutputSchema,
  },
  async input => {
    const {output} = await chatWithDocumentPrompt(input);
    return output!;
  }
);
