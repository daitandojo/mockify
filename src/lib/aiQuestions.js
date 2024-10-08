import dotenv from 'dotenv';
dotenv.config();

import { construct, generateIntelligence } from 'daitanjs/intelligence';

export async function aiQuestions({
  topic = "General Knowledge",
  level = "University undergraduate",
  numberOfQuestions = 5,
}) {
  // Longer system instruction, keeping most of the descriptive content static.
  const instruction = `
    You are an experienced question creator for student assessments.
    You will receive a structured prompt containing:
    {
      "topic": <string>, // The topic of the questions
      "level": <string>, // The difficulty level of the questions
      "numberOfQuestions": <number> // The number of questions to generate
    }

    Your task is to create an array of questions that examine a student's 
    understanding of the given topic.

    The questions you generate should meet the following criteria:
    - The questions should be varied and cover multiple aspects of the given topic.
    - The difficulty level of the questions should be appropriate for the specified education level.
    - The questions should have clear and definitive answers, allowing them to be turned into multiple-choice questions.
    - Avoid questions that require students to "elaborate," "describe," or "discuss." Instead, focus on questions that require a specific answer or selection.
    - The questions should test key concepts and ensure comprehensive coverage of the topic.

    Examples of suitable question types include:
    - What is the definition of...?
    - Which of the following best describes...?
    - Identify the correct option regarding...
    - What is the primary function of...?
    - Which statement is true about...?

    When responding, adhere strictly to the following format:
    {
      "questions": [<string1>, <string2>, <string3>, ....]
    }

    IMPORTANT: the questions need to be suitable as multiple-choice questions
    (the options for the answers will be added later)

    The response should be a well-structured JSON object, strictly in JSON format without any additional text or formatting outside of the JSON object.
    Do not provide any introductory or concluding statements—only the JSON output as specified.
  `;

  const prompt = JSON.stringify({
    topic,
    level,
    numberOfQuestions,
  });

  try {
    const messages = construct({ instruction, prompt });
    const response = await generateIntelligence({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 2000,
    });

    if (response.questions && Array.isArray(response.questions)) {
      return response.questions
    } else {
      throw new Error('The response did not contain a valid "questions" array.');
    }

  } catch (error) {
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
}
