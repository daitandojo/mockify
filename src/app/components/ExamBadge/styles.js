import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledExamBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'submitted' && prop !== 'active',
})(({ theme, submitted, active }) => ({
  backgroundColor: theme.palette.grey[200],
  border: active ? "2px solid green" : "none",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  overflow: 'hidden',
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0),
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  '& .header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0),
  },
  '& .topic': {
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
  '& .deleteButton': {
    color: theme.palette.error.main,
  },
  '& .level': {
    fontStyle: 'italic',
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
  '& .details': {
    marginTop: theme.spacing(1),
    fontSize: '0.675rem',
    color: theme.palette.text.primary,
  },
  '& .progressContainer': {
    marginTop: theme.spacing(1),
  },
  '& .progressBar': {
    height: 10,
    borderRadius: 5,
  },
  '& .score': {
    marginTop: theme.spacing(1),
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));
