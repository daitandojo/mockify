import { Box, Button, CircularProgress } from '@mui/material';
import { buttonStyles } from './styles';
import { useAppContext } from '../../../../app/contexts/AppContext';

export default function CreateExamButton({ onClick }) {
  const { appState } = useAppContext();
  const { busy } = appState;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: { xs: '20px', md: '40px' }, gap: { xs: '10px', sm: '20px' } }}
    >
      <Button
        variant="contained"
        onClick={onClick}
        disabled={busy === 'preparingmaterials'}
        sx={{ ...buttonStyles, width: { xs: '100%', sm: 'auto' } }}
        startIcon={
          busy === 'preparingmaterials' ? <CircularProgress size={20} /> : null
        }
      >
        {busy === 'preparingmaterials' ? 'Generating Materials...' : 'Generate Materials'}
      </Button>

      <Button
        variant="contained"
        onClick={onClick}
        disabled={busy === 'preparingexam'}
        sx={{ ...buttonStyles, width: { xs: '100%', sm: 'auto' } }}
        startIcon={
          busy === 'preparingexam' ? <CircularProgress size={20} /> : null
        }
      >
        {busy === 'preparingexam' ? 'Generating Exam...' : 'Generate Exam'}
      </Button>
    </Box>
  );
}
