import dotenv from 'dotenv';
dotenv.config();

import { construct, generateIntelligence } from 'daitanjs/intelligence';

export async function aiOptions({
  question = 'What is the capital of France?',
  level = 'High School',
  topic = 'Geography',
  numberOfOptions = 4,
}) {
  // Longer system instruction, keeping most of the descriptive content static.
  const instruction = `
    You are an experienced educator tasked with creating challenging multiple-choice answers for a given question.
    You will receive a structured prompt containing:
    {
      "topic": <string>, // The topic of the question
      "question": <string>, // The question for which answer options are to be generated
      "level": <string>, // The difficulty level of the answers
      "numberOfOptions": <number> // The number of answers to generate
    }

    Your task is to generate multiple-choice answers based on the given question and topic. The answers must meet the following criteria:
    - Generate exactly the specified number of answers.
    - One answer must be fully correct, while the remaining answers must be close but slightly incorrect, adding an element of trickiness.
    - The incorrect answers should be crafted to reflect the specified difficulty level:
      - For a higher difficulty level, the incorrect answers should be nuanced and subtle.
    - Include in your response, besides the index of the correct answer, a rationale
      which outlines why this answer is correct, and why the other ones are not.
    - Ensure that your response is in proper JSON format with all necessary characters escaped.
    - Avoid using single quotes or unescaped double quotes inside the values.
    - When including a quotation mark within a string, escape it (e.g., \\"example\\").
    - Avoid using contractions (e.g., "don't", "isn't") to prevent issues with single quotes.

    Your response must be strictly in JSON format, following this structure:
    {
      "options": [<string1>, <string2>, <string3>, ...],
      "indexOfCorrectAnswer": <index>,
      "rationale": <string>   // a brief rationale as to which answer is correct. This answer
      should not contain double quotes.
    }

    IT IS VITAL that if an answer contains double quotes, these are properly escaped as \".

    The response must contain NO additional text or formatting outside of the JSON.
  `;

  // Simplified prompt containing only variable information.
  const prompt = JSON.stringify({
    topic,
    question,
    level,
    numberOfOptions,
  });

  try {
    // Construct messages by keeping the detailed description in the instruction
    const messages = construct({ instruction, prompt });
    const response = await generateIntelligence({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 1500,
    });

    console.log(response)

    if (
      response.options &&
      Array.isArray(response.options) &&
      typeof response.indexOfCorrectAnswer === 'number' &&
      response.indexOfCorrectAnswer >= 0 &&
      response.indexOfCorrectAnswer < numberOfOptions
    ) {
      return response;
    } else {
      throw new Error(
        'The response did not contain a valid "options" array or "indexOfCorrectAnswer".',
      );
    }
  } catch (error) {
    throw new Error(`Failed to generate options: ${error.message}`);
  }
}
