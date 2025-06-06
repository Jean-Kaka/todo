'use server';

/**
 * @fileOverview AI-powered smart suggestions and autocompletion for the AI assistant.
 *
 * - getSmartSuggestions - A function that generates smart suggestions and autocompletions.
 * - SmartSuggestionsInput - The input type for the getSmartSuggestions function.
 * - SmartSuggestionsOutput - The return type for the getSmartSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartSuggestionsInputSchema = z.object({
  query: z.string().describe('The user query to provide suggestions for.'),
  dataSources: z
    .array(z.string())
    .optional()
    .describe('The available data sources to consider for suggestions.'),
});
export type SmartSuggestionsInput = z.infer<typeof SmartSuggestionsInputSchema>;

const SmartSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('The list of smart suggestions.'),
});
export type SmartSuggestionsOutput = z.infer<typeof SmartSuggestionsOutputSchema>;

export async function getSmartSuggestions(input: SmartSuggestionsInput): Promise<SmartSuggestionsOutput> {
  return smartSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSuggestionsPrompt',
  input: {schema: SmartSuggestionsInputSchema},
  output: {schema: SmartSuggestionsOutputSchema},
  prompt: `You are an AI assistant that provides smart suggestions and autocompletions for user queries.

  Based on the user's current query and available data sources, provide a list of suggestions that can help the user explore their data more efficiently.

  Current Query: {{{query}}}
  Available Data Sources: {{#if dataSources}}{{#each dataSources}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}No data sources available{{/if}}

  Suggestions should be concise and relevant to the query and data sources.

  Return the suggestions as a JSON array of strings.
  `, // MUST be valid JSON format
});

const smartSuggestionsFlow = ai.defineFlow(
  {
    name: 'smartSuggestionsFlow',
    inputSchema: SmartSuggestionsInputSchema,
    outputSchema: SmartSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
