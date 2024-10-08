import dotenv from 'dotenv';
dotenv.config();

import { aiSubTopics } from '../../../lib/aiSubTopics';

export async function POST(request) {
  try {
    // Parse and validate the incoming request body
    const { topic, question, level, numberaiSubTopics } = await request.json();

    // Generate subtopics based on the provided parameters
    const subTopicsObject = await aiSubTopics({
      topic,
      level,
    });

    return new Response(JSON.stringify(subTopicsObject), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating subtopics:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
