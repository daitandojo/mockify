import { generateExam } from '../../../app/helpers/helpersExamGeneration';
import { v4 as uuidv4 } from 'uuid';

export default async function handleCreateExam({
  topic,
  level,
  numberOfQuestions,
  setBusy,
  setError,
  addExam,
}) {
  setBusy("preparingexam");
  setError('');

  try {
    const newExam = await generateExam({
      topic,
      level,
      numberOfQuestions,
      numberOfOptions: 0,
    });

    newExam.id = uuidv4();
    addExam(newExam);

  } catch (error) {
    console.error('Error creating exam:', error);
    setError('An error occurred while creating the exam: ' + error.message);
  } finally {
    setBusy(null);
  }
}
