
'use server';

/**
 * @fileOverview Analyzes the tone, style, and sentiment of a document.
 *
 * - analyzeDocumentTone - A function that analyzes document linguistics.
 * - AnalyzeDocumentToneInput - The input type for the analyzeDocumentTone function.
 * - AnalyzeDocumentToneOutput - The return type for the analyzeDocumentTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDocumentToneInputSchema = z.object({
  documentText: z.string().describe('The text content of the document to analyze.'),
});
export type AnalyzeDocumentToneInput = z.infer<typeof AnalyzeDocumentToneInputSchema>;

const AnalyzeDocumentToneOutputSchema = z.object({
  sentiment: z.string().describe("The overall sentiment of the document (e.g., Positive, Negative, Neutral, Mixed)."),
  tones: z.array(z.string()).describe("A list of 2-4 dominant tones found in the text (e.g., Formal, Optimistic, Critical)."),
  writingStyle: z.string().describe("The primary writing style (e.g., Academic, Narrative, Persuasive, Technical)."),
  emoji: z.string().describe("A single emoji that best represents the overall sentiment and tone of the document."),
  summary: z.string().describe("A brief one-paragraph summary of the tone and style analysis."),
});
export type AnalyzeDocumentToneOutput = z.infer<typeof AnalyzeDocumentToneOutputSchema>;

export async function analyzeDocumentTone(input: AnalyzeDocumentToneInput): Promise<AnalyzeDocumentToneOutput> {
  return analyzeDocumentToneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDocumentTonePrompt',
  model: 'googleai/gemini-2.5-flash',
  input: {schema: AnalyzeDocumentToneInputSchema},
  output: {schema: AnalyzeDocumentToneOutputSchema},
  prompt: `You are an expert linguistic analyst. Analyze the following document to determine its sentiment, tone, and writing style.

  Based on your analysis, provide the following:
  1.  **Sentiment:** A single word describing the overall sentiment (e.g., Positive, Negative, Neutral, Mixed).
  2.  **Tones:** A list of 2-4 dominant tones (e.g., Formal, Informal, Optimistic, Pessimistic, Humorous, Serious, Critical).
  3.  **Writing Style:** The primary writing style (e.g., Academic, Narrative, Persuasive, Technical, Expository).
  4.  **Emoji:** A single emoji that best represents the overall feeling of the text.
  5.  **Summary:** A concise, one-paragraph summary explaining your analysis of the document's tone and style.

  Your response MUST be a single, valid JSON object that conforms to the output schema. Do not include any other text, markdown, or explanations outside of the JSON object.

  Document Text:
  {{{documentText}}}
  `,
});

const analyzeDocumentToneFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentToneFlow',
    inputSchema: AnalyzeDocumentToneInputSchema,
    outputSchema: AnalyzeDocumentToneOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
