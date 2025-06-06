'use server';

/**
 * @fileOverview A flow to generate insight cards based on uploaded data.
 *
 * - generateInsightCards - A function that generates insight cards.
 * - GenerateInsightCardsInput - The input type for the generateInsightCards function.
 * - GenerateInsightCardsOutput - The return type for the generateInsightCards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightCardsInputSchema = z.object({
  dataDescription: z
    .string()
    .describe('A description of the uploaded data, including schema and key metrics.'),
});
export type GenerateInsightCardsInput = z.infer<typeof GenerateInsightCardsInputSchema>;

const InsightCardSchema = z.object({
  title: z.string().describe('A concise title for the insight card.'),
  description: z.string().describe('A detailed description of the insight.'),
  chartType: z.enum(['line', 'bar', 'pie', 'table']).describe('The recommended chart type for visualizing the insight.'),
  dataFields: z.array(z.string()).describe('The data fields relevant to the insight.'),
});

const GenerateInsightCardsOutputSchema = z.array(InsightCardSchema).describe('An array of generated insight cards.');
export type GenerateInsightCardsOutput = z.infer<typeof GenerateInsightCardsOutputSchema>;

export async function generateInsightCards(input: GenerateInsightCardsInput): Promise<GenerateInsightCardsOutput> {
  return generateInsightCardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightCardsPrompt',
  input: {schema: GenerateInsightCardsInputSchema},
  output: {schema: GenerateInsightCardsOutputSchema},
  prompt: `You are an AI assistant that generates insight cards for a data analyst dashboard.

  Based on the description of the uploaded data, generate a list of insight cards that highlight key trends, anomalies, and important metrics.

  Each insight card should include a title, a detailed description, a recommended chart type, and the relevant data fields.

  Data Description: {{{dataDescription}}}

  Ensure the output is a JSON array of insight card objects.`,  
});

const generateInsightCardsFlow = ai.defineFlow(
  {
    name: 'generateInsightCardsFlow',
    inputSchema: GenerateInsightCardsInputSchema,
    outputSchema: GenerateInsightCardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
