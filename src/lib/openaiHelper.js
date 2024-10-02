// src/lib/openaiHelper.js
import { configureEnv } from 'daitanjs/development';
import dotenv from 'dotenv';
import path from 'path';
import { construct, generateIntelligence } from 'daitanjs/intelligence';

// Configure dotenv to read from your environment
configureEnv();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export async function generateQuestions({
  title = "Trivial Pursuit Questions",
  topic = "General Knowledge",
  level = "University undergraduate",
  syllabus = "Wikipedia",
  numberOfQuestions = 4,
  numberOfAnswers = 4
}) {
  const prompt = `
  Create a challenging mock exam for the following topic: '${topic}',
  with the title: ${title}. The level of the exam should be ${level},
  and it should be based on the ${syllabus}.
 
  The exam should have the following structure:
  1. A clear title
  2. Ample instructions for the exam. Each quesion carries equal marks.
  3. ${numberOfQuestions} tricky multiple-choice questions.
  
  Each question will have ${numberOfAnswers} options to choose from. 
  Include correct answers and rationales for each question in your response.

  Questions should be tough, tricky and relevant to the topic and syllabus.
  Each question should test key concepts.

  CRUCIAL: Your response should be in the form of a well-structured JSON object.
  An example for such a response is (voor een Risk and Tax exam):

    {
      "title": "Investment Risk and Tax Exam",
      "instructions": "Answer all questions. Each question carries equal marks.",
      "questions": [
        {
          "question": "Describe a challenging question here?",
          "options": [
            "A. First Option",
            "B. Second Option",
            "C. Third Option",
            "D. Fourth Option"
          ],
          "correctAnswer": "Option B",
          "rationale": "Explain why Option B is the correct answer."
        },
        {
          "question": "Another challenging question here?",
          "options": [
            "A. First Option",
            "B. Second Option",
            "C. Third Option",
            "D. Fourth Option"
          ],
          "correctAnswer": "Option D",
          "rationale": "Explain why Option D is the correct answer."
        }
        // Continue until ${numberOfQuestions} questions
      ]
    }
    
    Please provide the response in **strict JSON format** without any additional text or formatting outside of the JSON.
  `;

  try {
    const messages = construct({ instruction: prompt });
    const response = await generateIntelligence({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 2000,
    });

    return response;
  } catch (error) {
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
}