import { useState, useEffect } from 'react';
import { Box, Modal, Typography, IconButton, Button, LinearProgress } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, Close } from '@mui/icons-material';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './ExamModal.css';

const ExamModal = ({ open, onClose, examData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [slideDirection, setSlideDirection] = useState('slide-left');

  useEffect(() => {
    if (examData && examData.questions) {
      setUserAnswers(Array(examData.questions.length).fill(null));
    }
  }, [examData]);

  useEffect(() => {
    if (!open) {
      // Reset all state when the modal is closed
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setSubmitted(false);
      setScore(null);
      setSlideDirection('slide-left');
    }
  }, [open]);

  if (!examData?.questions?.length) return null;

  const handleAnswerClick = (index) => {
    if (!submitted) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = index;
      setUserAnswers(newAnswers);

      // Move to the next question or the submission slide after 500ms delay
      setTimeout(() => {
        if (currentQuestionIndex < examData.questions.length - 1) {
          setSlideDirection('slide-left');
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // If the last question is answered, move to the submit slide
          setSlideDirection('slide-left');
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < examData.questions.length) {
      setSlideDirection('slide-left');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setSlideDirection('slide-right');
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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

  const getCurrentSlideContent = () => {
    if (currentQuestionIndex === examData.questions.length) {
      return (
        <Box textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
          {submitted ? (
            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 3, color: 'green' }}>
              🎉 You scored {score} out of {examData.questions.length}!
            </Typography>
          ) : (
            <>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                You've completed the exam!
              </Typography>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, px: 5, py: 2, fontSize: '1.25rem' }}
              >
                Submit Your Answers
              </Button>
            </>
          )}
          {submitted && score === examData.questions.length && (
            <Typography variant="h4" sx={{ color: 'green', fontWeight: 'bold', mt: 4 }}>
              Congratulations! 🎉 You got all the answers correct!
            </Typography>
          )}
        </Box>
      );
    }

    const currentQuestion = examData.questions[currentQuestionIndex];
    return (
      <>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          {examData.title}
        </Typography>
        <Typography variant="h6" sx={{ fontStyle: 'italic', mb: 2 }}>
          Question {currentQuestionIndex + 1} of {examData.questions.length}
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, fontSize: '1.1rem' }}>
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
                  mb: 2,
                  p: 2,
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
                <Typography sx={{ fontSize: '1.1rem' }}>{option}</Typography>
              </Box>
            );
          })}
        </Box>
        {submitted && (
          <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 2, fontSize: '1.1rem' }}>
            Rationale: {currentQuestion.rationale}
          </Typography>
        )}
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "50vw",
          height: "75vh",
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 6,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Close Button in Top Right */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'grey.200',
            '&:hover': { bgcolor: 'grey.300' },
            width: 40,
            height: 40,
          }}
        >
          <Close sx={{ fontSize: 28 }} />
        </IconButton>

        {/* Main Content */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <SwitchTransition>
            <CSSTransition
              key={currentQuestionIndex}
              timeout={500}
              classNames={slideDirection}
            >
              <Box sx={{ height: '100%' }}>
                {getCurrentSlideContent()}
              </Box>
            </CSSTransition>
          </SwitchTransition>
        </Box>

        {/* Navigation Arrows and Progress Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <IconButton
            onClick={handleBack}
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
            value={(currentQuestionIndex / examData.questions.length) * 100}
            sx={{ width: '70%', mx: 2, height: 10 }}
          />
          <IconButton
            onClick={handleNext}
            disabled={currentQuestionIndex === examData.questions.length}
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
      </Box>
    </Modal>
  );
};

export default ExamModal;
