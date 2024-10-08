import dotenv from 'dotenv';
dotenv.config();

import { aiQuestions } from '../../../lib/aiQuestions';

export async function POST(request) {
  try {

    const { topic, level, numberOfQuestions } = await request.json();

    const questions = await aiQuestions({
      topic,
      level,
      numberOfQuestions,
    });

    console.log("Response received from AI:")
    console.log(questions)

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error generating questions:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
