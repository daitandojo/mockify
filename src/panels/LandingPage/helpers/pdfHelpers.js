import { post } from 'daitanjs/apiqueries';

export async function convertExamToPDF(exam) {
  try {
    const data = await post('/api/apiExamToPDF', { exam } );

    // Handle file download for the generated PDF
    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Mock_Exam.pdf';
    link.click();
  } catch (err) {
    throw new Error(err.message);
  }
}
