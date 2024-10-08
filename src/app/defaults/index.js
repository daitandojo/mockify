export const initialAppState = {
  progressGeneration: 0, // New property to track generation progress percentage
  userTopic: 'UK Tax and Investment Risk',
  userLevel: 'Undergraduate',
  busy: null,
  error: null,
  showingModal: null,
  messageForModal: false,
  tree: {},
  slideDirection: '',
  exams: [
    {
      id: 'ABCD',
      topic: 'General Knowledge',
      level: 'Undergraduate',
      questions: [
        {
          question: 'What is the capital of France?',
          options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
          indexOfCorrectAnswer: 0,
          rationale: 'Paris is the capital of France.',
        },
        {
          question: 'Which planet is known as the Red Planet?',
          options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
          indexOfCorrectAnswer: 1,
          rationale: 'Mars is known as the Red Planet due to its reddish appearance.',
        },
        {
          question: 'Who wrote the play "Romeo and Juliet"?',
          options: ['Charles Dickens', 'Jane Austen', 'William Shakespeare', 'Mark Twain'],
          indexOfCorrectAnswer: 2,
          rationale: 'William Shakespeare wrote the play "Romeo and Juliet".',
        }
      ],
      userAnswers: [1, 0, 3],  // Example user answers
      currentQuestionIndex: 0,
      submitted: false,
      score: null,
    },
    {
      id: 'ABCE',
      topic: 'Matrimonio',
      level: 'Beginner',
      questions: [
        {
          question: 'How many years have you been married?',
          options: ['5 years', '10 years', '20 years', '30 years'],
          indexOfCorrectAnswer: 0,
          rationale: 'You have been married 30 years.',
        },
      ],
      userAnswers: [],
      currentQuestionIndex: 0,
      submitted: false,
      score: null,
    },
  ],
  activeExamIndex: 0,
};

export const emptyExam = {
  id: null,
  topic: 'General Knowledge',
  level: 'Undergraduate',
  questions: [],
  userAnswers: [],
  currentQuestionIndex: 0,
  submitted: false,
  score: null,
};
