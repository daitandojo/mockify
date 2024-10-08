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

export const handleAnswerClick = ({
  index,
  submitted,
  currentQuestionIndex,
  userAnswers,
  updateUserAnswers,
  updateCurrentQuestionIndex,
  updateSlideDirection,
}) => {
  if (!submitted) {
    // Update the user's selected answer
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = index;
    updateUserAnswers(updatedAnswers);

    // Move to the next question after a delay, if applicable
    setTimeout(() => {
      if (currentQuestionIndex < updatedAnswers.length - 1) {
        updateSlideDirection('slide-left');
        updateCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 500);
  }
};
