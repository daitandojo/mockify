// components/ExamModalContent.js
import { Box, Typography, Button } from '@mui/material';

const ExamModalContent = ({
  examData,
  currentQuestionIndex,
  handleAnswerClick,
  userAnswers,
  submitted,
  handleSubmit,
  score,
  slideDirection,
}) => {
  if (currentQuestionIndex === examData.questions.length) {
    return (
      <Box textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        {submitted ? (
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 3, color: 'green' }}>
            🎉 You scored {score} out of {examData.questions.length}!
          </Typography>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
              You've completed the exam!
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 2, px: 2, py: 1.5, fontSize: '1rem' }}
            >
              Submit Your Answers
            </Button>
          </>
        )}
      </Box>
    );
  }

  const currentQuestion = examData.questions[currentQuestionIndex];
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        {examData.title}
      </Typography>
      <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 1 }}>
        Question {currentQuestionIndex + 1} of {examData.questions.length}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, fontSize: '1rem' }}>
        {currentQuestion.question}
      </Typography>
      <Box>
        {currentQuestion.options.map((option, index) => {
          let backgroundColor = 'white';
          let borderColor = 'transparent';
          let borderWidth = '1px';

          if (submitted) {
            if (index === currentQuestion.correctAnswer) {
              borderColor = 'green';
              borderWidth = '3px';
            }
            if (userAnswers[currentQuestionIndex] === index) {
              backgroundColor = index === currentQuestion.correctAnswer ? 'lightgreen' : 'lightcoral';
            }
          } else if (userAnswers[currentQuestionIndex] === index) {
            backgroundColor = 'lightblue';
          }

          return (
            <Box
              key={index}
              onClick={() => handleAnswerClick(index)}
              sx={{
                mb: 1,
                p: 1,
                borderRadius: 2,
                cursor: !submitted ? 'pointer' : 'default',
                boxShadow: 1,
                transition: 'background-color 0.3s',
                '&:hover': {
                  bgcolor: !submitted && userAnswers[currentQuestionIndex] !== index ? 'lightgray' : backgroundColor,
                },
                bgcolor: backgroundColor,
                border: `${borderWidth} solid ${borderColor}`,
              }}
            >
              <Typography sx={{ fontSize: '1rem' }}>{option}</Typography>
            </Box>
          );
        })}
      </Box>
      {submitted && (
        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2 }}>
          Rationale: {currentQuestion.rationale}
        </Typography>
      )}
    </>
  );
};

export default ExamModalContent;
