import dotenv from 'dotenv';
dotenv.config();

import { construct, generateIntelligence } from 'daitanjs/intelligence';

export async function aiLearningMaterials({
  topic = "General Knowledge",
  level = "University undergraduate",
}) {
  // Longer system instruction, keeping most of the descriptive content static.
  const instruction = `
    You are an experienced educational content creator.
    You will receive a structured prompt containing:
    {
      "topic": <string>, // The topic of the learning material
      "level": <string>, // The difficulty level of the material
    }

    Your task is to create comprehensive learning materials that explain the topic thoroughly, appropriate for the given difficulty level.

    The material should include the following:
    - An introduction to the topic.
    - A structured breakdown of the content into chapters or sections.
    - Bullet points for important concepts.
    - Examples to illustrate key ideas.
    - Use of different formatting styles for better comprehension:
      * Italics, bold, and underlined text.
      * Quote blocks with distinct background colors.
      * Indentation and box shadows.
      * CSS styles for elements where appropriate.

    Structure the content in HTML, using appropriate tags such as <h1>, <h2>, <p>, <ul>, <li>, <blockquote>, and include inline CSS to style elements.

    When responding, adhere strictly to the following format:
    {
      "html": <string>
    }

    IMPORTANT: The response should be a well-structured JSON object, strictly in JSON format without any additional text or formatting outside of the JSON object. The content should be rich, visually engaging, and suitable for educational purposes.
  `;

  const prompt = JSON.stringify({
    topic,
    level,
  });

  try {
    const messages = construct({ instruction, prompt });
    const response = await generateIntelligence({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 4000,
    });

    if (response.html && typeof response.html === 'string') {
      return response.html;
    } else {
      throw new Error('The response did not contain a valid "html" field.');
    }

  } catch (error) {
    throw new Error(`Failed to generate learning materials: ${error.message}`);
  }
}
