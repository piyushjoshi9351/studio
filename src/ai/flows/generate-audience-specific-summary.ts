'use server';

/**
 * @fileOverview Generates an audience-specific summary of a document.
 *
 * - generateAudienceSpecificSummary - A function that generates a summary tailored to a specific audience.
 * - GenerateAudienceSpecificSummaryInput - The input type for the generateAudienceSpecificSummary function.
 * - GenerateAudienceSpecificSummaryOutput - The return type for the generateAudienceSpecificSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAudienceSpecificSummaryInputSchema = z.object({
  text: z.string().describe('The text content of the document to summarize.'),
  audience: z
    .enum(['Student', 'Lawyer', 'Researcher', 'General Public'])
    .describe('The target audience for the summary.'),
  language: z
    .enum(['English', 'Spanish', 'French', 'German', 'Hindi'])
    .describe('The language for the summary.'),
});
export type GenerateAudienceSpecificSummaryInput = z.infer<
  typeof GenerateAudienceSpecificSummaryInputSchema
>;

const GenerateAudienceSpecificSummaryOutputSchema = z.object({
  summary: z.string().describe('The audience-specific summary of the document.'),
  citations: z
    .array(z.object({page: z.number(), paragraph: z.number()}))
    .describe('List of citation references.')
    .optional(),
});
export type GenerateAudienceSpecificSummaryOutput = z.infer<
  typeof GenerateAudienceSpecificSummaryOutputSchema
>;

export async function generateAudienceSpecificSummary(
  input: GenerateAudienceSpecificSummaryInput
): Promise<GenerateAudienceSpecificSummaryOutput> {
  return generateAudienceSpecificSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAudienceSpecificSummaryPrompt',
  input: {schema: GenerateAudienceSpecificSummaryInputSchema},
  output: {schema: GenerateAudienceSpecificSummaryOutputSchema},
  prompt: `You are an expert summarizer, tailoring summaries to specific audiences.

  Summarize the following document for the given audience. Provide the summary in bullet points.
  Include citation references (page and paragraph numbers) for each bullet point if possible. For citations, make your best guess if page/paragraph numbers are not explicitly available in the text, you can use page 1 and an approximate paragraph number. If you cannot find any citations, do not include the citations field.

  The summary must be in {{{language}}}.

  Audience: {{{audience}}}

  Document Text:
  {{{text}}}
`,
});

const generateAudienceSpecificSummaryFlow = ai.defineFlow(
  {
    name: 'generateAudienceSpecificSummaryFlow',
    inputSchema: GenerateAudienceSpecificSummaryInputSchema,
    outputSchema: GenerateAudienceSpecificSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
