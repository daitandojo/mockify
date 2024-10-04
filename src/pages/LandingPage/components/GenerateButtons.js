import { Box, Button, CircularProgress } from '@mui/material';
import { generateButton } from '../styles';
import { useExamContext } from '../../../app/contexts/ExamContext';

export default function GenerateButtons({ handleGeneratePDF, handleTestMeNow }) {
  const {
    loading,
    testLoading,
    questionsRemaining,
  } = useExamContext();

  return (
    <Box
      textAlign="center"
      sx={{
        marginTop: { xs: '20px', md: '40px' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        onClick={handleTestMeNow}
        disabled={testLoading}
        sx={generateButton}
        startIcon={testLoading ? <CircularProgress size={20} /> : null}
      >
        {testLoading ? "Generating Questions..." : "Test Me Now"}
      </Button>
      <Button
        variant="contained"
        onClick={handleGeneratePDF}
        disabled={loading}
        sx={generateButton}
        startIcon={loading ? <CircularProgress size={20} /> : null}
        style={{ marginLeft: { xs: '0', sm: '20px' }, marginTop: { xs: '10px', sm: '0' } }}
      >
        {loading
          ? `Generating... Questions Remaining: ${questionsRemaining}`
          : "Produce PDF Mock Exam"}
      </Button>
    </Box>
  );
}
