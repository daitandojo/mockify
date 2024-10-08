// components/ExamCompletion.js
import { Box, Typography, Button } from '@mui/material';

const ExamCompletion = ({ submitted, score, totalQuestions, handleSubmit }) => (
  <Box
    textAlign="center"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    {submitted ? (
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mt: 3, color: 'green' }}
      >
        🎉 You scored {score} out of {totalQuestions}!
      </Typography>
    ) : (
      <>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
          You have completed the exam!
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

export default ExamCompletion;
