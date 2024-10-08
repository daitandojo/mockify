import { Box, Typography, LinearProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledExamBadge } from './styles';
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

export default function ExamBadge({ exam, index, onDelete }) {
  const { appState, setActiveExamIndex, showModal } = useAppContext();
  const { topic, level, questions, userAnswers, submitted, score } = exam;

  const progress = questions.length
    ? (userAnswers.length / questions.length) * 100
    : 0;

  // Handler for clicking the exam badge
  const handleClick = () => {
    setActiveExamIndex(index);
    showModal('exameditor');
  };

  const isActive = index === appState.activeExamIndex;

  return (
    <StyledExamBadge
      onClick={handleClick}
      submitted={Boolean(submitted)}
      active={isActive}
    >
      <Box className="header">
        <Typography variant="h5" className="topic">
          {topic}
        </Typography>
        <IconButton
          className="deleteButton"
          aria-label="delete exam"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" className="level">
        {level}
      </Typography>
      <Typography variant="body2" className="details">
        {`Questions: ${questions.length}, Answers Given: ${userAnswers.length}`}
      </Typography>
      <Box className="progressContainer">
        <LinearProgress
          variant="determinate"
          value={progress}
          className="progressBar"
        />
        {submitted && (
          <Typography variant="body2" className="score">
            Score: {Math.round((score || 0) * 100)}%
          </Typography>
        )}
      </Box>
    </StyledExamBadge>
  );
}
