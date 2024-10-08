'use client';

import React from 'react';
import { Box, Modal } from '@mui/material';
import { modalStyle } from './styles';
import Header from './Header';
import QuestionList from './QuestionList';
import ActionButtons from './ActionButtons';
import { useExamContext } from '../../contexts/ExamContext';
import { useAppContext } from '../../contexts/AppContext';
import { generateOptions } from '../../helpers/helpersQuestionGeneration';
import { convertExamToPDF } from '../../helpers/helpersExamToPDF';
import Examination from '../Examination';

export default function ExamEditor({ onClose }) {
  const { deleteQuestion, updateQuestion, addOptionsToQuestion, resetExam } =
    useExamContext();

  const { appState, removeExam, showModal } = useAppContext();

  const activeExamIndex = appState.activeExamIndex;
  const activeExam = appState.exams[activeExamIndex] || null;

  if (!activeExam) {
    return null;
  }

  const onDeleteExam = () => {
    if (activeExamIndex !== null) {
      removeExam(activeExamIndex);
      resetExam();
      onClose();
    }
  };

  const onGenerateOptions = async (questionIndex) => {
    const data = await generateOptions({
      topic: activeExam.topic,
      level: activeExam.level,
      question: activeExam.questions[questionIndex].question,
      numberOfOptions: 4,
    });
    addOptionsToQuestion({
      index: questionIndex,
      options: data.options,
      indexOfCorrectAnswer: data.indexOfCorrectAnswer,
      rationale: data.rationale,
    });
  };

  // Step 1: Function to open the Examination for "Test Me Now"
  const openExamination = () => {
    showModal('examination');
  };

  // Step 2: Function to generate PDF for "Generate Paper Exam"
  const generatePaperExam = async () => {
    await convertExamToPDF(activeExam);
  };

  // Step 3: Remaining functionality placeholders
  const addQuestion = () => {
    // Logic for adding a question goes here
  };

  const generateAnswers = () => {
    // Logic for generating answers goes here
  };

  const actionButtons = [
    { label: 'Add Question', onClick: addQuestion },
    { label: 'Generate Answers', onClick: generateAnswers },
    { label: 'Test me now', onClick: openExamination },
    { label: 'Generate Paper Exam', onClick: generatePaperExam },
  ];

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={modalStyle}>
        <Header exam={activeExam} onDeleteExam={onDeleteExam} />
        <QuestionList
          questions={activeExam.questions}
          onDeleteQuestion={deleteQuestion}
          onEditQuestion={updateQuestion}
          onGenerateOptions={onGenerateOptions}
        />

        {/* Pass the buttons array to ActionButtons */}
        <ActionButtons buttons={actionButtons} />

        {/* Conditionally render the Examination */}
        {appState.showingModal === 'ExamEditor' && (
          <Examination onClose={() => showModal(null)} />
        )}
      </Box>
    </Modal>
  );
}
