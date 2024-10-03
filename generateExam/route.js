import { generateQuestions } from '../../../lib/openaiHelper';
import { createPDF } from '../../../lib/pdfHelper.js';

export async function POST(request) {
  const { topic, level, numberOfQuestions, numberOfAnswers } = 
    await request.json();
  
  const onBatchComplete = () => { console.log("Batch complete") };

  try {
    const generatedExam = await generateQuestions({ 
      topic, 
      level, 
      numberOfQuestions, 
      numberOfAnswers, 
      onBatchComplete 
    });

    const {
      title = `${topic} Mock Exam`,
      instructions = "Answer all questions. Each question carries equal marks.",
      questions
    } = generatedExam;

    if (!questions || questions.length === 0) {
      throw new Error('No questions generated.');
    }

    console.log("EXAM DATA RECEIVED:");
    console.log(`Title: ${title}`);
    console.log(`Topic: ${topic}`);
    console.log(`Instructions: ${instructions}`);
    console.log(`Number of questions: ${numberOfQuestions}`);
    console.log(`Questions: ${JSON.stringify(questions)}`);

    const pdfBytes = await createPDF({ 
      title, 
      topic, 
      instructions, 
      level, 
      numberOfQuestions, 
      questions 
    });

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mock_Exam.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating exam or creating PDF:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
