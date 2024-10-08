import { generateQuestions, generateOptions } from './helpersQuestionGeneration';
import { emptyExam } from '../../app/defaults';
import { post } from 'daitanjs/apiqueries';

// Log utility for consistent logging
function logInfo(message) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

function logError(message, error) {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
}

export async function generateSubTopics({ topic, level }) {
  logInfo(`Starting generation of subtopics for topic: ${topic}, level: ${level}`);
  try {
    const data = await post('/api/apiSubTopics', {
      topic,
      level
    });

    logInfo('Successfully received response from /api/apiSubTopics');
    logInfo(JSON.stringify(data));
    return data;
  } catch (err) {
    logError('Error in generateSubTopics', err);
    cacheError(err);
    throw new Error(`Failed to generate questions: ${err.message}`);
  }
}

export async function generateExam({ topic, level, numberOfQuestions, numberOfOptions }) {
  try {
    console.log("GENERATING QUESTIONS");

    const questions = await generateQuestions({ topic, level, numberOfQuestions });

    console.log("QUESTIONS GENERATED:", questions);

    const questionObjects = await Promise.all(questions.map(async (question) => {
      const optionsObject = numberOfOptions
        ? await generateOptions({ topic, question: question.question, level, numberOfOptions })
        : {};

      return {
        question,
        options: optionsObject.options || [],
        indexOfCorrectAnswer: optionsObject.indexOfCorrectAnswer || null,
        rationale: optionsObject.rationale || '',
      };
    }));

    return {
      ...emptyExam,
      topic,
      level,
      questions: questionObjects,
    };
  } catch (err) {
    throw new Error(`Failed to generate exam: ${err.message}`);
  }
}
