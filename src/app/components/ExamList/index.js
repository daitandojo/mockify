'use client';

import React from 'react';
import { Box } from '@mui/material';
import { StyledExamList } from './styles';
import ExamBadge from '../ExamBadge';
import { useAppContext } from '../../contexts/AppContext';

export default function ExamList() {
  const { appState, setActiveExamIndex, showModal, removeExam } =
    useAppContext();
  const { exams } = appState;

  const onSelect = (index) => {
    setActiveExamIndex(index);
    showModal('exameditor');
  };

  const onDelete = (index) => {
    removeExam(index);
  };

  return (
    <StyledExamList>
      {exams.map((exam, index) => (
        <Box key={index} className="examItem">
          <ExamBadge
            index={index}
            exam={exam}
            onClick={() => onSelect(index)}
            onDelete={() => onDelete(index)}
          />
        </Box>
      ))}
    </StyledExamList>
  );
}
