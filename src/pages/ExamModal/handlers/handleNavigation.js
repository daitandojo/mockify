// handlers/handleNavigation.js

export const handleNext = ({
  currentQuestionIndex,
  setSlideDirection,
  setCurrentQuestionIndex,
  examData,
}) => {
  if (currentQuestionIndex < examData.questions.length) {
    setSlideDirection('slide-left');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

export const handleBack = ({
  currentQuestionIndex,
  setSlideDirection,
  setCurrentQuestionIndex,
}) => {
  if (currentQuestionIndex > 0) {
    setSlideDirection('slide-right');
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};
