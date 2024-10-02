import { generateQuestions } from '../../../lib/openaiHelper';
import { createPDF } from '../../../lib/pdfHelper.js';

export async function POST(request) {
  const { title, topic, level, syllabus, numberOfQuestions, numberOfAnswers } = await request.json();
  
  try {
    const examData = await generateQuestions({ title, topic, level, syllabus, numberOfQuestions, numberOfAnswers });
    const pdfBytes = await createPDF(examData);

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mock_Exam.pdf"',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
