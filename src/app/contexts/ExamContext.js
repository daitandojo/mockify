import { createContext, useContext } from 'react';
import useExam from '../hooks/useExam';

const ExamContext = createContext();

export function ExamProvider({ children }) {
  const exam = useExam();
  return <ExamContext.Provider value={exam}>{children}</ExamContext.Provider>;
}

export function useExamContext() {
  return useContext(ExamContext);
}
