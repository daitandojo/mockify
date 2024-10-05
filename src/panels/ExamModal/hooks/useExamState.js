// hooks/useExamState.js
import { useState, useEffect } from 'react';

export default function useExamState(examData, open) {
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

  return {
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
  };
}
