export async function generateBatch({ topic, level, batchSize, numberOfAnswers, batchNumber }) {
  try {
    const response = await fetch('/api/generateBatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        level,
        batchSize,
        numberOfAnswers,
        batchNumber,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate batch ${batchNumber + 1}`);
    }

    const data = await response.json();
    return data.questions;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function generatePDF({ title, topic, level, numberOfQuestions, questions }) {
  try {
    const response = await fetch('/api/generatePDF', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        topic,
        instructions: "Answer all questions. Each question carries equal marks.",
        level,
        numberOfQuestions,
        questions,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate the PDF.');
    }

    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Mock_Exam.pdf';
    link.click();
  } catch (err) {
    throw new Error(err.message);
  }
}
