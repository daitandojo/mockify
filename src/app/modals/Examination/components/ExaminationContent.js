// components/ExaminationContent.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import ExamCompletion from './ExamCompletion';
import QuestionDisplay from './QuestionDisplay';

const ExaminationContent = ({
  examData,
  currentQuestionIndex,
  handleAnswerClick,
  userAnswers,
  submitted,
  handleSubmit,
  score,
}) => {
  if (currentQuestionIndex === examData.questions.length) {
    return (
      <ExamCompletion
        submitted={submitted}
        score={score}
        totalQuestions={examData.questions.length}
        handleSubmit={handleSubmit}
      />
    );
  }

  const currentQuestion = examData?.questions?.[currentQuestionIndex];

  if (!currentQuestion) return <div>No Current Question</div>;

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        {examData.title}
      </Typography>
      <QuestionDisplay
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={examData.questions.length}
        userAnswers={userAnswers}
        submitted={submitted}
        handleAnswerClick={handleAnswerClick}
      />
    </>
  );
};

export default ExaminationContent;
