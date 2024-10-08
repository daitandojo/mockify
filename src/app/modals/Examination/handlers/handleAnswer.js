// handlers/handleAnswer.js

export const handleAnswerClick = ({
  index,
  submitted,
  currentQuestionIndex,
  userAnswers,
  setUserAnswers,
  setCurrentQuestionIndex,
  examData,
  setSlideDirection,
}) => {
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
        setSlideDirection('slide-left');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 500);
  }
};
