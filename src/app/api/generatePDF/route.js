// src/app/api/generatePDF/route.js
import { createPDF } from '../../../lib/pdfHelper.js';

export async function POST(request) {
  const { title, topic, instructions, level, numberOfQuestions, questions } = await request.json();

  try {
    const pdfBytes = await createPDF({
      title,
      topic,
      instructions,
      level,
      numberOfQuestions,
      questions,
    });

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mock_Exam.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
