import { PDFDocument, StandardFonts } from 'pdf-lib';

const addWrappedText = (page, text, x, y, options, pdfDoc) => {
  if (typeof text !== 'string' || text.trim() === '') throw new Error('Text must be a non-empty string.');
  const { font, size, lineHeight, maxWidth } = options;
  let words = text.split(' '), line = '', currentY = y;
  for (let word of words) {
    const testLine = line + word + ' ', lineWidth = font.widthOfTextAtSize(testLine, size);
    if (lineWidth > maxWidth && line !== '') {
      page.drawText(line.trim(), { x, y: currentY, size, font });
      currentY -= lineHeight; line = word + ' ';
      if (currentY < 50) { page = pdfDoc.addPage([595, 842]); currentY = 792; }
    } else { line = testLine; }
  }
  if (line !== '') { page.drawText(line.trim(), { x, y: currentY, size, font }); currentY -= lineHeight; }
  return { page, y: currentY };
};

const addQuestionOptions = (questionObj, index, page, y, font, pdfDoc) => {
  ({ page, y } = addWrappedText(page, `Q${index + 1}: ${questionObj.question}`, 50, y, { font, size: 14, lineHeight: 24, maxWidth: 495 }, pdfDoc));
  y -= 10;
  questionObj.options.forEach((option, optionIndex) => {
    const optionLetter = String.fromCharCode(65 + optionIndex), optionText = `${optionLetter}. ${option}`;
    ({ page, y } = addWrappedText(page, optionText, 50, y, { font, size: 12, lineHeight: 18, maxWidth: 495 }, pdfDoc));
    y -= 10;
    if (y < 50) { page = pdfDoc.addPage([595, 842]); y = 792; }
  });
  return { page, y: y - 20 };
};

const addAnswersAndRationales = (questions, page, y, font, italicFont, pdfDoc) => {
  ({ page, y } = addWrappedText(page, 'Answers and Rationales', 50, y, { font, size: 16, lineHeight: 22, maxWidth: 495 }, pdfDoc));
  y -= 20;
  questions.forEach((questionObj, index) => {
    const correctAnswerLetter = String.fromCharCode(65 + questionObj.indexOfCorrectAnswer);
    ({ page, y } = addWrappedText(page, `Q${index + 1} - Correct Answer: ${correctAnswerLetter}`, 50, y, { font, size: 14, lineHeight: 24, maxWidth: 495 }, pdfDoc));
    y -= 10;
    ({ page, y } = addWrappedText(page, `Rationale: ${questionObj.rationale}`, 50, y, { font: italicFont, size: 12, lineHeight: 18, maxWidth: 495 }, pdfDoc));
    y -= 20;
    if (y < 50) { page = pdfDoc.addPage([595, 842]); y = 792; }
  });
  return { page, y };
};

export async function aiExamToPDF({ exam }) {
  try {
    const { topic, questions } = exam, pdfDoc = await PDFDocument.create(), timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman), italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
    let page = pdfDoc.addPage([595, 842]), y = 792;
    ({ page, y } = addWrappedText(page, `Mock exam on ${topic}`, 50, y, { font: timesRomanFont, size: 18, lineHeight: 24, maxWidth: 495 }, pdfDoc));
    y -= 20;
    ({ page, y } = addWrappedText(page, `This is your mock exam on ${topic}. Good luck!`, 50, y, { font: timesRomanFont, size: 12, lineHeight: 18, maxWidth: 495 }, pdfDoc));
    y -= 30;
    questions.forEach((questionObj, index) => ({ page, y } = addQuestionOptions(questionObj, index, page, y, timesRomanFont, pdfDoc)));
    page = pdfDoc.addPage([595, 842]); y = 792;
    ({ page, y } = addAnswersAndRationales(questions, page, y, timesRomanFont, italicFont, pdfDoc));
    return await pdfDoc.save();
  } catch (error) {
    console.error("Error in createPDF:", error);
    throw new Error(`Failed to create PDF: ${error.message}`);
  }
}
