// src/lib/pdfHelper.js
import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function createPDF({ title, instructions, questions }) {
  try {
    const pdfDoc = await PDFDocument.create();

    // Embedding fonts and creating pages
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    let page = pdfDoc.addPage([595, 842]);
    const margin = 50;
    let y = 792; // Starting point for text (top of the page - margin)

    // Helper function to add wrapped text, while checking for page overflow
    function addWrappedText(page, text, x, y, options) {
      const { font, size, lineHeight, maxWidth } = options;
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let word of words) {
        const testLine = line + word + ' ';
        const lineWidth = font.widthOfTextAtSize(testLine, size);
        if (lineWidth > maxWidth && line !== '') {
          // Draw the current line
          page.drawText(line.trim(), { x, y: currentY, size, font });

          // Move to next line, checking for page overflow
          currentY -= lineHeight;
          line = word + ' ';

          if (currentY < margin) {
            // If there is not enough space, add a new page
            page = pdfDoc.addPage([595, 842]);
            currentY = 792; // Reset Y position for new page
          }
        } else {
          line = testLine;
        }
      }
      // Draw the last line
      if (line !== '') {
        page.drawText(line.trim(), { x, y: currentY, size, font });
      }
      return { page, y: currentY - lineHeight };
    }

    // Add Title
    ({ page, y } = addWrappedText(page, title, margin, y, {
      font: timesRomanFont,
      size: 18,
      lineHeight: 24,
      maxWidth: 495,
    }));
    y -= 20;

    // Add Instructions
    ({ page, y } = addWrappedText(page, instructions, margin, y, {
      font: italicFont,
      size: 12,
      lineHeight: 18,
      maxWidth: 495,
    }));
    y -= 30;

    // Add Questions and Options with Proper Pagination
    questions.forEach((questionObj, index) => {
      // Add Question
      ({ page, y } = addWrappedText(page, `Q${index + 1}: ${questionObj.question}`, margin, y, {
        font: timesRomanFont,
        size: 14,
        lineHeight: 24,
        maxWidth: 495,
      }));
      y -= 10;

      // Add Options
      questionObj.options.forEach((option) => {
        ({ page, y } = addWrappedText(page, option, margin, y, {
          font: timesRomanFont,
          size: 12,
          lineHeight: 18,
          maxWidth: 495,
        }));
        y -= 10;

        // Check for page overflow after each option
        if (y < margin) {
          page = pdfDoc.addPage([595, 842]);
          y = 792; // Reset Y position for new page
        }
      });

      y -= 20; // Extra space after each question

      // Check for page overflow after each question
      if (y < margin) {
        page = pdfDoc.addPage([595, 842]);
        y = 792; // Reset Y position for new page
      }
    });

    // Add a clean page break for "Answers and Rationales"
    page = pdfDoc.addPage([595, 842]);
    y = 792; // Reset Y position for new page

    // Add Answers and Rationales Section Title
    ({ page, y } = addWrappedText(page, 'Answers and Rationales', margin, y, {
      font: timesRomanFont,
      size: 16,
      lineHeight: 22,
      maxWidth: 495,
    }));
    y -= 20;

    // Add each answer and rationale
    questions.forEach((questionObj, index) => {
      // Add Answer Heading
      ({ page, y } = addWrappedText(page, `Q${index + 1} - Correct Answer: ${questionObj.correctAnswer}`, margin, y, {
        font: timesRomanFont,
        size: 14,
        lineHeight: 24,
        maxWidth: 495,
      }));
      y -= 10;

      // Add Rationale
      ({ page, y } = addWrappedText(page, `Rationale: ${questionObj.rationale}`, margin, y, {
        font: italicFont,
        size: 12,
        lineHeight: 18,
        maxWidth: 495,
      }));
      y -= 20;

      // Check for page overflow after each answer and rationale
      if (y < margin) {
        page = pdfDoc.addPage([595, 842]);
        y = 792;
      }
    });

    // Return PDF bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to create PDF: ${error.message}`);
  }
}
