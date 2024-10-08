import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { 
  headerContainerStyle, 
  topicTextStyle,
  levelTextStyle, 
  editButtonStyle,
  deleteButtonStyle 
} from './styles';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import {
  useExamContext
} from '../../../contexts/ExamContext';

export default function Header({ exam, onDeleteExam }) {
  const [editing, setEditing] = useState(false);
  const { setExamTopic, setExamLevel } = useExamContext();

  const handleTopicChange = (e) => {
    setExamTopic(e.target.value);
  };

  const handleLevelChange = (e) => {
    setExamLevel(e.target.value);
  };

  return (
    <Box sx={headerContainerStyle}>
      {!editing ? (
        <Box>
          <Typography variant="h4" sx={topicTextStyle}>
            {exam.topic}
          </Typography>
          <Typography variant="subtitle1" sx={levelTextStyle}>
            Level: {exam.level} ({exam.questions.length} questions)
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Exam Title"
            value={exam.topic}
            onChange={handleTopicChange}
            sx={{ ...topicTextStyle, marginBottom: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Exam Level"
            value={exam.level}
            onChange={handleLevelChange}
            sx={levelTextStyle}
          />
        </Box>
      )}
      <Box>
        <IconButton
          aria-label="edit exam"
          onClick={() => {
            setEditing(!editing);
            console.log(exam);
          }}
          sx={editButtonStyle}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete exam"
          onClick={onDeleteExam}
          sx={deleteButtonStyle}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};