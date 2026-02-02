
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
  summary: z.array(z.string()).describe('An array of strings, where each string is a bullet point of the summary.'),
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
  model: 'googleai/gemini-2.5-flash',
  input: {schema: GenerateAudienceSpecificSummaryInputSchema},
  output: {schema: GenerateAudienceSpecificSummaryOutputSchema},
  prompt: `You are an expert summarizer, tailoring summaries to specific audiences.

  Summarize the following document for the given audience. Provide the summary as a JSON object containing a 'summary' field, which should be an array of strings. Each string in the array should be a single bullet point of the summary.

  If possible, also include a 'citations' field with citation references (page and paragraph numbers). For citations, make your best guess if page/paragraph numbers are not explicitly available in the text. If you cannot find any citations, omit the citations field entirely from the JSON output.

  The summary must be in {{{language}}}.

  Your response MUST be a single, valid JSON object that conforms to the output schema. Do not include any other text, markdown, or explanations outside of the JSON object.

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
