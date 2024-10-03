// src/app/api/generateBatch/route.js
import { generateQuestions } from '../../../lib/openaiHelper';

export async function POST(request) {
  const { topic, level, batchSize, numberOfAnswers, batchNumber } = await request.json();

  try {
    const generatedBatch = await generateQuestions({
      topic,
      level,
      numberOfQuestions: batchSize,
      numberOfAnswers,
      batchNumber,
    });

    return new Response(JSON.stringify(generatedBatch), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error generating batch:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
