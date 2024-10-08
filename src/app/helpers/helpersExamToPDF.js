export async function convertExamToPDF(exam) {
  try {
    console.info('Attempting to convert exam to PDF...', exam);

    // Fetch the PDF from the API, expecting binary data
    const response = await fetch('/api/apiExamToPDF', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exam }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error message from response
      throw new Error(`Failed to generate PDF: ${errorText}`);
    }

    // Process the response as a Blob (binary data)
    const pdfBlob = await response.blob();

    console.info('PDF successfully generated.');

    // Create a Blob URL for the PDF and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(pdfBlob);
    link.download = `${exam.title || 'Mock_Exam'}.pdf`; // Use exam title as filename or fallback to 'Mock_Exam'

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the link element
    document.body.removeChild(link);

    console.info('PDF download triggered successfully.');
  } catch (error) {
    // Log the error details
    console.error('Error occurred during PDF generation or download:', error);

    // Show a user-friendly error message (optional)
    alert(`Failed to generate or download the PDF. Error message: ${error.message} Please try again.`);

    // Rethrow the error for further handling if necessary
    throw new Error(`Helper convertExamToPDF failed: ${error.message}`);
  }
}
