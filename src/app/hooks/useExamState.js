import { useAppContext } from '../contexts/AppContext';
import { emptyExam } from '../defaults';

export default function useExamState() {
  const { appState, updateAppState } = useAppContext();

  const activeExamIndex = appState.activeExamIndex;
  const activeExam = appState.exams[activeExamIndex] || {};

  function updateActiveExam(updatedExam) {
    if (activeExamIndex !== null) {
      const updatedExams = [...appState.exams];
      updatedExams[activeExamIndex] = updatedExam;
      updateAppState('exams', updatedExams);
    }
  }

  function setExamData(newData) {
    updateActiveExam(newData);
  }

  function setCurrentQuestionIndex(index) {
    const updatedExam = { ...activeExam, currentQuestionIndex: index };
    updateActiveExam(updatedExam);
  }

  function setExamTopic(newTopic) {
    const updatedExam = { ...activeExam, topic: newTopic };
    updateActiveExam(updatedExam);
  }

  function setExamLevel(newLevel) {
    const updatedExam = { ...activeExam, level: newLevel };
    updateActiveExam(updatedExam);
  }

  function setUserAnswers(answers) {
    const updatedExam = { ...activeExam, userAnswers: answers };
    updateActiveExam(updatedExam);
  }

  function setSlideDirection(direction) {
    const updatedExam = { ...activeExam, slideDirection: direction };
    updateActiveExam(updatedExam);
  }

  function setSubmitted(submitted) {
    const updatedExam = { ...activeExam, submitted: submitted };
    updateActiveExam(updatedExam);
  }

  function setScore(score) {
    const updatedExam = { ...activeExam, score: score };
    updateActiveExam(updatedExam);
  }

  function resetExam() {
    const updatedExam = { ...activeExam, ...emptyExam };
    updateActiveExam(updatedExam);
  }

  function deleteQuestion(index) {
    const updatedQuestions = activeExam.questions.filter((_, qIndex) => qIndex !== index);
    const updatedExam = { ...activeExam, questions: updatedQuestions };
    updateActiveExam(updatedExam);
  }

  // Update a specific question in the exam
  function updateQuestion(index, updatedQuestion) {
    const updatedQuestions = [...activeExam.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...updatedQuestion };
    const updatedExam = { ...activeExam, questions: updatedQuestions };
    updateActiveExam(updatedExam);
  }

  // Add or edit options to a specific question
  function addOptionsToQuestion({
    index, 
    options, 
    indexOfCorrectAnswer, 
    rationale
  }) {
    const updatedQuestions = [...activeExam.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      options,
      indexOfCorrectAnswer,
      rationale,
    };
    const updatedExam = { ...activeExam, questions: updatedQuestions };
    updateActiveExam(updatedExam);
  }

  return {
    setExamData,
    setCurrentQuestionIndex,
    setExamTopic,
    setExamLevel,
    setUserAnswers,
    setSlideDirection,
    setSubmitted,
    setScore,
    resetExam,
    deleteQuestion,
    updateQuestion,
    addOptionsToQuestion,
  };
}
