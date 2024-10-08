import dotenv from 'dotenv';
dotenv.config();

import { construct, generateIntelligence } from 'daitanjs/intelligence';

export async function aiSubTopics({
  topic = "General Knowledge",
  level = "University undergraduate",
}) {
  // Instruction to generate a hierarchical list of subtopics.
  const instruction = `
    You are an experienced curriculum designer.
    You will receive a structured prompt containing:
    {
      "topic": <string>, // The topic of the material
      "level": <string>, // The difficulty level of the material
    }

    Your task is to create a hierarchical list of subtopics suitable for the 
    given topic. The questions and topics should be appropriate to the level of the student,
    which is given to you in the prompt.

    The structure should include:
    - Subtopics directly related to the given topic.
    - If the level allows, further break down each subtopic into sub-subtopics.
    - Create a tree structure, starting with the main topic, and progressively breaking down into more specific subtopics.

    Example:
    {
      "topic": "Math",
      "subtopics": [
        {
          "subtopic": "Algebra",
          "subtopics": [
            {
              "subtopic": "Linear Equations"
            },
            {
              "subtopic": "Quadratic Equations"
            },
            {
              "subtopic": "Differential Equations"
            }
          ]
        },
        {
          "subtopic": "Geometry",
          "subtopics": [
            {
              "subtopic": "Euclidean Geometry"
            },
            {
              "subtopic": "Coordinate Geometry"
            }
          ]
        }
      ]
    }

    Please output in the following format:
    {
      "topic": <string>,
      "subtopics": [
        {
          "subtopic": <string>,
          "subtopics": [
            {
              "subtopic": <string>
            },
            ...
          ]
        },
        ...
      ]
    }

    The response should be a well-structured JSON object, strictly in JSON format without any additional text or formatting outside of the JSON object.
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
      max_tokens: 2000,
    });

    if (response.subtopics && Array.isArray(response.subtopics)) {
      return response;
    } else {
      throw new Error('The response did not contain a valid "subtopics" array.');
    }

  } catch (error) {
    throw new Error(`Failed to generate subtopics: ${error.message}`);
  }
}
