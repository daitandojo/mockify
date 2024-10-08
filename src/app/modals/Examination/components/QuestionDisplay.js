// components/QuestionDisplay.js
import { Box, Typography } from '@mui/material';
import OptionDisplay from './OptionDisplay';

const QuestionDisplay = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  userAnswers,
  submitted,
  handleAnswerClick,
}) => (
  <>
    <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>
      Question {currentQuestionIndex + 1} of {totalQuestions}
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, fontSize: '1rem' }}>
      {currentQuestion.question}
    </Typography>
    <Box sx={{ padding: '50px' }}>
      {currentQuestion.options.map((option, index) => (
        <OptionDisplay
          key={index}
          index={index}
          option={option}
          currentQuestionIndex={currentQuestionIndex}
          userAnswers={userAnswers}
          submitted={submitted}
          correctAnswer={currentQuestion.correctAnswer}
          handleAnswerClick={handleAnswerClick}
        />
      ))}
    </Box>
    {submitted && (
      <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2 }}>
        Rationale: {currentQuestion.rationale}
      </Typography>
    )}
  </>
);

export default QuestionDisplay;
