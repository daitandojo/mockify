import { Box, Modal, useTheme, useMediaQuery } from '@mui/material';
import useExamState from './hooks/useExamState';
import { handleAnswerClick } from './handlers/handleAnswer';
import { handleNext, handleBack } from './handlers/handleNavigation.js';
import CloseButton from './components/CloseButton';
import ProgressNavigation from './components/ProgressNavigation';
import ModalContentWrapper from './wrappers/ModalContentWrapper';
import './styles/index.css';

const ExamModal = ({ open, onClose, examData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswers,
    submitted,
    setSubmitted,
    score,
    setScore,
    slideDirection,
    setSlideDirection,
  } = useExamState(examData, open);

  const onAnswerClick = (index) => {
    handleAnswerClick({
      index,
      submitted,
      currentQuestionIndex,
      userAnswers,
      setUserAnswers,
      setCurrentQuestionIndex,
      examData,
      setSlideDirection,
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    examData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const onNext = () => {
    handleNext({
      currentQuestionIndex,
      setSlideDirection,
      setCurrentQuestionIndex,
      examData,
    });
  };

  const onBack = () => {
    handleBack({
      currentQuestionIndex,
      setSlideDirection,
      setCurrentQuestionIndex,
    });
  };

  if (!examData?.questions?.length) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '90vw' : '50vw',
          height: isMobile ? '80vh' : '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: isMobile ? 3 : 5,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CloseButton onClose={onClose} />
        <ModalContentWrapper
          currentQuestionIndex={currentQuestionIndex}
          examData={examData}
          handleAnswerClick={onAnswerClick}
          userAnswers={userAnswers}
          submitted={submitted}
          handleSubmit={handleSubmit}
          score={score}
          slideDirection={slideDirection}
        />
        <ProgressNavigation
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={examData.questions.length}
          onBack={onBack}
          onNext={onNext}
        />
      </Box>
    </Modal>
  );
};

export default ExamModal;
