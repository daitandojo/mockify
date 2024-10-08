// components/OptionDisplay.js
import { Box, Typography } from '@mui/material';

const OptionDisplay = ({
  index,
  option,
  currentQuestionIndex,
  userAnswers,
  submitted,
  correctAnswer,
  handleAnswerClick,
}) => {
  let backgroundColor = 'white';
  let borderColor = 'transparent';
  let borderWidth = '1px';

  if (submitted) {
    if (index === correctAnswer) {
      borderColor = 'green';
      borderWidth = '3px';
    }
    if (userAnswers[currentQuestionIndex] === index) {
      backgroundColor =
        index === correctAnswer ? 'lightgreen' : 'lightcoral';
    }
  } else if (userAnswers[currentQuestionIndex] === index) {
    backgroundColor = 'lightblue';
  }

  return (
    <Box
      onClick={() => !submitted && handleAnswerClick(index)}
      sx={{
        mb: 1,
        p: 1,
        borderRadius: 2,
        cursor: !submitted ? 'pointer' : 'default',
        boxShadow: 1,
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor:
            !submitted && userAnswers[currentQuestionIndex] !== index
              ? 'lightgray'
              : backgroundColor,
        },
        bgcolor: backgroundColor,
        border: `${borderWidth} solid ${borderColor}`,
      }}
    >
      <Typography sx={{ fontSize: '1rem' }}>{option}</Typography>
    </Box>
  );
};

export default OptionDisplay;
