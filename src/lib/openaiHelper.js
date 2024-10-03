import { construct, generateIntelligence } from 'daitanjs/intelligence';
// import dotenv from 'dotenv';
// dotenv.config();

export async function generateQuestions({
  topic = "General Knowledge",
  level = "University undergraduate",
  numberOfQuestions = 4,
  numberOfAnswers = 4,
  onBatchComplete
}) {
  const questionsPerBatch = 5;
  const totalBatches = Math.ceil(numberOfQuestions / questionsPerBatch);
  let questions = [];
  let title = '';
  let instructions = '';

  for (let batch = 0; batch < totalBatches; batch++) {
    const currentBatchSize = Math.min(questionsPerBatch, numberOfQuestions - batch * questionsPerBatch);

    const prompt = `
    Create a challenging mock exam for the following topic: '${topic}'. 
    The level of the exam should be ${level}.
  
    The exam should have the following structure:
    1. A clear title for the exam, appropriate to the topic and level.
    2. Ample instructions for the exam, such as "Each question carries equal marks.".
       Aim for 5 phrases that put the candidate at ease as well.
    3. ${currentBatchSize} tricky multiple-choice questions about a
       range of fields within the topic.
    
    Each question will have ${numberOfAnswers} options to choose from. 

    Questions should be tough, tricky, and relevant to the topic and syllabus.
    Each question should test key concepts. ONLY someone who has studied 
    the matter (beyond general knowledge) should be able to answer them.

    Your response should for each question also include the correct answers,
    and a rationale for why this is the correct answer.
    One of the answers should be **totally** correct. CRITICAL however,
    is that the answers should not be ambiguous, i.e. 
    ONLY ONE answer can be fully correct.

    The rationale should explain why the correct answer is correct, and may also
    explain why the second-best answer is not correct.

    CRUCIAL: Your response should be in the form of a well-structured JSON object.
    An example for such a response is (voor een Risk and Tax exam):

      {
        "title": "Risk and Tax Exam",
        "topic": "Investment Risk and Tax",
        "instructions": "Each question carries equal marks. Read each question carefully.",
        "questions": [
          {
            "question": "Describe a challenging question here?",
            "options": [
              "A. First Option",
              "B. Second Option",  // Correct answer
              "C. Third Option",
              "D. Fourth Option"   // Second best answer
            ],
            "correctAnswer": "Option B",
            "rationale": "Explain why Option B is the correct answer, and Option D is not."
          }
          // Continue until ${currentBatchSize} questions
        ]
      }
      
      Please provide the response in **strict JSON format** without any additional text or formatting outside of the JSON.
    `;

    try {
      const messages = construct({ instruction: prompt });
      const response = await generateIntelligence({
        model: 'gpt-4o',
        messages,
        max_tokens: 2000,
      });

      // Parse the JSON response
      const parsedResponse = response; // JSON.parse(response);

      if (batch === 0) {
        title = parsedResponse.title;
        instructions = parsedResponse.instructions;
      }

      questions = questions.concat(parsedResponse.questions);

      if (onBatchComplete) {
        onBatchComplete({ batchNumber: batch + 1, totalBatches });
      }
    } catch (error) {
      throw new Error(`Failed to generate questions for batch ${batch + 1}: ${error.message}`);
    }
  }

  return { 
    title, 
    topic, 
    instructions, 
    level,
    numberOfQuestions,
    questions
  };
}
