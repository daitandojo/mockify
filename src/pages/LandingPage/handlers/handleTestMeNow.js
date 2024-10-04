import { generateBatch } from '../helpers/examHelpers';

export default async function handleTestMeNow({
  topic,
  level,
  numberOfAnswers,
  setTestLoading,
  setError,
  setExamData,
  setExamModalOpen,
}) {
  setTestLoading(true);
  setError("");

  try {
    const questions = await generateBatch({
      topic,
      level,
      batchSize: 4,
      numberOfAnswers,
      batchNumber: 0, // For test use case, only one batch
    });

    setExamData({ questions });
    setExamModalOpen(true);
  } catch (err) {
    setError("An error occurred: " + err.message);
  } finally {
    setTestLoading(false);
  }
}
