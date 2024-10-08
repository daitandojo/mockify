import { post } from 'daitanjs/apiqueries';

// Function to cache errors (for simplicity, using localStorage)
function cacheError(error) {
  const cachedErrors = JSON.parse(localStorage.getItem('apiErrors')) || [];
  cachedErrors.push({
    message: error.message,
    stack: error.stack,
    time: new Date().toISOString(),
  });
  localStorage.setItem('apiErrors', JSON.stringify(cachedErrors));
}

// Log utility for consistent logging
function logInfo(message) {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
}

function logError(message, error) {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
}

export async function generateQuestions({ topic, level, numberOfQuestions }) {
  logInfo(`Starting generateQuestions with topic: ${topic}, level: ${level}, numberOfQuestions: ${numberOfQuestions}`);
  try {
    const data = await post('/api/apiGenerateQuestions', {
      topic,
      level,
      numberOfQuestions,
    });

    logInfo('Successfully received response from /api/apiGenerateQuestions');
    logInfo(JSON.stringify(data));
    return data.questions;
  } catch (err) {
    logError('Error in generateQuestions', err);
    cacheError(err);
    throw new Error(`Failed to generate questions: ${err.message}`);
  }
}

export async function generateOptions({ topic, question, level, numberOfOptions }) {
  logInfo(`Starting generateOptions with topic: ${topic}, question: ${question}, level: ${level}, numberOfOptions: ${numberOfOptions}`);
  try {
    const data = await post('/api/apiGenerateOptions', {
      topic,
      question,
      level,
      numberOfOptions,
    });

    logInfo('Successfully received response from /api/apiGenerateOptions');
    return data;
  } catch (err) {
    logError('Error in generateOptions', err);
    cacheError(err);
    throw new Error(`Failed to generate options: ${err.message}`);
  }
}

export async function ensureAnswersForQuestion(question, examData, currentQuestionIndex) {
  logInfo(`Ensuring answers for question index: ${currentQuestionIndex}`);
  try {
    if (!question.answers || question.indexOfCorrectAnswer == null || !question.rationale) {
      logInfo(`Generating options for question at index: ${currentQuestionIndex}`);
      const optionsData = await generateOptions({
        topic: examData.topic,
        question: question.question,
        level: examData.level,
        numberOfOptions: 4,
      });

      // Add generated answers to the current question
      examData.questions[currentQuestionIndex] = {
        ...question,
        ...optionsData,
      };
      logInfo(`Options successfully generated and added to question index: ${currentQuestionIndex}`);
    } else {
      logInfo(`Question at index: ${currentQuestionIndex} already has complete answers.`);
    }
  } catch (err) {
    logError(`Error in ensureAnswersForQuestion at index: ${currentQuestionIndex}`, err);
    cacheError(err);
    throw new Error(`Failed to ensure answers for question: ${err.message}`);
  }
}
