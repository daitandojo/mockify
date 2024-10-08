import dotenv from 'dotenv';
dotenv.config();

import { aiOptions } from '../../../lib/aiOptions';

export async function POST(request) {
  try {
    // Parse and validate the incoming request body
    const { topic, question, level, numberOfOptions } = await request.json();

    // Generate options based on the provided parameters
    const optionsObject = await aiOptions({
      topic,
      question,
      level,
      numberOfOptions,
    });

    return new Response(JSON.stringify(optionsObject), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating options:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
