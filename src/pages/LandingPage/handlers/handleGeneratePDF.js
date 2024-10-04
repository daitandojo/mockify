import { generateBatch, generatePDF } from '../helpers/examHelpers';

export default async function handleGeneratePDF({
  topic,
  level,
  numberOfQuestions,
  numberOfAnswers,
  setLoading,
  setError,
  setQuestionsRemaining,
  setAllQuestions,
}) {
  setLoading(true);
  setError("");
  setQuestionsRemaining(numberOfQuestions);

  try {
    const batchSize = 5;
    const totalBatches = Math.ceil(numberOfQuestions / batchSize);
    let accumulatedQuestions = [];

    for (let batchNumber = 0; batchNumber < totalBatches; batchNumber++) {
      const questions = await generateBatch({
        topic,
        level,
        batchSize: Math.min(batchSize, numberOfQuestions - batchNumber * batchSize),
        numberOfAnswers,
        batchNumber,
      });
      accumulatedQuestions = [...accumulatedQuestions, ...questions];
      setQuestionsRemaining((prev) => Math.max(0, prev - batchSize));
    }

    setAllQuestions(accumulatedQuestions);

    await generatePDF({
      title: `${topic} Mock Exam`,
      topic,
      level,
      numberOfQuestions,
      questions: accumulatedQuestions,
    });

  } catch (err) {
    setError("An error occurred: " + err.message);
  } finally {
    setLoading(false);
  }
}
