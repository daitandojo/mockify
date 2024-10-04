import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function createPDF({ 
  title, 
  topic, 
  instructions, 
  level, 
  numberOfQuestions, 
  questions 
}) {
  try {
    console.log("CREATE PDF DOCUMENT");
    console.log(`Title: ${title}`);
    console.log(`Topic: ${topic}`);
    console.log(`Instructions: ${instructions}`);
    console.log(`Number of questions: ${numberOfQuestions}`);
    console.log(`Questions: ${JSON.stringify(questions)}`);
    
    const pdfDoc = await PDFDocument.create();

    // Embedding fonts and creating pages
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    let page = pdfDoc.addPage([595, 842]);
    const margin = 50;
    let y = 792; // Starting point for text (top of the page - margin)

    // Helper function to add wrapped text, while checking for page overflow
    function addWrappedText(page, text, x, y, options) {
      if (typeof text !== 'string' || text.trim() === '') {
        console.error('Invalid text for addWrappedText:', text);
        throw new Error('Text must be a non-empty string.');
      }

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
        currentY -= lineHeight; // Move down after drawing the final line
      }
      return { page, y: currentY };
    }

    // Add Title
    ({ page, y } = addWrappedText(page, title, margin, y, {
      font: timesRomanFont,
      size: 18,
      lineHeight: 24,
      maxWidth: 495,
    }));
    y -= 20;

    // Add topic as subtitle
    // ({ page, y } = addWrappedText(page, `Topic: ${topic}`, margin, y, {
    //   font: italicFont,
    //   size: 12,
    //   lineHeight: 18,
    //   maxWidth: 495,
    // }));
    // y -= 20;

    // Add Level and Number of Questions
    // ({ page, y } = addWrappedText(page, `Level: ${level}`, margin, y, {
    //   font: italicFont,
    //   size: 12,
    //   lineHeight: 18,
    //   maxWidth: 495,
    // }));
    // y -= 20;

    // ({ page, y } = addWrappedText(page, `Number of Questions: ${numberOfQuestions}`, margin, y, {
    //   font: italicFont,
    //   size: 12,
    //   lineHeight: 18,
    //   maxWidth: 495,
    // }));
    // y -= 30;

    // Add Instructions
    ({ page, y } = addWrappedText(page, `${instructions}`, margin, y, {
      font: timesRomanFont,
      size: 12,
      lineHeight: 18,
      maxWidth: 495,
    }));
    y -= 30;

    // Add Questions and Options with Proper Pagination
    questions.forEach((questionObj, index) => {
      if (!questionObj.question || !Array.isArray(questionObj.options)) {
        console.error('Invalid question or options:', questionObj);
        throw new Error('Each question must have a valid "question" and "options" array.');
      }

      // Add Question
      ({ page, y } = addWrappedText(page, `Q${index + 1}: ${questionObj.question}`, margin, y, {
        font: timesRomanFont,
        size: 14,
        lineHeight: 24,
        maxWidth: 495,
      }));
      y -= 10;

      // Add Options
      questionObj.options.forEach((option, optionIndex) => {
        if (typeof option !== 'string' || option.trim() === '') {
          console.error('Invalid option:', option);
          throw new Error('Each option must be a non-empty string.');
        }

        ({ page, y } = addWrappedText(page, `${option}`, margin, y, {
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
      if (!questionObj.correctAnswer===null || !questionObj.rationale) {
        console.error('Invalid answer or rationale:', questionObj);
        throw new Error('Each question must have a valid "correctAnswer" and "rationale".');
      }

      // Get the correct answer letter (e.g., "A" for index 0)
      const correctAnswerLetter = String.fromCharCode(65 + questionObj.correctAnswer);

      // Add Answer Heading
      ({ page, y } = addWrappedText(page, `Q${index + 1} - Correct Answer: ${correctAnswerLetter}`, margin, y, {
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
    console.error("Error in createPDF:", error); // More detailed error logging
    throw new Error(`Failed to create PDF: ${error.message}`);
  }
}
