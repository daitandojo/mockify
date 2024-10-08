import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledExamList = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0),
  padding: theme.spacing(1.5),
  '.examItem': {
    width: '100%',
  },
}));
