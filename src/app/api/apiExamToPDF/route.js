// src/app/api/apiExamToPDF/route.js

import dotenv from 'dotenv';
dotenv.config();

import { aiExamToPDF } from '../../../lib/aiExamToPDF';

export async function POST(request) {
  try {
    // Parse the incoming request body to get the exam data
    const exam = await request.json();
    console.log(JSON.stringify(exam))
    console.log('Received exam data:', exam);

    const pdfBytes = await aiExamToPDF(exam);

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Mock_Exam.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF from exam:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
