'use client';

import { createContext, useContext } from 'react';
import useExamState from '../hooks/useExamState';

const ExamContext = createContext();

export function ExamProvider({ children }) {

  const examState = useExamState();

  return (
    <ExamContext.Provider value={examState}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExamContext() {
  return useContext(ExamContext);
}
