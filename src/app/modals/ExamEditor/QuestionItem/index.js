import React, { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Collapse,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { 
  questionItemStyle, 
  questionBoxStyle, 
  optionsContainerStyle, 
  optionBoxStyle, 
  rationaleBoxStyle, 
  loadingContainerStyle 
} from './styles';

export default function QuestionItem({ 
  question, 
  index, 
  onDelete, 
  onEdit, 
  onEditOption, 
  onGenerateOptions 
}) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const optionsRef = useRef(null);

  const toggleOptions = () => {
    setExpanded(!expanded);
  };

  const onClickOptions = async (e) => { 
    e.stopPropagation(); 

    if (!question.options || question.options.length === 0) {
      setLoading(true); // Set loading state
      await onGenerateOptions(index);
      setLoading(false); // Remove loading state
    }

    toggleOptions();
  };  

  const hasOptions = (question.options && question.options?.length)

  return (
    <Box sx={questionItemStyle(hasOptions)}>
      <Box sx={questionBoxStyle}>
        <IconButton size="small" onClick={onClickOptions} sx={{ marginRight: 1 }}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <AddIcon />
          )}
        </IconButton>
        <Typography sx={{ flex: 1, paddingRight: '8px' }}>
          {+index + 1}. {question.question}
        </Typography>
        <Box className="actions">
          <IconButton
            size="small"
            aria-label="generate options"
            onClick={(e) => {
              e.stopPropagation();
              onGenerateOptions(index);
            }}
            sx={{ marginRight: 1 }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="edit question"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(question);
            }}
            sx={{ marginRight: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="delete question"
            onClick={(e) => {
              e.stopPropagation(); // Prevent expanding when clicking this button
              onDelete(index); // Pass the index of the question to be deleted
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse
        in={expanded}
        timeout={1500}
        easing={{ enter: "cubic-bezier(0.5, 1, 0.89, 1)", exit: "linear" }}
      >
        {loading ? (
          <Box sx={loadingContainerStyle}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ marginLeft: '10px' }}>
              Generating options, please wait...
            </Typography>
          </Box>
        ) : (
          question.options && question.options.length > 0 && (
            <Box sx={optionsContainerStyle} ref={optionsRef}>
              {question.options.map((option, idx) => {
                const optionLabel = String.fromCharCode(65 + idx) + '.'; // Convert index to A., B., C., etc.
                const isCorrectAnswer = (idx === question.indexOfCorrectAnswer);

                return (
                  <Box
                    key={`option-${index}-${idx}`}
                    sx={optionBoxStyle(isCorrectAnswer)}
                  >
                    <Typography variant="body2">{`${optionLabel} ${option}`}</Typography>
                  </Box>
                );
              })}
              {question.rationale && (
                <Box sx={rationaleBoxStyle}>
                  <Typography variant="body2">
                    {`Rationale: ${question.rationale}`}
                  </Typography>
                </Box>
              )}
            </Box>
          )
        )}
      </Collapse>
    </Box>
  );
}
