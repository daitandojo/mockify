import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const CloseButton = ({ onClose }) => (
  <IconButton
    onClick={onClose}
    sx={{
      position: 'absolute',
      top: 16,
      right: 16,
      bgcolor: 'grey.200',
      '&:hover': { bgcolor: 'grey.300' },
      width: 40,
      height: 40,
    }}
  >
    <Close sx={{ fontSize: 28 }} />
  </IconButton>
);

export default CloseButton;
