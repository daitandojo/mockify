// styles.js
import { createTheme } from '@mui/material/styles';

// Fly.io color scheme adaptation
const primaryColor = '#9146ff'; // Distinctive Fly.io purple
const hoverColor = '#773fe7'; // Darker purple for hover effects

export const containerStyle = {
  padding: '10vh',
  maxWidth: '1000px',
  backgroundColor: '#f9f9f9',
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  marginTop: '10vh',
  marginBottom: '50px',
};

export const headerText = {
  textAlign: 'center',
  color: primaryColor,
  fontFamily: "'Pacifico', cursive", // Stylish handwritten font
  fontSize: '5rem',
  fontWeight: 1400,
  marginBottom: '20px',
};

export const headerSubText = {
  textAlign: 'center',
  color: primaryColor,
  fontFamily: "'Times New Roman'", // Stylish handwritten font
  fontSize: '2rem',
  fontWeight: 100,
  marginBottom: '70px',
};

export const inputField = {
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
  },
  '& label': {
    color: primaryColor,
  },
  '& label.Mui-focused': {
    color: primaryColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: primaryColor,
    },
    '&:hover fieldset': {
      borderColor: hoverColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
};

export const generateButton = {
  backgroundColor: primaryColor,
  color: 'white',
  fontWeight: 'bold',
  padding: '12px 30px',
  fontSize: '1.4rem',
  textTransform: 'none',
  transition: 'all 0.4s ease-in-out',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: hoverColor,
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
  },
};
