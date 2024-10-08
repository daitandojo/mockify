import React from 'react';
import { Box, Modal, useTheme, useMediaQuery } from '@mui/material';
import { useAppContext } from '../../contexts/AppContext';
import useExamState from '../../hooks/useExamState';
import CloseButton from './components/CloseButton';
import ProgressNavigation from './components/ProgressNavigation';
import ModalContentWrapper from './wrappers/ModalContentWrapper';
import { modalBoxStyles } from './styles'; // Import the styles

const Examination = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { appState, updateAppState } = useAppContext();
  const { activeExamIndex, exams, showModal } = appState;

  const activeExam = exams[activeExamIndex] || {};

  const {
    questions = [],
    currentQuestionIndex = 0,
    userAnswers = [],
    submitted = false,
    score = 0,
    slideDirection = 'left',
  } = activeExam;

  const {
    setCurrentQuestionIndex,
    setUserAnswers,
    setSlideDirection,
    setSubmitted,
    setScore,
  } = useExamState();

  if (!questions || questions.length === 0) return null;

  const onAnswerClick = (index) => {
    if (submitted) return;

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = index;
    setUserAnswers(newUserAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSlideDirection('left');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection('right');
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctCount = questions.reduce(
      (count, question, index) =>
        userAnswers[index] === question.indexOfCorrectAnswer
          ? count + 1
          : count,
      0,
    );
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleClose = () => {
    updateAppState('showingModal', null);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box
        sx={modalBoxStyles(isMobile)} // Use the styles from the imported styles.js
      >
        <CloseButton onClose={handleClose} />
        <ModalContentWrapper
          currentQuestionIndex={currentQuestionIndex}
          examData={activeExam}
          handleAnswerClick={onAnswerClick}
          userAnswers={userAnswers}
          submitted={submitted}
          handleSubmit={handleSubmit}
          score={score}
          slideDirection={slideDirection}
        />
        <ProgressNavigation
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          onBack={handleBack}
          onNext={handleNext}
        />
      </Box>
    </Modal>
  );
};

export default Examination;
