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

const AnswerDataQuestionsOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the question, including charts, tables, and summaries.'),
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
  Your goal is to provide a dynamic response with charts, tables, and summaries that answer the question using the provided data source information.  Be as detailed as possible in your response, and make sure to be accurate with your numbers.

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
