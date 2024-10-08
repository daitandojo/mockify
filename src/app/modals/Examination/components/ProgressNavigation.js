import { Box, IconButton, LinearProgress } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const ProgressNavigation = ({
  currentQuestionIndex,
  questionsLength,
  onBack,
  onNext,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
    <IconButton
      onClick={onBack}
      disabled={currentQuestionIndex === 0}
      sx={{
        bgcolor: 'grey.200',
        '&:hover': { bgcolor: 'grey.300' },
        width: 50,
        height: 50,
      }}
    >
      <ArrowBackIos sx={{ fontSize: 28 }} />
    </IconButton>
    <LinearProgress
      variant="determinate"
      value={((currentQuestionIndex+1) / questionsLength) * 100}
      sx={{ width: '70%', mx: 2, height: 10 }}
    />
    <IconButton
      onClick={onNext}
      disabled={currentQuestionIndex === questionsLength}
      sx={{
        bgcolor: 'grey.200',
        '&:hover': { bgcolor: 'grey.300' },
        width: 50,
        height: 50,
      }}
    >
      <ArrowForwardIos sx={{ fontSize: 28 }} />
    </IconButton>
  </Box>
);

export default ProgressNavigation;
