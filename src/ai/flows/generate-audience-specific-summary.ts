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
});
export type GenerateAudienceSpecificSummaryInput = z.infer<
  typeof GenerateAudienceSpecificSummaryInputSchema
>;

const GenerateAudienceSpecificSummaryOutputSchema = z.object({
  summary: z.string().describe('The audience-specific summary of the document.'),
  citations: z
    .array(z.object({page: z.number(), paragraph: z.number()}))
    .describe('List of citation references.'),
});
export type GenerateAudienceSpecificSummaryOutput = z.infer<
  typeof GenerateAudienceSpecificSummaryOutputSchema
>;

export async function generateAudienceSpecificSummary(
  input: GenerateAudienceSpecificSummaryInput
): Promise<GenerateAudienceSpecificSummaryOutput> {
  return generateAudienceSpecificSummaryFlow(input);
}

const relevanceRankerTool = ai.defineTool({
  name: 'relevanceRanker',
  description: 'Ranks the relevance of sections of the document for the requested audience.',
  inputSchema: z.object({
    documentText: z.string().describe('The complete document text.'),
    audience: z
      .enum(['Student', 'Lawyer', 'Researcher', 'General Public'])
      .describe('The intended audience.'),
  }),
  outputSchema: z.array(z.object({
    page: z.number().describe('Page number of the relevant section'),
    paragraph: z.number().describe('Paragraph number of the relevant section'),
    relevanceScore: z.number().describe('Relevance score (0-1) for this section.'),
    text: z.string().describe('Text of the relevant section')
  })).describe('Sections of the document ranked by relevance to the audience')
  },
  async (input) => {
    // Placeholder implementation for relevance ranking.  **IMPLEMENT THIS**
    // In a real application, this would use a more sophisticated method
    // to determine the relevance of each section to the specified audience.
    const sections = input.documentText.split('\n\n').map((paragraph, index) => ({
      page: 1, // Assume single page for now
      paragraph: index + 1,
      relevanceScore: Math.random(), // Dummy relevance score
      text: paragraph
    }));
    return sections.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
);

const prompt = ai.definePrompt({
  name: 'generateAudienceSpecificSummaryPrompt',
  input: {schema: GenerateAudienceSpecificSummaryInputSchema},
  output: {schema: GenerateAudienceSpecificSummaryOutputSchema},
  tools: [relevanceRankerTool],
  prompt: `You are an expert summarizer, tailoring summaries to specific audiences.

  Summarize the following document for the given audience. Provide the summary in bullet points.
  Include citation references (page and paragraph numbers) for each bullet point.

  Audience: {{{audience}}}

  Here's the document text: {{{text}}}

  Consider the output of the relevanceRanker tool when generating the summary.
`,
});

const generateAudienceSpecificSummaryFlow = ai.defineFlow(
  {
    name: 'generateAudienceSpecificSummaryFlow',
    inputSchema: GenerateAudienceSpecificSummaryInputSchema,
    outputSchema: GenerateAudienceSpecificSummaryOutputSchema,
  },
  async input => {
    const rankedSections = await relevanceRankerTool({
      documentText: input.text,
      audience: input.audience
    });

    // Limit to top 5 most relevant sections for the prompt to save tokens.
    const topSections = rankedSections.slice(0, 5);

    const {output} = await prompt({
      ...input,
      text: topSections.map(s => `Page ${s.page}, Paragraph ${s.paragraph}: ${s.text}`).join('\n'), // Only pass the relevant sections
    });
    return output!;
  }
);
