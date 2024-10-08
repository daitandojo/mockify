import React from 'react';
import { Box } from '@mui/material';
import QuestionItem from '../QuestionItem';
import {
  questionListContainerStyle,
  questionBoxStyle,
} from './styles';

export default function QuestionList({ 
  questions, 
  onDeleteQuestion, 
  onEditQuestion, 
  onEditOption,
  onGenerateOptions
}) {
  return (
    <Box sx={questionListContainerStyle}>
      {questions.map((question, index) => (
        <Box
          key={question.id}
          sx={{
            ...questionBoxStyle,
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #333',
            backgroundColor: '#fff',
          }}
        >
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            onDelete={() => onDeleteQuestion(index)}
            onEdit={(updatedQuestion) => onEditQuestion(index, updatedQuestion)}
            onEditOption={(options, indexOfCorrectAnswer, rationale) =>
              onEditOption(index, options, indexOfCorrectAnswer, rationale)
            }
            onGenerateOptions={onGenerateOptions}
          />
        </Box>
      ))}
    </Box>
  );
}
