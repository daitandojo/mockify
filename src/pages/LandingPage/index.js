"use client";

import { Container, Typography, Grid, Alert } from '@mui/material';
import { containerStyle, headerText, headerSubText } from './styles';
import ExamModal from '../ExamModal';
import InputFields from './components/InputFields';
import GenerateButtons from './components/GenerateButtons';
import { useExamContext } from '../../app/contexts/ExamContext';
import handleGeneratePDF from './handlers/handleGeneratePDF';
import handleTestMeNow from './handlers/handleTestMeNow';

export default function LandingPage() {
  const {
    examModalOpen,
    setExamModalOpen,
    error,
    setError,
    examData,
    setLoading,
    setQuestionsRemaining,
    setAllQuestions,
    numberOfQuestions,
    numberOfAnswers,
    topic,
    level,
    setTestLoading,
    setExamData,
  } = useExamContext();

  const handleGeneratePDFHandler = () => {
    handleGeneratePDF({
      topic,
      level,
      numberOfQuestions,
      numberOfAnswers,
      setLoading,
      setError,
      setQuestionsRemaining,
      setAllQuestions,
    });
  };

  const handleTestMeNowHandler = () => {
    handleTestMeNow({
      topic,
      level,
      numberOfAnswers,
      setTestLoading,
      setError,
      setExamData,
      setExamModalOpen,
    });
  };

  return (
    <>
      <Container sx={containerStyle}>
        <Typography
          variant="h1"
          sx={{
            ...headerText,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          }}
        >
          Mockify
        </Typography>
        <Typography
          variant="h2"
          sx={{
            ...headerSubText,
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
          }}
        >
          Mock Exams on Any Topic!
        </Typography>
        <InputFields />
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <GenerateButtons
          handleGeneratePDF={handleGeneratePDFHandler}
          handleTestMeNow={handleTestMeNowHandler}
        />
      </Container>
      <ExamModal
        open={examModalOpen}
        onClose={() => setExamModalOpen(false)}
        examData={examData}
      />    
    </>
  );
}