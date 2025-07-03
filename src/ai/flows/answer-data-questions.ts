// src/ai/flows/answer-data-questions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering user questions about their data.
 *
 * - answerDataQuestions - A function that takes a question and data source information and returns an AI-generated answer with visualizations.
 * - AnswerDataQuestionsInput - The input type for the answerDataQuestions function.
 * - AnswerDataQuestionsOutput - The return type for the answerDataQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const AnswerDataQuestionsInputSchema = z.object({
  question: z.string().describe('The question to ask about the data.'),
  dataSourceDescription: z.string().describe('A description of the data source, including its name, type, and schema.'),
});

export type AnswerDataQuestionsInput = z.infer<typeof AnswerDataQuestionsInputSchema>;


const ChartSchema = z.object({
  type: z.enum(['bar', 'line', 'pie']).describe('The type of chart to display.'),
  data: z.any().describe('The data for the chart, in a format compatible with recharts (e.g., array of objects).'),
  config: z.any().describe('The chart configuration object for recharts, following shadcn/ui chart conventions.'),
});

const TableSchema = z.object({
  headers: z.array(z.string()).describe('The headers for the table.'),
  rows: z.array(z.array(z.union([z.string(), z.number()]))).describe('The rows of data for the table.'),
});

const AnswerDataQuestionsOutputSchema = z.object({
  answer: z.string().describe('The text-based answer to the question.'),
  chart: ChartSchema.optional().describe('An optional chart to visualize the data.'),
  table: TableSchema.optional().describe('An optional table to display the data.'),
});

export type AnswerDataQuestionsOutput = z.infer<typeof AnswerDataQuestionsOutputSchema>;

export async function answerDataQuestions(input: AnswerDataQuestionsInput): Promise<AnswerDataQuestionsOutput> {
  return answerDataQuestionsFlow(input);
}

const answerDataQuestionsPrompt = ai.definePrompt({
  name: 'answerDataQuestionsPrompt',
  input: {schema: AnswerDataQuestionsInputSchema},
  output: {schema: AnswerDataQuestionsOutputSchema},
  prompt: `You are an AI assistant helping users explore and understand their data.
  You will receive a question and a description of the data source.
  Your goal is to provide a dynamic response with a text summary and, if relevant, charts or tables that answer the question using the provided data source information.
  - If a chart is the best way to visualize the answer, provide the chart data and configuration. Use recharts format for data and shadcn/ui chart conventions for config.
  - If a table is more appropriate, provide the headers and rows.
  - Always provide a concise text summary of your findings in the 'answer' field.

  Question: {{{question}}}
  Data Source Description: {{{dataSourceDescription}}}`, 
});

const answerDataQuestionsFlow = ai.defineFlow(
  {
    name: 'answerDataQuestionsFlow',
    inputSchema: AnswerDataQuestionsInputSchema,
    outputSchema: AnswerDataQuestionsOutputSchema,
  },
  async input => {
    const {output} = await answerDataQuestionsPrompt(input);
    return output!;
  }
);
