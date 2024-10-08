import React from 'react';
import { Box, Button } from '@mui/material';
import { buttonStyles, actionButtonsContainerStyle } from './styles';

export default function ActionButtons({ buttons }) {
  return (
    <Box sx={actionButtonsContainerStyle}>
      {buttons.map(({ label, onClick }) => (
        <Button key={label} variant="contained" sx={buttonStyles} onClick={onClick}>
          {label}
        </Button>
      ))}
    </Box>
  );
}
