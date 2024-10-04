import { useState } from 'react';

export default function useExam(initialQuestions = 4, initialAnswers = 4) {
  const [topic, setTopic] = useState("Investment Risk and UK Tax Exam");
  const [level, setLevel] = useState("University undergraduate");
  const [numberOfQuestions, setNumberOfQuestions] = useState(initialQuestions);
  const [numberOfAnswers, setNumberOfAnswers] = useState(initialAnswers);
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [error, setError] = useState("");
  const [questionsRemaining, setQuestionsRemaining] = useState(numberOfQuestions);
  const [allQuestions, setAllQuestions] = useState([]);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examData, setExamData] = useState(null);

  return {
    topic,
    setTopic,
    level,
    setLevel,
    numberOfQuestions,
    setNumberOfQuestions,
    numberOfAnswers,
    setNumberOfAnswers,
    loading,
    setLoading,
    testLoading,
    setTestLoading,
    error,
    setError,
    questionsRemaining,
    setQuestionsRemaining,
    allQuestions,
    setAllQuestions,
    examModalOpen,
    setExamModalOpen,
    examData,
    setExamData,
  };
}
